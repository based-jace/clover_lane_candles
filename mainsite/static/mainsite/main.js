let isIE;
let firstLoad = true;

const header = document.getElementsByClassName("header-separator")[0];
const headerCompanyName = document.getElementsByClassName("header-company-name")[0];
const topBtn = document.getElementsByClassName("to-top-btn")[0];
const loadingScreen = document.getElementsByClassName("loading-screen")[0];

const mobileBreak = 960; // 840px

const lsa = new loadScriptAsync();

const MAIN_NAV_LINKS = [
    ['index-link', indexUrl],
    ['products-link', productsUrl],
    ['about-link', aboutUrl],
    ['cart-link', cartUrl]
]

const hamburger = document.getElementsByClassName('hamburger')[0];
hamburger.addEventListener("click", ()=>{
	hamburger.classList.toggle("is-active");
});

function ToggleHeaderCompanyName(hide = false){
    const clientWidth = window.innerWidth;
    if(clientWidth > mobileBreak){
        headerCompanyName.classList.remove("hidden");
        headerCompanyName.classList.remove("invisible");
    }
    else if(clientWidth <= mobileBreak){
        if(hide){
            headerCompanyName.classList.add("invisible");
            headerCompanyName.classList.add("hidden")
        }
        else{
            headerCompanyName.classList.remove("hidden");
            headerCompanyName.classList.remove("invisible")
        }
    }
}

function ToggleHeader(){
    const pageY = window.scrollY;
    if(pageY === 0 && isIndex){
        ToggleHeaderCompanyName(true);
        if(header.classList.contains("show-header")){
            header.classList.remove("show-header");
        }
    }
    else if(pageY !== 0 || !isIndex){
        ToggleHeaderCompanyName();
        if(!header.classList.contains("show-header")){
            header.classList.add("show-header");
        }
    }
}

function TogglePageUp(){
    const pageY = window.scrollY;
    if(pageY <= 40 && !topBtn.classList.contains("hide-up-arrow")){
        topBtn.classList.add("hide-up-arrow");
    }
    else if(pageY > 40 && topBtn.classList.contains("hide-up-arrow")){
        topBtn.classList.remove("hide-up-arrow");
    }
}

function RemoveLoadingScreenClasses(){
    loadingScreen.classList.remove("loading-screen__intermediate");
    loadingScreen.classList.remove("loading-screen__end");
}

function RunLoadingScreen(start=true){
    if(start){
        loadingScreen.classList.add("loading-screen__intermediate");
    }
    else{
        loadingScreen.classList.add("loading-screen__end");
        setTimeout(RemoveLoadingScreenClasses, 500);
    }
}

function LinkToUrl(buttonId, url){
    document.getElementById(buttonId).addEventListener("click", ()=>{
        LoadPage(url);
    });
}

async function GetAndReplacePage(newPage, historyPage, _isIE = isIE){
    if(_isIE){
        window.location.href = newPage;
    }
    else{
        fetch(newPage, {
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        })
        .then(response=>{
            return response.text();
        })
        .then(html=>{
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
        topBtn.click();
        RunLoadingScreen();
        setTimeout(()=>{
            GetAndReplacePage(newPage, historyPage)
            .then(()=>{
                setTimeout(()=>{
                    RunLoadingScreen(false);
                }, 200)
            })
        }, 400);
    }
}

function PushHTMLContent(content, _isIE = isIE){
    if(_isIE){
        let thisDoc = document.open("text/html", "replace");
        thisDoc.write(content);
        thisDoc.close();
    }
    else{
        return lsa.ReplaceHtml(content, document.getElementsByClassName("main-cont")[0]);
    }
}

function AddPageListeners(functionToAdd){
    document.addEventListener('scroll', ()=>{
        functionToAdd();
    });
    window.addEventListener("resize", ()=>{
        functionToAdd();
    });
    window.addEventListener("orientationchange", ()=>{
        functionToAdd();
    });
}

/** Checks if browser is Internet Explorer */
function checkIfIE() {
    let ua = navigator.userAgent;
    /* MSIE used to detect old browsers and Trident used to newer ones*/
    let is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
    isIE = is_ie;
}

checkIfIE();

topBtn.addEventListener("click", ()=>{
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener('popstate', event=>{
    event.preventDefault();
    LoadPage(window.location.href, true);
});

AddPageListeners(TogglePageUp);

for(let linkSet of MAIN_NAV_LINKS){
    LinkToUrl(linkSet[0], linkSet[1]);
}

TogglePageUp();