const RNStart = require('./ndn')
const fs = require('fs')
module.exports = app => {
    // app.beforeStart(async () => {
    //     // const rs = fs.readFileSync(`${__dirname}/config.json`)
    //     // const config = JSON.parse(rs)
    //     // const cluster = config.cluster
    //     // console.log(`==app beforeStart, start Rnode, cluster is ${cluster}==`);
    //     // app.cluster = cluster
    //     RNStart(app)
    // });

    // app.ready(async () => {
    //     setInterval(
    //         async () => {
    //             console.log('send online list request')
    //             const ctx = app.createAnonymousContext();
    //             await ctx.service.cluster.requestOnlineList()
    //             console.log('received online list')
    //         }, 5000)
    // })
    return async (ctx) => {
        console.log('in return func')
    }
}