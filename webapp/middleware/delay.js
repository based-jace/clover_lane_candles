export default (context) => {
    if(context.isServer){
        return;
    }
    return new Promise(resolve=>{
        setTimeout(resolve, process.env.LOAD_SCREEN_TIME);
    })
}
