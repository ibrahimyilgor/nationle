
import './Css/App.css';
import { Autocomplete, Button, IconButton, ListItem, ListItemText, Popper, Snackbar, TextField } from '@mui/material';

import Guess from './Guess'
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';

import countries from './countries';

import EqualizerIcon from '@mui/icons-material/Equalizer';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CoffeeIcon from '@mui/icons-material/Coffee';

import distance from './Distance';
import bearing from './Degree';
import random from './Random';
import copyAnswer from './Share';

import WinModal from './Modals/WinModal'
import LoseModal from './Modals/LoseModal'
import GiveUpModal from './Modals/GiveUpModal';
import StatsModal from './Modals/StatsModal';
import HowToPlayModal from './Modals/HowToPlayModal';

document.title = "Nationle";

const useStyles = makeStyles(
  {
    cookieAlert: {
      "& .MuiAlert-message": {
        fontFamily: "Patrick Hand",
      }
    },
    autocomplete: {
      "&.MuiOutlinedInput-root": {  
        padding:0
      },
      "& .MuiButtonBase-root.MuiAutocomplete-clearIndicator": {
      color: "#F6EABE"
      },
      "& .MuiButtonBase-root.MuiAutocomplete-popupIndicator": {
        color: "#F6EABE"
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
      "&.MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input":{
        fontFamily: "Patrick Hand",
        width: "50vw",
        height: "auto",
        padding: 0,
      },
    },
    popper: {
      "& .MuiTypography-root":{
        fontFamily: "Patrick Hand"
      },
      "& .MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused": {
        backgroundColor: "#F6EABE",
        color: "#87AAAA", 
        fontFamily: "Patrick Hand",
    },
      "& .MuiAutocomplete-listbox": {
        backgroundColor: "#87AAAA",
        "& li:nth-child(even)": {backgroundColor: "#87AAAA", color: "#F6EABE", fontFamily: "Patrick Hand" },
        "& li:nth-child(odd)": {backgroundColor: "#789395", color: "#F6EABE", fontFamily: "Patrick Hand" }
      }
    },
    button: {
      "&.MuiButton-root":{
        fontFamily: "Patrick Hand",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        width: "100px",
        marginLeft: "10px",
        borderRadius: "25px",
        borderWidth: "5px",
        borderColor: "#F6EABE",
        borderStyle: "solid",
        backgroundColor: "#789395",
        color: "#F6EABE",
        fontSize: "64%"
      },
      '&.MuiButton-root:hover': {
        backgroundColor: '#95aaab',
        borderColor: "#F6EABE",
      },
    },
    namebutton: {
      "&.MuiIconButton-root":{
        fontFamily: "Patrick Hand",
        marginTop: "1.25%",
        height: "80%",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        width: "30%",
        backgroundColor: "#789395",
        color: "#F6EABE",
        borderRadius: "25px",
        borderWidth: "5px",
        borderColor: "#F6EABE",
        borderStyle: "solid",
        fontSize: "80%",
        marginLeft: "1%",
        marginRight: "1%"
      }
    },
    iconbutton: {
      "&.MuiIconButton-root":{
        marginTop: "1.25%",
        height: "80%",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        width: "10%",
        backgroundColor: "#789395",
        color: "#F6EABE",
        borderRadius: "25px",
        borderWidth: "5px",
        borderColor: "#F6EABE",
        borderStyle: "solid",
        fontSize: "80%",
        marginLeft: "1%",
        marginRight: "1%"
      },
      '&.MuiIconButton-root:hover': {
        marginTop: "1.25%",
        height: "80%",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        width: "10%",
        borderRadius: "25px",
        borderWidth: "5px",
        borderColor: "#F6EABE",
        borderStyle: "solid",
        backgroundColor: "#95aaab",
        color: "#F6EABE",
        fontSize: "80%",
        marginLeft: "1%",
        marginRight: "1%"
      },
    },
    
  }
);

function App() {
  const classes = useStyles();

  const randomNum = useMemo(() => Math.round(random()*(countries.ref_country_codes.length-1)), []);
  const datee = useMemo(() => new Date(), []);

  const options = [];
  countries.ref_country_codes.map(country => {
    options.push({label:country.country,value:country});
    return true; //To avoid warning.
  });

  const CustomPopper = function (props) {
    const classes = useStyles();
    return <Popper {...props} className={classes.popper} placement="bottom" />;
  };

  const [endState, setEndState] = useState(0); //0 default, 1 win, 2 lose
  const [guessNum,setGuessNum] = useState(0);
  const [guesses,setGuesses] = useState([{},{},{},{},{},{}]);
  const [guessText, setGuessText] = useState({});
  const [copyAlert, setCopyAlert] = useState(false);
  const [stats, setStats] = useState([0,0,0,0,0,0,0]);

  const [openWinModal, setOpenWinModal] = useState();
  const [openLoseModal, setOpenLoseModal] = useState();
  const [openGiveUpModal, setOpenGiveUpModal] = useState();
  const [openStatsModal, setOpenStatsModal] = useState();
  const [openHowToPlayModal, setOpenHowToPlayModal] = useState();

  const autoCompleteRef = useRef();

  useEffect(() => {
    //Remove last 30 day's localGuess
    var date = new Date();
    for(let i = 0; i < 30 ; i++){
      date.setDate(date.getDate() - 1);
      localStorage.removeItem(date.getDate().toString() + "." +(date.getMonth()+1).toString()  + "." + date.getFullYear().toString());
    }
   
    //Guesses
    let localGuesses = localStorage.getItem(new Date().getDate().toString() + "." +(new Date().getMonth()+1).toString()  + "." + new Date().getFullYear().toString());
    localGuesses = JSON.parse(localGuesses);
    if(localGuesses){
      setGuesses(localGuesses.guesses);
      setGuessNum(parseInt(localGuesses.guessNum));
      setEndState(parseInt(localGuesses.endState));
    }

    //Stats
    let localStats = localStorage.getItem("stats");
    localStats = JSON.parse(localStats);
    if(localStats){
      setStats(localStats);
    }
  }, []); 

  const change = (event,value) =>{
    if (value?.label){
      setGuessText(value);
    }
    else{
      setGuessText({})
    }
  }

  const showAnswer = () =>{
    if(endState === 1){
      setOpenWinModal(true);
    }
    else if(endState === 2){
      setOpenLoseModal(true);
    }
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
        return;
    }

    setCopyAlert(false);
};

  const guessClick = () =>{
    var value;
    var km;
    if(guessNum<6 && guessText?.label !== undefined){
      km = distance(guessText?.value?.latitude,guessText?.value?.longitude,countries.ref_country_codes[randomNum].latitude,countries.ref_country_codes[randomNum].longitude).toFixed(0);
      value = 100*((20000-km)/20000);

      let changeGuess = guesses;
      changeGuess[guessNum] = {
        code: guessText?.value?.alpha2,
        name1:guessText?.value?.country,
        name2: km + " km",
        name3: bearing(guessText?.value?.latitude,guessText?.value?.longitude,countries.ref_country_codes[randomNum].latitude,countries.ref_country_codes[randomNum].longitude).toFixed(2),
        value: value
      }
      setGuesses( changeGuess );
      setGuessNum(guessNum+1);
      localStorage.setItem(datee.getDate().toString() + "." + (datee.getMonth()+1).toString()  + "." + datee.getFullYear().toString(), JSON.stringify({guesses,guessNum:guessNum+1,endState:0}));
      
      //Delete autoComplete text when guess is clicked.
      const ele = autoCompleteRef.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0];
      if (ele) {
        ele.click();
      }
    }  
    if (value === 100 ){
      setOpenWinModal(true);
      setEndState(1);
      localStorage.setItem(datee.getDate().toString() + "." + (datee.getMonth()+1).toString()  + "." + datee.getFullYear().toString(), JSON.stringify({guesses,guessNum:guessNum+1,endState:1}));
      let tempStats = stats;
      tempStats[guessNum+1] += 1
      localStorage.setItem("stats", JSON.stringify(stats));
    }
    if(value !== 100 && guessNum === 5 && guesses[5].code){
      setOpenLoseModal(true);
      setEndState(2);
      localStorage.setItem(datee.getDate().toString() + "." + (datee.getMonth()+1).toString()  + "." + datee.getFullYear().toString(), JSON.stringify({guesses,guessNum:guessNum+1,endState:2}));
      let tempStats = stats;
      tempStats[0] += 1
      localStorage.setItem("stats", JSON.stringify(stats));
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Top">
        <IconButton className={classes.iconbutton}  onClick={() => { setOpenHowToPlayModal(true) }} aria-label="delete">
          <QuestionMarkIcon fontSize="inherit" />
        </IconButton>
        <a style={{"color": "inherit"}} href={`https://twitter.com/ibrahimyilgor`} rel="noreferrer" target="_blank">
          <IconButton className={classes.iconbutton} aria-label="delete">
            <AlternateEmailIcon fontSize="inherit" />
          </IconButton>
        </a>
        <IconButton  className={classes.namebutton} aria-label="delete">
            <p>NATIONLE</p>
          </IconButton>
        <a style={{"color": "inherit"}} href={`https://www.buymeacoffee.com/ibrahimyilgor`} rel="noreferrer" target="_blank">
        <IconButton className={classes.iconbutton} aria-label="delete">
          <CoffeeIcon fontSize="inherit" />
        </IconButton>
        </a>
        <IconButton className={classes.iconbutton}  onClick={() => { setOpenStatsModal(true) }} aria-label="delete">
          <EqualizerIcon fontSize="inherit" />
        </IconButton>
        </div>
        <div className="Image">
          <img 
              alt = "target_country"
              style={{filter: "invert(90%) sepia(23%) saturate(334%) hue-rotate(359deg) brightness(101%) contrast(93%)"}} 
              src={`all/${countries.ref_country_codes[randomNum].alpha2.toLowerCase()}/vector.svg`}
              width="100%" height="auto"/> 
        </div>
        <div className='AutocompleteAndButton'>
            <Autocomplete
              disablePortal
              onChange={change}
              freeSolo={true}
              
              disabled={endState !== 0}
              onKeyPress= {(e) => {
                if (e.key === 'Enter') {
                  guessClick()
                }
              }}
              openOnFocus
              value={guessText?.label}
              id="combo-box-demo"
              options={options}
              className={classes.autocomplete}
              renderOption={(props, option, state) => (
                <ListItem  {...props}>
                  <img
                    height="30vh"
                    width="40vw"
                    src={`svg/${option?.value?.alpha2?.toLowerCase()}.svg`}
                    alt={option?.value?.alpha2?.toLowerCase() || "flag"}/> 
                  <ListItemText sx={{marginLeft: "1vw"}} primary={option?.value?.country} />
                </ListItem>
              )}
              renderInput={(params) => <TextField ref={autoCompleteRef} placeholder='Select A Country' {...params} />}
              PopperComponent={CustomPopper}
            />
            {endState === 0 &&(
            <>
            <Button
              variant="contained"
              className={classes.button}
              onClick={guessClick}>GUESS</Button>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => {setOpenGiveUpModal(true);}}>GIVE UP</Button>
              </>)}
              {endState !== 0 &&(
            <>
            <Button
              variant="contained"
              className={classes.button}
              onClick={ () => copyAnswer(guesses,datee,setCopyAlert)} >SHARE</Button>
            <Button
              variant="contained"
              className={classes.button}
              onClick={showAnswer}>ANSWER</Button>
              </>)}
        </div>
        {guesses.map((val,key) => {
          return<Guess 
            code={val?.code}
            name1={val?.name1}
            name2={val?.name2}
            name3={val?.name3}
            value={val?.value}/>
        })} 
        {copyAlert && (
        <Snackbar open={copyAlert} onClose={handleCloseAlert} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert className={classes.cookieAlert} severity="success" sx={{ width: '100%' }}>
            Your result is copied to clipboard
          </Alert>
        </Snackbar>)}
      </header>
      <HowToPlayModal
        country={countries.ref_country_codes[randomNum]}
        handleClose={() => {setOpenHowToPlayModal(false)}}
        open={openHowToPlayModal}/>
      <StatsModal
        country={countries.ref_country_codes[randomNum]}
        stats={stats}
        handleClose={() => {setOpenStatsModal(false)}}
        open={openStatsModal}/>
      <WinModal
        country={countries.ref_country_codes[randomNum]}
        handleClose={() => {setOpenWinModal(false)}}
        open={openWinModal}
        datee={datee}/>
      <LoseModal 
        country={countries.ref_country_codes[randomNum]}
        handleClose={() => {setOpenLoseModal(false)}}
        open={openLoseModal}
        datee={datee}/>
      <GiveUpModal
        handleClose={() => {setOpenGiveUpModal(false)}}
        handleOpen={() => {setOpenLoseModal(true)}}
        open={openGiveUpModal}
        setEndState={setEndState}
        guesses={guesses}
        stats={stats}
        guessNum={guessNum}/>
    </div>
  );
}

export default App;
