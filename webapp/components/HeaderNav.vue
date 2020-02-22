<template>
    <header>
        <div class="header-separator">
            <nav class="top-nav">
                <div class="img-cont logo-cont">
                    <n-link to="/">
                        <img class="nav-logo" src="~assets/images/cloverlogo.png" alt="Clover Logo">
                    </n-link>
                </div>
                <div class="header-name-cont">
                    <n-link to="/">
                        <h3 class="header-company-name">Clover Lane Candles</h3>
                    </n-link>
                </div>
                <client-only>
                <div class="hamburger-cont">
                    <button ref="hamburger" class="hamburger hamburger--spin" type="button">
                        <span class="hamburger-box">
                            <span class="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
                </client-only>
                <div class="cart-cont">
                    <n-link id="cart-link" to="/cart/" class="cart">
                        <span class="cart-box">
                            <span class="fas fa-shopping-cart"></span>
                            Cart
                        </span>
                    </n-link>
                </div>
            </nav>
            <nav class="nav-buttons">
                <ul>
                    <li><n-link v-on:click.native="ScrollToTop" id="index-link" to="/" ><i class="fas fa-home"></i>Home</n-link></li>
                    <li><n-link v-on:click.native="ScrollToTop" id="products-link" to="/products/" ><i class="fas fa-birthday-cake"></i>Products</n-link></li>
                    <li><n-link v-on:click.native="ScrollToTop" id="about-link" to="/about" ><i class="clover-nav-icon">☘</i>About</n-link></li>
                    <li><n-link v-on:click.native="ScrollToTop" to="/contact"><i class="fas fa-phone"></i>Contact</n-link></li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>

export default {
    methods:{
        ScrollToTop: function(){
            this.topBtn.click();
        }
    },
    mounted(){
        // There are a lot of roundabout ways to access the dom in SSR (or at least Nuxt)...
        // This is one of them.
        this.$nextTick(()=>{
            const header = document.getElementsByClassName("header-separator")[0];
            const headerCompanyName = document.getElementsByClassName("header-company-name")[0];
            const topBtn = document.getElementsByClassName("to-top-btn")[0];
            this.loadingScreen = document.getElementsByClassName("loading-screen")[0];

            this.topBtn = topBtn;

            const mobileBreak = 960; // 840px

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

            topBtn.addEventListener("click", ()=>{
                window.scrollTo({
                    left: 0,
                    top: 0,
                    behavior: "smooth"
                });
            });

            AddPageListeners(TogglePageUp);

            TogglePageUp();
        });
    }
}
</script>
