const web3 = require("@solana/web3.js");

const userPublicKey = [
    193, 64, 222, 186, 152, 101, 145,
    120, 163, 14, 122, 118, 238, 51,
    68, 226, 46, 14, 248, 146, 61,
    241, 110, 232, 157, 58, 39, 246,
    66, 246, 243, 185
]
const transferSOL = async (from, to, transferAmt) => {
    try {
        const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");
        const transaction = new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey: new web3.PublicKey(from.publicKey.toString()),
                toPubkey: new web3.PublicKey(to.publicKey.toString()),
                lamports: transferAmt * web3.LAMPORTS_PER_SOL
            })
        )
        const signature = await web3.sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        )
        return signature;
    } catch (err) {
        console.log(err);
    }
}

const getWalletBalance = async () => {
    try {
        const connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");
        const balance = await connection.getBalance(new web3.PublicKey(userPublicKey));
        return balance / web3.LAMPORTS_PER_SOL;
    } catch (err) {
        console.log(err)
    }
}

const airDropSol = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const walletKeyPair = await Keypair.fromSecretKey(Uint8Array.from(userSecretKey));
        const fromAirDropSignature = await connection.requestAirdrop(
            new PublicKey(walletKeyPair.publicKey),
            2 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err)
    }

};

