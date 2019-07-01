
function doThing(){
    return fetch(window.location.href, {
        method: 'GET',
        credentials: 'same-origin',
        headers:{
           'X-Requested-With': "XMLHttpRequest"
        }
    })
    .then(function(response){
        response.text().then(function (response){
            console.log(response);
        })
    })
}

let vue = new Vue({
    el: '#cart-view',
    data: {

    }
})
