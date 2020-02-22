<template>
    <main>
        <section class="video-banner">
            <!-- Video Banner -->
            <video autoplay loop muted playsinline id="banner-video" >
            <source src="~assets/fzclip1.mp4" type="video/mp4">
            <source src="~assets/fzclip1.webmhd.webm" type="video/webm">
                Your browser doesn't support this video. If on an N version of Windows, please
                switch to Firefox or Chrome.
            </video>
            <div class="banner-text-cont">
                <h1 class="hero-banner-text">Clover Lane Candles</h1>
            </div>
        </section>
        <section class="bg-light lb-prime">
            <!-- Curvy-Top Divider -->
            <div class="divider-cont top-divider">
                <svg unselectable="on"
                    preserveAspectRatio="none"
                    class="curvy-top"
                    viewBox="0 0 210 18.218445">
                    <g
                        transform="translate(7.9375,-301.08215)">
                        <path
                            id="curvy-top"
                        d="m 212.04463,334.41963 c 0.57186,1.6321 -1.10918,-52.98815 -118.306532,-23.43451 -67.626483,17.05336 -107.170732,-12.6847 -106.967264,-12.47323 l -3.401785,-10.58332 1.133928,58.96428 228.297613,-0.75595 z"/>
                    </g>
                </svg>
            </div>
            <!-- End Divider -->
            <div class="inner-cont text-cont">
                <h2>Wh☘lesale</h2>
                <p>
                    Dear Mr. Vernon, we accept the fact that we had to sacrifice a whole saturday in detention for whatever it is we did wrong, but we think you're crazy for making us write an essay telling you who we think we are.
                </p>
                <h3>Another Header</h3>
                <p>
                    You see us as you want to see us, in the simplest terms, in the most convenient definitions. But what we found out, is that each one of us is a brain, and an athlete, and a basketcase, a princess, and a criminal. Does that answer your question? Sincerely yours, The Breakfast Club.
                </p>
            </div>
        </section>
        <section class="bg-secondary content-2 lb-prime">
            <!-- Curvy-Bottom-Down Divider -->
            <div class="divider-cont">
                <svg
                    class="curvy-bottom_down"
                    preserveAspectRatio="none"
                viewBox="0 0 210 80">
                    <g
                        transform="translate(0,-217)">
                        <path
                        d="m -16.630952,195.92432 c 0,0 9.8273807,48.08384 120.196422,48.08384 110.36905,0 110.36905,62.81922 110.36905,62.81922 l 1.5119,-127.96507 H -19.654762 Z"/>
                    </g>
                </svg>
            </div>
            <!-- End Divider -->
            <div class="inner-cont text-cont homemade-cont">
                <h2>H☘memade</h2>
                <p>
                    Dear Mr. Vernon, we accept the fact that we had to sacrifice a whole saturday in detention for whatever it is we did wrong, but we think you're crazy for making us write an essay telling you who we think we are. You see us as you want to see us, in the simplest terms, in the most convenient definitions. But what we found out, is that each one of us is a brain, and an athlete, and a basketcase, a princess, and a criminal. Does that answer your question? Sincerely yours, The Breakfast Club.
                </p>
            </div>
        </section>
        <!-- Curvy-Hole Container -->
        <div class="curvy-hole-cont">
            <svg class="curvy-hole" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 320 350.7">
                <path d="M0,350.7h320c0-3.6,0-7.6,0-12c0-34-72.7-84-109.3-83C174,256.8,86.9,255,58.7,212C29.1,167.1,30,120,32,98
                s20.4-70.1,91.6-87.8c38.6-11.9,92.4-6.9,125.8,15.3C282.8,47.6,298,50.1,320,49.4V0H0V350.7z"/>
            </svg>
        </div>
        <!-- End Curvy-Hole -->
        <section class="custom-cont lb-prime">
            <div class="inner-cont text-center">
                <!-- <div class="img-cont custom-img-cont">
                    <img class="custom-img" src="{% static 'mainsite/assets/images/cloverlogo.png' %}">
                </div> -->
                <h1>Custom<br><span class="clover-vid-cont">☘</span>rders<br>Available</h1>
            </div>
        </section>
    </main>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
    layout: "default",
    components: {
        Logo
    },
    head(){
        return {
            link: [
                // {
                //     rel: "stylesheet",
                //     href: "/static/css/mainstyles.css"
                // },
                {
                    rel: "stylesheet",
                    href: "/static/css/indexstyles.css"
                },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
