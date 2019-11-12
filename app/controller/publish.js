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

function asyncInterest(fid, fid_format, field) {
    return new Promise(function (resolve) {
        const name = new Name("/bfs/").append(field).append("query").append(fid_format).append(fid)
        const interest = new Interest(name)
        interest.setInterestLifetimeMilliseconds(1);
        interest.setMustBeFresh(false);
        face.expressInterest(interest, (_, data) => resolve({
            code: 0,
            data: data,
        }), () => resolve({
            code: 1
        },));
    })
}

class PublishController extends Controller {
    async getFileInfo() {
        const {
            ctx
        } = this
        const {
            field,
            fid,
            fid_format
        } = ctx.query
        let content = null
        const data = await asyncInterest(fid, fid_format, field)
        if (data.code === 0) {
            content = data.data.getContent().buf().toString()
            const parsed_content = JSON.parse(content)
            ctx.body = JSON.stringify(parsed_content)
            ctx.status = 200
        } else {
            ctx.body = {
                message: "File Id Not Found"
            }
            ctx.status = 404
        }
    }
}
module.exports = PublishController;