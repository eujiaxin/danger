const fs = require('fs')
const path = require('path')

const key_to_index = {
    0: "website",
    1: "username",
    2: "password"
}

const encode_obj = ({ website, username, password }) =>
    `${website.length}#${website}${username.length}#${username}${password.length}#${password}`

const decode_str = (encoding) => {
    res = []
    i = 0
    while (i < encoding.length) {
        obj = {}
        for (let j = 0; j < 3; j++) {
            curr_length = 0
            while (encoding[i] !== "#") {
                curr_length = curr_length * 10 + Number(encoding[i])
                i = i + 1
            }
            i = i + 1   // consume #
            obj[key_to_index[j]] = encoding.substring(i, i + curr_length)
            i = i + curr_length
        }
        res.push({ ...obj })
    }
    return res
}

const sync_file = (arr) => {    // array of objects
    const myConsole = new console.Console(fs.createWriteStream(path.join(__dirname, '../encryption.txt')));
    const encoding = arr.reduce((acc, e) => `${acc}${encode_obj(e)}`, "")
    myConsole.log(encoding)
}

export default { decode_str, sync_file }