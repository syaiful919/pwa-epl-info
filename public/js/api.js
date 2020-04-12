const baseUrl = "https://api.football-data.org/v2/";
const header = {
  headers: {
    "X-Auth-Token": "b40c7816650a44638b508fc392f5dac6",
  },
};

const status = (response) => {
  if (response.status !== 200) {
    console.log(`Error: ${response.status}`);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
};

const json = (response) => response.json();

const error = (error) => console.log(`Error: ${error}`);

const getTeams = () => {
  if ("caches" in window) {
    caches.match(baseUrl + "competitions/2021/teams").then((response) => {
      if (response) {
        response.json().then((data) => {
          loadTeams(data.teams);
          hidePreLoader();
        });
      }
    });
  }

  fetch(baseUrl + "competitions/2021/teams", header)
    .then(status)
    .then(json)
    .then((data) => {
      loadTeams(data.teams);
      hidePreLoader();
    })
    .catch(error)
    .then((e) => {
      console.log(">>> error", e);
      hidePreLoader();
    });
};

const getSavedTeams = () => {
  getAll().then((data) => {
    if (data.length == 0) {
      console.log("no fav");
      loadEmptySavedTeams();
      hidePreLoader();
    } else {
      loadSavedTeams(data);
      hidePreLoader();
    }
  });
};

const getTeamById = () => {
  return new Promise((resolve, reject) => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(baseUrl + "teams/" + idParam).then((response) => {
        if (response) {
          response.json().then((data) => {
            loadTeamById(data);
            hidePreLoader();
            resolve(data);
          });
        }
      });
    }

    fetch(baseUrl + "teams/" + idParam, header)
      .then(status)
      .then(json)
      .then((data) => {
        loadTeamById(data);
        hidePreLoader();
        resolve(data);
      })
      .catch(error)
      .then((e) => {
        console.log(">>> error", e);
        hidePreLoader();
      });
  });
};

const getTopScores = () => {
  if ("caches" in window) {
    caches.match(baseUrl + "competitions/2021/scorers").then((response) => {
      if (response) {
        response.json().then((data) => {
          loadTopScores(data.scorers);
          hidePreLoader();
        });
      }
    });
  }

  fetch(baseUrl + "competitions/2021/scorers", header)
    .then(status)
    .then(json)
    .then((data) => {
      loadTopScores(data.scorers);
      hidePreLoader();
    })
    .catch(error)
    .then((e) => {
      console.log(">>> error", e);
      hidePreLoader();
    });
};

const getStanding = () => {
  if ("caches" in window) {
    caches.match(baseUrl + "competitions/2021/standings").then((response) => {
      if (response) {
        response.json().then((data) => {
          loadStanding(data.standings[0].table);
          hidePreLoader();
        });
      }
    });
  }

  fetch(baseUrl + "competitions/2021/standings", header)
    .then(status)
    .then(json)
    .then((data) => {
      loadStanding(data.standings[0].table);
      hidePreLoader();
    })
    .catch(error)
    .then((e) => {
      console.log(">>> error", e);
      hidePreLoader();
    });
};

const hidePreLoader = () =>{
  let preLoader = document.querySelector(".progress");
  if(preLoader){
    preLoader.style.display = "none"
  }
}

const loadTeamById = async (data) => {
  let squad = await data.squad;
  let coach = squad[squad.length - 1].name;

  let articleHTML = `
  <div class="col s12 m5">
    <div class="emblem-detail">
      <img class="responsive-img" src="${data.crestUrl}">
    </div>
  </div>
  <div class="col s12 m7">
    <div class="card-panel">
      <h4 class="title"><strong>${data.name}</strong></h4>
      <div class="sub">
        <img src="/assets/history.png" class="img-icon" />
        <h6>${data.founded}</h6>
      </div>
      <div class="sub">
        <img src="/assets/stadium.png" class="img-icon" />
        <h6>${data.venue}</h6>
      </div>
      <div class="coach">
        <div class="chip">
          <img src="/assets/coach.png">
          ${coach}
        </div>
      </div>
      <div class="player"></div>
    </div>
  </div>
  `;
  document.getElementById("team-detail-body").innerHTML = articleHTML;

  let playerHTML = "";

  for (let i = 0; i < squad.length - 1; i++) {
    playerHTML += `
  <div class="chip">
    <img src="/assets/tshirt.png">
    ${squad[i].name}
  </div>
  `;
  }

  document.querySelector(".player").innerHTML = playerHTML;
};

