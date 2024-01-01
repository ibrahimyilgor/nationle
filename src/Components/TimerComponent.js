import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { useAppContext } from "../context/context";
import { useCountdown } from "../Timer";
import { colors } from "../Constants";

const useStyles = makeStyles({
  timeButton: {
    "&.MuiButton-root": {
      fontFamily: "Patrick Hand",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      width: "50vw",
      height: "7vh",
      marginLeft: "10px",
      borderRadius: "25px",
      borderWidth: "5px",
      borderColor: colors.yellow,
      borderStyle: "solid",
      backgroundColor: colors.blue,
      color: colors.yellow,
      fontSize: "64%",
    },
    "&.MuiButton-root:hover": {
      backgroundColor: "#95aaab",
      borderColor: colors.yellow,
    },
  },
});

function TimerComponent() {
  const classes = useStyles();
  const { lang, l } = useAppContext();
  const datee = useMemo(() => new Date(), []);
  const time = useCountdown(datee, lang);
  const dim = useWindowDimensions();

  return (
    <Button variant="contained" className={classes.timeButton}>
      {time.length === 1
        ? time[0]
        : dim.height > dim.width
        ? l("nextNationleIn") + time[1] + ":" + time[2] + ":" + time[3]
        : l("nextNationleIn") +
          time[1] +
          l("hours") +
          time[2] +
          l("minutes") +
          time[3] +
          l("seconds")}
    </Button>
  );
}

export default TimerComponent;
