'use strict';

/********** ETSY API **********/
// https://www.etsy.com/developers/documentation/

const apiKey = "a1is6j5a1p6g0h9gtdmz04t9";
const secret = "72ecjuab6y";
const userId = "";
const shopId = "26533762";

/* SHOP FUNCTIONS */

// This searches the identified Etsy shop for every active listing (to leave out anything inactive). It adds additional data to the API call, images, to fully render the content.
function findAllShopListingsActive() {
    console.log("finding listings");
    fetch("https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/shops/" + shopId + "/listings/active?includes=Images&api_key=" + apiKey)
        .then (response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayListings(responseJson))
        .catch(err => {
            $("#js-error-message").text(`Uh oh! Something unexpected happened: ${err.message}`);
    })
}

// This displays listings with the data found in the previous API call, findAllShopListingsActive.
function displayListings(responseJson) {
    console.log("displaying listings");
    for (let i = 0; i < responseJson.results.length && i < 10; i++) {
        $(".shop").prepend(`
        <ul class="shop-list">
            <li class="shop-item title">${responseJson.results[i].title}</li>
            <li class="shop-item description">${responseJson.results[i].description}</li>
            <li class="shop-item listing-img"><img src=${responseJson.results[i].Images[0].url_170x135} alt="image of the product"></li>
            <li class="shop-item details">$${responseJson.results[i].price} for ${responseJson.results[i].quantity} treats</li>
            <li class="shop-item button"><button type="button"><a href="${responseJson.results[i].url}">Purchase on Etsy</a></button></li>
        </ul>
        `)};
}

// This starts rendering the page by immediately running findAllShopListingsActive, which will then run displayListings.
$(findAllShopListingsActive);