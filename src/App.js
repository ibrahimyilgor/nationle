import random from './Random';
import './App.css';
import countries from './countries';
import { Autocomplete, Button, Snackbar, TextField } from '@mui/material';
import Guess from './Guess'
import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';

import distance from './Distance';
import bearing from './Degree';

import WinModal from './WinModal'
import LoseModal from './LoseModal'
import GiveUpModal from './GiveUpModal';
import useWindowDimensions from './getWindowDimensions';

document.title = "Globle";

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
      },
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
        fontSize: "75%"
      },
      '&.MuiButton-root:hover': {
        backgroundColor: '#95aaab',
        borderColor: "#F6EABE",
      },
    },
  }
);

function App() {
  const classes = useStyles();
  var randomNum = random();
  randomNum = Math.round(randomNum*(countries.ref_country_codes.length-1));

  const options = [];
  countries.ref_country_codes.map(country => {
    options.push({label:country.country,value:country})
  });

  const [endState, setEndState] = useState(0); //0 default, 1 win, 2 lose
  const [guessNum,setGuessNum] = useState(0);
  const [guesses,setGuesses] = useState([{},{},{},{},{},{}]);
  const [guessText, setGuessText] = useState({});
  const [copyAlert, setCopyAlert] = useState(false);
  const [openWinModal, setOpenWinModal] = useState();
  const [openLoseModal, setOpenLoseModal] = useState();
  const [openGiveUpModal, setOpenGiveUpModal] = useState();

  useEffect(() => {
    let localS = localStorage.getItem(new Date().getDate().toString() + "." +(new Date().getMonth()+1).toString()  + "." + new Date().getFullYear().toString());
    //console.log("locals",localS);
    localS = JSON.parse(localS);
    if(localS){
      setGuesses(localS.guesses);
      setGuessNum(parseInt(localS.guessNum));
      setEndState(parseInt(localS.endState));
    }
  }, []); 



  const change = (event,value) =>{
    if (value?.label){
      setGuessText(value);
    }
  }

  const copyAnswer = () =>{
    const date = new Date();
    let result = "X/6";
    for(let i=0;i<6;i++){
      if(guesses[i]?.code === undefined){
        break;
      }
      if (guesses[i].value === 100){
        result = i+1 + "/6";
        break;
      }
    }
    let answer = "#Globle - " + date.getDate() + "." + (date.getMonth()+1) +  "." + date.getFullYear() + " - " + result +"\n";
    const numbers = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"];
    for(let i=0;i<6;i++){
      if(guesses[i]?.code === undefined){
        break;
      }
      else{
        answer += numbers[i+1] +  " - " + (parseInt(guesses[i].name2) + " km                ").slice(0,20-guesses[i].name2.length);
      }
      //console.log("slice",(parseInt(guesses[i].name2,10) + " km            ").slice(0,20-guesses[i].name2.length))
      if(parseInt(guesses[i].name2) === 0){
        answer += "✅";
      }
      else if(parseFloat(360-guesses[i].name3)%360>=22.5 && parseFloat(360-guesses[i].name3)%360 < 67.5){
        answer += "↗️";
      }
      else if(parseFloat(360-guesses[i].name3)%360>=67.5 && parseFloat(360-guesses[i].name3)%360 < 112.5){
        answer += "⬆️";
      }
      else if(parseFloat(360-guesses[i].name3)%360>=112.5 && parseFloat(360-guesses[i].name3)%360 < 157.5){
        answer += "↖️";
      }
      else if(parseFloat(360-guesses[i].name3)%360>=157.5 && parseFloat(360-guesses[i].name3)%360 < 202.5){
        answer += "⬅️";
      }
      else if(parseFloat(360-guesses[i].name3)%360>=202.5 && parseFloat(360-guesses[i].name3)%360 < 247.5){
        answer += "↙️";
      }
      else if(parseFloat(360-guesses[i].name3)%360>=247.5 && parseFloat(360-guesses[i].name3)%360 < 292.5){
        answer += "⬇️";
      }
      else if(parseFloat(360-guesses[i].name3)%360>=292.5 && parseFloat(360-guesses[i].name3)%360 < 337.5){
        answer += "↘️";
      }
      else{
        answer += "➡️";
      }
      answer +=  " %" + parseInt(guesses[i].value) + "\n";
    }
    answer += "https://globle-guess.herokuapp.com";
    navigator.clipboard.writeText(answer);
    setCopyAlert(true);
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
      //console.log("guessnam",guessNum);
      //localStorage.setItem("guessnum", parseInt(guessNum+1));
      localStorage.setItem(new Date().getDate().toString() + "." + (new Date().getMonth()+1).toString()  + "." + new Date().getFullYear().toString(), JSON.stringify({guesses,guessNum:guessNum+1,endState:0}));
      
    }  
    if (value === 100 ){
      setOpenWinModal(true);
      setEndState(1);
      localStorage.setItem(new Date().getDate().toString() + "." + (new Date().getMonth()+1).toString()  + "." + new Date().getFullYear().toString(), JSON.stringify({guesses,guessNum:guessNum+1,endState:1}));
    }
    if(value !== 100 && guessNum === 5){
      setOpenLoseModal(true);
      setEndState(2);
      localStorage.setItem(new Date().getDate().toString() + "." + (new Date().getMonth()+1).toString()  + "." + new Date().getFullYear().toString(), JSON.stringify({guesses,guessNum:guessNum+1,endState:2}));
    }
    setGuessText({});
  }

  /*useEffect(() => {
  }, [guesses]); */

  useEffect(() => {
    //console.log("guessText",guessText,guessText?.label);
    //console.log("guesses",guesses);
  }, [guessText]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="Top">
          <p style={{color:"red"}}>Bu bir test yazısıdır</p>
        </div>
        <div className="Image">
          <img 
              style={{filter: "invert(90%) sepia(23%) saturate(334%) hue-rotate(359deg) brightness(101%) contrast(93%)"}} 
              src={`all/${countries.ref_country_codes[randomNum].alpha2.toLowerCase()}/vector.svg`}
              width="100%" height="auto"/> 
        </div>
        <div className='AutocompleteAndButton'>
            <Autocomplete
              disablePortal
              onChange={change}
              disabled={endState !== 0}
              value={guessText?.label ? guessText?.label : "Select A Country"}
              id="combo-box-demo"
              options={options}
              className={classes.autocomplete}
              renderInput={(params) => <TextField {...params}  />}
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
              onClick={copyAnswer}>SHARE</Button>
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
      <WinModal 
        country={countries.ref_country_codes[randomNum]}
        handleClose={() => {setOpenWinModal(false)}}
        open={openWinModal}/>
      <LoseModal 
        country={countries.ref_country_codes[randomNum]}
        handleClose={() => {setOpenLoseModal(false)}}
        open={openLoseModal}/>
      <GiveUpModal
        handleClose={() => {setOpenGiveUpModal(false)}}
        handleOpen={() => {setOpenLoseModal(true)}}
        open={openGiveUpModal}
        setEndState={setEndState}
        guesses={guesses}
        guessNum={guessNum}/>
    </div>
  );
}

export default App;
