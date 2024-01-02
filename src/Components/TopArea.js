import { IconButton } from "@mui/material";

import React, { useState } from "react";
import { makeStyles } from "@mui/styles";

import EqualizerIcon from "@mui/icons-material/Equalizer";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import TwitterIcon from "@mui/icons-material/Twitter";
import CoffeeIcon from "@mui/icons-material/Coffee";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

import StatsModal from "../Modals/StatsModal";
import HowToPlayModal from "../Modals/HowToPlayModal";
import SettingsModal from "../Modals/SettingsModal";
import countries from "../Data/countries";
import { colors } from "../Constants";

const useStyles = makeStyles({
  namebutton: {
    "&.MuiIconButton-root": {
      fontFamily: "Patrick Hand",
      marginTop: "1.25%",
      height: "80%",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      width: "20%",
      backgroundColor: colors.blue,
      color: colors.yellow,
      borderRadius: "25px",
      borderWidth: "5px",
      borderColor: colors.yellow,
      borderStyle: "solid",
      fontSize: "80%",
      marginLeft: "1%",
      marginRight: "1%",
    },
  },
  iconbutton: {
    "&.MuiIconButton-root": {
      marginTop: "1.25%",
      height: "80%",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      width: "10%",
      backgroundColor: colors.blue,
      color: colors.yellow,
      borderRadius: "25px",
      borderWidth: "5px",
      borderColor: colors.yellow,
      borderStyle: "solid",
      fontSize: "80%",
      marginLeft: "1%",
      marginRight: "1%",
    },
    "&.MuiIconButton-root:hover": {
      marginTop: "1.25%",
      height: "80%",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      width: "10%",
      borderRadius: "25px",
      borderWidth: "5px",
      borderColor: colors.yellow,
      borderStyle: "solid",
      backgroundColor: "#95aaab",
      color: colors.yellow,
      fontSize: "80%",
      marginLeft: "1%",
      marginRight: "1%",
    },
  },
});

function TopArea({
  showMap,
  setShowMap,
  flagMode,
  setFlagMode,
  randomNum,
  stats,
}) {
  const classes = useStyles();

  const [openSettingsModal, setOpenSettingsModal] = useState();
  const [openHowToPlayModal, setOpenHowToPlayModal] = useState();
  const [openStatsModal, setOpenStatsModal] = useState();

  return (
    <div className="Top">
      <IconButton
        className={classes.iconbutton}
        onClick={() => {
          setOpenHowToPlayModal(true);
        }}
        aria-label="delete"
      >
        <QuestionMarkIcon fontSize="inherit" />
      </IconButton>

      <a
        style={{ color: "inherit" }}
        href={`https://twitter.com/nationleGame`}
        rel="noreferrer"
        target="_blank"
      >
        <IconButton className={classes.iconbutton} aria-label="delete">
          <TwitterIcon fontSize="inherit" />
        </IconButton>
      </a>

      <a
        style={{ color: "inherit" }}
        href={`https://twitter.com/ibrahimyilgor`}
        rel="noreferrer"
        target="_blank"
      >
        <IconButton className={classes.iconbutton} aria-label="delete">
          <AccountBoxIcon fontSize="inherit" />
        </IconButton>
      </a>

      <IconButton className={classes.namebutton} aria-label="delete">
        <p>NATIONLE</p>
      </IconButton>

      <a
        style={{ color: "inherit" }}
        href={`https://www.buymeacoffee.com/nationle`}
        rel="noreferrer"
        target="_blank"
      >
        <IconButton className={classes.iconbutton} aria-label="delete">
          <CoffeeIcon fontSize="inherit" />
        </IconButton>
      </a>

      <IconButton
        className={classes.iconbutton}
        onClick={() => {
          setOpenStatsModal(true);
        }}
        aria-label="delete"
      >
        <EqualizerIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        className={classes.iconbutton}
        onClick={() => {
          setOpenSettingsModal(true);
        }}
        aria-label="delete"
      >
        <SettingsIcon fontSize="inherit" />
      </IconButton>

      <SettingsModal
        open={openSettingsModal}
        handleClose={() => {
          setOpenSettingsModal(false);
        }}
        handleOpen={() => {
          setOpenSettingsModal(true);
        }}
        showMap={showMap}
        setShowMap={setShowMap}
        flagMode={flagMode}
        setFlagMode={setFlagMode}
      />

      <HowToPlayModal
        open={openHowToPlayModal}
        handleClose={() => {
          setOpenHowToPlayModal(false);
        }}
        country={countries.ref_country_codes[randomNum]}
      />

      <StatsModal
        open={openStatsModal}
        handleClose={() => {
          setOpenStatsModal(false);
        }}
        country={countries.ref_country_codes[randomNum]}
        stats={stats}
      />
    </div>
  );
}

export default TopArea;
