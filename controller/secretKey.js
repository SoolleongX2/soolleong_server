module.exports = {
    secretKey: 'SecretKeySoptSeRvER',
    options: {
        algorithm: "HS256",
        expiresIn: "7h",
        issuer: "soolleung"
    },
    refreshOptions: {
        algorithm: "HS256",
        expiresIn: "7d",
        issuer: "soolleung",
    },
}