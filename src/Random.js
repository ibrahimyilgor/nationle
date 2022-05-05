const random = () => {
    const seedrandom = require('seedrandom');
    const generator = seedrandom(new Date().getDate().toString() + new Date().getMonth().toString()  + new Date().getFullYear().toString())

    // To check is it really random or not
    /* let x = 0;
    let day = new Date();
    let values = new Array(236).fill(0);
    while(x < 10000){
        let string = day.getDate().toString() + day.getMonth().toString()  + day.getFullYear().toString()
        const gen = seedrandom(day.getDate().toString() + day.getMonth().toString()  + day.getFullYear().toString())
      //  console.log(string,Math.round(gen()*253))
         if(Math.round(gen()*236) === 217){
            console.log("Türkiye geldi", string);
        } 
        values[Math.round(gen()*236)] += 1;
        day.setDate(day.getDate()+1);
        x += 1;
       
    }
    console.log(values); */
    
    return generator();
}

export default random;