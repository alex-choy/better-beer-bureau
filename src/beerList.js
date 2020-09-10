import { beers } from "./beers";

const deleteBeerFromList = (beerId) => {
    const beer = document.getElementById(beerId);
    beer.parentNode.removeChild(beer);
    // call updateBeerList 
}

export const initBeerList = () => {
    const beerList = document.getElementById("beer-list");
    beers.forEach((beer) => {
        const beerEle = document.createElement("li");
        beerEle.text = beer.name;
        beerEle.id = beer.id;

        // Add delete icon to remove beer from list
        

        beerList.appendChild(beerEle);
    });
};
