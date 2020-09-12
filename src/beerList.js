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
    console.log('sorting beer');
    const ul = document.getElementById('beer-list');
    const newUl = document.createElement('ul', false);
    newUl.id = 'beer-list';
    const lis = [];
    ul.childNodes.forEach(li => {
        lis.push(li);
    })

    lis.sort(function (li1, li2){
        const text1 =  li1.childNodes[1].textContent.toUpperCase();
        const text2 = li2.childNodes[1].textContent.toUpperCase();
        if(text1 < text2) {
            return -1
        } else if (text1 > text2) {
            return 1
        }
        return 0;
    });
    lis.forEach(li => {
        newUl.appendChild(li);
    })
    ul.parentNode.replaceChild(newUl, ul);
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
    console.log('finished adding');
};

/**
 * 
 * @param {function} updateBeerBarChart function to call after we get a beer
 * @param {number} numBeers # beers to get  
 */
export const getRandomBeer = (updateBeerBarChart, numBeers = 1) => {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (this.readyState == READY && this.status == 200) {
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
    const beerBtn = document.getElementById("beer-btn");
    beerBtn.addEventListener('click', () => {
        getRandomBeer(updateBeerBarChart);
    })
};
