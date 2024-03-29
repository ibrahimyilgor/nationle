import {
  Alert,
  Box,
  Button,
  IconButton,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useState } from "react";

import NewMap from "../Components/NewMap";
import countries from "../Data/countries";

import MapIcon from "@mui/icons-material/Map";
import InfoIcon from "@mui/icons-material/Info";
import { useWindowDimensions } from "react-native";
import { useEffect } from "react";
import { useAppContext } from "../context/context";
import { copyAnswer } from "../Functions/copyAnswer";
import { colors } from "../Constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: "90%",
  minHeight: "50%",
  width: "80%",
  bgcolor: "background.paper",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: colors.yellow,
  boxShadow: 24,
  backgroundColor: colors.blue,
  borderRadius: "25px",
  p: 4,
  color: colors.yellow,
};

const useStyles = makeStyles({
  cookieAlert: {
    "& .MuiAlert-message": {
      fontFamily: "Patrick Hand",
    },
  },
  buttonLeft: {
    "&.MuiButton-root": {
      fontFamily: "Patrick Hand",
      float: "left",
      borderRadius: "25px",
      borderWidth: "5px",
      borderColor: colors.yellow,
      borderStyle: "solid",
      backgroundColor: colors.blue,
      color: colors.yellow,
      fontSize: "100%",
      minWidth: "10%",
      height: "5vh",
    },
    "&.MuiButton-root:hover": {
      backgroundColor: "#95aaab",
      borderColor: colors.yellow,
    },
  },
  buttonRight: {
    "&.MuiButton-root": {
      fontFamily: "Patrick Hand",
      float: "right",
      borderRadius: "25px",
      borderWidth: "5px",
      borderColor: colors.yellow,
      borderStyle: "solid",
      backgroundColor: colors.blue,
      color: colors.yellow,
      fontSize: "100%",
      minWidth: "10%",
      height: "5vh",
    },
    "&.MuiButton-root:hover": {
      backgroundColor: "#95aaab",
      borderColor: colors.yellow,
    },
  },
  iconbutton: {
    "&.MuiIconButton-root": {
      marginTop: "1.25%",
      height: "80%",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      width: "100%",
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
      width: "100%",
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

const WinModal = ({ country, handleClose, open, datee, guesses }) => {
  // const time = useCountdown(datee, lang);
  const classes = useStyles();

  const { lang, l } = useAppContext();

  const dim = useWindowDimensions();
  const [mapData, setMapData] = useState({});
  const [markers, setMarkers] = useState({});

  useEffect(() => {
    if (open) {
      // console.log("openwinmodel")
      setMapData({
        [guesses[0].code ?? "XXX"]:
          country?.alpha2.toUpperCase() === guesses[0].code ? 500 : 9000,
        [guesses[1].code ?? "XXX"]:
          country?.alpha2.toUpperCase() === guesses[1].code ? 500 : 9000,
        [guesses[2].code ?? "XXX"]:
          country?.alpha2.toUpperCase() === guesses[2].code ? 500 : 9000,
        [guesses[3].code ?? "XXX"]:
          country?.alpha2.toUpperCase() === guesses[3].code ? 500 : 9000,
        [guesses[4].code ?? "XXX"]:
          country?.alpha2.toUpperCase() === guesses[4].code ? 500 : 9000,
        [guesses[5].code ?? "XXX"]:
          country?.alpha2.toUpperCase() === guesses[5].code ? 500 : 9000,
      });

      let markerObj = {};
      for (let i = 0; i < 6; i++) {
        console.log("ibrahim", guesses[i]);
        if (!guesses[i]?.code) {
          continue;
        }
        markerObj = {
          ...markerObj,
          [i]: {
            latLng: [
              countries.ref_country_codes.find(
                (obj) => obj.alpha2 === guesses[i].code
              ) &&
                countries.ref_country_codes.find(
                  (obj) => obj.alpha2 === guesses[i].code
                )["latitude"],
              countries.ref_country_codes.find(
                (obj) => obj.alpha2 === guesses[i].code
              ) &&
                countries.ref_country_codes.find(
                  (obj) => obj.alpha2 === guesses[i].code
                )["longitude"],
            ],
            name:
              countries.ref_country_codes.find(
                (obj) => obj.alpha2 === guesses[i].code
              ) &&
              i +
                1 +
                " - " +
                countries.ref_country_codes.find(
                  (obj) => obj.alpha2 === guesses[i].code
                )[lang],
            style: {
              r: 5,
              fill: guesses[i].code === country?.alpha2 ? "green" : "red",
            },
          },
        };
      }
      setMarkers(markerObj);
    }
  }, [open, guesses, lang, country]);

  const [copyAlert, setCopyAlert] = useState(false);
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setCopyAlert(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ width: "100%", height: "5vh" }}>
            <Button
              className={classes.buttonRight}
              onClick={handleClose}
              sx={{ color: "#FFBED8", marginLeft: "1vw" }}
            >
              {l("close")}
            </Button>
            <Button
              className={classes.buttonLeft}
              onClick={() => copyAnswer(guesses, datee, setCopyAlert)}
              sx={{ color: "#FFBED8" }}
            >
              {l("share")}
            </Button>
          </div>
          <Typography
            sx={{ fontFamily: "Patrick Hand", textAlign: "center" }}
            id="modal-modal-title"
            variant="h4"
            component="h3"
          >
            {l("win")}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              fontFamily: "Patrick Hand",
              mt: 2,
              mb: 2,
              textAlign: "center",
            }}
            variant="h6"
            component="h5"
          >
            {l("congratulations") + " " + country[lang]}
          </Typography>
          <center>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "80%",
                marginBottom: "10px",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: dim.height * 1.2 > dim.width ? "50%" : "30%",
                  height: "100%",
                  marginRight: 5,
                }}
              >
                <a
                  style={{ color: "inherit" }}
                  href={`https://www.google.com/maps/place/${country["en"]}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <IconButton
                    className={classes.iconbutton}
                    aria-label="delete"
                  >
                    <MapIcon
                      fontSize={dim.height > dim.width ? "inherit" : "medium"}
                    />
                    {dim.height * 1.2 < dim.width && (
                      <Typography
                        id="modal-modal-description"
                        sx={{ fontFamily: "Patrick Hand", textAlign: "center" }}
                        variant="h6"
                        component="h5"
                      >
                        {l("maps")}
                      </Typography>
                    )}
                  </IconButton>
                </a>
              </div>
              <div
                style={{
                  width: dim.height * 1.2 > dim.width ? "50%" : "30%",
                  height: "100%",
                  marginLeft: 5,
                }}
              >
                <a
                  style={{ color: "inherit" }}
                  href={`https://${lang}.wikipedia.org/wiki/${country[lang]}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <IconButton
                    className={classes.iconbutton}
                    aria-label="delete"
                  >
                    <InfoIcon
                      fontSize={dim.height > dim.width ? "inherit" : "medium"}
                    />
                    {dim.height * 1.2 < dim.width && (
                      <Typography
                        id="modal-modal-description"
                        sx={{ fontFamily: "Patrick Hand", textAlign: "center" }}
                        variant="h6"
                        component="h5"
                      >
                        {l("wiki")}
                      </Typography>
                    )}
                  </IconButton>
                </a>
              </div>
            </div>
            <br></br>
            <NewMap
              width={dim.width * 0.7}
              mapData={mapData}
              marker={markers}
            />
          </center>
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
        </Box>
      </Modal>
    </div>
  );
};

export default WinModal;
