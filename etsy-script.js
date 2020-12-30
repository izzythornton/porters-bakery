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


/* SHOP FUNCTIONS */

function findAllShopListingsActive() {
    console.log("finding listings");
    fetch("https://openapi.etsy.com/v2/shops/" + shopId + "/listings/active?api_key=" + apiKey)
        .then (response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            console.log(responseJson);
            const listings = [];
            const listingId = [];
            for (let i = 0; i < responseJson.results.length && i < 5; i++) {
                listings.push(responseJson.results[i]);
                listingId.push(responseJson.results[i].listing_id);
            }
            getImgListingUrls(listingId, listings);
        })
        .catch(err => {
            $("#js-error-message").text(`Uh oh! Something unexpected happened: ${err.message}`);
    })
}

function getImgListingUrls(listingId, listings) {
    console.log("finding img urls")
    const listingImgUrls = [];
    for (let i = 0; i < listings.length; i++) {
        fetch("https://openapi.etsy.com/v2/listings/" + listingId[i] + "/images?api_key=" + apiKey)
            .then (response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then (responseJson => {
                console.log(responseJson);
                console.log(responseJson.results[i].listing_image_id);
                listingImgUrls.push(responseJson.results[i].listing_image_id);
            })
            .catch(err => {
                $("#js-error-message").text(`Uh oh! Something unexpected happened: ${err.message}`);
            })
    }
    displayListings(listings, listingImgUrls);
}


function displayListings(listings, listingImgUrls) {
    console.log("displaying listings");
    console.log(listingImgUrls);
    for (let i = 0; i < listings.length && i < 5; i++) {
        console.log(listings[i]);
        $(".shop").append(`
            <div class="shop-flex-container">
            <ul class="shop-items">
                <li class="shop-item"><h3>${listings[i].title}</h3></li>
                <li class="shop-item"><img src="${listingImgUrls[i]}"></li>
                <li class="shop-item"><h4>Price: $${listings[i].price} | Quantity: ${listings[i].quantity} treats</h4></li>
                <li class="shop-item">${listings[i].description}</li>
                <li class="shop-item"><a href="${listings[i].url}"><button type="button">Purchase On Etsy</button></a></li>
            </ul>
            </div>
        `)};
}

// Runs necessary functions
function renderPage() {
    $(getShopAbout);
    $(findAllShopListingsActive);
}

$(renderPage);