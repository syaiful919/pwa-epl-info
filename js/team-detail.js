document.addEventListener("DOMContentLoaded", async function () {
  var urlParams = new URLSearchParams(window.location.search);
  let idParam = await urlParams.get("id");
  let team = getTeamById();
  let isFav = false;
  let saveButton = document.getElementById("save-button");
  let unsaveButton = document.getElementById("unsave-button");

  await getById(parseInt(idParam)).then(data=>{
    if (data != undefined){
      isFav = true
    }
  })

  if (isFav == true) {
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
    M.toast({html: 'Added to favorite', classes: 'rounded'})
  }

  unsaveButton.onclick = () =>{
    console.log(">>> remove clicked");
    team.then((team) => {
      removeTeam(team);
    });
    saveButton.style.display = "block";
    unsaveButton.style.display = "none";
    isFav = false;
    M.toast({html: 'removed from favorite', classes: 'rounded'})
  }

  
});
