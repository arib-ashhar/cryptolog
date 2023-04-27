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

//var aesjs = require('aes-js');
var CryptoJS = require("crypto-js");

const iv = createRandomKey(16);

/*
  Work Flow

  Take FIle buffer Array -> encryptFile (using Key_k1) => this gives encrypted word array
  Upload this encrypted Word Array on IPFS -> this gives IPFS HASh

  Above concatenated_string = IPFS HASh + ',' + key_k1
  encrypt this using encryptText(using key_k2) => this gives key_k2 and encrypted_Hash

  Store this encrypted_Hash on blockchain


  take encrypted_hash from blockchain -> DecryptText(encrypted_hash, key_k2) => this give IPFS_HASh and Key_k1
  fetch encrypted file wordArray from IPFS

  give encrypted file and key_k1 -> decryptFile() => this give int array which can be used to render on frontend


*/


function encryptFile(input) {
  const key_k1 = createRandomKey(16);
  console.log("KEY: ",key_k1);
  var wordArray = CryptoJS.lib.WordArray.create(input);           // Convert: ArrayBuffer -> WordArray
  console.log("wordarray:  -> ",wordArray)
  var encrypted = CryptoJS.AES.encrypt(wordArray, key_k1).toString();        // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL-format)
  console.log("ENCRYPTED: ", encrypted);

  return {
    'encrypted':encrypted,
    'key_k1':key_k1
  };
}

function encryptText(ipfsHash, key) {
  const key_k2 = createRandomKey(16);
  console.log("KEY k2:", key_k2);
  var Concatenated_string = ipfsHash +','+ key;
  console.log(Concatenated_string);
  var cipherText = CryptoJS.AES.encrypt(Concatenated_string, key_k2).toString();
  console.log("CIPHER: ", cipherText);
  return {
    'encrypted_Hash':cipherText,
    'key_k2': key_k2
  };
}

function decryptFile(encryptedFile, key) {
  var decrypted = CryptoJS.AES.decrypt(encryptedFile, key);
  console.log("DECRYPTEd -> ", decrypted)
  // var decryptedWordArray = CryptoJS.enc.Utf16.parse(decrypted);
  var INTARRAY = convert_word_array_to_uint8Array(decrypted);
  console.log("iNT array", INTARRAY);  
  return INTARRAY;
}

function decryptText(encrypted_Hash, key) {
  var decrypted = CryptoJS.AES.decrypt(encrypted_Hash, key);
  decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
  console.log("DECRYPTED: ", decrypted);
  decrypted = decrypted.split(',');
  var ipfsHash = decrypted[0];
  var key_k1 = decrypted[1];
  return {
    'ipfsHash':ipfsHash,
    'key_k1':key_k1
  };
}

export async function getbackIPFS (ipfsHash) {
    var output = await client.get(ipfsHash);
    console.log(output.body)
}

function convert_word_array_to_uint8Array(wordArray) {
  const l = wordArray.sigBytes;                                                                                                        
    const words = wordArray.words;                                                                                                       
    const result = new Uint8Array(l);                                                                                                    
    var i=0 /*dst*/, j=0 /*src*/;
    while(true) {
        // here i is a multiple of 4
        if (i==l)
            break;
        var w = words[j++];
        result[i++] = (w & 0xff000000) >>> 24;
        if (i==l)
            break;
        result[i++] = (w & 0x00ff0000) >>> 16;                                                                                            
        if (i==l)                                                                                                                        
            break;                                                                                                                       
        result[i++] = (w & 0x0000ff00) >>> 8;
        if (i==l)
            break;
        result[i++] = (w & 0x000000ff);                                                                                                  
    }
    return result;
}

function createRandomKey(size_in_Bytes) {
  let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < (size_in_Bytes/2)) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export { encryptFile, encryptText, decryptFile, decryptText };