if (typeof window.ethereum !== "undefined") {
  console.log("MetaMask is installed!");
  console.log(ethereum.isMetaMask);
}

window.addEventListener("DOMContentLoaded", async () => {
  const isUserLogged = await ethereum.request({ method: "eth_accounts" });
  if (isUserLogged.length > 0) {
    console.log("User is logged in");
  }
});

const ethereumButton = document.querySelector(".enableEthereumButton");
const getBalanceButton = document.querySelector(".getBalanceButton");
const getUsersNFTSButton = document.querySelector(".getUsersNFTSButton");
const showAccount = document.querySelector(".showAccount");
const metaMaskInput = document.querySelector(".nftMetaMaskInput");
const showBalanceElement = document.querySelector(".showBalance");
const logoutButton = document.querySelector(".logoutButton");
const scrollButton = document.querySelector(".scrollToSelectedNFT");


scrollButton.addEventListener("click", () => {
  scrollToSelectedNFT();
});

function scrollToSelectedNFT() {
  const nftsIds = document
      .querySelector(".nftIdsInput")
      .value.replace(" ", "")
    .split(",");
  const nftsContainer = document.querySelector(".nftsContainer");
  const nfts = nftsContainer.querySelectorAll(".nft");
  console.log(nfts)
  nfts.forEach((nft) => {
    if (nftsIds.includes(nft.id)) {
      nft.scrollIntoView();
    }
  })

} ;


ethereumButton.addEventListener("click", () => {
  getAccount();
});

getBalanceButton.addEventListener("click", () => {
  getBalance();
});

getUsersNFTSButton.addEventListener("click", () => {
  getUsersNFTs();
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

async function logout() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });

  const account = accounts[0];

  console.log(logout);
}

async function getUsersNFTs() {
  try {
    const metaMaskAddress = metaMaskInput.value;
    console.log(metaMaskInput);

    const nftsContainer = document.querySelector(".nftsContainer");
    nftsContainer.innerHTML = "";
    const nftsIds = document
      .querySelector(".nftIdsInput")
      .value.replace(" ", "")
      .split(",");

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    const fetchUserId = await axios.get(
      `https://api3.loopring.io/api/v3/account?owner=${metaMaskAddress}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY":
            "XA24V7QYbIeTtFJ1YpHzpyF4J5Jk6OdpYf6S4K7fcS7a2NvC3Jb9bDdrSwpeF3mZ",
          "access-control-allow-headers": "*",
        },
      }
    );
    const {
      data: { totalNum, data },
    } = await axios.get(
      `https://api3.loopring.io/api/v3/user/nft/balances?accountId=${fetchUserId.data?.accountId}&limit=500`,
      {
        method: "GET",
        headers: {
          "X-API-KEY":
            "XA24V7QYbIeTtFJ1YpHzpyF4J5Jk6OdpYf6S4K7fcS7a2NvC3Jb9bDdrSwpeF3mZ",
          "access-control-allow-headers": "*",
        },
      }
    );

    const filteredNfts = data.filter((nft) => {
      return nftsIds.includes(nft.nftId);
    });

    data.forEach((nft) => {
      if (nftsIds.includes(nft.nftId)) {
        const nftElement = document.createElement("div");
        nftElement.classList.add("nft");
        nftElement.innerHTML = `
        <div class="nftInfo" style="border:2px solid green;padding:5px;margin:5px">
          <h2>Token: <span class="showAccount">${nft?.tokenAddress}</span></h2>
          <h2>Nft id: <span class="showAccount">${nft?.nftId}</span></h2>
          <h2> <em>this is among of entered ids </em> </h2>
        </div>
      `;
        nftsContainer.appendChild(nftElement);
      } else {
        const nftElement = document.createElement("div");
        nftElement.classList.add("nft");
        nftElement.innerHTML = `
        <div class="nftInfo" style="border:2px solid red;padding:5px;margin:5px" id="${nft?.nftId}">
          <h2>Token: <span class="showAccount">${nft?.tokenAddress}</span></h2>
          <h2>Nft id: <span class="showAccount">${nft?.nftId}</span></h2>
          
        </div>
      `;
        nftsContainer.appendChild(nftElement);
      }
    });

    console.log(filteredNfts);
  } catch (error) {}
}
