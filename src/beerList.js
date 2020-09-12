import * as Beer from './beers';
import { BEER_API_URL, PROXY_URL } from './index';
import { breweryAPIKey } from "./config/keys_dev";
const READY = 4;

/**
 * Delete a beer from the current list
 * @param {string} beerId 
 */
const deleteBeerFromList = (beerId) => {
    const beer = document.getElementById(beerId);
    beer.className = "delete-beer";
    // Let the .delete-beer class fade the beer name away, then remove from list
    setTimeout(() => beer.parentNode.removeChild(beer), 1000);
    Beer.deleteBeer(beerId);
}

/**
 * Always keep beer list sorted alphabetically
 */
export const sortBeerList = () => {
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

/**
 * Create a beer HTML element and return it
 * @param {object} beer 
 * @param {function} updateBeerBarChart 
 */
const createBeerElement = (beer, updateBeerBarChart) => {
    // Add beer to our 'Beer DB' (JSON file)
    Beer.addBeer(beer);

    // Create new <li> for beer
    const beerEle = document.createElement('li');
    beerEle.className = "beer-item";
    beerEle.id = beer.id;

    // Text for the beer name
    const beerName = document.createElement("span");
    beerName.innerText = beer.name;

    // Add delete icon to remove beer from list
    const deleteEle = document.createElement("i");
    deleteEle.className = "fas fa-minus-circle";
    deleteEle.addEventListener("click", () => {
        deleteBeerFromList(beerEle.id);
        updateBeerBarChart();
    });

    // Add delete button in front of name
    beerEle.appendChild(deleteEle);
    beerEle.appendChild(beerName);

    return beerEle;
};

/**
 * Initialize the #beer-list
 * @param {object} beers 
 * @param {function} updateBeerBarChart 
 */
const setInitBeerList = (beers, updateBeerBarChart) => {
    const beerListUl = document.getElementById("beer-list");
    beers.forEach(beer => {
        const beerEle = createBeerElement(beer, updateBeerBarChart);
        beerListUl.appendChild(beerEle);
    });

    updateBeerBarChart();
    sortBeerList();
};


const insertNewBeer = (newBeer) => {
    const beerEle = createBeerElement(newBeer);
    const newBeerName = beerEle.childNodes[1].innerText;
    const beerListLis = document.getElementById("beer-list").childNodes;

    // Find the correct index to place the new beer
    for(let i = 0; i < beerListLis.length; i++) {
        const beerLi = beerListLis[i];
        const currBeerName = beerLi.childNodes[1].innerText;
        if(newBeerName < currBeerName) {
            console.log(`Insert "${newBeer.name}" here: `, i);
            // use insertBefore() here?
            break;
        }
    }
};

/**
 * 
 * @param {function} updateBeerBarChart function to call after we get a beer
 * @param {number} numBeers number of beers to get  
 */
export const getRandomBeers = (updateBeerBarChart, numBeers = 1) => {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (this.readyState == READY && this.status == 200) {
        const newBeers = JSON.parse(this.responseText).data;
        // We only get more than 1 beer on initialization
        if(numBeers > 1) {
            setInitBeerList(newBeers, updateBeerBarChart);
        } else { // Otherwise, add one beer to the list/chart
            insertNewBeer(newBeers[0])
        }
      }
    };
    const apiCall = `${PROXY_URL}${BEER_API_URL}beers/?${breweryAPIKey}&order=random&randomCount=${numBeers}`;
    req.open('GET', apiCall);
    req.send();
};

export const initBeerList = (updateBeerBarChart) => {
    getRandomBeers(updateBeerBarChart, 4);
    const beerBtn = document.getElementById("beer-btn");
    beerBtn.addEventListener("click", () => {
        getRandomBeers(updateBeerBarChart);
    });
};
