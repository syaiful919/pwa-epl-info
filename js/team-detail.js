

document.addEventListener("DOMContentLoaded", function () {
  getTeamById()
  let isFav = false;

  document.getElementById("saveToFav").addEventListener("click", ()=>{
    console.log(">>> clicked")
    let saveButton = document.getElementById("save-button");
    let unsaveButton = document.getElementById("unsave-button");


    if(isFav === false){
      saveButton.style.display = "none"
      unsaveButton.style.display = "block"
      isFav = true
    } else {
      saveButton.style.display = "block"
      unsaveButton.style.display = "none"
      isFav = false
    }
    
  })

    

})