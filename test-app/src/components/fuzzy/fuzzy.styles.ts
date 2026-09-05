import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 16,
        paddingTop: 60,
    },
    input: {
        backgroundColor: '#1a1a1a',
        color: '#fff',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 12,
    },
    count: {
        color: '#888',
        fontSize: 13,
        marginBottom: 8,
    },
    item: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#222',
    },
    name: {
        color: '#fff',
        fontSize: 16,
    },
    highlightedItem: {
        backgroundColor: '#1a1a1a',
        borderLeftWidth: 3,
        borderLeftColor: '#6366f1',
    },
    highlightedName: {
        color: '#6366f1',
        fontWeight: '600',
    },
});

export default styles;
