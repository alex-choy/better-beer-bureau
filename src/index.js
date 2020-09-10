import "./styles/main.css";
// alert("connected js");
import { breweryAPIKey } from "./config/keys_dev";
import * as d3 from "d3";
import { transition } from "d3";
import { BEER_ATTRS } from './beerAttrs';
import { beers } from './beers';
const TOOLTIP_HEIGHT_OFFSET = 65;
const UPDATE_TRANSITION_TIME = 1000;
const PROXY_URL = "https://cors-anywhere.herokuapp.com/"; // Adds Acces-Control-Allow-Origin header to the request



document.addEventListener("DOMContentLoaded", () => {
    const margin = 60;
    const width = 600 - 2 * margin;
    const height = 450 - 2 * margin;
    const beerSvg = d3
        .select("#beer-bar")
        .attr("height", width + margin * 2)
        .attr("width", width + margin * 2)
        .append('g')
            .attr('transform', `translate(${margin}, ${margin})`)


    // Y-axis scale 
    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 100]);
    const yAxis = beerSvg.append('g')
        .call(d3.axisLeft(yScale));
    
    // x-axis scale for beer names
    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(beers.map((beer) => beer.name))
        .padding(0.2);
    const xAxis = beerSvg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    // horizontal lines across graph
    const horizLines = beerSvg
        .append("g")
        .attr("class", "grid")
        .call(
            d3.axisLeft().scale(yScale).tickSize(-width, 0, 0).tickFormat("")
        );

    // Tooltip to follow cursor on hover
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "burlywood")
        .style("padding", "10px")
        .style("border-radius", "5px")
        .style("opacity", 0);
    
    // y-axis label
    const yLabel = beerSvg.append('text')
        .attr('x', -(height / 2) )
        .attr('y', -margin / 2)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('ABVs');

    // x-axis label
    const xLabel = beerSvg
        .append("text")
            .attr("x", width / 2)
            .attr("y", height + 125)
            .attr("text-anchor", "middle")
            .text("Beer Names");
    
    // Title of graph
    const graphTitle = beerSvg
        .append("text")
        .attr("x", width / 2)
        .attr("y", -20)
        .attr("text-anchor", "middle")
        .attr("class", "graph-title")
        .text('ABV of Different Beers');

    /**
     * 
     * @param {object} attrs
     *      Pass in an object from BEER_ATTRS to update the data
     *      e.g. updateBeerBarChart(BEER_ATTRS.abv) 
     */
    function updateBeerBarChart(attrs) {
        // Update x-axis
        xScale.domain(beers.map((beer) => beer.name)).padding(0.2);
        xAxis.call(d3.axisBottom(xScale))
            .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-10px")
                .attr('transform', () => "rotate(-30)")

        // Update y-axis
        yScale.domain([0, attrs.yMax]);
        yAxis.transition().duration(UPDATE_TRANSITION_TIME).call(d3.axisLeft(yScale));

        // Update titles
        yLabel.text(attrs.yTitle);
        graphTitle.text(attrs.graphTitle);

        // Update Horizontal lines
        horizLines.transition().duration(UPDATE_TRANSITION_TIME).call(
          d3.axisLeft(yScale).tickSize(-width).tickFormat("")
        );

        // Create the bars
        const bars = beerSvg.selectAll("rect").data(beers);
        addBars(bars, attrs, xScale, yScale, height, tooltip);

        bars.exit().remove();
    }
    updateBeerBarChart(BEER_ATTRS.abv);
    initDropdownList(updateBeerBarChart);
  // category: style.category.name||id
  // SRM is color of beer (0 is light, 40+ is dark)
  // ogmin/max is original gravity, meaning it converts more sugar into alcohol, higher ABV and less IBU?
  // fgmin/max is fermented gravity, lower than og,


  // how to re-load new beers?
  // append on to the current list?
  // re-fetch all the beers? (bad idea)
  // 
});

const addBars = (bars, attrs, xScale, yScale, height, tooltip) => {
    function _onMouseOverEvent(d3event, beer) {
        d3.select(this).transition("mouseover").duration(250).attr("opacity", 0.8);
        tooltip.style('opacity', .95);
        setToolTip(tooltip, beer, d3event);
    };
    
    const _onMouseMoveEvent = (d3event, beer) => {
        setToolTip(beer, d3event);
    };
    
    function _onMouseLeaveEvent(d3event, beer) {
        d3.select(this).transition("mouseleave").duration(300).attr("opacity", 1);
        tooltip.style("opacity", 0);
    }

    const setToolTip = (beer, d3event) => {
        tooltip.html(beer.name + "<br/>" + attrs.prefix 
            + getBeerValue(beer, attrs.beerValue) + attrs.beerValueSymbol)
            .style("left", d3event.pageX  + 15 + "px")
            .style("top", d3event.pageY - TOOLTIP_HEIGHT_OFFSET + "px")
    };

    bars.enter()
        .append("rect")
        // Tooltip to show up, and dims the hovered bar
        .on('mouseover', _onMouseOverEvent)
        .on('mousemove', _onMouseMoveEvent)
        .on('mouseleave', _onMouseLeaveEvent)
        .merge(bars)
        .transition()
        .duration(UPDATE_TRANSITION_TIME * 1.2)
            .attr("x", beer => xScale(beer.name))
            .attr("y", beer => {
                const beerValue = getBeerValue(beer, attrs.beerValue);
                return yScale(beerValue);
            })
            .attr("height", beer => {
                const beerValue = getBeerValue(beer, attrs.beerValue);
                return height - yScale(beerValue);
            })
            .attr("width", xScale.bandwidth())
            .attr("fill", "#69b3a2")    
            // Stops flickering on first hover
            .attr("opacity", 0)
            .attr("opacity", 1);
};

const initDropdownList = (updateBeerBarChart) => {
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
    if(beer[field]) {
        return parseFloat(beer[field]);
    } else {
        const min = field + 'Min', max = field + 'Max';
        const minVal = parseFloat(beer.style[min]),
              maxVal = parseFloat(beer.style[max]);
        // value may not exist, return 0 if so
        return (maxVal + minVal) / 2 || 0;
    }
}
