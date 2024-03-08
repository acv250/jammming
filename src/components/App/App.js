import React, { useState, useEffect } from "react";
import styles from "./App.module.css";

import SearchResults from "../SearchResults/SearchResults";

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
    }]
  );

  return (
    <div>
      <h1>
        Ja<span className={styles.highlight}>mmm</span>ing
      </h1>
      <div className={styles.App}>
        {/* <!-- Add a SearchBar component --> */}
        
        <div className={styles["App-playlist"]}>
          {/* <!-- Add a SearchResults component --> */}
          <SearchResults userSearchResult={searchResults}/>
          {/* <!-- Add a Playlist component --> */}
        </div>
      </div>
    </div>
  );
}

export default App;