import * as React from "react";
import styles from "./styles/SourceSelection.module.css";

type TParams = {
    length: number;
    name: string;
    event: (ev: any) => void;
}

const SourceSelection = ({event, length, name} : TParams) => {
    const options = [];
    return (
    <ul className={styles.activeList}>
      <li onClick={event}>{name}</li>
    </ul>
  );
};

export default SourceSelection;
