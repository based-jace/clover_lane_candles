const dropdowns = document.querySelectorAll("a.dropdown-toggle");

for (dropdown of dropdowns){
    dropdown.addEventListener("click", event=>{
        let elem = event.target;

        if(elem.classList.contains("glyphicon") || elem.classList.contains("caret")){
            elem = elem.parentElement;
        }

        elem.nextElementSibling.classList.toggle("visible-dropdown");
    })
}
