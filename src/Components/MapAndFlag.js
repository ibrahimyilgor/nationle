import "../Css/App.css";
import countries from "../countries";
import { useAppContext } from "../context/context";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    width: "50vw",
    height: "30vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

function MapAndFlag({ showMap, randomNum, flagMode }) {
  const classes = useStyles();
  const { l } = useAppContext();

  return (
    <div className={classes.root}>
      {!showMap && !flagMode && <p>{l("mapDisabled")}</p>}

      {showMap === true && (
        <img
          alt="target_country"
          style={{
            filter:
              "invert(90%) sepia(23%) saturate(334%) hue-rotate(359deg) brightness(101%) contrast(93%)",
          }}
          src={`all/${countries.ref_country_codes[
            randomNum
          ].alpha2.toLowerCase()}/vector.svg`}
          width={flagMode ? "50%" : "80%"}
          height="100%"
        />
      )}

      {flagMode === true && (
        <img
          alt={"flag"}
          src={`svg/${countries.ref_country_codes[
            randomNum
          ].alpha2.toLowerCase()}.svg`}
          width={showMap ? "50%" : "80%"}
          height="70%"
        />
      )}
    </div>
  );
}

export default MapAndFlag;
