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
          minWidth: "15%",
        },
        '&.MuiButton-root:hover': {
          backgroundColor: '#95aaab',
          borderColor: "#F6EABE",
        },
      },
    }
  );

const InfoModal = ({ country, handleClose, open}) => {
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
                <div>
                    <Button className={classes.button} onClick={handleClose} sx={{ color: "#F6EABE" }}>Close</Button>
                </div>
                    <Typography sx={{fontFamily: "Patrick Hand", textAlign:"center" }} id="modal-modal-title" variant="h3" component="h2">
                    Info
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ fontFamily: "Patrick Hand", mt: 2, mb: 2, textAlign:"center" }} variant="h5" component="h4">
                    Coming Soon
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default InfoModal;