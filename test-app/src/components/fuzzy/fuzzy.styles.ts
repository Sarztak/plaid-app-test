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
        flexDirection: 'row',
        alignItems: 'center',
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
        fontFamily: 'Courier',
        marginLeft: 28,
    },
    url: {
        color: '#888',
        fontSize: 12,
        marginTop: 2,
    },
    logoWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#1a1a1a',
    },
    logo: {
        width: 44,
        height: 44,
        marginLeft: -2,
        marginTop: -2,
    },
    highlightedItem: {
        backgroundColor: '#1a1a1a',
        borderLeftWidth: 3,
        borderLeftColor: '#6366f1',
    },
    highlightedName: {
        color: '#6366f1',
        fontWeight: 'bold',
    },
    selector: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Courier',
        width: 20,
        textAlign: 'right',
        marginRight: 8,
    },
    highlightedSelector: {
        color: '#6366f1',
        fontWeight: 'bold',
    },
    logoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 8,
        paddingLeft: 28,
    },
    logoGridItem: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: '#1a1a1a',
    },
    logoGridItemSelected: {
        borderWidth: 2,
        borderColor: '#6366f1',
    },
    gridLogo: {
        width: 40,
        height: 40,
    },
});

export default styles;
