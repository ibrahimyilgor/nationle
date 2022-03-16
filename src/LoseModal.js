import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { Text } from 'react-native';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const LoseModal = ({country, handleClose, open}) => {
    return(
        <div>
            <Modal
                height={500}
                width={500}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Button onClick={handleClose}>X</Button>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Lose
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {"Answer: " + country.country}
                    </Typography>
                    <a href={`https://www.google.com/maps/place/${country.country}`}>{country.country} on Google Maps </a>
                </Box>
            </Modal>
        </div>
    )
}

export default LoseModal;