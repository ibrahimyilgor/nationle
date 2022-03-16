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

const GiveUpModal = ({ handleOpen,handleClose, open}) => {
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
                    <Text>Are you giving up?</Text>
                    <Button onClick={handleClose}>NO</Button>
                    <Button onClick={()=>{handleClose();handleOpen()}}>YES</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default GiveUpModal;