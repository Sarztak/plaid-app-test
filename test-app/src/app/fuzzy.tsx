import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import institutions from '../assets/institutions.json';
import logoMap from '../assets/logoMap';
import genericLogo from '../assets/generic_bank_logo.png';
import { FuzzyTemplate } from '@/components/fuzzy/fuzzy.template';
import { Institution } from '@/components/fuzzy/fuzzy.types';

// Build set of IDs that have specific logos
const logoIdSet = new Set(Object.keys(logoMap).map(key => key.replace('.png', '')));

export default function FuzzySearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Institution[]>(institutions as Institution[]);
    const [showCount, setShowCount] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const fuse = useMemo(
        () =>
            new Fuse(institutions as Institution[], {
                keys: ['name'], // only search based on name, not inst_id that user doesn't know
                threshold: 0.3,
                minMatchCharLength: 2,
            }),
        []
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!query.trim()) {
                setResults(institutions as Institution[]);
                setShowCount(false);
                setSelectedId(null);
                return;
            }
            const searched = fuse.search(query);
            setResults(searched.map(r => r.item));
            setShowCount(true);
            setSelectedId(searched.length > 0 ? searched[0].item.institution_id : null);
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
            results={results}
            getLogo={getLogo}
            showCount={showCount}
            selectedId={selectedId}
            onSelect={(item) => setSelectedId(item.institution_id)}
        />
    );
}
