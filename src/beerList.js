import * as Beer from './beers';
const deleteBeerFromList = (beerId) => {
    const beer = document.getElementById(beerId);
    beer.parentNode.removeChild(beer);
    Beer.deleteBeer(beerId);
    const beers = require('./beers.json');
    console.log(beers);
}

export const initBeerList = (updateBeerBarChart) => {
    const beerList = document.getElementById("beer-list");
    Beer.beers.forEach((beer) => {
        const beerEle = document.createElement("li");
        beerEle.innerHTML = beer.name;
        beerEle.className = "beer-item";
        beerEle.id = beer.id;

        // Add delete icon to remove beer from list
        const deleteEle = document.createElement("i");
        deleteEle.className = "fas fa-minus-circle";
        deleteEle.addEventListener("click", () => {
          deleteBeerFromList(beerEle.id);
        });

        beerEle.appendChild(deleteEle);

        beerList.appendChild(beerEle);
    });
};
