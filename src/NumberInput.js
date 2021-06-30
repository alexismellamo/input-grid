import { useEffect, useMemo, useState } from "react";
import cx from "classnames";
import styles from "./Grid.module.css";

function numberToTwoDecimals(num) {
  const formattedNumber = num.toFixed(2).substring(0, 4);
  const hasDecimals =
    formattedNumber.includes(".") && formattedNumber.slice(-1) !== ".";
  return num.toFixed(2).substring(0, hasDecimals ? 4 : 3);
}

export function formatValue(num) {
  if (String(num).length > 9) {
    return `${numberToTwoDecimals(num / 1000000000)}B`;
  } else if (String(num).length > 6) {
    return `${numberToTwoDecimals(num / 1000000)}M`;
  } else if (String(num).length > 3) {
    return `${numberToTwoDecimals(num / 1000)}K`;
  }
  return num;
}

const emptyFunction = () => {};

export default function NumberInput({
  value: _value,
  onChange: _onChange = emptyFunction,
  onFocus = emptyFunction,
  onBlur = emptyFunction,
  ...props
}) {
  const [value, setValue] = useState(_value);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setValue(_value);
  }, [_value]);

  function handleOnChange(ev) {
    const newValue = ev.target.value;
    if (isNaN(newValue)) {
      setError(true);
    } else {
      setError(false);
    }
    setValue(newValue);
    _onChange(ev);
  }

  function handleFocus(ev) {
    setIsEditing(true);
    onFocus(ev);
  }

  function handleBlur(ev) {
    setIsEditing(false);
    onBlur(ev);
  }

  const realValue = useMemo(() => formatValue(value), [value]);

  return (
    <input
      type={isEditing ? "number" : "text"}
      className={cx(styles.input, error && styles["input-error"])}
      pattern="[0-9]*" // This will open numeric keyboard on phones
      aria-label="number-input"
      {...props}
      value={isEditing ? value : realValue}
      onChange={handleOnChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
