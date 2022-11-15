if (typeof window.ethereum !== "undefined") {
  console.log("MetaMask is installed!");
  console.log(ethereum.isMetaMask);
}

window.addEventListener("DOMContentLoaded", async () => {
  const isUserLogged = await ethereum.request({ method: "eth_accounts" });
  if (isUserLogged.length > 0) {
    console.log("User is logged in");
  }
  const accountElement = document.querySelector(".account");
  accountElement.querySelector(".showAccount").textContent = isUserLogged[0];
  document.querySelector(".enableEthereumButton").style.display = "none";
});

const ethereumButton = document.querySelector(".enableEthereumButton");
const getBalanceButton = document.querySelector(".getBalanceButton");
const getUsersNFTSButton = document.querySelector(".getUsersNFTSButton");
const showAccount = document.querySelector(".showAccount");
const showBalanceElement = document.querySelector(".showBalance");

ethereumButton.addEventListener("click", () => {
  getAccount();
});

getBalanceButton.addEventListener("click", () => {
  getBalance();
});

// getUsersNFTSButton.addEventListener("click", () => {
//   getUsersNFTs();
// });

async function getAccount() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  const account = accounts[0];
  console.log(account);
  document.querySelector(".enableEthereumButton").style.display = "none";
  const accountElement = document.querySelector(".account");
  accountElement.querySelector(".showAccount").textContent = account;
}

async function getBalance() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  const account = accounts[0];
  const balance = await ethereum.request({
    method: "eth_getBalance",
    params: [account, "latest"],
  });
  console.log(balance);

  showBalanceElement.textContent = balance;
}

async function getUsersNFTs() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  const account = accounts[0];
  const nfts = await ethereum.request({
    method: "wallet_watchAsset",
  });
  console.log(nfts);
}
