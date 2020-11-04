import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const OutlinedCard = props => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <h2>{props.name}</h2>
      <h3>Antall ledige sykler: {props.free_bikes}</h3>
      <h3>Antall ledige plasser: {props.free_docks}</h3>
    </Card>
  );
};
export default OutlinedCard;
