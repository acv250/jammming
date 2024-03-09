import React from "react";
import styles from "./Track.module.css";

function Track (props) {

  const renderAction = () => {
    //ternary operator to display button whether to add or remove track
    if(props.isRemoval) {
      return (
        <button className={styles["Track-action"]} onClick={passTrackToRemove}>
          -
        </button>
      );
    } else {
      return (
        <button className={styles["Track-action"]} onClick={passTrack}>
          +
        </button>
      );
    }
    
  }

  const passTrack = () => {
    props.onAdd(props.track);
  }

  const passTrackToRemove = () => {
    props.onRemove(props.track);
  }

  return (
    <div className={styles.Track}>
      <div className={styles["Track-information"]}>
        {/* <h3><!-- track name will go here --></h3> */}
        <h3>{props.track.name}</h3>
        {/* <p><!-- track artist will go here--> | <!-- track album will go here --></p> */}
        <p>{props.track.artist} | {props.track.album}</p>
      </div>
      {/* <button class="Track-action"><!-- + or - will go here --></button> */}
      {renderAction()}
    </div>
  );
}

export default Track;