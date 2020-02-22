<template>
    <div ref="loadingScreen" class="loading-screen">
        <h1 class="loading-screen-text">Clover Lane Candles</h1>
    </div>
</template>

<script>
export default {
    methods: {
        start(){
            this.$refs.loadingScreen.classList.add("loading-screen__intermediate");
            console.log(process.env.API_URL);
        },
        finish(){
            this.$refs.loadingScreen.classList.add("loading-screen__end");
            setTimeout(()=>{
                this.$refs.loadingScreen.classList.remove("loading-screen__end");
                this.$refs.loadingScreen.classList.remove("loading-screen__intermediate");
            }, process.env.LOAD_SCREEN_TIME);
        }
    }
}
</script>
