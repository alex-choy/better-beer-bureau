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
    const d3div = d3.select("#d3-div");
    // const divs = d3.selectAll("div");
    // divs.style("color", "red");
    const table = d3.create("table");
    const tbody = table.append("tbody");
    tbody.append("tr").append("td").text("First!");
    tbody.append("tr").append("td").text("Second.");
    tbody.append("tr").append("td").text("Third.");
    d3div.append("table");
    // divs.node().appendChild(table);
    // divs.append("table").style("background", "blue").append("tbody").append("tr").text("first").append("tr").text("second");
    // d3div.innerText = "Hello world";
})