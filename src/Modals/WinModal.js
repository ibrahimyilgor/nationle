import { Alert, Box, Button, Modal, Snackbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useCountdown } from "../Timer";

import copyAnswer from '../Share'; 
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    bgcolor: 'background.paper',
    border: '2px solid #F6EABE',
    boxShadow: 24,
    backgroundColor: "#789395",
    borderRadius: "25px",
    p: 4,
    color: "#F6EABE",
};

const useStyles = makeStyles(
  {
    buttonLeft: {
      "&.MuiButton-root":{
        fontFamily: "Patrick Hand",
        float: "left",
        borderRadius: "25px",
        borderWidth: "5px",
        borderColor: "#F6EABE",
        borderStyle: "solid",
        backgroundColor: "#789395",
        color: "#F6EABE",
        fontSize: "100%",
        minWidth: "10%",
        height: "5vh"
      },
      '&.MuiButton-root:hover': {
        backgroundColor: '#95aaab',
        borderColor: "#F6EABE",
      },
    },
      buttonRight: {
        "&.MuiButton-root":{
          fontFamily: "Patrick Hand",
          float: "right",
          borderRadius: "25px",
          borderWidth: "5px",
          borderColor: "#F6EABE",
          borderStyle: "solid",
          backgroundColor: "#789395",
          color: "#F6EABE",
          fontSize: "100%",
          minWidth: "10%",
          height: "5vh"
        },
        '&.MuiButton-root:hover': {
          backgroundColor: '#95aaab',
          borderColor: "#F6EABE",
        },
    },
  }
);

const WinModal = ({ country, handleClose, open, randomNum, datee, guesses}) => {
    const time = useCountdown(datee);
    const classes = useStyles();

    const [copyAlert, setCopyAlert] = useState(false);
    const handleCloseAlert = (event, reason) => {
      if (reason === "clickaway") {
          return;
      }
  
      setCopyAlert(false);
  };

    return(
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <div style={{width: "100%", height: "5vh"}}>
                    <Button className={classes.buttonRight} onClick={handleClose} sx={{ color: "#FFBED8", marginLeft: "1vw" }}>close</Button>
                    <Button className={classes.buttonLeft} onClick={ () => copyAnswer(guesses,datee,setCopyAlert)} sx={{ color: "#FFBED8"}}>share</Button>
                </div>
                    <Typography sx={{fontFamily: "Patrick Hand", textAlign:"center" }} id="modal-modal-title" variant="h4" component="h3">
                    Win
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ fontFamily: "Patrick Hand", mt: 2, mb: 2, textAlign:"center" }} variant="h6" component="h5">
                    Congratulations, you have found the today's answer
                    </Typography>
                    <center>
                        
                        <img
                        width={"35%"}
                        src={`svg/${country?.alpha2?.toLowerCase()}.svg`}
                        alt={country?.alpha2?.toLowerCase() || "flag"}/>
                        
                        <Typography id="modal-modal-description" variant="h5" component="h3" sx={{ fontFamily: "Patrick Hand", mt: 2, mb: 2, textAlign:"center" }}>
                        {country.country}
                        </Typography>
                        <a style={{"color": "inherit"}} href={`https://www.google.com/maps/place/${country.country}`} rel="noreferrer" target="_blank">View {country.country} on Google Maps </a>
                        <Typography variant="h6" component="h5" sx={{ fontFamily: "Patrick Hand", mt: 2, mb: 2, textAlign:"center" }}>{time.length === 1 ? time[0] : "Next Nationle in "+ time[1] +" hours " + time[2] +" minutes "+ time[3] + " seconds"}
                        </Typography>
                    </center>
                    {copyAlert && (
                      <Snackbar open={copyAlert} onClose={handleCloseAlert} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                        <Alert className={classes.cookieAlert} severity="success" sx={{ width: '100%' }}>
                          Your result is copied to clipboard
                        </Alert>
                      </Snackbar>)}
                </Box>
            </Modal>
        </div>
    )
}

export default WinModal;