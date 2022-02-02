// const socket = io("http://localhost:3000");

function createLobbyElem(hostName, playerCount, status, options) {
  let div = document.createElement("div");
  div.classList.add("lobby-card");
  div.innerHTML = `
    `;
  lobbiesList.appendChild(div);
}

const lobbiesList = document.querySelector(".lobbies-list");

// createLobbyElem();
// createLobbyElem();
// createLobbyElem();
// createLobbyElem();
// createLobbyElem();
// createLobbyElem();

const joinBtn = document.getElementById("btn-join");
