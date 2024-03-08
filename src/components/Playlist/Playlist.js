import React from "react";
import styles from "./Playlist.module.css";

import Tracklist from "../Tracklist/Tracklist";

function Playlist(props) {

  const handleNamechange = (event) => {
    props.onNameChange(event.target.value);
  }

  return (
    <div className={styles.Playlist}>
      <input defaultValue={"New Playlist"} onChange={handleNamechange} />
      {/* <!-- Add a TrackList component --> */}
      <Tracklist 
        userSearchResults={props.playlistTracks}
        onRemove={props.onRemove}
        isRemoval={true}
      />
      <button className={styles["Playlist-save"]} onClick={props.onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;