'use strict';
var crypto = require('crypto');

const algorithm = 'aes-256-cbc';

var keyBuffer;

var ivBuffer;

module.exports.encrypt = function (serialNumber) {
    keyBuffer = "ABCDEFGHJKLMNOPQRSTUVWXYZABCDEFG"; // must be 32 character

    ivBuffer = "ABCDEFGHIJKLMNOP"; // must be 16 character

    const textBuffer = new Buffer(serialNumber);

    let cipher = crypto.createCipheriv(algorithm, keyBuffer, ivBuffer);

    let encrypted = cipher.update(textBuffer);

    let encryptedFinal = cipher.final();

    var encryptedText = encrypted.toString('base64') + encryptedFinal.toString('base64');

    console.log(encryptedText);

    return encryptedText;
}

module.exports.decrypt = function (encryptedText) {
    try {
        let decipher = crypto.createDecipheriv(algorithm, keyBuffer, ivBuffer);

        decipher.setAutoPadding(true);  //Padding 처리가 언어별 달라서 확인 필요

        var decipheredContent = decipher.update(encryptedText, 'base64', 'utf8');

        decipheredContent += decipher.final('utf8');

        console.log(decipheredContent);

        return decipheredContent;
    }
    catch (e) {
        return null;
    }
}

module.exports.pad = function (n, width) {
    n = n + '';

    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}