import { Box, Button, Modal, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { minWidth } from "@mui/system";
import useWindowDimensions from './getWindowDimensions';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "30%",
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
          borderRadius: "25px",
          borderWidth: "5px",
          borderColor: "#F6EABE",
          borderStyle: "solid",
          backgroundColor: "#789395",
          color: "#F6EABE",
          fontSize: "70%",
          minWidth: "20%"
        },
        '&.MuiButton-root:hover': {
          backgroundColor: '#95aaab',
          borderColor: "#F6EABE",
        },
      },
    }
  );

const GiveUpModal = ({ guesses, guessNum, setEndState, handleOpen, handleClose, open}) => {
    const classes = useStyles();
    const dim = useWindowDimensions();

    return(
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <center>
                        <div>
                        <Typography sx={{ fontFamily: "Patrick Hand", textAlign:"center", mb:2 }} id="modal-modal-title" variant="h6" component="h2">
                    Are you giving up?
                    </Typography>
                        </div>
                        <div style={{ flexDirection: "column" }}>
                            <Button className={classes.button} sx={{ color: "#F6EABE", marginRight: "2%" }} onClick={handleClose}>NO</Button>
                            <Button className={classes.button} sx={{ color: "#F6EABE", marginLeft: "2%" }} onClick={()=>{setEndState(2);localStorage.setItem(new Date().getDate().toString() + "." + (new Date().getMonth()+1).toString()  + "." + new Date().getFullYear().toString(), JSON.stringify({guesses,guessNum,endState:2}));handleClose();handleOpen();}}>YES</Button>
                        </div>
                    </center>
                </Box>
            </Modal>
        </div>
    )
}

export default GiveUpModal;