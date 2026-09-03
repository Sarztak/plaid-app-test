import { View, Button, Text } from "react-native";

export default function HomeScreen({token, onPress}) {
    return (
        <View>
            <Button title="Get Link Token" onPress={onPress} />
            {token && <Text>{token}</Text>}
        </View>
    );
}
