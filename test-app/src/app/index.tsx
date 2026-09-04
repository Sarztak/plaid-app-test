import { createPlaidLinkSession} from 'react-native-plaid-link-sdk'
import HomeScreen from '@/components/HomeScreen';

/*
TODO: Error to be handles
1. Error during Linking Items - fires when user exits, token expires, instituation fails
2. Error when exchanging public token for access tokens, TBD in backend
3. Item lifecycle error - needs handling in backend and then prompting user in the frontend to take actions based on them


TODO: When should the link be created and opened? when a link session is created it must be opened within 30 min else it will become invalidated. Right now it is opened immediately, but there are cases such as user reading agreement etc where I might have to open it later. 
*/
export default function App() {
    // TODO: replace single link flow with multi-link flow
    async function createLinkToken() {
        try {
            const response = await fetch(
                "http://10.0.0.20:8000/api/create_link_token", 
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
            );
            if (!response.ok) {
                let errorMessage = `HTTPS Error: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch {
                    throw new Error(errorMessage);
                }
            }
            const data = await response.json();
            return data.link_token;
        } catch (error) {
            if (error instanceof Error) {
                console.error('Failed to create link token:', error.message);
            } else {
                console.error('Unknown error occured:', error);
            }
        }
    }

    async function initializePlaidLink(linkToken: string) {
        const session = await createPlaidLinkSession({
            token: linkToken,
            onSuccess: async (success) => {
                if (!success.publicToken) {
                    throw new Error('Missing public token from Plaid');
                }
                try {
                    // 1. Catch network failure errors 
                    const response = await fetch("http://10.0.0.20:8000/api/exchange_public_token", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            public_token: success.publicToken,
                            accounts: success.metadata.accounts,
                            institution: success.metadata.institution,
                            linkSessionId: success.metadata.linkSessionId,
                        }),
                    });
                    if (!response.ok) {
                        // 2. Catch 4xx or 5xx errors
                        // TODO: handle error by displaying appropriate UI

                        let errorMessage = `HTTPS Error: ${response.status}`;
                        try {
                            // 3. catch error while reading json from body
                            const errorData = await response.json();
                            errorMessage = errorData.error || errorMessage;
                        } catch {
                            throw new Error(errorMessage);
                        }

                    };
                    const data = response.json();
                    return data;

                    } catch (error) {
                        // TODO: 
                        // 1. display appropriate UI 
                        // 2. make a separate function to extract error messages.
                        // 3. showErrorUI(error);
                        if (error instanceof Error) {
                            console.error('Failed to exchange token:', error.message);
                        } else {
                            console.error('Unknown error occured:', error);
                        }
                    }
            },
            onExit: (linkExit) => {
                // TODO: replace the console.log with the following.
                // 1. Guide the user in case they exit. 
                // 2. Log the error data on server for debugging and support
                console.log('Link exited:', {
                    error: linkExit.error,
                    institution: linkExit.metadata.institution,
                    linkSessionId: linkExit.metadata.linkSessionId,
                    requestId: linkExit.metadata.requestId,
                    status: linkExit.metadata.status,
                })

            },
            onEvent: (event) => {
                /*
                    TODO: Not all the events are emitted in sequence, they cannot be relied upon to make decisions. But some are guaranteed to fire consistently. Some of them are OPEN, EXIT, HANDOFF, ERROR, SELECT_INSTITUTION. 
                    1. Log all fired events with timestamps even if no action is taken.
                    2. ERROR can be used to show error UI. The following metadata should also be logged for ERROR event errorCode, errorMessage, errorType
                    3. Funnel tracking: OPEN -> SELECT_INSTITUTION -> HANDOFF/EXIT
                    4. OPEN emits isUpdateMode metadata, which can be used as check
                    5. Should IDENTITY_LAYER be added for faster login?
                */
                console.log("Event:", event)
            },
            // layerSession.submit() => {} handles user submitted data in layerSession
            onLoad: () => {
                console.log("link Loaded");
            },
        });
        return session;
    }

    async function startPlaidFlow() {
        const link_token = await createLinkToken();
        const session = await initializePlaidLink(link_token);

        // TODO: in future something might be injected here if needed to delay opening the session. However need to handle again if token gets expired.
        session.open();
    }

    return <HomeScreen onPress={startPlaidFlow} />;
}
