'use strict';

/********** ETSY API **********/
// https://www.etsy.com/developers/documentation/

const apiKey = "a1is6j5a1p6g0h9gtdmz04t9";
const secret = "72ecjuab6y";
const userId = "";
const shopId = "26533762";

/* SHOP FUNCTIONS */

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


function displayListings(responseJson) {
    console.log("displaying listings");
    console.log(responseJson);
    for (let i = 0; i < responseJson.results.length && i < 10; i++) {
        console.log(responseJson.results[i]);
        $(".shop").prepend(`
        <ul class="shop-flex-container">
            <li class="shop-item"><h3>${responseJson.results[i].title}</h3></li>
            <li class="shop-item"><h4>${responseJson.results[i].description}</h4>
            <li class="shop-item"><img src=${responseJson.results[i].Images[0].url_170x135}></img></li>
            <li class="shop-item">$${responseJson.results[i].price} for ${responseJson.results[i].quantity} treats</li>
            <li class="shop-item"><button type="button"><a href="${responseJson.results[i].url}">Purchase on Etsy</a></button></li>
        </ul>
        `)};
}

$(findAllShopListingsActive);