import crypto from 'crypto'
import fernet from 'fernet'

const fs = window.require('original-fs');
const path = window.require('path');

const encryption_file_path = path.join(__dirname, '../../../../../../src/encryption.txt')

const key_to_index = {
    0: "website",
    1: "username",
    2: "password"
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

const my_error = Object.assign(new Error("Invalid Decoding"), {
    code: 402
})

const decode_str = (encoding) => {
    let res = []
    let i = 0
    while (i < encoding.length) {
        let obj = {}
        for (let j = 0; j < 3; j++) {
            let curr_length = 0
            if (isNaN(encoding[i])) throw my_error
            while (encoding[i] !== "#") {
                curr_length = curr_length * 10 + Number(encoding[i])
                i = i + 1
            }
            if (encoding[i] !== "#") throw my_error
            i = i + 1 // consume #
            obj[key_to_index[j]] = encoding.substring(i, i + curr_length)
            i = i + curr_length
            if (i > encoding.length) throw my_error
        }
        res.push({
            ...obj
        })
    }
    return res
}

const sync_file = (arr, password) => { // array of objects
    const encoding = arr.reduce((acc, e) => `${acc}${encode_obj(e)}`, "")
    fs.writeFileSync(encryption_file_path, encrypt(password, encoding));
}

const decrypt_file = (password) => {
    const encoded_message = fs.readFileSync(encryption_file_path, {
        encoding: 'utf8'
    })
    try {
        if (encoded_message.length === 0) return []
        const decoded_message = decrypt(password, encoded_message)
        return decode_str(decoded_message)
    } catch (err) {
        console.warn(err)
        return "Invalid Password"
    }
}

const my_export = {
    decode_str,
    sync_file,
    decrypt_file
}

export default my_export