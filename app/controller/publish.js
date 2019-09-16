const Controller = require('egg').Controller;
const {
    Face,
    Name,
    UnixTransport,
    Interest
} = require('ndn-js-sdk')
const stream = require('stream');
// Silence the warning from Interest wire encode.
Interest.setDefaultCanBePrefix(true);

var face = new Face(new UnixTransport());

function asyncInterest(afid) {
    return new Promise(function (resolve) {
        const name = new Name(`/bfs/info/afid/${afid}`);
        // console.log("Express name " + name.toUri());
        face.expressInterest(name, (_, data) => resolve({
            code: 0,
            data
        }), () => resolve({
            code: 1
        }));
    })
}

class PublishController extends Controller {
    async getFileInfo() {
        const {
            ctx
        } = this
        const {
            afid
        } = ctx.query
        let content = null
        console.log('query ' + afid)
        const data = await asyncInterest(afid)
        let rs = {}
        if (data.code === 0) {
            content = data.data.getContent().buf().toString()
            console.log(content)
            const config = JSON.parse(content)
       
            console.log('----')
            console.log(config)
            console.log('----')
            rs.type = config.type
            rs.address = config.address

            ctx.body = content
            ctx.status = 200
        } else {
            ctx.body = {
                message: "File not found"
            }
            ctx.status = 404
        }
    }
}
module.exports = PublishController;