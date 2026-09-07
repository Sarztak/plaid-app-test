import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from '@/components/fuzzy/fuzzy.styles';
import { Institution } from './fuzzy.types';

interface FuzzyTemplateProps {
    query: string;
    onQueryChange: (text: string) => void;
    results: Institution[];
    onSelect?: (item: Institution) => void;
    getLogo: (item: Institution) => any;
    showCount: boolean;
}

export function FuzzyTemplate({ query, onQueryChange, results, onSelect, getLogo, showCount }: FuzzyTemplateProps) {
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
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={[
                            styles.item,
                            index === 0 && styles.highlightedItem,
                        ]}
                        onPress={() => onSelect?.(item)}
                    >
                        <View style={styles.itemContent}>
                            <View style={styles.logoWrapper}>
                                <Image
                                    source={getLogo(item)}
                                    style={styles.logo}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={styles.textContent}>
                                <Text style={[styles.name, index === 0 && styles.highlightedName]}>
                                    {item.name}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                initialNumToRender={20}
                maxToRenderPerBatch={20}
                windowSize={10}
            />
        </View>
    );
}

export default FuzzyTemplate;
