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

/**
 * Always keep beer list sorted alphabetically
 */
export const sortBeerList = () => {
    const ul = document.getElementById('beer-list');
    const clonedUl = document.cloneNode(ul, false);
    const lis = [];
    ul.childNodes.forEach(li => {
        lis.push(li);
    })

    lis.sort(function (li1, li2){
        const text1 =  li1.childNodes[1].textContent;
        const text2 = li2.childNodes[1].textContent;
        if(text1 < text2) {
            return -1
        } else if (text1 > text2) {
            return 1
        }
        return 0;
    });
    lis.forEach(li => {
        console.log(li.childNodes[1].textContent);
    })
};

const addBeerToList = (beer, updateBeerBarChart) => {
    // setTimeout(sortBeerList, 2000);
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

/**
 * 
 * @param {function} updateBeerBarChart function to call after we get a beer
 * @param {number} numBeers # beers to get  
 */
export const getRandomBeer = (updateBeerBarChart, numBeers = 1) => {
    console.log("getRandomBeer");
    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (this.readyState == READY && this.status == 200) {
          console.log('got new beers');
          const newBeers = JSON.parse(this.responseText).data;
          newBeers.forEach(newBeer => {
              addBeerToList(newBeer, updateBeerBarChart);
          })
      }
    };
    const apiCall = `${PROXY_URL}${BEER_API_URL}beers/?${breweryAPIKey}&order=random&randomCount=${numBeers}`;
    req.open('GET', apiCall);
    req.send();
};

export const initBeerList = (updateBeerBarChart) => {
    getRandomBeer(updateBeerBarChart, 10);
};
