import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { useAppContext } from './context/context';
import { useCountdown } from './Timer';

const useStyles = makeStyles(
    {
      timeButton: {
        "&.MuiButton-root":{
          fontFamily: "Patrick Hand",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          width: "50vw",
          height: "7vh",
          marginLeft: "10px",
          borderRadius: "25px",
          borderWidth: "5px",
          borderColor: "#F6EABE",
          borderStyle: "solid",
          backgroundColor: "#789395",
          color: "#F6EABE",
          fontSize: "64%"
        },
        '&.MuiButton-root:hover': {
          backgroundColor: '#95aaab',
          borderColor: "#F6EABE",
        },
      },
    }
  );

function TimerComponent() {
    const classes = useStyles();
    const {lang, l} = useAppContext();
    const datee = useMemo(() => new Date(), []);
    const time = useCountdown(datee, lang);
    const dim = useWindowDimensions();
    
    return(
        <Button variant="contained" className={classes.timeButton}>
            {time.length === 1 ? time[0] : (dim.height > dim.width) ? l("nextNationleIn")+ time[1] + ":" + time[2] + ":" + time[3] : l("nextNationleIn")+ time[1] + l("hours")  + time[2] + l("minutes") + time[3] + l("seconds")}
       </Button>
    )
}

export default TimerComponent;