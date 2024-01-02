import "../Css/App.css";
import countries from "../countries";
import { useAppContext } from "../context/context";
import { makeStyles } from "@mui/styles";
import useWindowDimensions from "../getWindowDimensions";

const useStyles = makeStyles({
  root: ({ dim }) => ({
    width: dim.height > dim.width ? "90%" : "45%",
    height: "30vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }),
});

function MapAndFlag({ showMap, randomNum, flagMode }) {
  const { l } = useAppContext();
  const dim = useWindowDimensions();
  const classes = useStyles({ dim });

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
          width="50%"
          height="70%"
        />
      )}

      {flagMode === true && (
        <img
          alt={"flag"}
          src={`svg/${countries.ref_country_codes[
            randomNum
          ].alpha2.toLowerCase()}.svg`}
          width="50%"
          height="70%"
        />
      )}
    </div>
  );
}

export default MapAndFlag;
