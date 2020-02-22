isIndex = true;

document.getElementById("banner-video").muted = true;

if(indexListenersAdded != "undefined" && indexListenersAdded != false){
    AddPageListeners(ToggleHeader);
    var indexListenersAdded = true;
}

ToggleHeaderCompanyName(true);