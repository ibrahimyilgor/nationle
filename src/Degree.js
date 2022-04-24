import * as geolib from 'geolib';

// Converts from degrees to radians.
/* function toRadians(degrees) {
    return degrees * Math.PI / 180;
  };
   
  // Converts from radians to degrees.
  function toDegrees(radians) {
    return radians * 180 / Math.PI;
  } */

function bearing(startLat, startLng, destLat, destLng){
  const start = { 
    latitude: startLat,
    longitude: startLng };

  const end = { 
    latitude: destLat,
    longitude: destLng };

  return geolib.getRhumbLineBearing(start, end)-90;
}

  export default bearing;