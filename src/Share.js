const copyAnswer = (guesses,datee,setCopyAlert) => {
    const date = datee;
    let result = "X/6";
    for(let i=0;i<6;i++){
      if(guesses[i]?.code === undefined){
        break;
      }
      if (guesses[i].value === 100){
        result = i+1 + "/6";
        break;
      }
    }
    let answer = "#Nationle - " + date.getDate() + "." + (date.getMonth()+1) +  "." + date.getFullYear() + " - " + result +"\n";
    const numbers = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"];
    for(let i=0;i<6;i++){
      if(guesses[i]?.code === undefined){
        break;
      }
      else{
        answer += numbers[i+1] +  " - " + (parseInt(guesses[i].name2) + " km                ").slice(0,20-guesses[i].name2.length);
      }
      //console.log("slice",(parseInt(guesses[i].name2,10) + " km            ").slice(0,20-guesses[i].name2.length))
      if(parseInt(guesses[i].name2) === 0){
        answer += "✅";
      }
      else if(parseFloat(360-guesses[i].name3)%360>=22.5 && parseFloat(360-guesses[i].name3)%360 < 67.5){
        answer += "↗️";
      }
      else if(parseFloat(360-guesses[i].name3)%360>=67.5 && parseFloat(360-guesses[i].name3)%360 < 112.5){
        answer += "⬆️";
      }
      else if(parseFloat(360-guesses[i].name3)%360>=112.5 && parseFloat(360-guesses[i].name3)%360 < 157.5){
        answer += "↖️";
      }
      else if(parseFloat(360-guesses[i].name3)%360>=157.5 && parseFloat(360-guesses[i].name3)%360 < 202.5){
        answer += "⬅️";
      }
      else if(parseFloat(360-guesses[i].name3)%360>=202.5 && parseFloat(360-guesses[i].name3)%360 < 247.5){
        answer += "↙️";
      }
      else if(parseFloat(360-guesses[i].name3)%360>=247.5 && parseFloat(360-guesses[i].name3)%360 < 292.5){
        answer += "⬇️";
      }
      else if(parseFloat(360-guesses[i].name3)%360>=292.5 && parseFloat(360-guesses[i].name3)%360 < 337.5){
        answer += "↘️";
      }
      else{
        answer += "➡️";
      }
      answer +=  " %" + parseInt(guesses[i].value) + "\n";
    }
    answer += "https://nationle.herokuapp.com";
    navigator.clipboard.writeText(answer);
    setCopyAlert(true);
  }

  export default copyAnswer;