document.addEventListener("DOMContentLoaded", function () {
  var urlParams = new URLSearchParams(window.location.search);
  let team = getTeamById();
  let isFav = urlParams.get("saved");
  let saveButton = document.getElementById("save-button");
  let unsaveButton = document.getElementById("unsave-button");

  if (isFav || isFav == true) {
    saveButton.style.display = "none";
    unsaveButton.style.display = "block";
  } else {
    saveButton.style.display = "block";
    unsaveButton.style.display = "none";
  }

  saveButton.onclick = () =>{
    console.log(">>> saved clicked");
    team.then((team) => {
      saveTeam(team);
    });
    saveButton.style.display = "none";
    unsaveButton.style.display = "block";
    isFav = true;
  }

  unsaveButton.onclick = () =>{
    console.log(">>> remove clicked");
    team.then((team) => {
      removeTeam(team);
    });
    saveButton.style.display = "block";
    unsaveButton.style.display = "none";
    isFav = false;
  }

  
});
