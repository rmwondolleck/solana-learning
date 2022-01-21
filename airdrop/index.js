const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
} = require("@solana/web3.js");

const newPair = new Keypair()
console.log((newPair))

const secretKey = newPair._keypair.secretKey

const userSecretKey = [
    122, 67, 129, 26, 232, 251, 182, 148, 84, 107, 252,
    29, 206, 167, 216, 98, 71, 184, 125, 130, 3, 179,
    37, 170, 98, 107, 70, 24, 248, 63, 1, 215, 193,
    64, 222, 186, 152, 101, 145, 120, 163, 14, 122, 118,
    238, 51, 68, 226, 46, 14, 248, 146, 61, 241, 110,
    232, 157, 58, 39, 246, 66, 246, 243, 185
]

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(Uint8Array.from(userSecretKey));
        const walletBalance = await connection.getBalance(
            new PublicKey(myWallet.publicKey)
        );
        console.log(`=> For wallet address ${myWallet.publicKey}`);
        console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL}SOL`);

    } catch (err) {
        console.log(err);
    }
};

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

const driverFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}

driverFunction()