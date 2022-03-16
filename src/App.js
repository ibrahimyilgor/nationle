import random from './Random';
import './App.css';
import countries from './countries';
import { Autocomplete, Button, TextField } from '@mui/material';
import Guess from './Guess'
import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import distance from './Distance';
import bearing from './Degree';

import WinModal from './WinModal'
import LoseModal from './LoseModal'
import GiveUpModal from './GiveUpModal';

document.title = "Globle";

const useStyles = makeStyles(
  {
    autocomplete: {
      "&.MuiAutocomplete-root":{
        width: "50vw",
        borderRadius: "25px",
        borderWidth: "5px",
        borderColor: "#F6EABE",
        borderStyle: "solid",
        backgroundColor: "#789395",
        color: "#F6EABE",
      },
      "& .MuiOutlinedInput-root":{
        width: "50vw",
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
        width: "100px",
        marginLeft: "10px",
        borderRadius: "25px",
        borderWidth: "5px",
        borderColor: "#F6EABE",
        borderStyle: "solid",
        backgroundColor: "#789395",
        color: "#F6EABE",
      }
    },
  }
);

function App() {
  const classes = useStyles();
  var randomNum = random();
  console.log("randomNum",randomNum, Math.round(randomNum*countries.ref_country_codes.length));
  randomNum = Math.round(randomNum*countries.ref_country_codes.length);

  const options = [];
  countries.ref_country_codes.map(country => {
    options.push({label:country.country,value:country})
  });

  const [guessNum,setGuessNum] = useState(0);
  const [guesses,setGuesses] = useState([{},{},{},{},{},{}]);
  const [guessText, setGuessText] = useState({});
  const [openWinModal, setOpenWinModal] = useState();
  const [openLoseModal, setOpenLoseModal] = useState();
  const [openGiveUpModal, setOpenGiveUpModal] = useState();

  const change = (event,value) =>{
    if (value?.label){
      setGuessText(value);
    }
  }

  const guessClick = () =>{
    console.log("clicked");
    
    var value;
    var km;
    if(guessNum<6 && guessText?.label !== undefined){
      km = distance(guessText?.value?.latitude,guessText?.value?.longitude,countries.ref_country_codes[randomNum].latitude,countries.ref_country_codes[randomNum].longitude).toFixed(2);
      value = 100*((20000-km)/20000);

      let changeGuess = guesses;
      changeGuess[guessNum] = {
        code: guessText?.value?.alpha2,
        name1:guessText?.value?.country,
        name2: km + " km",
        name3: bearing(guessText?.value?.latitude,guessText?.value?.longitude,countries.ref_country_codes[randomNum].latitude,countries.ref_country_codes[randomNum].longitude).toFixed(2),
        value: value
      }
      setGuesses( changeGuess )

      setGuessNum(guessNum+1);
    }  
    console.log("kmvelength",value,guesses.length,value === 100);
    if (value === 100 ){
      setOpenWinModal(true);
    }
    if(value !== 100 && guessNum === 5){
      setOpenLoseModal(true);
    }
    setGuessText({});
  }

  useEffect(() => {
    console.log("guesses",guesses);
  }, [guesses]); // <- add the count variable here

  useEffect(() => {
    console.log("guessText",guessText,guessText?.label);
    console.log("guesses",guesses);
  }, [guessText]); // <- add the count variable here

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img 
              style={{filter: "invert(90%) sepia(23%) saturate(334%) hue-rotate(359deg) brightness(101%) contrast(93%)"}} 
              src={`all/${countries.ref_country_codes[randomNum].alpha2.toLowerCase()}/vector.svg`}
              width="300" height="300"/> 
        </div>
        <div className='AutocompleteAndButton'>
            <Autocomplete
              disablePortal
              onChange={change}
              
              value={guessText?.label ? guessText?.label : "Guess The Country"}
              id="combo-box-demo"
              options={options}
              className={classes.autocomplete}
              sx={{ width: 500 }}
              renderInput={(params) => <TextField {...params}  />}
            />
            <Button
              variant="contained"
              className={classes.button}
              onClick={guessClick}>GUESS</Button>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => setOpenGiveUpModal(true)}>GIVE UP</Button>
        </div>
        {guesses.map((val,key) => {
          return<Guess 
            code={val?.code}
            name1={val?.name1}
            name2={val?.name2}
            name3={val?.name3}
            value={val?.value}/>
        })} 
       {/*  <p>
          {countries.ref_country_codes[randomNum].country + " "}
          {countries.ref_country_codes[randomNum].latitude + " "}
          {countries.ref_country_codes[randomNum].longitude + " "}
          {countries.ref_country_codes.length + " "}
          {randomNum}
        </p>
        <a href={`https://maps.google.com/?q=${countries.ref_country_codes[randomNum].latitude},${countries.ref_country_codes[randomNum].longitude}`}>{countries.ref_country_codes[randomNum].country} on Google Maps </a>
      */} </header>
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
        open={openGiveUpModal}/>
    </div>
  );
}

export default App;
