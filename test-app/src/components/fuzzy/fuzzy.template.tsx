import { View, Text, TextInput, FlatList, Pressable, Image } from 'react-native';
import styles from '@/components/fuzzy/fuzzy.styles';
import { Institution, RowItem } from './fuzzy.types';

interface FuzzyTemplateProps {
    query: string;
    onQueryChange: (text: string) => void;
    rows: RowItem[];
    getLogo: (item: Institution) => any;
    showCount: boolean;
    selectedId: string | null;
    onSelect: (item: Institution) => void;
}

export function FuzzyTemplate({
    query,
    onQueryChange,
    rows,
    getLogo,
    showCount,
    selectedId,
    onSelect,
}: FuzzyTemplateProps) {
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
                <Text style={styles.count}>
                    {rows.reduce((acc, r) => acc + (r.type === 'unique' ? 1 : r.items.length), 0)} results
                </Text>
            )}
            <FlatList
                data={rows}
                keyExtractor={(row) => row.type === 'unique' ? row.item.institution_id : row.name}
                renderItem={({ item }) => {
                    if (item.type === 'unique') {
                        const isSelected = item.item.institution_id === selectedId;
                        return (
                            <Pressable
                                key={item.item.institution_id}
                                style={[styles.item, { flexDirection: 'row', alignItems: 'center' }]}
                                onPressIn={() => onSelect(item.item)}
                            >
                                <Text style={[styles.name, isSelected && styles.highlightedName]}>
                                    {item.item.name}
                                </Text>
                            </Pressable>
                        );
                    }

                    const hasSelectedInGroup = item.items.some(i => i.institution_id === selectedId);

                    return (
                        <View key={item.name}>
                            <Pressable
                                style={[styles.item, { flexDirection: 'row', alignItems: 'center' }]}
                                onPressIn={() => onSelect(item.items[0])}
                            >
                                <Text style={[styles.name, hasSelectedInGroup && styles.highlightedName]}>
                                    {item.name} ({item.items.length})
                                </Text>
                            </Pressable>
                            {hasSelectedInGroup && (
                                <View style={styles.logoGrid}>
                                    {item.items.map(inst => (
                                        <Pressable
                                            key={inst.institution_id}
                                            style={styles.logoGridItem}
                                            onPressIn={() => onSelect(inst)}
                                        >
                                            <Image
                                                source={getLogo(inst)}
                                                style={styles.gridLogo}
                                                resizeMode="cover"
                                            />
                                        </Pressable>
                                    ))}
                                </View>
                            )}
                        </View>
                    );
                }}
                initialNumToRender={20}
                maxToRenderPerBatch={20}
                windowSize={10}
            />
        </View>
    );
}

export default FuzzyTemplate;