const loadTopScores = (data) => {
  let articlesHTML = "";
  let pos = 1;
  data.forEach((element) => {
    articlesHTML += `
    <div class="card-item">
      <div class="rank">${pos}</div>
      <div class="description">
        <h5>${element.player.name}</h5>
        <div class="sub">
          <img src="../assets/shield.png" class="img-icon">
          <h6>${element.team.name}</h6>
        </div>
        <div class="sub">
          <img src="../assets/flag.png" class="img-icon">
          <h6>${element.player.nationality}</h6>
        </div>
        <div class="goal">
          <h5>${element.numberOfGoals}</h5>
          <img src="../assets/goal.png" class="img-icon">
        </div>
      </div>
    </div>
    `;
    pos++;
  });
  document.getElementById("top-scorers-wrapper").innerHTML = articlesHTML;
  
};

const loadTeams = (data) => {
  let articlesHTML = "";
  data.forEach((element) => {
    articlesHTML += `
    <div class="col s12 m6 l4">
      <div class="card">
        <div class="card-image">
          <img class="emblem" src="${element.crestUrl}" />
        </div>
        <div class="description card-content">
          <h5 class="team-title">${element.name}</h5>
          <div class="sub">
            <img src="../assets/history.png" class="img-icon" />
            <h6>${element.founded}</h6>
          </div>
          <div class="sub team-venue">
            <img src="../assets/stadium.png" class="img-icon" />
            <h6>${element.venue}</h6>
          </div>
        </div>
        <div class="card-action right-align">
          <a href="./team-detail.html?id=${element.id}" id="see-detail" class="deep-purple-text darken-5"><strong>SEE DETAILS</strong></a>
        </div>
      </div>
    </div>
    `;
  });
  document.getElementById("teams-wrapper").innerHTML = articlesHTML;
  
};

const loadEmptySavedTeams = () => {
  let articlesHTML = `
    <div>
      <h4 class="white-text">Your Favorite teams is empty</h4>
    </div>
  `;

  document.getElementById("teams-wrapper").innerHTML = articlesHTML;
  
};

const loadSavedTeams = (data) => {
  let articlesHTML = "";
  data.forEach((element) => {
    articlesHTML += `
    <div class="col s12 m6 l4">
      <div class="card">
        <div class="card-image">
          <img class="emblem" src="${element.crestUrl}" />
        </div>
        <div class="description card-content">
          <h5 class="team-title">${element.name}</h5>
          <div class="sub">
            <img src="../assets/history.png" class="img-icon" />
            <h6>${element.founded}</h6>
          </div>
          <div class="sub team-venue">
            <img src="../assets/stadium.png" class="img-icon" />
            <h6>${element.venue}</h6>
          </div>
        </div>
        <div class="card-action right-align">
          <a href="./team-detail.html?id=${element.id}&saved=true" id="see-detail" class="deep-purple-text darken-5"><strong>SEE DETAILS</strong></a>
        </div>
      </div>
    </div>
    `;
  });
  document.getElementById("teams-wrapper").innerHTML = articlesHTML;
  
};

const loadStanding = (data) => {
  let articlesHTML = `
  <li class="collection-item collection-header row hide-on-med-and-down">
    <div class="col center-align s1">Position</div>
    <div class="col center-align s5">Club</div>
    <div class="col center-align s1">Played</div>
    <div class="col center-align s1">Won</div>
    <div class="col center-align s1">Drawn</div>
    <div class="col center-align s1">Lost</div>
    <div class="col center-align s1">GD</div>
    <div class="col center-align s1">Points</div>
  </li>
  <li class="collection-item-md collection-header row hide-on-large-only">
    <div class="col center-align s1">Pos</div>
    <div class="col center-align s4">Club</div>
    <div class="col center-align s1">Pl</div>
    <div class="col center-align s1">W</div>
    <div class="col center-align s1">D</div>
    <div class="col center-align s1">L</div>
    <div class="col center-align s1">GD</div>
    <div class="col center-align s2">Pts</div>
  </li>
  `;
  data.forEach((element) => {
    articlesHTML += `
    <li class="collection-item row hide-on-med-and-down">
      <div class="col center-align s1">${element.position}</div>
      <div class="col s5">${element.team.name}</div>
      <div class="col center-align s1">${element.playedGames}</div>
      <div class="col center-align s1">${element.won}</div>
      <div class="col center-align s1">${element.draw}</div>
      <div class="col center-align s1">${element.lost}</div>
      <div class="col center-align s1">${element.goalDifference}</div>
      <div class="col center-align s1">${element.points}</div>
    </li>
    <li class="collection-item-md row hide-on-large-only">
      <div class="col center-align s1">${element.position}</div>
      <div class="col s4 ovx-hidden">${element.team.name}</div>
      <div class="col center-align s1">${element.playedGames}</div>
      <div class="col center-align s1">${element.won}</div>
      <div class="col center-align s1">${element.draw}</div>
      <div class="col center-align s1">${element.lost}</div>
      <div class="col center-align s1">${element.goalDifference}</div>
      <div class="col center-align s2">${element.points}</div>
    </li>
    `;
  });
  document.getElementById("tables-wrapper").setAttribute("class", "collection");
  document.getElementById("tables-wrapper").innerHTML = articlesHTML;
  
};
