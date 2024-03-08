let accessToken;
const clientId = "885acc24f16b444da62dcbd7b7748f5e";
const redirectUrl = "http://localhost:3000/"

const Spotify = {
    getAccessToken() {
        if(accessToken) return accessToken;
        // extract access token from URL
        const tokenURL = window.location.href.match(/access_token=([^&]*)/);

        // extract expiry time from URL
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        if(tokenURL && expiryTime) {
            //set access token and expiry time vars
            accessToken = tokenURL[1];
            const expiresIn = Number(expiryTime[1]);

            //function which resets access token upon expiry
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
            //clear URL after access token expires
            window.history.pushState("Access token", null, "/");
            return accessToken;
        }

        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
        window.location = redirect;
    },

    search(term) {
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${accessToken}`},
        })
        .then(response => response.json())
        .then(jsonResponse => {
            if(!jsonResponse) {
                console.log("Response Error");
            }
            console.log(jsonResponse);
            return jsonResponse.tracks.items.map((t) => ({
                id: t.id,
                name: t.name,
                artist: t.artists[0].name,
                album: t.album.name,
                uri: t.uri,
            }));
        });
    },

    savePlaylist(name, trackUris) {
        if(!name || !trackUris) return;
        const aToken = Spotify.getAccessToken();
        const header = {Authorization: `Bearer ${aToken}`};
        let userId;

        return fetch(`https://api.spotify.com/v1/me`, {headers: header})
        .then((response) => response.json())
        .then((jsonResponse) => {
            userId = jsonResponse.id;
            let playlistId;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: header,
                method: "POST",
                body: JSON.stringify({name: name}),
            })
            .then((response) => response.json())
            .then((jsonResponse) => {
                playlistId = jsonResponse.id;
                return fetch (`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: header,
                    method: "POST",
                    body: JSON.stringify({uris: trackUris}),
                })
            });
        });
    },
};

export default Spotify;