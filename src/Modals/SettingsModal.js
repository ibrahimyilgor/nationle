import { Box, Button, Grid, InputLabel, MenuItem, Modal, Popper, Select, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useWindowDimensions from '../getWindowDimensions';
import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';

import '../Css/Settings.css';

import l from '../Languages/language';

import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

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

const gridStyle = {
  marginTop: "3vh",
  display: "grid",
  alignItems: "center",
  flexDirection: "row",
  textAlign: "center", 
  justifyContent: "center"
}

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
      select: {
        "&.MuiOutlinedInput-root": {  
          padding:0
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none"
        },
        "& .MuiOutlinedInput-root":{
          fontFamily: "Patrick Hand",
          width: "50vw",
          height: "7vh",
          borderRadius: "18px",
          borderWidth: "5px",
          borderColor: "#F6EABE",
          borderStyle: "solid",
          backgroundColor: "#789395",
          color: "#F6EABE",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        },
        "& .MuiSvgIcon-root":{
          color: "#F6EABE",
        },
      },
      menuItem: {
        "&.MuiMenuItem-root": {
          backgroundColor: "#87AAAA",
          color: "#F6EABE", 
          fontFamily: "Patrick Hand",
        },
        "&.MuiMenuItem-root:hover": {
          backgroundColor: "#F6EABE",
          color: "#87AAAA", 
          fontFamily: "Patrick Hand",
        },
        "&.MuiMenuItem-root.Mui-selected": {
          backgroundColor: "#F6EABE",
          color: "#87AAAA", 
          fontFamily: "Patrick Hand",
        },
        "&.MuiMenuItem-root.Mui-selected:hover": {
          backgroundColor: "#F6EABE",
          color: "#87AAAA", 
          fontFamily: "Patrick Hand",
        },
      },
    }
  );

  export const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: "#F6EABE",
      '&:hover': {
        backgroundColor: alpha("#F6EABE", theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: "#F6EABE",
    },
    '& .MuiSwitch-switchBase' : {
      color: "#F6EABE",
    },
    '& .MuiSwitch-switchBase.Mui-disabled' : {
      color: "#F6EABE",
    },
    '& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track' : {
      opacity: "0.4"
    }
  }));

const SettingsModal = ({ handleClose, open, lang, setLang, showMap, setShowMap, flagMode, setFlagMode}) => {
  const dim = useWindowDimensions();
  const classes = useStyles();
  const [openSelect, setOpenSelect] = useState(false);

  const handleChange = (event) => {
    setLang(event.target.value);
    localStorage.setItem("lang", JSON.stringify(event.target.value));
  };

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpen = () => {
    setOpenSelect(true);
  };

  const handleChangeShowMap = (event) => {
    setShowMap(event.target.checked);
    localStorage.setItem("showMap", JSON.stringify(event.target.checked));
  };

  const handleChangeFlagMode = (event) => {
    setFlagMode(event.target.checked);
    localStorage.setItem("flagMode", JSON.stringify(event.target.checked));

/*     if(event.target.checked === true) {
      setShowMap(false);
      localStorage.setItem("showMap", JSON.stringify(false));
    } */
  };

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
                  <Typography sx={{fontFamily: "Patrick Hand", textAlign:"center" }} id="modal-modal-title" variant={(dim.height > dim.width) ? "h5" : "h4"} component="h3">
                  {l(lang,"settings")}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} style={gridStyle}>
                    <Typography sx={{fontFamily: "Patrick Hand", textAlign:"center", justifyContent: "center"}} id="modal-modal-title" variant={(dim.height > dim.width) ? "h7" : "h6"} component="h4">
                      {l(lang,"language")}
                    </Typography>
                    </Grid>
                    <Grid item xs={6} style={gridStyle}>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        className={classes.select}
                        color="primary"
                        sx={
                          {fontFamily: "Patrick Hand",
                          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          backgroundColor: "#789395",
                          color: "#F6EABE",
                          borderRadius: "25px",
                          borderWidth: "5px",
                          borderColor: "#F6EABE",
                          borderStyle: "solid",
                          fontSize: "80%"}
                        }
                        open={openSelect}
                        onClose={handleCloseSelect}
                        onOpen={handleOpen}
                        value={lang}
                        label="Language"
                        onChange={handleChange}
                      >
                        <MenuItem className={classes.menuItem} value={"en"}>{l(lang,"english")}</MenuItem>
                        <MenuItem className={classes.menuItem} value={"tr"}>{l(lang,"turkish")}</MenuItem>
                      
                        {/* <MenuItem className={classes.menuItem} value={"ja"}>{l(lang,"japanese")}</MenuItem> */}
                      </Select>
                    </Grid>
                    <Grid item xs={6} style={gridStyle} alignItems="center" justify="center">
                      <Typography sx={{fontFamily: "Patrick Hand", textAlign:"center", justifyContent: "center"}} id="modal-modal-title" variant={(dim.height > dim.width) ? "h7" : "h6"} component="h4">
                        {l(lang,"showMap")}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} style={gridStyle} alignItems="center" justify="center">
                      <GreenSwitch 
                        checked={showMap}
                        onChange={handleChangeShowMap}
                        /* disabled={flagMode} */
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Grid>

                    <Grid item xs={6} style={gridStyle} alignItems="center" justify="center">
                      <Typography sx={{fontFamily: "Patrick Hand", textAlign:"center", justifyContent: "center"}} id="modal-modal-title" variant={(dim.height > dim.width) ? "h7" : "h6"} component="h4">
                        {l(lang,"flagMode")}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} style={gridStyle} alignItems="center" justify="center">
                      <GreenSwitch 
                        checked={flagMode}
                        onChange={handleChangeFlagMode}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </Grid>
                  </Grid>
                  
              </Box>
          </Modal>
      </div>
  )
};

export default SettingsModal;