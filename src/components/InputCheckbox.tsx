import * as React from 'react';
import styles from './styles/InputCheckbox.module.css';

type tProps = {
  id: string,
  name: string,
  checkboxListener: any
}

const InputCheckbox = ({id, name, checkboxListener} : tProps) => {
    const [active, setActive] = React.useState(false);

    const toggleHandler = (ev: string) => {
      setActive(!active);
      checkboxListener(ev);
    }

    return (
        <div
        className={active ? [styles.checkboxInputDiv, styles.checkboxInputActive].join(' ') : styles.checkboxInputDiv}
      >
        <label htmlFor={id}><span>{name}</span></label>
        <span className={styles.checkbox}>
          <input
            type={"checkbox"}
            value={id}
            id={id}
            onChange={() => toggleHandler(id)}
          />
        </span>
      </div>
    )
};

export default InputCheckbox;