import "../Css/App.css";
import React, { useMemo, useRef, useState } from "react";
import {
  Autocomplete,
  Button,
  ListItem,
  ListItemText,
  Popper,
  TextField,
} from "@mui/material";
import { useAppContext } from "../context/context";
import { copyAnswer } from "../Functions/copyAnswer";
import countries from "../countries";
import { makeStyles } from "@mui/styles";
import bearing from "../Functions/bearing";
import { colors, continentIndex } from "../Constants";
import { distance } from "../Functions/distance";

import WinModal from "../Modals/WinModal";
import LoseModal from "../Modals/LoseModal";
import GiveUpModal from "../Modals/GiveUpModal";
import TimerComponent from "./TimerComponent";

const useStyles = makeStyles({
  cookieAlert: {
    "& .MuiAlert-message": {
      fontFamily: "Patrick Hand",
    },
  },
  autocomplete: {
    "&.MuiOutlinedInput-root": {
      padding: 0,
    },
    "& .MuiButtonBase-root.MuiAutocomplete-clearIndicator": {
      color: colors.yellow,
    },
    "& .MuiButtonBase-root.MuiAutocomplete-popupIndicator": {
      color: colors.yellow,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiOutlinedInput-root": {
      fontFamily: "Patrick Hand",
      width: "50vw",
      height: "7vh",
      borderRadius: "18px",
      borderWidth: "5px",
      borderColor: colors.yellow,
      borderStyle: "solid",
      backgroundColor: colors.blue,
      color: colors.yellow,
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
    "&.MuiAutocomplete-root .MuiOutlinedInput-root": {
      padding: "0 0 0 9px",
    },
    "&.MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input": {
      fontFamily: "Patrick Hand",
      width: "50vw",
      height: "100%",
      padding: 0,
    },
  },
  popper: {
    "& .MuiTypography-root": {
      fontFamily: "Patrick Hand",
    },
    "& .MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused": {
      backgroundColor: colors.yellow,
      color: colors.blue,
      fontFamily: "Patrick Hand",
    },
    "& .MuiAutocomplete-listbox": {
      backgroundColor: colors.blue,
      "& li:nth-child(even)": {
        backgroundColor: colors.autoCompleteOdd,
        color: colors.yellow,
        fontFamily: "Patrick Hand",
      },
      "& li:nth-child(odd)": {
        backgroundColor: colors.blue,
        color: colors.yellow,
        fontFamily: "Patrick Hand",
      },
    },
  },
  button: {
    "&.MuiButton-root": {
      fontFamily: "Patrick Hand",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      width: "100px",
      marginLeft: "10px",
      borderRadius: "25px",
      borderWidth: "5px",
      borderColor: colors.yellow,
      borderStyle: "solid",
      backgroundColor: colors.blue,
      color: colors.yellow,
      fontSize: "64%",
    },
    "&.MuiButton-root:hover": {
      backgroundColor: "#95aaab",
      borderColor: colors.yellow,
    },
  },
});

function AutoCompleteAndButton({
  flagMode,
  endState,
  randomNum,
  guesses,
  setGuessNum,
  setGuesses,
  guessNum,
  stats,
  setEndState,
  setCopyAlert,
}) {
  const { lang, l } = useAppContext();
  const autoCompleteRef = useRef();
  const classes = useStyles();

  const datee = useMemo(() => new Date(), []);

  const [guessText, setGuessText] = useState({});

  const [openWinModal, setOpenWinModal] = useState();
  const [openLoseModal, setOpenLoseModal] = useState();
  const [openGiveUpModal, setOpenGiveUpModal] = useState();

  const CustomPopper = function (props) {
    const classes = useStyles();
    return <Popper {...props} className={classes.popper} placement="bottom" />;
  };

  const options = [];

  const tempList = useMemo(() => {
    const sortedCountries = countries.ref_country_codes.slice();
    // Sort to target language
    sortedCountries.sort((a, b) =>
      parseInt(a[lang + "Sort"], 10) > parseInt(b[lang + "Sort"], 10) ? 1 : -1
    );
    return sortedCountries;
  }, [lang]);

  tempList.map((country) => {
    options.push({ label: country[lang], value: country });
    return true; //To avoid warning.
  });

  const showAnswer = () => {
    if (endState === 1) {
      setOpenWinModal(true);
    } else if (endState === 2) {
      setOpenLoseModal(true);
    }
  };

  const change = (event, value) => {
    if (value?.label) {
      setGuessText(value);
    } else {
      setGuessText({});
    }
  };

  const guessClick = () => {
    var value;
    var km;
    if (guessNum < 6 && guessText?.label !== undefined) {
      km = distance(
        guessText?.value?.latitude,
        guessText?.value?.longitude,
        countries.ref_country_codes[randomNum].latitude,
        countries.ref_country_codes[randomNum].longitude
      ).toFixed(0);
      value = 100 * ((20000 - km) / 20000);

      let changeGuess = guesses;
      changeGuess[guessNum] = {
        code: guessText?.value?.alpha2,
        name1: guessText?.value[lang],
        name2: km + " km",
        name3: bearing(
          guessText?.value?.latitude,
          guessText?.value?.longitude,
          countries.ref_country_codes[randomNum].latitude,
          countries.ref_country_codes[randomNum].longitude
        ).toFixed(2),
        value: value,
      };
      setGuesses(changeGuess);
      setGuessNum(guessNum + 1);
      localStorage.setItem(
        datee.getDate().toString() +
          "." +
          (datee.getMonth() + 1).toString() +
          "." +
          datee.getFullYear().toString(),
        JSON.stringify({ guesses, guessNum: guessNum + 1, endState: 0 })
      );

      //Delete autoComplete text when guess is clicked.
      const ele = autoCompleteRef.current.getElementsByClassName(
        "MuiAutocomplete-clearIndicator"
      )[0];
      if (ele) {
        ele.click();
      }
    }
    if (value === 100) {
      setOpenWinModal(true);
      setEndState(1);
      localStorage.setItem(
        datee.getDate().toString() +
          "." +
          (datee.getMonth() + 1).toString() +
          "." +
          datee.getFullYear().toString(),
        JSON.stringify({ guesses, guessNum: guessNum + 1, endState: 1 })
      );
      let tempStats = stats;
      tempStats[continentIndex[guessText?.value?.continent]][guessNum + 1] += 1;
      localStorage.setItem("stats", JSON.stringify(stats));
    }
    if (value !== 100 && guessNum === 5 && guesses[5].code) {
      setOpenLoseModal(true);
      setEndState(2);
      localStorage.setItem(
        datee.getDate().toString() +
          "." +
          (datee.getMonth() + 1).toString() +
          "." +
          datee.getFullYear().toString(),
        JSON.stringify({ guesses, guessNum: guessNum + 1, endState: 2 })
      );
      let tempStats = stats;
      tempStats[
        continentIndex[countries.ref_country_codes[randomNum]?.continent]
      ][0] += 1;
      localStorage.setItem("stats", JSON.stringify(stats));
    }
  };

  return (
    <div className="AutocompleteAndButton">
      {endState === 0 ? (
        <Autocomplete
          disablePortal
          onChange={change}
          freeSolo={true}
          disabled={endState !== 0}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              guessClick();
            }
          }}
          openOnFocus
          value={guessText?.label}
          id="combo-box-demo"
          options={options}
          className={classes.autocomplete}
          renderOption={(props, option, state) => (
            <ListItem {...props}>
              {!flagMode && (
                <img
                  height="25vh"
                  width="35vw"
                  src={`svg/${option?.value?.alpha2?.toLowerCase()}.svg`}
                  alt={option?.value?.alpha2?.toLowerCase() || "flag"}
                />
              )}
              <ListItemText
                sx={{ marginLeft: "1vw" }}
                primary={option?.value[lang]}
              />
            </ListItem>
          )}
          renderInput={(params) => (
            <TextField
              ref={autoCompleteRef}
              placeholder={l("selectACountry")}
              {...params}
            />
          )}
          PopperComponent={CustomPopper}
        />
      ) : (
        <TimerComponent />
      )}
      <Button
        variant="contained"
        className={classes.button}
        onClick={() =>
          endState === 0
            ? guessClick()
            : copyAnswer(guesses, datee, setCopyAlert)
        }
      >
        {endState === 0 ? l("guess") : l("share")}
      </Button>
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => {
          endState === 0 ? setOpenGiveUpModal(true) : showAnswer();
        }}
      >
        {endState === 0 ? l("giveUp") : l("answer")}
      </Button>

      <WinModal
        open={openWinModal}
        handleClose={() => {
          setOpenWinModal(false);
        }}
        country={countries.ref_country_codes[randomNum]}
        randomNum={randomNum}
        guesses={guesses}
        datee={datee}
      />

      <LoseModal
        open={openLoseModal}
        handleClose={() => {
          setOpenLoseModal(false);
        }}
        country={countries.ref_country_codes[randomNum]}
        guesses={guesses}
        randomNum={randomNum}
        datee={datee}
      />

      <GiveUpModal
        open={openGiveUpModal}
        handleClose={() => {
          setOpenGiveUpModal(false);
        }}
        handleOpen={() => {
          setOpenLoseModal(true);
        }}
        setEndState={setEndState}
        guesses={guesses}
        stats={stats}
        guessNum={guessNum}
        randomNum={randomNum}
      />
    </div>
  );
}

export default AutoCompleteAndButton;
