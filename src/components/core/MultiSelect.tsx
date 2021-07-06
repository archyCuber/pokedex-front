import React from "react";
import {
  Chip,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Theme,
  useTheme,
} from "@material-ui/core";
import styles from "./styles/Multiselect.module.scss";

export const MultiSelect = (props: {
  value: string[];
  source: string[];
  onChange: (value: string[]) => void;
}) => {
  const theme = useTheme();
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.onChange(event.target.value as string[]);
  };

  function getStyles(name: string, personName: string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  return (
    <div className={styles.root}>
      <FormControl
        className={styles["MuiFormControl-root"]}
        style={{ minWidth: "80px" }}
      >
        <InputLabel
          style={{ color: "#ffffff", marginLeft: "5px" }}
          id="demo-mutiple-chip-label"
          className={styles.text}
        >
          Types
        </InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={props.value}
          style={{ background: "#f55f13", border: "0", borderRadius: "10px" }}
          className={styles.select}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={styles.chips}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} className={styles.chip} />
              ))}
            </div>
          )}
        >
          {props.source.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, props.value, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
