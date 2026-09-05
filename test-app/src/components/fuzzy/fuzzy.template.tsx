import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import styles from '@/components/fuzzy/fuzzy.styles';
import { Institution } from './fuzzy.types';

interface FuzzyTemplateProps {
    query: string;
    onQueryChange: (text: string) => void;
    results: Institution[];
    onSelect?: (item: Institution) => void;
}

export function FuzzyTemplate({ query, onQueryChange, results, onSelect }: FuzzyTemplateProps) {
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
            <Text style={styles.count}>{results.length} results</Text>
            <FlatList
                data={results}
                keyExtractor={item => item.name}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={[
                            styles.item,
                            index === 0 && styles.highlightedItem,
                        ]}
                        onPress={() => onSelect?.(item)}
                    >
                        <Text style={[styles.name, index === 0 && styles.highlightedName]}>
                            {item.name}
                        </Text>
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
