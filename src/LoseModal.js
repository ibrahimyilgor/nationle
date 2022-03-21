import { Box, Button, Modal, Typography } from "@mui/material";

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

const button = {
    position: "absolute",
    right: "5px",
    top: "5px",
    backgroundColor: "#789395",
    borderRadius: "25px",
    borderColor: "#F6EABE",
    borderStyle: "solid",
    color: "#789395",
};

const LoseModal = ({country, handleClose, open}) => {
    return(
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <div style={button}>
                    <Button 
                        onClick={handleClose} sx={{ color: "#F6EABE" }}>Close</Button>
                </div>
                    <Typography sx={{ textAlign:"center" }} id="modal-modal-title" variant="h4" component="h2">
                    Lose
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2, textAlign:"center" }}>
                    {"Unfortunately, you could not find the today's answer"}
                    </Typography>
                    <center>
                        <img
                        width={"50%"}
                        src={`https://flagcdn.com/w2560/${country?.alpha2?.toLowerCase()}.png`}
                        alt={"Country"}/>
                        
                        <Typography id="modal-modal-description" variant="h5" component="h2" sx={{ mt: 2, mb: 2, textAlign:"center" }}>
                        {country.country}
                        </Typography>
                        <a style={{"color": "inherit"}} href={`https://www.google.com/maps/place/${country.country}`} target="_blank">View {country.country} on Google Maps </a>
                    </center>
                </Box>
            </Modal>
        </div>
    )
}

export default LoseModal;