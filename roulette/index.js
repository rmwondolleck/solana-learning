const web3 = require("@solana/web3.js");
const { sendAndConfirmTransaction } = require("@solana/web3.js");
const { getReturnAmount, totalAmtToBePaid, randomNumber } = require('./helper');
const { getWalletBalance, transferSOL, airDropSol} = require("./solana");



const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");
//For checking whether the connection is successfully made
console.log(connection);


const userPublicKey = [
    193, 64, 222, 186, 152, 101, 145,
    120, 163, 14, 122, 118, 238, 51,
    68, 226, 46, 14, 248, 146, 61,
    241, 110, 232, 157, 58, 39, 246,
    66, 246, 243, 185
]
const userSecretKey = [
    122, 67, 129, 26, 232, 251, 182, 148, 84, 107, 252,
    29, 206, 167, 216, 98, 71, 184, 125, 130, 3, 179,
    37, 170, 98, 107, 70, 24, 248, 63, 1, 215, 193,
    64, 222, 186, 152, 101, 145, 120, 163, 14, 122, 118,
    238, 51, 68, 226, 46, 14, 248, 146, 61, 241, 110,
    232, 157, 58, 39, 246, 66, 246, 243, 185
]

const userWallet = web3.Keypair.fromSecretKey(Uint8Array.from(userSecretKey))
console.log(userWallet)

const currentBalance =  async () => {
    await getWalletBalance(userPublicKey.toString());
}

currentBalance()