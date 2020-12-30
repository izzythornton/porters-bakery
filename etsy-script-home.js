'use strict';

/********** ETSY API **********/
// https://www.etsy.com/developers/documentation/

const apiKey = "a1is6j5a1p6g0h9gtdmz04t9";
const secret = "72ecjuab6y";
const userId = "";
const shopId = "26533762";

/* INDEX FUNCTIONS */

function getShopAbout() {
    console.log("loading about");
    fetch("https://openapi.etsy.com/v2/shops/" + shopId + "/about?api_key=" + apiKey)
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

function displayAbout(responseJson) {
    console.log("displaying about");
    $(".about").append(`
    <h1>${responseJson.results[0].story_headline}</h1>
    <p>${responseJson.results[0].story}</p>
    `)
}

$(getShopAbout);