import { useState } from 'react';
import HomeScreen from '@/components/HomeScreen';

export default function App() {
    const [token, setToken] = useState(null);

    async function createLinkToken() {
        const res = await fetch(
            "http://10.0.0.20:8000/api/create_link_token", 
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            },
        );
        const data = await res.json();
        setToken(data.link_token);
    }

    return <HomeScreen token={token} onPress={createLinkToken} />;
}
