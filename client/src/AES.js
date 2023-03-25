var aesjs = require('aes-js');

var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
var iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36 ];

export function encryptAES (data) {
    //var dataBytes = aesjs.utils.utf8.toBytes(data);
    var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    const encryptBytes = aesCbc.encrypt(data);
    const encryptHex = aesjs.utils.hex.fromBytes(encryptBytes);
    console.log("HERE...",encryptHex);
    return encryptHex;
}

//export default {encryptAES}