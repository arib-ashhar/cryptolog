import { Buffer } from 'buffer';

export const PROJECT_ID = '2NO47KGXiYHIo3rT8UanDRaRZn7'
export const API_SECRET_KEY = 'c786f408153305f1fea5d1ad94dd496a'
export const auth = 'Basic ' + Buffer.from(PROJECT_ID + ":" + API_SECRET_KEY).toString('base64')

export const ipfsClient = {
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    }
}

export const contract_token = '0xBdB41a184C07CcA8283d03CC4fA4F8c061255Ffa'
