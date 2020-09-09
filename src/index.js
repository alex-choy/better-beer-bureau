import "./styles/main.css";
// alert("connected js");
import { breweryAPIKey } from "./config/keys_dev";
import * as d3 from "d3";
const proxyurl = "https://cors-anywhere.herokuapp.com/"; // Adds Acces-Control-Allow-Origin header to the request
document.addEventListener("DOMContentLoaded", () => {
    setBeerBarGraph();
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

//   const svg = d3.select("#dataviz_area");
//   svg
//     .append("circle")
//     .attr("cx", 2)
//     .attr("cy", 3)
//     .attr("r", 40)
//     .style("fill", "blue");
//   svg
//     .append("circle")
//     .attr("cx", 140)
//     .attr("cy", 70)
//     .attr("r", 40)
//     .style("fill", "red");

//   const addCircleBtn = document.getElementById("add-circle-btn");
//   addCircleBtn.addEventListener("click", () => {
//     const svg = d3.select("#dataviz_area");
//     svg
//       .append("circle")
//       .attr("cx", 200)
//       .attr("cy", 100)
//       .attr("r", 40)
//       .style("fill", "yellow");

    // var x = d3.scaleLinear()
    //     .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
    //     .range([0, 400]);
    // console.log(x(1000));
//   });
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

//   showBars();


  // avg IBU = (style.ibuMin + style.ibuMax) / 2, some may have ibu, check that first
  // abv
  // category: style.category.name||id
  // SRM is color of beer (0 is light, 40+ is dark)
  // ogmin/max is original gravity, meaning it converts more sugar into alcohol, higher ABV and less IBU?
  // fgmin/max is fermented gravity, lower than og,


  // how to re-load new beers?
  // append on to the current list?
  // re-fetch all the beers? (bad idea)
  // 
});


