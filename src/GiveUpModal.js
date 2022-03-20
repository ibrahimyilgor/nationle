import { Box, Button, Modal, Typography } from "@mui/material";

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

const button = {
    width: "25%",
    backgroundColor: "#789395",
    borderRadius: "25px",
    borderColor: "#F6EABE",
    borderStyle: "solid",
    color: "#789395",
    float:"left",
    marginRight: "5%",
};

const GiveUpModal = ({ setEndState, handleOpen, handleClose, open}) => {
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
                        <Typography sx={{ textAlign:"center", mb:2 }} id="modal-modal-title" variant="h6" component="h2">
                    Are you giving up?
                    </Typography>
                        </div>
                        <div style={{ marginLeft: "30%" }}>
                            <div style={button}>
                                <Button sx={{ color: "#F6EABE" }} onClick={handleClose}>NO</Button>
                            </div>
                            <div style={button}>
                                <Button sx={{ color: "#F6EABE" }} onClick={()=>{setEndState(2);localStorage.setItem("state", 2);handleClose();handleOpen();}}>YES</Button>
                            </div>
                        </div>
                    </center>
                </Box>
            </Modal>
        </div>
    )
}

export default GiveUpModal;