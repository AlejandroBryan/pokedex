const {join }= require('path')

const base = join(__dirname, '../src')
const jsSrc = join(base, 'js')
const cssSrc = join(base, 'css')
module.exports={
    jsSrc,
    cssSrc
}

