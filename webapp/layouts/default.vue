<template>
    <div class="big-cont">
        <client-only>
        <HeaderNav />
        </client-only>
        <div class="container">
            <nuxt class="main-cont" />
        </div>
        <Footer />
        <ToTopArrow />
        <!-- <LoadingScreen /> -->
    </div>
</template>

<script>
import HeaderNav from "~/components/HeaderNav.vue";
import Footer from "~/components/Footer.vue";
import ToTopArrow from "~/components/ToTopArrow.vue";
import LoadingScreen from "~/components/LoadingScreen.vue";

// console.log(document.getElementsByClassName('hamburger')[0]);

// console.log(process.loadScreenTime);

export default {
    components: {
        HeaderNav,
        Footer,
        ToTopArrow,
        LoadingScreen
    },
    head(){
        return{
            title: "Clover Lane Candles",
            meta:[
                {charset: "utf-8"},
            ],
            link: [
                {
                    rel: "stylesheet",
                    href: "/static/css/hamburgers.min.css"
                },
                {
                    rel: "stylesheet",
                    href: "https://use.fontawesome.com/releases/v5.5.0/css/all.css",
                    integrity: "sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU",
                    crossorigin: "anonymous"
                },
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css?family=Istok+Web|Marmelad|Rochester|Ruda"
                },
                {
                    rel: "stylesheet",
                    href: "/static/css/mainstyles.css",
                },
            ],
            script: [
                {
                    type: "text/javascript",
                    src: "/static/scripts/polyfill.min.js"
                },
                {
                    type: "text/javascript",
                    src: "/static/scripts/fetch.umd.js"
                },
                {
                    type: "text/javascript",
                    src: "https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js"
                },
                // {
                //     type: "text/javascript",
                //     src: "/static/scripts/main.js",
                //     ssr: false
                // }
            ]
        }
    },
    mounted(){
        // this.$nextTick(()=>{
        //     document.getElementsByClassName("to-top-btn")[0].addEventListener("click", ()=>{

        //     })
        // })
    }
}
</script>

<style lang="scss" scoped>

</style>
