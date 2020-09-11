import * as Beer from './beers';
import { BEER_API_URL, PROXY_URL } from './index';
import { breweryAPIKey } from "./config/keys_dev";
const READY = 4;
const deleteBeerFromList = (beerId) => {
    const beer = document.getElementById(beerId);
    beer.className = "delete-beer";
    setTimeout(() => beer.parentNode.removeChild(beer), 1000);
    Beer.deleteBeer(beerId);
}

const addBeerToList = (beer, updateBeerBarChart) => {
    Beer.addBeer(beer);

    const beerEle = document.createElement('li');
    beerEle.className = "beer-item";
    beerEle.id = beer.id;

    const beerName = document.createElement("span");
    beerName.innerText = beer.name;

    // Add delete icon to remove beer from list
    const deleteEle = document.createElement("i");
    deleteEle.className = "fas fa-minus-circle";
    deleteEle.addEventListener("click", () => {
        deleteBeerFromList(beerEle.id);
        updateBeerBarChart();
    });

    beerEle.appendChild(deleteEle);
    beerEle.appendChild(beerName);

    const beerList = document.getElementById("beer-list");
    beerList.appendChild(beerEle);
    updateBeerBarChart();
};

const getRandomBeer = (updateBeerBarChart) => {
    console.log("getRandomBeer");
    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (this.readyState == READY && this.status == 200) {
          const newBeer = JSON.parse(this.responseText).data[0];
          addBeerToList(newBeer, updateBeerBarChart);
      }
    };
    const apiCall = `${PROXY_URL}${BEER_API_URL}beers/?${breweryAPIKey}&order=random`;
    req.open('GET', apiCall);
    // req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    // req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // req.setRequestHeader("X-PINGOTHER", "pingpong");
    // req.setRequestHeader("Content-Type", "application/xml");
    req.send();
};

export const initBeerList = (updateBeerBarChart) => {
    // const req = new XMLHttpRequest();
    // const apiCall = `${PROXY_URL}${BEER_API_URL}beers/?${breweryAPIKey}&order=random`;
    // req.open(
    //   "GET", apiCall
    // );
    // req.onload = () => {
    //   console.log(JSON.parse(req.response));
    // };
    // req.send();
    // getRandomBeer(updateBeerBarChart);

    // const req = new XMLHttpRequest();
    // req.onreadystatechange = function () {
    //   if (this.readyState == READY && this.status == 200) {
    //     const newBeer = JSON.parse(this.responseText).data[0];
    //     addBeerToList(newBeer, updateBeerBarChart);
    //   }
    // };
    // const apiCall = `${PROXY_URL}${BEER_API_URL}beers/?${breweryAPIKey}&order=random`;
    // req.open("GET", apiCall);
    // req.send();


    // Initialize 'Add Beer' button to add ramdom beer to the list
     for(let i = 0; i < 5; i++) {
         getRandomBeer(updateBeerBarChart);
     }
    // getRandomBeer(updateBeerBarChart);
    // Add exisitng beers to the list
    // const beerList = document.getElementById("beer-list");
    // Beer.beers.forEach((beer) => {
    //     addBeerToList(beer, updateBeerBarChart);
        // const beerEle = document.createElement("li");
        // // beerEle.innerHTML = beer.name;
        // beerEle.className = "beer-item";
        // beerEle.id = beer.id;

        // const beerName = document.createElement("span");
        // beerName.innerText = beer.name;
        // // Add delete icon to remove beer from list
        // const deleteEle = document.createElement("i");
        // deleteEle.className = "fas fa-minus-circle";
        // deleteEle.addEventListener("click", () => {
        //   deleteBeerFromList(beerEle.id);
        //   updateBeerBarChart();
        // });

        // beerEle.appendChild(deleteEle);
        // beerEle.appendChild(beerName);

        // beerList.appendChild(beerEle);
    // });
};
