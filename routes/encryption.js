'use strict';
var express = require('express');

var router = express.Router();

var crypto = require('crypto');

var RSA = require('node-rsa');

var key = new RSA({ b: 128 }).generateKeyPair();

const publicKey = key.exportKey('pkcs1-public-pem');

const privateKey = key.exportKey('pkcs8-private-pem');

const seed = "BT Inc";

const serialNumber = "SN_BT-ACTB_0001";

var encrypt;

var decrypt;

var cipherOutput;

var decipherOutput;

var compare;

function Symmetric() {

    var cipher = crypto.createCipher('aes256', seed);

    cipher.update(serialNumber);

    cipherOutput = cipher.final('base64');

    console.log('Cipher Output : ', cipherOutput);
}

function Asymmetric() {

    encrypt = crypto.publicEncrypt({
        key: publicKey,
        passphrase: seed
    }, Buffer.from(cipherOutput)).toString('base64');

    console.log(encrypt);

    decrypt = crypto.privateDecrypt({
        key: privateKey,
    }, Buffer.from(encrypt, 'base64')).toString('utf8');

    console.log(decrypt);

    //===================================================================================
    var decipher = crypto.createDecipher('aes256', seed);

    decipher.update(decrypt, 'base64', 'utf8');

    decipherOutput = decipher.final('utf8');

    console.log('Decipher Output : ', decipherOutput);

    //===================================================================================

    if (serialNumber == decipherOutput) {
        compare = "pass";
    } else {
        compare = "fail";
    }
}

/* GET home page. */
router.get('/', function (req, res) {
    Symmetric();

    Asymmetric();

    res.render('encryption', {
        title: 'Express',
        publicKey: publicKey,
        serialNumber: serialNumber,
        cipherOutput: cipherOutput,
        encrypt: encrypt,
        decrypt: decrypt,
        decipherOutput: decipherOutput,
        compare: compare
    });
});

router.get('/id', function (req, res) {

    var data = { 'id': cipherOutput };

    res.send(data);
});

module.exports = router;
