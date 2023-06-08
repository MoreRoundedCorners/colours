import axios from "axios";
import cheerio from "cheerio";

const url = " https://www.grailed.com/shop/UbX0nOH3nw";

const scraper = async () => {
  try {
    const { data } = await axios.get(url);
    console.log(data);
    const $ = cheerio.load(data);
    const results = [];
    $(".feed").each((index, element) => {
      const clothesImage = $(element)
        .find(".feed-item a .listing-coverPhoto .lazyload-wrapper img")
        .attr("src");

      results.push({ clothesImage });
    });
    console.log(results);
    return results; // Make sure to return the stats array
  } catch (error) {
    console.log(error);
  }
};

export { scraper };
scraper();
