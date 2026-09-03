import { View, Button, Text } from 'react-native';
import styles from '@/styles/homeScreen';

export default function HomeScreen({ token, onPress }) {
    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Button title="Get Link Token" onPress={onPress} />
            </View>
            {token && <Text>Token: {token} </Text>}
        </View>
    );
}
