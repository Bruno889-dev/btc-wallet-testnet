const bip39 = require("bip39");
const bip32 = require("bip32");
const bitcoin = require("bitcoinjs-lib");

console.log("Iniciando criação da carteira...");

// Definir a rede como Testnet
const network = bitcoin.networks.testnet;

// Gerar uma frase mnemônica (12 palavras)
let mnemonic = bip39.generateMnemonic();
console.log("Frase mnemônica:", mnemonic);

// Converter a mnemônica em uma seed
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network);

// Caminho para derivação (Testnet usa "1'" no BIP44)
const path = "m/44'/1'/0'/0/0";
let account = root.derivePath(path);

// Criando o endereço Bitcoin Testnet
let btcAddress = bitcoin.payments.p2pkh({
  pubkey: account.publicKey,
  network: network,
}).address;

// Exibir informações geradas
console.log("Carteira gerada!");
console.log("Endereço BTC Testnet:", btcAddress);
console.log("Chave privada (WIF):", account.toWIF());
console.log("Seed:", mnemonic);
