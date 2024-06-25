const axios = require("axios");
require("dotenv").config();
async function googleSearch(query) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const cseId = process.env.GOOGLE_CSE_ID;
  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cseId}&q=${query}`;

  try {
    const response = await axios.get(url);
    const items = response.data.items;
    if (items) {
      // Extract and return the title, snippet, and link of the first result
      const firstResult = items[0];
      return {
        title: firstResult.title,
        snippet: firstResult.snippet,
        link: firstResult.link,
      };
    } else {
      return { error: "No results found" };
    }
  } catch (error) {
    console.error("Error performing Google Search:", error);
    return { error: "Error performing search" };
  }
}
module.exports = { googleSearch };
