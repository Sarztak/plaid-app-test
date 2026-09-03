import { View, Button, Text } from 'react-native';
import styles from '@/styles/homeScreen';

export default function HomeScreen({ onPress }) {
    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Button title="Get Link Token" onPress={onPress} />
            </View>
            <Text>Success</Text>
        </View>
    );
}
