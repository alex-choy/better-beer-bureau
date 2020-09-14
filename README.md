# Better Beer Bureau

The Better Beer Bureau was created to compare attributes of different beers on an interactive bar chart. Beers are randomly obtained from BreweryDB, and displayed on a  bar graph. Beers can also be added or removed from the graph, and different beer attributes can be compared.

## Live Link: https://alex-choy.github.io/better-beer-bureau/

## Technologies Used

This project is **JavaScript** focused, so vanilla JS is primarily used. **Webpack** is utilized to bundle all JS files, as well as images and stylesheets, making app development easier. To get all the beer information, the **BreweryDB API** is used to retrieve different beers. Each beer has plenty of information attached, but I focused on the key aspects of beer, which are ABV, IBU, and SRM. To compare the information to each other, **D3.js** is used to display these numbers on a bar chart. D3.js helps with placing the bar on the appropriate space within the chart, and also updates information as it's changed with great animations.

## Features

One main feature of this app is utilizing D3.js for my graph. I wanted to have an 'interactive' graph where users can choose different beer attribute comparisons. I thought this would mean copy-pasting the same code for 3 different graphs, but I found that updating a single graph was not too difficult to switch between different beer attributes. I setup a BEER_ATTRS JSON file, where each nested object contains different information to display on the graph. If I wanted to update the graph, I would pass one of these objects to my update bar graph function, where the information is updated with the appropriate titles and names. Making this update function modular allowed me to keep my code cleaner, and adding or removing more attributes to compare is easy to do. 

```js
const ABV_MAX_Y = 12;
const ABV = "abv";
export const BEER_ATTRS = {
  abv: {
    yMax: ABV_MAX_Y,
    yTitle: "ABV (%)",
    graphTitle: "ABV of Different Beers",
    beerValue: ABV,
    beerValueSymbol: "%",
    beerPrefix: "ABV: ",
    description:
      '<span class="desc-title">Alcohol by Volume (ABV)</span> is the percentage of alcohol present in a drink, including beer. Beers can range between 3% and 13% ABV, but most commonly fall <span class="desc-range">between 4% and 7%</span>. If a drink has a higher ABV, then it will contain more alcohol.',
  },
  ...
}
    
// Making the update changes
beerDrpdwn.addEventListener("change", function (value) {
    const beerValue = this.options[this.selectedIndex].value;
    updateBeerBarChart(BEER_ATTRS[beerValue]);
});
```

Adding on to the modularity, I created a function to help extract the proper data of each beer. One problem I faced was that not all beers were formatted the same. Some values appeared in the root of the object, while others were nested further in the object. Luckily it wasn't too chaotic finding information, so I was able to write this function to extract the correct beer value that was passed into the above update function. 

```js
const getBeerValue = (beer, field) => {
    if(beer[field]) {
        if(typeof beer[field] === 'object') {
            return parseFloat(beer[field].id); // SRMs might come as an object
        }
        return parseFloat(beer[field]);
    } else if(beer.style){ // Min/Max vals are packaged inside beer.style
        const min = field + 'Min', max = field + 'Max';
        const minVal = parseFloat(beer.style[min]),
              maxVal = parseFloat(beer.style[max]);
        // value may not exist, return 0 if so
        return (maxVal + minVal) / 2 || 0;
    }
    return 0;
}
```

Unfortunately, not every single beer would return the proper value, so if the value I wanted did not exist, I would display nothing by returning 0. 

