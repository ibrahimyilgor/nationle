import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Guess from "../Guess";
import useWindowDimensions from '../getWindowDimensions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: "90%",
  minHeight: "50%",
  width: "80%",
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
    divider: {
      '&.MuiDivider-root': {
        '&::before': {
            borderTop: `thin solid #F6EABE`
        } ,
        '&::after': {
          borderTop: `thin solid #F6EABE`
        } 
      }
    },
  }
);

const InfoModal = ({ country, handleClose, open}) => {
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
                <div style={{width: "100%", height: "5vh"}}>
                    <Button className={classes.button} onClick={handleClose} sx={{ color: "#F6EABE" }}>Close</Button>
                </div>
                    <Typography sx={{fontFamily: "Patrick Hand", textAlign:"center", lineHeight: "1" }} id="modal-modal-title" variant={(dim.height > dim.width) ? "h5" : "h4"} component="h3">
                    How To Play
                    </Typography>
                    <Typography id="modal-modal-description" sx={[{ fontFamily: "Patrick Hand", textAlign:"center" , lineHeight: "1" },dim.height > dim.width ? {mt: 1, mb: 1}: {mt: 2, mb: 2}]} variant={(dim.height > dim.width) ? "h7" : "h6"} component="h4">
                    Guess the country of the day in 6 guesses. After each guess, you will have the distance, the direction and the proximity from your guess and the target country.
                    </Typography>
                    <Divider className={classes.divider} sx={{fontFamily: "Patrick Hand"}}>Example</Divider>
                    <Guess 
                      fullWidth={true}
                      code={"az"}
                      name1="Azerbaijan"
                      name2="1162 km"
                      name3={170}
                      value={94}/>
                    <Typography sx={[{fontFamily: "Patrick Hand", textAlign:"center", lineHeight: "1"  },dim.height > dim.width ? {mt: 1, mb: 1}: {mt: 2, mb: 2}]} id="modal-modal-title" variant={(dim.height > dim.width) ? "h7" : "h6"} component="h4">
                    The target country is 1162 km away from Azerbaijan, in the west and the proximity is 94%
                    </Typography>
                    <Guess 
                      fullWidth={true}
                      code={"tr"}
                      name1="Turkey"
                      name2="0 km"
                      name3={0}
                      value={100}/>
                    <Typography sx={[{fontFamily: "Patrick Hand", textAlign:"center", lineHeight: "1"  },dim.height > dim.width ? {mt: 1, mb: 1}: {mt: 2, mb: 2}]} id="modal-modal-title" variant={(dim.height > dim.width) ? "h7" : "h6"} component="h4">
                    Next guess, Turkey, it's the country to guess! Congrats!
                    </Typography>
                    <Divider className={classes.divider} sx={{fontFamily: "Patrick Hand", marginTop: "1%"}}>Inspired By</Divider>
                    <Typography sx={[{fontFamily: "Patrick Hand", textAlign:"center", lineHeight: "1"  },dim.height > dim.width ? {mt: 1, mb: 1}: {mt: 2, mb: 2}]} id="modal-modal-title" variant={(dim.height > dim.width) ? "h7" : "h6"} component="h4">
                    {"Nationle has been heavily inspired by: "}
                    <a style={{"color": "inherit"}} href={`https://www.nytimes.com/games/wordle/index.html`} rel="noreferrer" target="_blank">Wordle</a>   
                    {" created by "}
                    <a style={{"color": "inherit"}} href={`https://twitter.com/powerlanguish`} rel="noreferrer" target="_blank">@powerlanguish</a>   
                    {" and "}
                    <a style={{"color": "inherit"}} href={`https://worldle.teuteuf.fr/`} rel="noreferrer" target="_blank">Worldle</a>   
                    {" created by "}
                    <a style={{"color": "inherit"}} href={`https://twitter.com/teuteuf`} rel="noreferrer" target="_blank">@teuteuf </a>
                    </Typography>
                    <Divider className={classes.divider} sx={{fontFamily: "Patrick Hand", marginTop: "1%"}}>Made By</Divider>
                    <Typography sx={[{fontFamily: "Patrick Hand", textAlign:"center", lineHeight: "1"  },dim.height > dim.width ? {mt: 1, mb: 1}: {mt: 2, mb: 2}]} id="modal-modal-title" variant={(dim.height > dim.width) ? "h7" : "h6"} component="h4">
                    {"Nationle is made by "}
                    <a style={{"color": "inherit"}} href={`https://twitter.com/Ramazantasa`} rel="noreferrer" target="_blank">@Ramazantasa</a>
                 
                   
                    {". You can reach the "}
                    <a style={{"color": "inherit"}} href={`https://github.com/ibrahimyilgor/nationle`} rel="noreferrer" target="_blank">source code.</a> 
                  
                    {" If you want to support, you can buy me a "}
                     <a style={{"color": "inherit"}} href={`https://www.buymeacoffee.com/ibrahimyilgor`} rel="noreferrer" target="_blank">coffee. </a> 
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default InfoModal;