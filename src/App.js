import { useMemo, useState } from "react";
import "./App.css";
import styles from "./Grid.module.css";
import NumberInput from "./NumberInput";

function Grid({ children }) {
  return (
    <>
      <h1>Input Grid</h1>
      <div className={styles.grid}>{children}</div>
    </>
  );
}

function App() {
  const [values, setValues] = useState({ 0: "", 1: "", 2: "" });

  function handleChangeValues(index, value) {
    setValues({ ...values, [index]: isNaN(value) ? value : Number(value) });
  }

  const everyIsNumber = useMemo(
    () => Object.values(values).every((val) => !isNaN(val)),
    [values]
  );

  const sum = useMemo(() => {
    if (!everyIsNumber) return "Error";
    return Object.values(values)
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }, [values, everyIsNumber]);

  return (
    <div className="App">
      <Grid>
        <NumberInput
          onChange={(ev) => handleChangeValues(0, ev.target.value)}
          value={values[0]}
          aria-label="first-input"
        />
        <NumberInput
          onChange={(ev) => handleChangeValues(1, ev.target.value)}
          value={values[1]}
          aria-label="second-input"
        />
        <NumberInput
          onChange={(ev) => handleChangeValues(2, ev.target.value)}
          value={values[2]}
          aria-label="third-input"
        />
        <NumberInput readOnly value={sum} aria-label="results-input" />
      </Grid>
    </div>
  );
}

export default App;
