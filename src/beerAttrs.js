const ABV_MAX_Y = 12;
const IBU_MAX_Y = 100;
const SRM_MAX_Y = 50;
const IBU = "ibu";
const ABV = "abv";
const SRM = "srm";
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
  ibu: {
    yMax: IBU_MAX_Y,
    yTitle: "IBUs",
    graphTitle: "IBUs of Different Beers",
    beerValue: IBU,
    beerValueSymbol: " IBUs",
    description:
      '<span class="desc-title">International Bitterness Unit (IBU)</span> is a measure of bitterness in a beer. The range of IBUs is typically <span class="desc-range">between 0 and 100 IBUs</span>, but beers may go beyond 100 IBUs. A higher number will result in a more bitter beer (IPAs), while a lower number will be less bitter (any light beer). ',
  },
  srm: {
    yMax: SRM_MAX_Y,
    yTitle: "SRM",
    graphTitle: "SRMs of Different Beers",
    beerValue: SRM,
    beerValueSymbol: " SRMs",
    description:
      '<span class="desc-title">Standard Reference Method (SRM)</span> represents the color of a beer. Most SRMs range <span class="desc-range">between 0 and 40 SRM</span>, but may go beyond a SRM of 40. A lower number indicates a lighter colored beer (pale ales) while a higher number indicates a darker beer (stouts).',
  },
};
