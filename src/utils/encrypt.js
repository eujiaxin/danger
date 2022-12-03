const crypto = require("crypto")
const fernet = require('fernet')

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

export default { encrypt, decrypt }