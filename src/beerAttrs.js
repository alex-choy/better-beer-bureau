const ABV_MAX_Y = 10;
const IBU_MAX_Y = 100;
const SRM_MAX_Y = 40;
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
    prefix: "ABV: ",
  },
  ibu: {
    yMax: IBU_MAX_Y,
    yTitle: "IBUs",
    graphTitle: "IBU of Different Beers",
    beerValue: IBU,
    beerValueSymbol: " IBUs",
    prefix: "IBU: ",
  },
  srm: {
    yMax: SRM_MAX_Y,
    yTitle: "SRM",
    graphTitle: "SRM of Different Beers",
    beerValue: SRM,
    beerValueSymbol: " SRMs",
    prefix: "SRM: "
  },
};
