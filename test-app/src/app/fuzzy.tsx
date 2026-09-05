import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';
import institutions from '../assets/institutions.json';
import { FuzzyTemplate } from '@/components/fuzzy/fuzzy.template';
import { Institution } from '@/components/fuzzy/fuzzy.types';

export default function FuzzySearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Institution[]>(institutions as Institution[]);

    const fuse = useMemo(
        () =>
            new Fuse(institutions as Institution[], {
                keys: ['name', 'institution_id'],
                threshold: 0.3,
                minMatchCharLength: 2,
                includeScore: true,
            }),
        []
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!query.trim()) {
                setResults(institutions as Institution[]);
                return;
            }
            const searched = fuse.search(query);
            setResults(searched.map(r => r.item));
        }, 300);

        return () => clearTimeout(timer);
    }, [query, fuse]);

    return (
        <FuzzyTemplate
            query={query}
            onQueryChange={setQuery}
            results={results}
        />
    );
}
