import { Box, Button, Modal, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useAppContext } from "../context/context";
import countries from "../countries";
import { colors, continentIndex } from "../Constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
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
  button: {
    "&.MuiButton-root": {
      fontFamily: "Patrick Hand",
      borderRadius: "25px",
      borderWidth: "5px",
      borderColor: colors.yellow,
      borderStyle: "solid",
      backgroundColor: colors.blue,
      color: colors.yellow,
      fontSize: "70%",
      minWidth: "20%",
    },
    "&.MuiButton-root:hover": {
      backgroundColor: "#95aaab",
      borderColor: colors.yellow,
    },
  },
});

const GiveUpModal = ({
  stats,
  guesses,
  guessNum,
  setEndState,
  handleOpen,
  handleClose,
  open,
  randomNum,
}) => {
  const classes = useStyles();

  const { l } = useAppContext();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <center>
            <div>
              <Typography
                sx={{ fontFamily: "Patrick Hand", textAlign: "center", mb: 2 }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                {l("areYouGivingUp")}
              </Typography>
            </div>
            <div style={{ flexDirection: "column" }}>
              <Button
                className={classes.button}
                sx={{ color: colors.yellow, marginRight: "2%" }}
                onClick={handleClose}
              >
                {l("no")}
              </Button>
              <Button
                className={classes.button}
                sx={{ color: colors.yellow, marginLeft: "2%" }}
                onClick={() => {
                  setEndState(2);
                  localStorage.setItem(
                    new Date().getDate().toString() +
                      "." +
                      (new Date().getMonth() + 1).toString() +
                      "." +
                      new Date().getFullYear().toString(),
                    JSON.stringify({ guesses, guessNum, endState: 2 })
                  );
                  handleClose();
                  handleOpen();
                  let tempStats = stats;
                  tempStats[
                    continentIndex[
                      countries.ref_country_codes[randomNum]?.continent
                    ]
                  ][0] += 1;
                  localStorage.setItem("stats", JSON.stringify(stats));
                }}
              >
                {l("yes")}
              </Button>
            </div>
          </center>
        </Box>
      </Modal>
    </div>
  );
};

export default GiveUpModal;
