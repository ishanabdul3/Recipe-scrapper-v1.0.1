// const SAVE_RECIPE_ENDPOINT = 'https://postb.in/1639249478718-1267745445948';
//test endpoint
const SAVE_RECIPE_ENDPOINT =
  'https://mocki.io/v1/8424bfa0-766f-4c21-ae3e-6c39e7030388';

document.addEventListener('keydown', (e) => {
  if (e.key === 'F4' || e.key === 's') {
    console.log('Scraping recipe...');
    let scrapedData = scrapeRecipe();
    console.log('Scraped recipe: ', { Recipe: scrapedData });
    console.log(`Sending payload to POST endpoint at: `, SAVE_RECIPE_ENDPOINT);
    chrome.runtime.sendMessage(
      {
        from: 'send save recipe to external API',
        scrapedData: scrapedData,
        url: SAVE_RECIPE_ENDPOINT,
      },
      function (response) {
        if (response.success) {
          console.log(`Success saving the scraped recipe to API`);
        } else {
          console.log(`Failed saving the scraped recipe to API`);
        }
      }
    );
    e.preventDefault();
  }
});

// scrape
function scrapeRecipe() {
  let recipeProperties = {};
  let recipePropertiesDiv = document.getElementsByClassName('recipe-meta-item');
  for (let index = 0; index < recipePropertiesDiv.length; index++) {
    let recipePropertyText = recipePropertiesDiv[index].children[0].innerHTML;
    let recipePropertyValue = recipePropertiesDiv[index].children[1].innerHTML;

    //cleaning data
    recipePropertyText = recipePropertyText.toLowerCase().trim().split(':')[0];
    recipePropertyValue = recipePropertyValue.toLowerCase().trim();
    recipePropertyValue = isNumeric(recipePropertyValue)
      ? Number(recipePropertyValue)
      : recipePropertyValue;

    recipeProperties[recipePropertyText] = recipePropertyValue;
  }
  return recipeProperties;
}

function isNumeric(value) {
  return /^\d+$/.test(value);
}
