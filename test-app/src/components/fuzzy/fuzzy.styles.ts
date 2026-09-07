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
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContent: {
        flex: 1,
        marginLeft: 12,
    },
    name: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    url: {
        color: '#888',
        fontSize: 12,
        marginTop: 2,
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    highlightedItem: {
        backgroundColor: '#1a1a1a',
        borderLeftWidth: 3,
        borderLeftColor: '#6366f1',
    },
    highlightedName: {
        color: '#6366f1',
    },
});

export default styles;
