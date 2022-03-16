import * as geolib from 'geolib';


// Converts from degrees to radians.
function toRadians(degrees) {
    return degrees * Math.PI / 180;
  };
   
  // Converts from radians to degrees.
  function toDegrees(radians) {
    return radians * 180 / Math.PI;
  }
  

function bearing(startLat, startLng, destLat, destLng){
  const start = { 
    latitude: startLat,
    longitude: startLng };

  const end = { 
    latitude: destLat,
    longitude: destLng };

  return geolib.getRhumbLineBearing(start, end)-90;




  /* startLat = toRadians(startLat);
  startLng = toRadians(startLng);
  destLat = toRadians(destLat);
  destLng = toRadians(destLng);

  var y = Math.sin(destLng - startLng) * Math.cos(destLat);
  var x = Math.cos(startLat) * Math.sin(destLat) - Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  var brng = Math.atan2(y, x);
  brng = toDegrees(brng);
  console.log("brng",brng);
  return (brng + 360) % 360; */
}

  export default bearing;