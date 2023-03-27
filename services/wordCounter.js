import * as cheerio from "cheerio";
import fetch from "node-fetch";

//const url = 'https://www.github.com';

async function getWebsiteHTML(url) {
  let structure = await fetch(url)
    .then((response) => response.text())
    .then((html) => {
      const $ = cheerio.load(html);
      const mainContentTemp = $("body").contents();
      console.log(mainContentTemp);
      const mainContent = $("body")
        .find("*")
        .not("script,style")
        .contents()
        .filter(function () {
          return this.nodeType === 3; // nodeType 3 is text
        })
        .text();
      return mainContent;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });

  return structure;
}

export default async function websiteWordCounter(url) {
  try {
    let structure = await getWebsiteHTML(url);
    const wordCount = structure.trim().split(/\s+/).length;
    return wordCount;
  } catch (error) {
    throw error;
  }
}