const setBeerBarGraph = () => {
    const beers = [
    {
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
        }
    },
        {
        id: "zTTWa2",
        name: "11.5° PLATO",
        nameDisplay: "11.5° PLATO",
        description:
            "The Plato scale is a measurement of the density of liquid. The number tells brewers how big or small a resulting beer will be—the larger the number the bigger the beer. We designed 11.5° Plato—a lower number on the beer scale—to give us just enough body to support a heavy heap of hops. The result is an easy-drinking session IPA which satisfies the thirst for hops, but urges you to have another round.",
        abv: "4.5",
        ibu: "35",
        styleId: 164,
        isOrganic: "N",
        isRetired: "N",
        status: "verified",
        statusDisplay: "Verified",
        originalGravity: "1.046",
        createDate: "2016-08-09 14:44:42",
        updateDate: "2018-11-02 02:15:14",
        style: {
            id: 164,
            categoryId: 3,
            category: {
            id: 3,
            name: "North American Origin Ales",
            createDate: "2012-03-21 20:06:45",
            },
            name: "Session India Pale Ale",
            shortName: "Session IPA",
            description:
            "Session India Pale Ales are gold to copper. Chill haze is allowable at cold temperatures and hop haze is allowable at any temperature. Fruity-ester aroma is light to moderate. Hop aroma is medium to high with qualities from a wide variety of hops from all over the world. Low to medium maltiness is present. Hop flavor is strong, characterized by flavors from a wide variety of hops. Hop bitterness is medium to high. Fruity-ester flavors are low to moderate. Diacetyl is absent or at very low levels. Body is low to medium.",
            createDate: "2015-04-07 17:07:27",
        },
        },
        {
            id: "zfP2fK",
            name: "12th Of Never",
            nameDisplay: "12th Of Never",
            description:
                "Tropically Hoppy. Light, yet Full-Bodied. Bright and Citrusy. Word.\r\nThe magical, mystical 12th of Never is a blend of Old and New School hops that play bright citrus, rich coconut, and papaya-esque flavors, all on a solid stage of English puffed wheat. Tropically hoppy. Light, yet full-bodied. Bright and citrusy. The 12th of Never Ale is everything we’ve learned about making hop-forward beer expressed in a moderate voice.  Pale, cold, slightly alcoholic and bitter.  It’s all we know.\r\n\r\nThese 12oz mini-kegs (AKA cans) are an exciting new option for us, and we are stoopid stoked at the opportunity for y'all to take us to all those new, nelophobic locations…",
            abv: "5.5",
            ibu: "45",
            availableId: 1,
            styleId: 25,
            isOrganic: "N",
            isRetired: "N",
            labels: {
                icon:
                "https://brewerydb-images.s3.amazonaws.com/beer/zfP2fK/upload_nSMNjh-icon.png",
                medium:
                "https://brewerydb-images.s3.amazonaws.com/beer/zfP2fK/upload_nSMNjh-medium.png",
                large:
                "https://brewerydb-images.s3.amazonaws.com/beer/zfP2fK/upload_nSMNjh-large.png",
                contentAwareIcon:
                "https://brewerydb-images.s3.amazonaws.com/beer/zfP2fK/upload_nSMNjh-contentAwareIcon.png",
                contentAwareMedium:
                "https://brewerydb-images.s3.amazonaws.com/beer/zfP2fK/upload_nSMNjh-contentAwareMedium.png",
                contentAwareLarge:
                "https://brewerydb-images.s3.amazonaws.com/beer/zfP2fK/upload_nSMNjh-contentAwareLarge.png",
            },
            status: "verified",
            statusDisplay: "Verified",
            foodPairings:
                "Pizza, Spicy Thai, Korean, or Indian food, Pizza, Whitefish (without heavy sauces) like Sea Bass, Trout, & Most Lake Fish, & Pizza",
            originalGravity: "1.05",
            createDate: "2016-08-03 23:25:54",
            updateDate: "2018-11-02 02:15:14",
            available: {
                id: 1,
                name: "Year Round",
                description: "Available year round as a staple beer.",
            },
            style: {
                id: 25,
                categoryId: 3,
                category: {
                    id: 3,
                    name: "North American Origin Ales",
                    createDate: "2012-03-21 20:06:45",
                },
                name: "American-Style Pale Ale",
                shortName: "American Pale",
                description:
                'American pale ales range from deep golden to copper in color. The style is characterized by fruity, floral and citrus-like American-variety hop character producing medium to medium-high hop bitterness, flavor, and aroma. Note that the "traditional" style of this beer has its origins with certain floral, fruity, citrus-like, piney, resinous, or sulfur-like American hop varietals. One or more of these hop characters is the perceived end, but the perceived hop characters may be a result of the skillful use of hops of other national origins. American pale ales have medium body and low to medium maltiness. Low caramel character is allowable. Fruity-ester flavor and aroma should be moderate to strong. Diacetyl should be absent or present at very low levels. Chill haze is allowable at cold temperatures.',
                ibuMin: "30",
                ibuMax: "42",
                abvMin: "4.5",
                abvMax: "5.6",
                srmMin: "6",
                srmMax: "14",
                ogMin: "1.044",
                fgMin: "1.008",
                fgMax: "1.014",
                createDate: "2012-03-21 20:06:45",
                updateDate: "2015-04-07 15:25:18",
            },
        },
        {
            id: "xwYSL2",
            name: "15th Anniversary Ale",
            nameDisplay: "15th Anniversary Ale",
            description:
                "For the ﬁrst ever SweetWater anniversary beer (yeah it took us 15 years), we went back to our roots, dusted off our original ESB recipe, and gave it a big ol’ bump. The recipe consists of 7 malts, one of which Kevin toasted personally in his toaster oven, just like the old days, and 5 different styles of hops. In true SweetWater style, there is no style, but it’s big, bold, and meant to grow old, meaning this beer will be fantastic out of the gate, or you can lay her down in the cellar for many years to come.",
            styleId: 5,
            isOrganic: "N",
            isRetired: "N",
            status: "verified",
            statusDisplay: "Verified",
            createDate: "2015-04-16 15:44:15",
            updateDate: "2018-11-02 02:15:14",
            style: {
                id: 5,
                categoryId: 1,
                category: {
                    id: 1,
                    name: "British Origin Ales",
                    createDate: "2012-03-21 20:06:45",
                },
                name: "Extra Special Bitter",
                shortName: "ESB",
                description:
                "Extra special bitter possesses medium to strong hop aroma, flavor, and bitterness. The residual malt and defining sweetness of this richly flavored, full-bodied bitter is more pronounced than in other styles of bitter. It is light amber to copper colored with medium to medium-high bitterness. Mild carbonation traditionally characterizes draft-cask versions, but in bottled versions, a slight increase in carbon dioxide content is acceptable. Fruity-ester character is acceptable in aroma and flavor. Diacetyl (butterscotch character) is acceptable and characteristic when at very low levels. The absence of diacetyl is also acceptable. Chill haze is allowable at cold temperatures. English or American hops may be used. (English and American hop character may be specified in subcategories.)",
                ibuMin: "30",
                ibuMax: "45",
                abvMin: "4.8",
                abvMax: "5.8",
                srmMin: "8",
                srmMax: "14",
                ogMin: "1.046",
                fgMin: "1.01",
                fgMax: "1.016",
                createDate: "2012-03-21 20:06:45",
                updateDate: "2015-04-07 15:19:20",
            },
        },
    ];

    const margin = 60;
    const width = 1000 - (2 * margin);
    const height = 600 - (2 * margin);   
    const beerBar = d3.select("#beer-bar")
        .attr('height', width + margin * 2)
        .attr('width', width);

    const barChart = beerBar.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);
    
    const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 10]);
    barChart.append('g')
        .call(d3.axisLeft(yScale));

    const xScale = d3.scaleBand()
        .range([0, width])
        .domain(beers.map((beer) => beer.name))
        .padding(0.2);
    barChart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    barChart.selectAll()
        .data(beers)
        .enter()
        .append('rect')
        .attr('x', (beer) => xScale(beer.name))
        .attr('y', (beer) => {
            // if(beer.abv) {
            //     return yScale(parseFloat(beer.abv));
            // }
            const { abvMin, abvMax } = beer.style;
            // console.log(`avg: ${(parseFloat(abvMax) + parseFloat(abvMin)) / 2}`);
            const avgAbv = (parseFloat(abvMax) + parseFloat(abvMin)) / 2;
            console.log(typeof avgAbv);
            return yScale(avgAbv);
        })
        .attr('height', (beer) => height - yScale(beer.abv))
        .attr('width', xScale.bandwidth())
}