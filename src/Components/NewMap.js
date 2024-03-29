import React from "react";
import { VectorMap } from "react-jvectormap";
import { useAppContext } from "../context/context";
import countries from "../Data/countries";
import { colors } from "../Constants";

const handleClick = (e, countryCode) => {
  // console.log(countryCode);
};

const NewMap = ({ mapData, marker, width }) => {
  const { lang } = useAppContext();

  const onToolTipShow = (e, el, code) => {
    // console.log("ibrahim",code, e, el)
    // el[0].attributes.style = "style='zIndex: 1000, display: none; left: 677px; top: 469px;'"
    // el[0]["zIndex"] = 99999999
    el[0]["style"]["zIndex"] = 99999999;
    el[0]["style"]["font-family"] = "inherit";
    el[0]["style"]["color"] = colors.yellow;
    el[0]["style"]["background-color"] = colors.blue;
    let content = el.html(
      `${
        Object.keys(mapData).indexOf(code) + 1 > 0
          ? Object.keys(mapData).indexOf(code) + 1 + " - "
          : ""
      } ${
        countries.ref_country_codes.find((obj) => obj.alpha2 === code) &&
        countries.ref_country_codes.find((obj) => obj.alpha2 === code)[lang]
      }`
    );
    // console.log("content", content)
    return content;
  };

  return (
    <div>
      <VectorMap
        map={"world_mill"}
        zoomButtons={false}
        zoomOnScroll={true}
        onRegionTipShow={onToolTipShow}
        // onRegionOver={(e) => setHover(e)}
        backgroundColor="transparent" //change it to ocean blue: #0077be
        // labels= {
        //   {
        //     regions: {
        //       render: function(code){
        //         let mapDataArr = Object.keys(mapData);
        //         console.log("mapDataArr",mapDataArr)

        //         return (mapData[code] ? mapDataArr.indexOf(code) +1 : "")
        //       },
        //       offsets:  function(code){
        //         console.log("ibooo",code)
        //         return {
        //           "US": [-100, +100], //doesn't work??
        //         }[code.split('-')[1]];
        //       }
        //     }
        //   }
        // }
        containerStyle={{
          width: width * 0.9,
          height: width * 0.45,
        }}
        markers={marker}
        onRegionClick={handleClick} //gets the country code
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: colors.yellow,
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0,
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer",
          },
          selected: {
            fill: "#2938bc", //color for the clicked country
          },
          selectedHover: {},
        }}
        regionLabelStyle={{
          initial: {
            "font-family": "inherit",
            "font-size": "12",
            "font-weight": "bold",
            cursor: "default",
            fill: colors.yellow,
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer",
            fontFamily: "inherit",
          },
          selected: {
            fill: "#000000", //color for the clicked country
            fontFamily: "inherit",
          },
          selectedHover: {
            fontFamily: "inherit",
          },
        }}
        // regionsSelectable={true}
        series={{
          regions: [
            {
              values: mapData, //this is your data
              scale: ["#146804", "#ff0000"], //your color game's here
              normalizeFunction: "polynomial",
            },
          ],
        }}
      />
    </div>
  );
};

const MemoizedComponent = React.memo(NewMap);

export default MemoizedComponent;
