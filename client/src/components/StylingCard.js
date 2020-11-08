import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 700,
    marginTop: "2em"
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

const StylingCard = props => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        ></Typography>
        <Typography variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary"></Typography>
        <Typography variant="body2" component="p">
          <div
            style={{
              backgroundColor: props.free_bikes > 0 ? "#81C784" : "#E57373" //sets green color if there are any available bikes. red if not
            }}
          >
            Number of free bikes: {props.free_bikes}
          </div>
          <br />
          <div
            style={{
              backgroundColor: props.free_docks > 0 ? "#81C784" : "#E57373" //Sets green color if there are any available docks. red if not
            }}
          >
            Number of free docks : {props.free_docks}
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
};
export default StylingCard;
