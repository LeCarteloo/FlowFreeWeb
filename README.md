<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="">
<!--     <img src="https://i.imgur.com/Biemrcm.png" alt="Logo" width="110" height="110"> -->
  </a>

  <h3 align="center">Flow Free with AI</h3>

  <p align="center">
    Flow Free game with AI algorithm to solve and generate maps with multiplayer version.
    <br />
    <a href="https://flow.filippapiernik.pl/">Live Project</a>
    ·
    <a href="https://filippapiernik.pl/projects/FlowFreeWeb">Page about project</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Product Name Screen Shot][app-screenshot]

### Project version: v1.0

The game is about connecting colorful points together on a grid. The perfect solution is when all empty squares are filled.
In its orginal state the game is about solving maps that are getting harder with every map completed (maps are added to the game in updates).

This project introduces **randomly generated maps** (with user input), **multiplayer experience** and **AI** which gives user a hint how to solve the map (AI is based on A\* search algorithm). Every pipe on map and every color connected awards an user number of points. Users join or create lobby where he provides settings for the game - number of hints, time limit, map size, number of colors, number of maps and also if pipes in the same color can touch (in original game they can not).

Map generation is rather simple _(in version (v1.0)_, algorithm randomly places given amount of points on map and then runs the AI solver, if map can be solved within a reasonable time frame - it is added to lobby map list. Which means sometimes it algorithm must do a lot of iterations and it take some time.
Puzzle size can range from 2x2 to 16x16 (currently the user should stick to maps from range 2x2 - 6x6 because the way maps are generated).

When user clicks the hint button, AI solver runs with map and user input. When map can be completed in 100%, solver shows where to draw the pipe otherwise shows appropriate alert.

Two users compete with each other (they can join lobby by code or by lobby list), who can complete the map in the better way. When time is up, winner is drawn.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

Project aside from HTML, CSS and JS was created with Node.js which was used as backend (all the calculations are based on server), Socket.io was used for synchronous multiplayer experience also the Lodash.js library was used for deep copying objects.

For development two library were used - Nodemon for refreshing the server with every save and Jest.js for testing, which prove to be very helpfull in creating the AI.

- [Lodash.js](https://lodash.com/)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/)
- [Socket.io](https://socket.io/)
- [Nodemon](https://nodemon.io/)
- [Jest.js](https://jestjs.io/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Before running this application node and npm is needed.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

To run this application you need to clone the repo and install npm packages.

1. Clone the repo
   ```sh
   git clone https://github.com/LeCarteloo/flowFreeWeb.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

1. To run the application, you need to type in prompt (from the project directory) command below

```sh
 npm start
```

\*_Note: As of current version (v1.0), options in lobby can lead to infinite time when generating maps, please try to stick with: map size 2x2-6x6 and number of colors 1-6. Also keep in mind that generating maps when option **pipes can touch** is set to true, tends to be a lot faster._

2. To run the Jest.js tests of application

```sh
 npm test
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- LinkedIn - [@filip-papiernik](https://www.linkedin.com/in/filip-papiernik-390444230/)
- Email - filippapiernik1999@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Helpful resources that helped in building this app.

- [Worker Threads](https://nodejs.org/api/worker_threads.html)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[app-screenshot]: https://i.imgur.com/lBQdxLr.png
