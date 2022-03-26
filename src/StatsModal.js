import { Box, Button, Modal, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {useCountdown} from "./Timer";

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

const StatsModal = ({ stats, country, handleClose, open}) => {
   
    const classes = useStyles();
    const max = Math.max.apply(Math,stats);
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
                    <Typography sx={{fontFamily: "Patrick Hand", textAlign:"center" }} id="modal-modal-title" variant="h4" component="h3">
                    Stats
                    </Typography>
                  {/*   {stats.map((val,key) => {
                      return <Typography id="modal-modal-description" sx={{ fontFamily: "Patrick Hand", mt: 2, mb: 2, textAlign:"center" }} variant="h6" component="h5">
                        {(key === 0 ? "Unsuccessful" : key) + ": " + val}   
                      </Typography>
                    })}  */}
                      {stats.map((val,key) => {
                        console.log(val,max, stats);
                      return (
                      <div style={{display: "flex", marginBottom: "2vh"}}>
                        <Typography id="modal-modal-description" sx={{ width: "2vw", fontFamily: "Patrick Hand", mr: 1, textAlign: "center"}} variant="h6" component="h5">
                        {key === 0 ? "X:" : key + ":"}
                        </Typography>
                        <div style={{ marginLeft: "1vw", height: "4vh", width: `${(val/max)*70+1}%`, backgroundColor: "#F6EABE" }}></div>
                        <Typography style={{ height: "4vh", fontFamily: "Patrick Hand", marginLeft: "0.5vw",  justifyContent: "center", alignItems: "center", display: "flex"}}>{val}</Typography>
                      </div>)
                    })}  
                </Box>
            </Modal>
        </div>
    )
}

export default StatsModal;