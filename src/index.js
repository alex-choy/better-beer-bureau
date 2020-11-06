import "./styles/main.css";
import "./styles/search-beer.css";
import "./styles/instructions.css";
// alert("connected js");
import { breweryAPIKey } from "./config/keys_dev";
import * as d3 from "d3";
import { transition } from "d3";
import { BEER_ATTRS } from "./beerAttrs";
import { initBeerList, sortBeerList, getRandomBeer } from "./beerList";
import { beers } from "./beers";
const TOOLTIP_HEIGHT_OFFSET = 70;
const TOOLTIP_WIDTH_OFFSET = 10;
const UPDATE_TRANSITION_TIME = 1000;
const X_LABEL_HEIGHT_OFFSET = 120;
const MAX_BEER_NAME_LENGTH = 12;
const MAX_NUM_DISPLAYED_BEERS = 12;
let prevAttrs = "abv";
export const BEER_API_URL = "https://sandbox-api.brewerydb.com/v2/";
export const PROXY_URL = "https://murmuring-oasis-36162.herokuapp.com/";
// Adds Acces-Control-Allow-Origin header to the request

/**
 * Creates the beer bar graph
 */
document.addEventListener("DOMContentLoaded", () => {
  const margin = 60;
  const width = 650 - 2 * margin;
  const height = 500 - 3.5 * margin;
  const beerSvg = d3
    .select("#beer-bar")
    .attr("height", height + margin * 3.5)
    .attr("width", width + margin * 2)
    .attr("max-height", width + margin * 2)
    .attr("x", 100)
    .append("g")
    .attr("transform", `translate(${margin}, ${margin})`);

  // initial beers
  const beers = Object.values(require("./beers.json")).sort(alphabeticalBeers);

  // Y-axis scale
  const yScale = d3.scaleLinear().range([height, 0]).domain([0, 100]);
  const yAxis = beerSvg.append("g").call(d3.axisLeft(yScale));

  // x-axis scale for beer names
  const xScale = d3
    .scaleBand()
    .range([0, width])
    .domain(beers.map((beer) => smallerBeerName(beer.name)))
    .padding(0.2);
  const xAxis = beerSvg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  // horizontal lines across graph
  const horizLines = beerSvg
    .append("g")
    .attr("class", "grid")
    .style("color", "	#505050")
    .call(d3.axisLeft().scale(yScale).tickSize(-width, 0, 0).tickFormat(""));

  // Tooltip to follow cursor on hover
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background", "burlywood")
    .style("padding", "10px")
    .style("border-radius", "5px")
    .style("opacity", 0);

  // x-axis label
  const xLabel = beerSvg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height + X_LABEL_HEIGHT_OFFSET)
    .attr("text-anchor", "middle")
    .attr("class", "axis-label")
    .text("Beer Names");

  // Title of graph
  const graphTitle = beerSvg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -20)
    .attr("class", "graph-title")
    .attr("text-anchor", "middle")
    .text("ABV of Different Beers");

  /**
   *
   * @param {object} attrs
   *      Pass in an object from BEER_ATTRS to update the data
   *      e.g. updateBeerBarChart(BEER_ATTRS.abv)
   */
  const updateBeerBarChart = (attrs = prevAttrs) => {
    const beers = Object.values(require("./beers.json")).sort(
      alphabeticalBeers
    );
    prevAttrs = attrs;

    // Limit the number of beers on screen, disable the beer button at this limit
    const beerBtn = document.getElementById("beer-btn");
    beerBtn.disabled = beers.length >= MAX_NUM_DISPLAYED_BEERS;

    xScale.domain(beers.map((beer) => smallerBeerName(beer.name))).padding(0.2);
    xAxis
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "start")
      .attr("class", "x-axis-value")
      .attr("class", "new-beer")
      .attr("dx", "5px")
      .attr("transform", () => "rotate(45)");

    // Update y-axis
    yScale.domain([0, attrs.yMax]);
    yAxis
      .transition()
      .duration(UPDATE_TRANSITION_TIME)
      .call(d3.axisLeft(yScale));

    // Update titles
    graphTitle.text(attrs.graphTitle);

    // Update Horizontal lines
    horizLines
      .transition()
      .duration(UPDATE_TRANSITION_TIME)
      .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(""));

    // Create the bars
    const bars = beerSvg.selectAll("rect").data(beers);
    addBars(bars, attrs, xScale, yScale, height, tooltip);

    // Update lower-right description box
    const description = document.getElementById("description");
    description.innerHTML = attrs.description;

    bars.exit().remove();
  };

  /**
   * Still part of DOMContentLoaded
   * Call the functions down here to initialize the main page
   */
  initialize(updateBeerBarChart);
});

/**
 * Reduce the length of a beer name
 * @param {string} beerName
 */
const smallerBeerName = (beerName) => {
  if (beerName.length < MAX_BEER_NAME_LENGTH) {
    return beerName;
  } else {
    return beerName.substring(0, MAX_BEER_NAME_LENGTH) + "...";
  }
};

/**
 * Adds bars to the bar graph that calls this function
 * @param {d3 object} bars
 * @param {object} newAttrs
 * @param {d3 scale} xScale
 * @param {d3 scale} yScale
 * @param {number} height
 * @param {html element} tooltip
 */
