import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import institutions from '../assets/institutions.json';
import logoMap from '../assets/logoMap';
import genericLogo from '../assets/generic_bank_logo.png';
import { FuzzyTemplate } from '@/components/fuzzy/fuzzy.template';
import { Institution, RowItem } from '@/components/fuzzy/fuzzy.types';

const logoIdSet = new Set(Object.keys(logoMap).map(key => key.replace('.png', '')));

export default function FuzzySearch() {
    const [query, setQuery] = useState('');
    const [rows, setRows] = useState<RowItem[]>([]);
    const [showCount, setShowCount] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const fuse = useMemo(
        () =>
            new Fuse(institutions as Institution[], {
                keys: ['name'],
                threshold: 0.3,
                minMatchCharLength: 2,
            }),
        []
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!query.trim()) {
                setRows((institutions as Institution[]).map(item => ({ type: 'unique', item })));
                setShowCount(false);
                setSelectedId(null);
                return;
            }
            const searched = fuse.search(query);
            const results = searched.map(r => r.item);

            const nameMap = new Map<string, Institution[]>();
            for (const item of results) {
                if (!nameMap.has(item.name)) {
                    nameMap.set(item.name, []);
                }
                nameMap.get(item.name)!.push(item);
            }

            const grouped: RowItem[] = [];
            for (const [name, items] of nameMap) {
                if (items.length === 1) {
                    grouped.push({ type: 'unique', item: items[0] });
                } else {
                    grouped.push({ type: 'duplicate', name, items });
                }
            }

            setRows(grouped);
            setShowCount(true);
            setSelectedId(results.length > 0 ? results[0].institution_id : null);
        }, 200);

        return () => clearTimeout(timer);
    }, [query, fuse]);

    const getLogo = (item: Institution) => {
        if (logoIdSet.has(item.institution_id)) {
            return logoMap[item.institution_id + '.png'];
        }
        return genericLogo;
    };

    return (
        <FuzzyTemplate
            query={query}
            onQueryChange={setQuery}
            rows={rows}
            getLogo={getLogo}
            showCount={showCount}
            selectedId={selectedId}
            onSelect={(item) => setSelectedId(item.institution_id)}
        />
    );
}
