// const socket = io("http://localhost:3000");

function createLobbyElem(hostName, playerCount, status, options) {
  let div = document.createElement("div");
  div.classList.add("lobby-card");
  div.innerHTML = `
  <div class="top-text">
    <ul>
        <li>Host name</li>
        <li>Gracz1</li>
    </ul>
    <ul>
        <li>Players</li>
        <li>1/2</li>
    </ul>
    <ul>
        <li>Status</li>
        <li><div class="status"></div></li>
    </ul>
    </div>
    <div class="bottom-text">
    <ul>
        <li>Options</li>
        <li>
        <button type="submit" id="btn-display">
            <i class="fas fa-eye"></i>
            <span class="options-tooltip">
            <h3>OPTIONS</h3>
            <div class="columns">
                <div class="column">
                <ul>
                    <li>Number of hints</li>
                    <li>4</li>
                    <li>Time limit</li>
                    <li>1</li>
                    <li>Map size</li>
                    <li>5 x 5</li>
                </ul>
                </div>
                <div class="column">
                <ul>
                    <li>Number of colors</li>
                    <li>5</li>
                    <li>Map number</li>
                    <li>2</li>
                    <li>Pipes can touch</li>
                    <li>True</li>
                </ul>
                </div>
            </div>
            </span>
        </button>
        </li>
    </ul>
    <div class="options">
        <div class="slider">
        <ul>
            <li>Number of Hints</li>
            <li>4</li>
        </ul>
        <ul>
            <li>Time limit</li>
            <li>1</li>
        </ul>
        <ul>
            <li>Number of colors</li>
            <li>5</li>
        </ul>
        <ul>
            <li>Map number</li>
            <li>2</li>
        </ul>
        <ul>
            <li>Map size</li>
            <li>5 x 5</li>
        </ul>
        <ul>
            <li>Pipes can touch</li>
            <li>True</li>
        </ul>
        </div>
    </div>
    <ul>
        <li><button type="submit" id="btn-join">JOIN</button></li>
    </ul>
    </div>
    `;
  lobbiesList.appendChild(div);
}

const lobbiesList = document.querySelector(".lobbies-list");

createLobbyElem();
createLobbyElem();
createLobbyElem();
createLobbyElem();
createLobbyElem();
createLobbyElem();

const joinBtn = document.getElementById("btn-join");
