import React, { useState, useEffect } from "react";
import styles from "./App.module.css";

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify/Spotify";

function App () {

  //dont have the Spotify API imported yet, so temporary hard coded objects to pass down for now
  const [searchResults, setSearchResults] = useState([
    {
      name: "Example Name 1",
      artist: "Example Artist 1",
      album: "Example Album 1",
      id: 1,
    }, 
    {
      name: "Example Name 2",
      artist: "Example Artist 2",
      album: "Example Album 2",
      id: 2,
    },
    {
      name: "Example Name 3",
      artist: "Example Artist 3",
      album: "Example Album 3",
      id: 3,
    },
  ]);
  const [playlistName, setplaylistName] = useState("Example Playlist Name");
  const [playlistTracks, setplaylistTracks] = useState([
    {
      name: "Example Playlist Name 1",
      artist: "Example Playlist Artist 1",
      album: "Example Playlist Album 1",
      id: 1,
    }, 
    {
      name: "Example Playlist Name 2",
      artist: "Example Playlist Artist 2",
      album: "Example Playlist Album 2",
      id: 2,
    },
    {
      name: "Example Playlist Name 3",
      artist: "Example Playlist Artist 3",
      album: "Example Playlist Album 3",
      id: 3,
    },
  ]);

  const addTrack = (track) => {
    const existingTrack = playlistTracks.find(t => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if(existingTrack) {
      console.log("Track already exists");
    } else {
      setplaylistTracks(newTrack);
    }
  }

  const removeTrack = (track) => {
    const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
    setplaylistTracks(existingTrack);
  }

  const updatePlaylistName = (name) => {
    setplaylistName(name);
  }

  const savePlaylist = () => {
    const trackURI = playlistTracks.map((t) => t.uri);
  }

  const search = (term) => {
    Spotify.search(term).then(result => setSearchResults(result));
    console.log(term);
  }

  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch={search}/>
        <div className={styles["App-playlist"]}>
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults 
            userSearchResults={searchResults}
            onAdd={addTrack}
          />
          {/* <!-- Add a Playlist component --> */}
          <Playlist 
            playlistName={playlistName} 
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={updatePlaylistName}
          />
        </div>
      </div>
    </div>
  );
}

export default App;