function openNav() {
  document.getElementById("sideNavRight").style.width = `calc(100vw/2)`;
  document.getElementById("sideNavLeft").style.width = `calc(100vw/2)`;
}

function closeNav() {
  document.getElementById("sideNavRight").style.width = 0;
  document.getElementById("sideNavLeft").style.width = 0;
}

async function getShow(url) {
  try {
    let fetchShow = await fetch(url);
    fetchShow = await fetchShow.json();
    handleShowResponse(fetchShow);
  } catch (err) {
    console.log(err);
  }
}

function handleShowResponse(response) {
  document.getElementById("render").innerHTML = `
      <div class="show">
        <img id="showImg" class="show-image" />
        <div id="showInfo" class="show-info">
          <div class="summary" id="summary"></div>
        </div>
      </div>`;
  document.getElementById("summary").innerHTML = response.summary;
  document.getElementById("showImg").src = response.image.original;
}

function createUrl(ext, id) {
  let url = "https://api.tvmaze.com/shows/14055";
  let getUrl = url + ext;
  document.getElementById("render").innerHTML = "";
  closeNav();
  if (id === "seasons") {
    console.log(getRequestSeasons(getUrl));
  } else if (id === "episodes") {
    console.log(getRequestEpisodes(getUrl));
  } else if (id === "cast") {
    console.log(getRequestCast(getUrl));
  } else if (id === "crew") {
    console.log(getRequestCrew(getUrl));
  }
}

async function getRequestSeasons(url) {
  try {
    let fetchSeasons = await fetch(url);
    fetchSeasons = await fetchSeasons.json();
    handleRequestSeasons(fetchSeasons);
  } catch (err) {
    console.log(err);
  }
}

function handleRequestSeasons(response) {
  for (let i = 0; i < response.length; i++) {
    document.getElementById("render").innerHTML += `
        <div class="season">
            <img class="seasonImg" id="seasonImg${i}"/>
            <div id="numEpisodes${i}"></div>
            <div id="premiereDate${i}"></div>
        </div>`;
    if (response[i].image !== null) {
      document.getElementById(`seasonImg${i}`).src = response[i].image.medium;
    } else {
      document.getElementById(`seasonImg${i}`).src = `./images/season${i +
        1}.jpg`;
    }
  }
}

async function getRequestEpisodes(url) {
  try {
    let fetchEpisodes = await fetch(url);
    fetchEpisodes = await fetchEpisodes.json();
    handleRequestEpisodes(fetchEpisodes);
  } catch (err) {
    console.log(err);
  }
}

function handleRequestEpisodes(response) {
  for (let i = 0; i < response.length; i++) {
    document.getElementById("render").innerHTML += `
        <div class="episode">
            <div class="episode-details">
            <img id="episodeImg${i}" class="episodeImg"/>
                <div class="episode-text">
                    <div id="name${i}" class="episode-name"></div>
                    <div id="season${i}"></div>
                    <div id="episode${i}"></div>
                    <div id="airdate${i}"></div>
                    <div id="summary${i}" class="episode-summary"></div>
                </div>
            </div>
        </div>`;
    document.getElementById(`episodeImg${i}`).src = response[i].image.medium;
    document.getElementById(`name${i}`).innerHTML = response[i].name;
    document.getElementById(`season${i}`).innerHTML = `${"Season: " +
      response[i].season}`;
    document.getElementById(`episode${i}`).innerHTML = `${"Episode: " +
      response[i].number}`;
    document.getElementById(`airdate${i}`).innerHTML = `${"Air Date: " +
      response[i].airdate}`;
    document.getElementById(`summary${i}`).innerHTML = response[i].summary;
  }
}

async function getRequestCast(url) {
  try {
    let fetchCrew = await fetch(url);
    fetchCrew = await fetchCrew.json();
    handleRequestCast(fetchCrew);
  } catch (err) {
    console.log(err);
  }
}

function handleRequestCast(response) {
  for (let i = 0; i < response.length; i++) {
    document.getElementById("render").innerHTML += `
        <div class="cast">
            <div class="cast-details">
                <img id="castImg${i}"/>
                <div class="cast-text">
                    <div id="character-name${i}" class="character-name"></div>
                    <div id="person-name${i}"></div>
                </div>
            </div>
        </div>`;
    document.getElementById(`castImg${i}`).src =
      response[i].character.image.medium;
    document.getElementById(`character-name${i}`).innerHTML = `${'"' +
      response[i].character.name +
      '"'}`;
    document.getElementById(`person-name${i}`).innerHTML =
      response[i].person.name;
  }
}

async function getRequestCrew(url) {
  try {
    let fetchCrew = await fetch(url);
    fetchCrew = await fetchCrew.json();
    handleRequestCrew(fetchCrew);
  } catch (err) {
    console.log(err);
  }
}

function handleRequestCrew(response) {
  for (let i = 0; i < response.length; i++) {
    document.getElementById("render").innerHTML += `
            <div class="crew w3-animate-bottom">
                <div class="crew-text">
                    <div id="crew-name${i}" class="crew-name"></div>
                    <div id="crew-role${i}"></div>
                </div>
            </div>
        `;
    document.getElementById(`crew-name${i}`).innerHTML =
      response[i].person.name;
    document.getElementById(`crew-role${i}`).innerHTML = response[i].type;
  }
}
