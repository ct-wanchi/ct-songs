import { gapi } from 'gapi-script';

const CLIENT_ID = 'YOUR_CLIENT_ID';
const API_KEY = 'YOUR_API_KEY';
const SCOPES = 'https://www.googleapis.com/auth/youtube.force-ssl';

let authInstance;

function loadClient() {
    gapi.load('client:auth2', () => {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES,
        }).then(() => {
            authInstance = gapi.auth2.getAuthInstance();
        });
    });
}

async function createPlaylistFromSetlist(setlist) {
    const videoIds = setlist.map(item => {
        const url = new URL(item.link);
        return url.searchParams.get("v");
    });

    const response = await fetch("https://<YOUR_PROJECT_ID>.cloudfunctions.net/createPlaylist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${gapi.auth.getToken().access_token}`,
        },
        body: JSON.stringify({
            title: "セットリスト",
            description: "自動生成されたセットリスト",
            videoIds,
        }),
    });

    const data = await response.json();
    console.log("Playlist created with ID:", data.playlistId);
}

loadClient();
