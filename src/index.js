import "./styles/main.css";
// alert("connected js");
import { breweryAPIKey } from "./config/keys_dev";
import * as d3 from "d3";
const proxyurl = "https://cors-anywhere.herokuapp.com/"; // Adds Acces-Control-Allow-Origin header to the request
document.addEventListener("DOMContentLoaded", () => {
  // const req = new XMLHttpRequest();
  // req.open(
  //   "GET",
  //   `${proxyurl}https://sandbox-api.brewerydb.com/v2/beer/c4f2KE/?key=${breweryAPIKey}`
  // );
  // req.onload = () => {
  //     console.log((req.response));
  // }
  // const res = req.send();
  // const d3div = document.getElementById("d3-div");
  // const d3div = d3.select("#d3-div");

  const svg = d3.select("#dataviz_area");
  svg
    .append("circle")
    .attr("cx", 2)
    .attr("cy", 3)
    .attr("r", 40)
    .style("fill", "blue");
  svg
    .append("circle")
    .attr("cx", 140)
    .attr("cy", 70)
    .attr("r", 40)
    .style("fill", "red");

  const addCircleBtn = document.getElementById("add-circle-btn");
  addCircleBtn.addEventListener("click", () => {
    const svg = d3.select("#dataviz_area");
    svg
      .append("circle")
      .attr("cx", 200)
      .attr("cy", 100)
      .attr("r", 40)
      .style("fill", "yellow");

    // var x = d3.scaleLinear()
    //     .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
    //     .range([0, 400]);
    // console.log(x(1000));
  });
  const marginDataTutorial = () => {
    // Margin / Data tutorial
    const margin = { top: 10, right: 40, bot: 30, left: 30 };
    const width = 450 - margin.right - margin.left;
    const height = 400 - margin.top - margin.bot;
    const area = d3
      .select("#Area")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bot)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X scale and axis, wrap 'x' coords to display along x-axis
    // turns each coord into a percentage
    const xScale = d3
      .scaleLinear()
      .domain([0, 100]) // [min, max] of the data (shown on screen), expected input
      .range([0, width]); // output in px, [start, end] convert input to px
    area
      .append("g")
      .attr("transform", "translate(0," + height + ")") // push the x axis down from the top of the page
      .call(d3.axisBottom(xScale));

    // wrap 'y' coords with this to display in the proper y-axis
    const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]); // reverses the scale (because y scale goes from top to bot)
    area.append("g").call(d3.axisLeft(yScale));

    area
      .append("circle")
      .attr("cx", 100)
      .attr("cy", function () {
        return yScale(70);
      })
      .attr("r", 40)
      .style("fill", "red");

    const data = [
      { x: 10, y: 20 },
      { x: 40, y: 90 },
      { x: 80, y: 50 },
    ];

    area
      .selectAll("whatever")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return xScale(d.x);
      })
      .attr("cy", function (d) {
        return yScale(d.y);
      })
      .attr("r", 7);
  };

  const showBars = () => {
    const margins = { top: 10, right: 10, bot: 30, left: 40 },
      width = 400 - margins.left - margins.right,
      height = 450 - margins.top - margins.bot;

    const bars = d3
      .select("#bars")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr(
        "transform",
        "translate(" + margins.left + "," + -margins.bot + ")"
      );

    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv",
      function (data) {
        // console.log('data', typeof data);
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
        }
        const xScale = d3
          .scaleBand()
          .domain(data.Country)
          .range([0, width])
          .padding(0.2);
        bars
          .append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(xScale))
          .selectAll("text")
          .attr("transform", "translate(-30, 0)rotate(-45)")
          .style("text-anchor", "end");

        const yScale = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
        bars.append("g").call(d3.axisLeft(yScale));

        bars
          .selectAll("mybar")
          .data(data)
          .attr("x", xScale(data.Country))
          .attr("y", yScale(data.Value))
          .attr("width", xScale.bandwidth())
          .attr("height", height - yScale(data.Value))
          .attr("fill", "69b3a2");
      }
    );
  };

  showBars();

  const muricanPilsner = {
    id: "c4f2KE",
    name: "'Murican Pilsner",
    nameDisplay: "'MuricanPilsner",
    abv: "5.5",
    glasswareId: 4,
    styleId: 98,
    isOrganic: "N",
    isRetired: "N",
    labels: {
      icon:
        "https://brewerydb-images.s3.amazonaws.com/beer/c4f2KE/upload_jjKJ7g-icon.png",
      medium:
        "https://brewerydb-images.s3.amazonaws.com/beer/c4f2KE/upload_jjKJ7g-medium.png",
      large:
        "https://brewerydb-images.s3.amazonaws.com/beer/c4f2KE/upload_jjKJ7g-large.png",
      contentAwareIcon:
        "https://brewerydb-images.s3.amazonaws.com/beer/c4f2KE/upload_jjKJ7g-contentAwareIcon.png",
      contentAwareMedium:
        "https://brewerydb-images.s3.amazonaws.com/beer/c4f2KE/upload_jjKJ7g-contentAwareMedium.png",
      contentAwareLarge:
        "https://brewerydb-images.s3.amazonaws.com/beer/c4f2KE/upload_jjKJ7g-contentAwareLarge.png",
    },
    status: "verified",
    statusDisplay: "Verified",
    createDate: "2013-08-19 11:58:12",
    updateDate: "2018-11-02 02:15:14",
    glass: { id: 4, name: "Pilsner", createDate: "2012-01-03 02:41:33" },
    style: {
      id: 98,
      categoryId: 8,
      category: {
        id: 8,
        name: "North American Lager",
        createDate: "2012-03-21 20:06:46",
      },
      name: "American-Style Pilsener",
      shortName: "American Pilsener",
      description:
        "This classic and unique pre-Prohibition American-style Pilsener is straw to deep gold in color. Hop bitterness, flavor and aroma are medium to high, and use of noble-type hops for flavor and aroma is preferred. Up to 25 percent corn and/or rice in the grist should be used. Malt flavor and aroma are medium. This is a light-medium to medium-bodied beer. Sweet corn-like dimethylsulfide (DMS), fruity esters and American hop-derived citrus flavors or aromas should not be perceived. Diacetyl is not acceptable. There should be no chill haze. Competition organizers may wish to subcategorize this style into rice and corn subcategories.",
      ibuMin: "25",
      ibuMax: "40",
      abvMin: "5",
      abvMax: "6",
      srmMin: "3",
      srmMax: "6",
      ogMin: "1.045",
      fgMin: "1.012",
      fgMax: "1.018",
      createDate: "2012-03-21 20:06:46",
      updateDate: "2015-04-07 15:40:08",
    },
  };
  // avg IBU = (style.ibuMin + style.ibuMax) / 2
  // abv
  // category: style.category.name||id
  // SRM is color of beer (0 is light, 40+ is dark)
  // ogmin/max is original gravity, meaning it converts more sugar into alcohol, higher ABV and less IBU?
  // fgmin/max is fermented gravity, lower than og,
});
