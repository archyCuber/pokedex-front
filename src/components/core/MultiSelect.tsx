import React from "react";
import {
  Chip,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  useTheme,
} from "@material-ui/core";
import styles from "./styles/Multiselect.module.scss";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

const useStyles = makeStyles({
  root: {
    backgroundColor: "#f55f13",
    color: "white",
  },
});

export const MultiSelect = (props: {
  value: string[];
  source: string[];
  onChange: (value: string[]) => void;
}) => {
  const classes = useStyles();
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
          style={{
            background: "#f55f13",
            border: "0",
            borderRadius: "5px",
            color: "white",
            paddingLeft: "5px",
            paddingTop: "5px",
            paddingRight: "25px",
            paddingBottom: "5px",
            marginLeft: "5px",
            position: "absolute",
            top: "-5px",
          }}
          id="demo-mutiple-chip-label"
        >
          Types
        </InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={props.value}
          className={styles.select}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          MenuProps={MenuProps}
          renderValue={(selected) => (
            <div className={styles.chips}>
              {(selected as string[]).map((value) => (
                <Chip
                  classes={{ root: classes.root }}
                  key={value}
                  label={value}
                  className={styles.chip}
                />
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
