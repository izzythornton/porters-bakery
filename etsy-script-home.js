'use strict';

/********** ETSY API **********/
// https://www.etsy.com/developers/documentation/

const apiKey = "a1is6j5a1p6g0h9gtdmz04t9";
const secret = "72ecjuab6y";
const userId = "";
const shopId = "26533762";

/* INDEX FUNCTIONS */

// Pull the "about" data for the shop identified with the shopId variable
function getShopAbout() {
    console.log("loading about");
    fetch("https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/shops/" + shopId + "/about?api_key=" + apiKey)
        .then (response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayAbout(responseJson))
        .catch(err => {
            $("#js-error-message").text(`Uh oh! Something unexpected happened: ${err.message}`);
    });
}

// Display the "about" data fetched in the getShopAbout function
function displayAbout(responseJson) {
    console.log("displaying about");
    console.log(responseJson);
    $(".about").append(`
    <h1>${responseJson.results[0].story_headline}</h1>
    <p>${responseJson.results[0].story}</p>
    `)
}

// This starts rendering the page by immediately running getShopAbout, which will then run displayAbout.
$(getShopAbout);