/**
 *  This is the Beer 'database'
 *  Allows adding/deleting beer 
 */

 const unsortedBeers = require('./beers.json');

export const deleteBeer = (beerId) => {
    delete unsortedBeers[beerId];
};

export const addBeer = (beer) => {
    unsortedBeers[beer.id] = beer;
    // console.log(unsortedBeers[beer.id]);
}

/**
 * Sort beers by name
 * @param {beer object} a 
 * @param {beer object} b 
 */
const alphabeticalBeers = (a, b) => {
    const aName = a.name.toUpperCase();
    const bName = b.name.toUpperCase();
    if (aName < bName) {
        return -1;
    } else if (aName > bName) {
        return 1;
    }
    return 0;
};

/**
 * Store beers as an object to add/delete easily
 * We send an array of sorted beer objects to the other methods
 */
export const beers = Object.values(unsortedBeers).sort(alphabeticalBeers);