const addBars = (bars, newAttrs, xScale, yScale, height, tooltip) => {
  // mouse events to append to bars
  function _onMouseOverEvent(d3event, beer) {
    d3.select(this).transition("mouseover").duration(250).attr("opacity", 0.7);
    tooltip.style("opacity", 0.9);
    const ttX = d3event.pageX + TOOLTIP_WIDTH_OFFSET + "px";
    const ttY = d3event.pageY - TOOLTIP_HEIGHT_OFFSET + "px";
    tooltip
      .html(
        beer.name +
          "<br/>" +
          getBeerValue(beer, newAttrs.beerValue) +
          newAttrs.beerValueSymbol
      )
      .style("left", ttX)
      .style("top", ttY);
  }

  function _onMouseMoveEvent(d3event, beer) {
    const prefix = newAttrs.beerPrefix || "";
    tooltip
      .html(
        beer.name +
          "<br/>" +
          prefix +
          getBeerValue(beer, newAttrs.beerValue) +
          newAttrs.beerValueSymbol
      )
      .style("left", d3event.pageX + TOOLTIP_WIDTH_OFFSET + "px")
      .style("top", d3event.pageY - TOOLTIP_HEIGHT_OFFSET + "px");
  }

  function _onMouseLeaveEvent(d3event, beer) {
    d3.select(this).transition("mouseleave").duration(300).attr("opacity", 1);
    // reset tooltip, move it away to hover over rects again
    tooltip.style("opacity", 0).style("left", 0).style("top", 0);
  }

  // Setup the bars on screen
  bars
    .enter()
    .append("rect")
    // Tooltip to show up, and dims the hovered bar
    .merge(bars)
    .on("mouseover", _onMouseOverEvent)
    .on("mousemove", _onMouseMoveEvent)
    .on("mouseleave", _onMouseLeaveEvent)
    .transition()
    .duration(UPDATE_TRANSITION_TIME)
    .attr("x", (beer) => xScale(smallerBeerName(beer.name)))
    .attr("y", (beer) => {
      const beerValue = getBeerValue(beer, newAttrs.beerValue);
      return yScale(beerValue);
    })
    .attr("height", (beer) => {
      const beerValue = getBeerValue(beer, newAttrs.beerValue);
      return height - yScale(beerValue);
    })
    .attr("width", xScale.bandwidth())
    .attr("fill", "#69b3a2")
    // Stops flickering on first hover
    .attr("opacity", 0)
    .attr("opacity", 1);
};

/**
 * Setup elements on the page
 * @param {function} updateBeerBarChart
 */
const initialize = (updateBeerBarChart) => {
  initBeerList(updateBeerBarChart);
  initValueDropdownList(updateBeerBarChart);
  initInstructions();
  updateBeerBarChart(BEER_ATTRS.abv);
};

/**
 * Initialize dropdown element
 * @param {function} updateBeerBarChart
 */
const initValueDropdownList = (updateBeerBarChart) => {
  const beerDrpdwn = document.getElementById("beer-drpdwn");
  for (const beerAttr in BEER_ATTRS) {
    const option = document.createElement("option");
    option.value = beerAttr;
    option.text = BEER_ATTRS[beerAttr].yTitle;
    beerDrpdwn.appendChild(option);
  }
  beerDrpdwn.addEventListener("change", function (value) {
    const beerValue = this.options[this.selectedIndex].value;
    updateBeerBarChart(BEER_ATTRS[beerValue]);
  });
};

const initInstructions = () => {
  const instructionsBtn = document.getElementById("instructions");
  const hideInstrBtn = document.getElementById("hide-instructions");
  instructionsBtn.addEventListener("click", function () {
    const instructions = document.getElementsByClassName(
      "instructions-container"
    );
    for (let i = 0; i < instructions.length; i++) {
      instructions[i].className += " show";
    }
    instructionsBtn.className += " hide";
    hideInstrBtn.classList.remove("hide");
  });
  hideInstrBtn.addEventListener("click", function () {
    const instructions = document.getElementsByClassName(
      "instructions-container"
    );
    for (let i = 0; i < instructions.length; i++) {
      instructions[i].classList.remove("show");
    }
    instructionsBtn.classList.remove("hide");
    hideInstrBtn.className += " hide";
  });
};

/**
 * Not all beers have a direct value (beer.abv, beer.ibu)
 * This checks if there is a direct value
 * If not, we can find the min and max within beer.style
 *
 * @param {object} beer
 * @param {string} field
 *      values like 'ibu', 'abv', 'srm'
 */
const getBeerValue = (beer, field) => {
  if (beer[field]) {
    if (typeof beer[field] === "object") {
      return parseFloat(beer[field].id); // SRMs might come as an object
    }
    return parseFloat(beer[field]);
  } else if (beer.style) {
    // Min/Max vals are packaged inside beer.style
    const min = field + "Min",
      max = field + "Max";
    const minVal = parseFloat(beer.style[min]),
      maxVal = parseFloat(beer.style[max]);
    // value may not exist, return 0 if so
    return (maxVal + minVal) / 2 || 0;
  }
  return 0;
};

/**
 * Sort beers by name
 * @param {beer object} a
 * @param {beer object} b
 */
const alphabeticalBeers = (a, b) => {
  const aName = a.name.replace(/^[^a-z\d]*|[^a-z\d]*$/gi, "").toUpperCase();
  const bName = b.name.replace(/^[^a-z\d]*|[^a-z\d]*$/gi, "").toUpperCase();
  if (aName < bName) {
    return -1;
  } else if (aName > bName) {
    return 1;
  }
  return 0;
};
