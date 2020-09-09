import "./styles/main.css";
// alert("connected js");
import { breweryAPIKey } from './config/keys_dev';
import * as d3 from 'd3';
const proxyurl = "https://cors-anywhere.herokuapp.com/"; // Adds Acces-Control-Allow-Origin header to the request
document.addEventListener("DOMContentLoaded", () => {
    // const req = new XMLHttpRequest();
    // req.open(
    //   "GET",
    //   `${proxyurl}https://sandbox-api.brewerydb.com/v2/beer/c4f2KE/?key=${breweryAPIKey}`
    // );
    // req.onload = () => {
    //     console.log(JSON.parse(req.response).data);
    // }
    // const res = req.send();
    // const d3div = document.getElementById("d3-div");
    // const d3div = d3.select("#d3-div");

    const svg = d3.select("#dataviz_area");
    svg.append("circle").attr("cx", 2).attr("cy", 3).attr("r", 40).style("fill", "blue");
    svg.append("circle").attr("cx", 140).attr("cy", 70).attr("r", 40).style("fill", "red");
    // const divs = d3.selectAll("div");
    // divs.style("color", "red");
    // const table = d3.create("table");
    // const tbody = table.append("tbody");
    // tbody.append("tr").append("td").text("First!");
    // tbody.append("tr").append("td").text("Second.");
    // tbody.append("tr").append("td").text("Third.");
    // d3div.append("table");
    // divs.node().appendChild(table);
    // divs.append("table").style("background", "blue").append("tbody").append("tr").text("first").append("tr").text("second");
    // d3div.innerText = "Hello world";
    const addCircleBtn = document.getElementById("add-circle-btn");
    addCircleBtn.addEventListener("click", () => {
        const svg = d3.select("#dataviz_area");
        svg.append("circle").attr("cx", 200).attr("cy", 100).attr("r", 40).style("fill", "yellow");
        
        // var x = d3.scaleLinear()
        //     .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
        //     .range([0, 400]);   
        // console.log(x(1000));
    });

    // Margin tutorial
    const margin = {top: 10, right: 40, bot: 30, left: 30};
    const width = 450 - margin.right - margin.left;
    const height = 400 - margin.top - margin.bot;
    const area = d3.select("#Area")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bot)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X scale and axis, wrap 'x' coords to display along x-axis
    // turns each coord into a percentage
    const xScale = d3.scaleLinear()
        .domain([0, 100]) // [min, max] of the data (shown on screen)
        .range([0, width]); // [min, max] actual values to take & convert to %
    area.append("g")
      .attr("transform", "translate(0," + height + ")") // push the x axis down from the top of the page
      .call(d3.axisBottom(xScale));

    // wrap 'y' coords with this to display in the proper y-axis
    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);
    area.append("g")
        .call(d3.axisLeft(yScale));

    area.append("circle").attr("cx", 100).attr("cy", function(){ return yScale(70)}).attr("r", 40).style("fill", "red");

    const data = [{x: 10, y: 20}, {x:40, y: 90}, {x: 80, y: 50}];

    area.selectAll("whatever")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d){return xScale(d.x)})
            .attr("cy", function(d){return yScale(d.y)})
            .attr('r', 7)


})