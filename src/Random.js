const random = () => {
    const seedrandom = require('seedrandom');
    const generator = seedrandom(new Date().getDate().toString() + new Date().getMonth().toString()  + new Date().getFullYear().toString())
    return generator();
}

export default random;