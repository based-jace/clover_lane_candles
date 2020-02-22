// export default function (req, res, next) {
const axios = require('axios');

export default async function (req, res, next) {
    // req is the Node.js http request object
    console.log("asdf")
    // let test = await axios({
    //     url: 'http://api/',
    //     method: 'get'
    // });
    // console.log(test);
    // console.log(await axios.get("http://api/test"))
    // res is the Node.js http response object

    // next is a function to call to invoke the next middleware
    // Don't forget to call next at the end if your middleware is not an endpoint!
    next()
}
