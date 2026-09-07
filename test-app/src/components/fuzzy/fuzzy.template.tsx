import { View, Text, TextInput, FlatList, Pressable, Image } from 'react-native';
import styles from '@/components/fuzzy/fuzzy.styles';
import { Institution } from './fuzzy.types';

interface FuzzyTemplateProps {
    query: string;
    onQueryChange: (text: string) => void;
    results: Institution[];
    onSelect?: (item: Institution) => void;
    getLogo: (item: Institution) => any;
    showCount: boolean;
    selectedId: string | null;
}

export function FuzzyTemplate({ query, onQueryChange, results, onSelect, getLogo, showCount, selectedId }: FuzzyTemplateProps) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search institutions..."
                placeholderTextColor="#888"
                value={query}
                onChangeText={onQueryChange}
                autoCorrect={false}
                autoCapitalize="none"
            />
            {showCount && (
                <Text style={styles.count}>{results.length} results</Text>
            )}
            <FlatList
                data={results}
                keyExtractor={item => item.institution_id}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.item}
                        onPressIn={() => onSelect?.(item)}
                    >
                        <View style={styles.itemContent}>
                            <Text style={[styles.selector, item.institution_id === selectedId && styles.highlightedSelector]}>
                                {item.institution_id === selectedId ? '>' : ' '}
                            </Text>
                            <View style={styles.logoWrapper}>
                                <Image
                                    source={getLogo(item)}
                                    style={styles.logo}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={styles.textContent}>
                                <Text style={[styles.name, item.institution_id === selectedId && styles.highlightedName]}>
                                    {item.name}
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                )}
                initialNumToRender={20}
                maxToRenderPerBatch={20}
                windowSize={10}
            />
        </View>
    );
}

export default FuzzyTemplate;
