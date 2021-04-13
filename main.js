
const olmain = document.querySelector('ol');
const URL = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
let posts = []

function newHackerSite(title, URL,url, score, by, descendants, time) {
    const listItem = document.createElement('li')
    const parent = document.createElement('div');
    parent.className = 'parent';

    const top = document.createElement('div');
    top.className = 'top';
    const bottom = document.createElement('div');
    bottom.className = 'bottom';

    parent.appendChild(top)
    parent.appendChild(bottom);

    const imageDiv = document.createElement('div');
    imageDiv.id = "arrowImageDiv"
    imageDiv.className = "align-middle"
    imageDiv.innerText = '^'

    const titleDiv = document.createElement('div');

    const anchorTitle = document.createElement('a');
    anchorTitle.href = URL
    anchorTitle.text = title
    anchorTitle.id = "titleDiv"
    titleDiv.appendChild(anchorTitle)

    const websiteDiv = document.createElement('div');
    websiteDiv.className = "greyFont"
    websiteDiv.innerText = url

    top.appendChild(imageDiv)
    top.appendChild(titleDiv)
    top.appendChild(websiteDiv)

    const emptySpace = document.createElement('div');
    emptySpace.id = "emptySpace"

    const detailDiv = document.createElement('div');
    detailDiv.className = "greyFont"
    detailDiv.innerText = score + " points by " + by + " " + time + " " + "| " + "hide " + "| " + +descendants + " comments "

    bottom.appendChild(emptySpace)
    bottom.appendChild(detailDiv)

    listItem.appendChild(parent);
    olmain.appendChild(listItem);
}

function timeChange(date) {
    let d = new Date(date);
    let formattedDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    let hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
    let minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
    let formattedTime = hours + ":" + minutes;

    return formattedDate = formattedDate
}
fetch(URL)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (data) {
        for (const each of data) {
            fetch("https://hacker-news.firebaseio.com/v0/item/" + each + ".json?print=pretty")
                .then(function (response) {
                    if (response.ok) {
                        return response.json();
                    } else {
                        return Promise.reject(response);
                    }
                }).then(function (userData) {
                    let new_str = userData.url.split(".")[1];
                    
                    
                    newHackerSite(userData.title, userData.url,"(" + new_str + ".com)", userData.score, userData.by, userData.descendants, timeChange(userData.time))
                }).catch(function (error) {
                    console.warn(error);
                });
        };
    })




