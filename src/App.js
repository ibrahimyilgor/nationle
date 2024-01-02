import "./Css/App.css";
import React, { useEffect, useState, useMemo } from "react";

import { Snackbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Alert from "@mui/material/Alert";

import Guess from "./Components/Guess";
import TopArea from "./Components/TopArea";
import MapAndFlag from "./Components/MapAndFlag";
import AutoCompleteAndButton from "./Components/AutoCompleteAndButton";

import countries from "./Data/countries";

import { useAppContext } from "./context/context";
import { getRandomIndex } from "./Functions/random";

document.title = "Nationle";

const useStyles = makeStyles({
  cookieAlert: {
    "& .MuiAlert-message": {
      fontFamily: "Patrick Hand",
    },
  },
});

function App() {
  const classes = useStyles();
  const randomNum = useMemo(
    () => getRandomIndex(countries.ref_country_codes, new Date()),
    []
  );

  const { lang, l } = useAppContext();

  const [showMap, setShowMap] = useState(true);
  const [flagMode, setFlagMode] = useState(false);

  const [endState, setEndState] = useState(0); //0 default, 1 win, 2 lose
  const [guessNum, setGuessNum] = useState(0);
  const [guesses, setGuesses] = useState([{}, {}, {}, {}, {}, {}]);
  const [copyAlert, setCopyAlert] = useState(false);
  const [stats, setStats] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

  useEffect(() => {
    //Remove last 30 day's localGuess
    var date = new Date();
    for (let i = 0; i < 30; i++) {
      date.setDate(date.getDate() - 1);
      localStorage.removeItem(
        date.getDate().toString() +
          "." +
          (date.getMonth() + 1).toString() +
          "." +
          date.getFullYear().toString()
      );
    }

    //Guesses
    let localGuesses = localStorage.getItem(
      new Date().getDate().toString() +
        "." +
        (new Date().getMonth() + 1).toString() +
        "." +
        new Date().getFullYear().toString()
    );
    localGuesses = JSON.parse(localGuesses);
    if (localGuesses) {
      setGuesses(localGuesses.guesses);
      setGuessNum(parseInt(localGuesses.guessNum));
      setEndState(parseInt(localGuesses.endState));
    }

    //ShowMap
    let localShowMap = localStorage.getItem("showMap");
    localShowMap = JSON.parse(localShowMap);
    if (localShowMap === true || localShowMap === false) {
      setShowMap(localShowMap);
    }

    //FlagMode
    let localFlagMode = localStorage.getItem("flagMode");
    localFlagMode = JSON.parse(localFlagMode);
    if (localFlagMode === true || localFlagMode === false) {
      setFlagMode(localFlagMode);
    }

    //Stats
    let localStats = localStorage.getItem("stats");
    localStats = JSON.parse(localStats);
    if (localStats && Array.isArray(localStats[0])) {
      setStats(localStats);
    }
  }, []);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setCopyAlert(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <TopArea
          showMap={showMap}
          randomNum={randomNum}
          flagMode={flagMode}
          setShowMap={setShowMap}
          setFlagMode={setFlagMode}
          stats={stats}
        />
        <MapAndFlag
          showMap={showMap}
          randomNum={randomNum}
          flagMode={flagMode}
        />
        <AutoCompleteAndButton
          endState={endState}
          flagMode={flagMode}
          randomNum={randomNum}
          guesses={guesses}
          setGuessNum={setGuessNum}
          setGuesses={setGuesses}
          guessNum={guessNum}
          stats={stats}
          setEndState={setEndState}
          setCopyAlert={setCopyAlert}
        />
        {guesses.map((val, key) => {
          return (
            <Guess
              code={val?.code}
              name={
                countries.ref_country_codes.find(
                  (obj) => obj.alpha2 === val?.code
                ) &&
                countries.ref_country_codes.find(
                  (obj) => obj.alpha2 === val?.code
                )[lang]
              }
              distance={val?.name2}
              direction={val?.name3}
              value={val?.value}
            />
          );
        })}
        {copyAlert && (
          <Snackbar
            open={copyAlert}
            onClose={handleCloseAlert}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              className={classes.cookieAlert}
              severity="success"
              sx={{ width: "100%" }}
            >
              {l("copy")}
            </Alert>
          </Snackbar>
        )}
      </header>
    </div>
  );
}

export default App;
