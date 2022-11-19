import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Guess from "../Guess";
import useWindowDimensions from '../getWindowDimensions';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import l from '../Languages/language';

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
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column"
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
    stepper: {
      '&.MuiPaper-root.MuiPaper-elevation': {
        backgroundColor: "#F6EABE",
        borderRadius: "25px",
      },
      '& .MuiMobileStepper-dot.MuiMobileStepper-dotActive': {
        backgroundColor: "#789395",
        color: "#789395"
      },
      '& .MuiButton-root.MuiButton-text.MuiButton-textPrimary': {
        fontFamily: "Patrick Hand",
        color: "#789395"
      }
    },
  }
);

const InfoModal = ({ lang, handleClose, open}) => {
    const classes = useStyles();
    const dim = useWindowDimensions();

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  React.useEffect(() => {
    if(open){
      setActiveStep(0)
    }
  }, [open])

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
                    <Button className={classes.button} onClick={handleClose} sx={{ color: "#F6EABE" }}>{l(lang,"close")}</Button>
                </div>
                <Box sx={{width: "100%", height: "60vh", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                  {activeStep === 0 && (
                    <>
                      <Typography sx={{ fontFamily: "Patrick Hand", textAlign: "center", lineHeight: "1" }} id="modal-modal-title" variant={(dim.height > dim.width) ? "h5" : "h4"} component="h3">
                        {l(lang, "howToPlay")}
                      </Typography>
                      <Typography id="modal-modal-description" sx={[{ fontFamily: "Patrick Hand", textAlign: "center", lineHeight: "1" }, dim.height > dim.width ? { mt: 1, mb: 1 } : { mt: 2, mb: 2 }]} variant={(dim.height > dim.width) ? "h7" : "h6"} component="h4">
                        {l(lang, "guessTheCountry")}
                      </Typography>
                      <Guess
                        fullWidth={true}
                        code={"az"}
                        name1={l(lang, "azerbaijan")}
                        name2="1162 km"
                        name3={170}
                        value={94} />
                      <Typography sx={[{ fontFamily: "Patrick Hand", textAlign: "center", lineHeight: "1" }, dim.height > dim.width ? { mt: 1, mb: 1 } : { mt: 2, mb: 2 }]} id="modal-modal-title" variant={(dim.height > dim.width) ? "h7" : "h6"} component="h4">
                        {l(lang, "theTarget")}
                      </Typography>
                      <Guess
                        fullWidth={true}
                        code={"tr"}
                        name1={l(lang, "turkey")}
                        name2="0 km"
                        name3={0}
                        value={100} />
                      <Typography sx={[{ fontFamily: "Patrick Hand", textAlign: "center", lineHeight: "1" }, dim.height > dim.width ? { mt: 1, mb: 1 } : { mt: 2, mb: 2 }]} id="modal-modal-title" variant={(dim.height > dim.width) ? "h7" : "h6"} component="h4">
                        {l(lang, "nextGuess")}
                      </Typography>
                    </>
                  )}

                  {activeStep === 1 && (
                    <>
                      <Typography sx={[{ fontFamily: "Patrick Hand", textAlign: "center", lineHeight: "1" }, dim.height > dim.width ? { mt: 1, mb: 1 } : { mt: 2, mb: 2 }]} id="modal-modal-title" variant={(dim.height > dim.width) ? "h7" : "h6"} component="h4">
                        {l(lang, "heavilyInspired")}
                        <a style={{ "color": "inherit" }} href={`https://www.nytimes.com/games/wordle/index.html`} rel="noreferrer" target="_blank">Wordle</a>
                        {l(lang, "createdBy")}
                        <a style={{ "color": "inherit" }} href={`https://twitter.com/powerlanguish`} rel="noreferrer" target="_blank">@powerlanguish</a>
                        {l(lang, "and")}
                        <a style={{ "color": "inherit" }} href={`https://worldle.teuteuf.fr/`} rel="noreferrer" target="_blank">Worldle</a>
                        {l(lang, "createdBy")}
                        <a style={{ "color": "inherit" }} href={`https://twitter.com/teuteuf`} rel="noreferrer" target="_blank">@teuteuf </a>
                      </Typography>
                      <Typography sx={[{ fontFamily: "Patrick Hand", textAlign: "center", lineHeight: "1" }, dim.height > dim.width ? { mt: 1, mb: 1 } : { mt: 2, mb: 2 }]} id="modal-modal-title" variant={(dim.height > dim.width) ? "h7" : "h6"} component="h4">
                        {l(lang, "creator")}
                        <a style={{ "color": "inherit" }} href={`https://twitter.com/ibrahimyilgor`} rel="noreferrer" target="_blank">@ibrahimyilgor</a>
                        {l(lang, "youCanReach")}
                        <a style={{ "color": "inherit" }} href={`https://github.com/ibrahimyilgor/nationle`} rel="noreferrer" target="_blank">{l(lang, "sourceCode")}</a>
                        {l(lang, "support")}
                        <a style={{ "color": "inherit" }} href={`https://www.buymeacoffee.com/nationle`} rel="noreferrer" target="_blank">{l(lang, "coffee")}</a>
                      </Typography>
                    </>
                  )}
                  </Box>
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: "5vh"}}>
                      <MobileStepper
                        className={classes.stepper}
                        variant="dots"
                        steps={2}
                        position="static"
                        activeStep={activeStep}
                        sx={{ width: "90%", position: "absolute", bottom: 0}}
                        nextButton={
                          <Button size="small" onClick={handleNext} disabled={activeStep === 1}>
                            {l(lang,"next")}
                            {theme.direction === 'rtl' ? (
                              <KeyboardArrowLeft />
                            ) : (
                              <KeyboardArrowRight />
                            )}
                          </Button>
                        }
                        backButton={
                          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                              <KeyboardArrowRight />
                            ) : (
                              <KeyboardArrowLeft />
                            )}
                            {l(lang,"back")}
                          </Button>
                        }
                      />
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default InfoModal;