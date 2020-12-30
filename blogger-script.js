'use strict';

/********** BLOGGER API **********/

// Essential variables
const apiKey = "AIzaSyDvRxkKr_ls2Yq_ZpLnu_d4QdnS5CB_Ygs";
const blogId = "1308374288641207765";

// Display the blog post(s) in the webpage, the most recent blog post will be on top and it is limited to the 5 most recent posts.
function displayBlogPosts(responseJson) {
    for (let i = 0; i < responseJson.items.length && i < 5; i++) {
        $(".blog").append(`
        <p id="blog-post-title">${responseJson.items[i].title}</p>
        <p>${responseJson.items[i].content}</p>
        `)};
}

// Identify the correct blog and pull json data
function getBlogPosts() {
    fetch("https://www.googleapis.com/blogger/v3/blogs/" + blogId + "/posts?key=" + apiKey)
        .then (response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error (response.statusText);
        })
        .then(responseJson => displayBlogPosts(responseJson))
        .catch(err => {
            $("#js-error-message").text(`Uh oh! Something bad happened: ${err.message}`);
        })
}

$(getBlogPosts);