export const getRandomIndex = (array, date) => {
    const currentDate = new Date(date);
    const seed = currentDate.getDate().toString() + currentDate.getMonth().toString()  + currentDate.getFullYear().toString()
    const random = Math.sin(seed) * 10000;
    return Math.floor((random - Math.floor(random)) * array.length);
};