import { Box, Button, Modal, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useCountdown } from "./Timer";

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
      button: {
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

const LoseModal = ({country, handleClose, open}) => {
    const time = useCountdown();
    const classes = useStyles();

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
                    <Button className={classes.button} onClick={handleClose} sx={{ color: "#F6EABE" }}>Close</Button>
                </div>
                    <Typography sx={{ fontFamily: "Patrick Hand",textAlign: "center"}} id="modal-modal-title" variant="h4" component="h3">
                    Lose
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ fontFamily: "Patrick Hand",mt: 2, mb: 2, textAlign:"center" }} variant="h6" component="h5">
                    {"Unfortunately, you could not find the today's answer"}
                    </Typography>
                    <center>
                  
                        <img
                        width={"35%"}
                        src={`https://flagcdn.com/w2560/${country?.alpha2?.toLowerCase()}.png`}
                        alt={"Country"}/>
                        
                        <Typography id="modal-modal-description" variant="h5" component="h3" sx={{ fontFamily: "Patrick Hand",mt: 2, mb: 2, textAlign:"center" }}>
                        {country.country}
                        </Typography>
                        <a style={{"color": "inherit"}} href={`https://www.google.com/maps/place/${country.country}`} target="_blank">View {country.country} on Google Maps </a>
                        <Typography sx={{ fontFamily: "Patrick Hand",mt: 2, mb: 2, textAlign:"center" }} variant="h6" component="h5">{"Next Globle in "+ time[1] +" hours " + time[2] +" minutes "+ time[3] + " seconds"}
                        </Typography>
                    </center>
                </Box>
            </Modal>
        </div>
    )
}

export default LoseModal;