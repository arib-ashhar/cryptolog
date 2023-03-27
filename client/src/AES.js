import {create as IPFSHTTPClient} from 'ipfs-http-client';
import { Buffer } from 'buffer';

const PROJECT_ID = '2NO47KGXiYHIo3rT8UanDRaRZn7'
const API_SECRET_KEY = 'c786f408153305f1fea5d1ad94dd496a'
const auth = 'Basic ' + Buffer.from(PROJECT_ID + ":" + API_SECRET_KEY).toString('base64')

const client = IPFSHTTPClient({
  host:'ipfs.infura.io',
  port:5001,
  protocol:'https',
  headers: {
    authorization: auth,
  }
})

var aesjs = require('aes-js');
var CryptoJS = require("crypto-js");

var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
var iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36 ];

// export function encryptAES (data) {
//     //var dataBytes = aesjs.utils.utf8.toBytes(data);
//     var aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
//     const encryptBytes = aesCbc.encrypt(data);
//     const encryptHex = aesjs.utils.hex.fromBytes(encryptBytes);
//     console.log("HERE...",encryptHex);
//     return encryptHex;
// }

//export default {encryptAES}

export function encryptAES(input) {
    //var file = input.files[0];
    //var reader = new FileReader();

    var key = "1234567887654321";
    var wordArray = CryptoJS.lib.WordArray.create(input);           // Convert: ArrayBuffer -> WordArray
    var encrypted = CryptoJS.AES.encrypt(wordArray, key).toString();        // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL-format)
    console.log("ENCRYPTED: ", encrypted);
    var encryptedWordArray = CryptoJS.enc.Utf16.parse(encrypted);
    console.log("ENCRYPT WA: ", encryptedWordArray.words);
    return encryptedWordArray.words;
    // var fileEnc = new Blob([encrypted]);                                    // Create blob from string
    // console.log("ENCRYPTED BLOB: ", fileEnc);

    // var a = document.createElement("a"); 
    // var url = window.URL.createObjectURL(fileEnc);
    // var filename = file.name + ".enc";
    // a.href = url;
    // a.download = filename;
    // a.click();
    // window.URL.revokeObjectURL(url);

    // reader.readAsArrayBuffer(file);
}


export async function getbackIPFS (ipfsHash) {
    var output = await client.get(ipfsHash);
    console.log(output.body)
}