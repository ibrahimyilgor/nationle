import { Box, Button, Modal, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BarChart from "../BarChart";
import { useAppContext } from "../context/context";
import useWindowDimensions from "../getWindowDimensions";
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
  button: {
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
});

const StatsModal = ({ stats, handleClose, open }) => {
  const dim = useWindowDimensions();
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
          <div style={{ width: "100%", height: "5vh" }}>
            <Button
              className={classes.button}
              onClick={handleClose}
              sx={{ color: colors.yellow }}
            >
              {l("close")}
            </Button>
          </div>
          <Typography
            sx={{ fontFamily: "Patrick Hand", textAlign: "center" }}
            id="modal-modal-title"
            variant={dim.height > dim.width ? "h5" : "h4"}
            component="h3"
          >
            {l("stats")}
          </Typography>
          {/*   {stats.map((val,key) => {
                    return <Typography id="modal-modal-description" sx={{ fontFamily: "Patrick Hand", mt: 2, mb: 2, textAlign:"center" }} variant="h6" component="h5">
                      {(key === 0 ? "Unsuccessful" : key) + ": " + val}   
                    </Typography>
                  })}  */}
          {/* {stats.map((val,key) => {
                    return (
                    <div style={{display: "flex", marginBottom: "2vh"}}>
                      <Typography id="modal-modal-description" sx={{ width: "2vw", fontFamily: "Patrick Hand", mr: 1, textAlign: "center"}} variant="h6" component="h5">
                      {key === 0 ? "X:" : key + ":"}
                      </Typography>
                      <div style={{ marginLeft: "1vw", height: "4vh", width: `${(val/max)*70+1}%`, backgroundColor: colors.yellow }}></div>
                      <Typography style={{ height: "4vh", fontFamily: "Patrick Hand", marginLeft: "0.5vw",  justifyContent: "center", alignItems: "center", display: "flex"}}>{val}</Typography>
                    </div>)
                  })} */}
          <BarChart data={stats} />
        </Box>
      </Modal>
    </div>
  );
};

export default StatsModal;
