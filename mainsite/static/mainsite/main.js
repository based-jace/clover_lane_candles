let isIE;
let firstLoad = true;

const MAIN_NAV_LINKS = [
    ['index-link', indexUrl],
    ['products-link', productsUrl],
    ['about-link', aboutUrl],
    ['cart-link', cartUrl]
]

$('.hamburger').click(function(){
	$('.hamburger').toggleClass("is-active");
});

function LinkToUrl(buttonId, url){
    document.getElementById(buttonId).addEventListener("click", ()=>{
        LoadPage(url);
    });
}

function GetAndReplacePage(newPage, historyPage, _isIE = isIE){
    if(_isIE){
        window.location.href = newPage;
    }
    else{
        fetch(newPage, {
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        })
        .then(function(response){
            return response.text();
        })
        .then(function(html){
            PushHTMLContent(html);
            if(!historyPage){
                history.pushState(null, document.title, newPage);
            }
        });
    }
}

function LoadPage(page_url, historyPage=false, _isIE=isIE){
    let fullUrl = window.location.origin + page_url;
    let isSamePage = fullUrl == window.location.href;
    let newPage = !isSamePage ? page_url : fullUrl;
    if(!isSamePage){
        GetAndReplacePage(newPage, historyPage);
    }
}

function PushHTMLContent(content, _isIE = isIE){
    if(_isIE){
        let thisDoc = document.open("text/html", "replace");
        thisDoc.write(content);
        thisDoc.close();
    }
    else{
        $(".main-cont").html(content);
    }
}

/** Checks if browser is Internet Explorer */
function checkIfIE() {
    let ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    let is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    isIE = is_ie;
}

checkIfIE();

window.addEventListener('popstate', (event)=>{
    event.preventDefault();
    LoadPage(window.location.href, true);
});

for(let linkSet of MAIN_NAV_LINKS){
    LinkToUrl(linkSet[0], linkSet[1]);
}