import crypto from 'crypto'
import fernet from 'fernet'

const fs = window.require('fs');
const path = window.require('path');

const key_to_index = {
    0: "website",
    1: "username",
    2: "password"
}

const sampleObj = {
    "website": "Spotify",
    "username": "username",
    "password": "password"
}

const getSecret = (password) => {
    const hash = crypto.createHash('md5').update(password).digest('hex')
    const secret = new fernet.Secret(
        Buffer
        .from(hash)
        .toString('base64'))
    return secret
}

const encrypt = (password, message) => {
    const secret = getSecret(password)
    const token = new fernet.Token({
        secret: secret,
        time: Date.parse(1),
        iv: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    })

    return token.encode(message)
}

const decrypt = (password, encrypted_message) => {
    const secret = getSecret(password)
    const token = new fernet.Token({
        secret: secret,
        token: encrypted_message,
        ttl: 0
    })
    return token.decode()
}

const encode_obj = ({
        website,
        username,
        password
    }) =>
    `${website.length}#${website}${username.length}#${username}${password.length}#${password}`

const decode_str = (encoding) => {
    let res = []
    let i = 0
    while (i < encoding.length) {
        let obj = {}
        for (let j = 0; j < 3; j++) {
            let curr_length = 0
            while (encoding[i] !== "#") {
                curr_length = curr_length * 10 + Number(encoding[i])
                i = i + 1
            }
            i = i + 1 // consume #
            obj[key_to_index[j]] = encoding.substring(i, i + curr_length)
            i = i + curr_length
        }
        res.push({
            ...obj
        })
    }
    return res
}

const sync_file = (arr, password) => { // array of objects
    const myConsole = new console.Console(fs.createWriteStream(path.join(__dirname, '../encryption.txt')))
    const encoding = arr.reduce((acc, e) => `${acc}${encode_obj(e)}`, "")
    myConsole.log(encrypt(password, encoding))
}

const decrypt_file = () => {

}

export default {
    decode_str,
    sync_file
}