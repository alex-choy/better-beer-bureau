import * as Beer from './beers';
const deleteBeerFromList = (beerId) => {
    const beer = document.getElementById(beerId);
    beer.className = "delete-beer";
    setTimeout(() => beer.parentNode.removeChild(beer), 1000);
    Beer.deleteBeer(beerId);
}

export const initBeerList = (updateBeerBarChart) => {
    const beerList = document.getElementById("beer-list");
    Beer.beers.forEach((beer) => {
        const beerEle = document.createElement("li");
        // beerEle.innerHTML = beer.name;
        beerEle.className = "beer-item";
        beerEle.id = beer.id;

        const beerName = document.createElement("span");
        beerName.innerText = beer.name;
        // Add delete icon to remove beer from list
        const deleteEle = document.createElement("i");
        deleteEle.className = "fas fa-minus-circle";
        deleteEle.addEventListener("click", () => {
          deleteBeerFromList(beerEle.id);
        });

        beerEle.appendChild(deleteEle);
        beerEle.appendChild(beerName);

        beerList.appendChild(beerEle);
    });
};
