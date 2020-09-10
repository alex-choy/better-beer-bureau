import { beers, deleteBeer } from './beers';
const deleteBeerFromList = (beerId) => {
    const beer = document.getElementById(beerId);
    beer.parentNode.removeChild(beer);
    deleteBeer(beerId);
}

export const initBeerList = () => {
    const beerList = document.getElementById("beer-list");
    beers.forEach((beer) => {
        const beerEle = document.createElement("li");
        beerEle.innerHTML = beer.name;
        beerEle.className = "beer-item";
        beerEle.id = beer.id;

        // Add delete icon to remove beer from list
        const deleteEle = document.createElement("i");
        deleteEle.className = "fas fa-minus-circle";
        deleteEle.addEventListener('click', () => deleteBeerFromList(beerEle.id));

        beerEle.appendChild(deleteEle);

        beerList.appendChild(beerEle);
    });
};
