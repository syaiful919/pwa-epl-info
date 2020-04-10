document.addEventListener("DOMContentLoaded", () => {
  // Sidebar navigation
  let elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);

  const loadNav = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function(elm) {
            elm.addEventListener("click", function(event) {
              var sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  };
  loadNav();



  // Home card click event
  const homeBannerEvent = () => {
    document.getElementById("teams").addEventListener("click", ()=> loadPage("teams"));
    document.getElementById("fav-teams").addEventListener("click", ()=> loadPage("fav-teams"));
    document.getElementById("tables").addEventListener("click", ()=> loadPage("tables"));
    document.getElementById("top-scores").addEventListener("click", ()=> loadPage("top-scores"));
  };



  // Load page content
  const loadPage = page => {
    console.log(">>> page", page)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        var content = document.querySelector(".body-content");
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
          if (page == "home") {
            homeBannerEvent();
          } else if (page == "tables"){
            getStanding();
          } else if (page == "top-scores"){
            getTopScores();
          } else if (page == "teams"){
            getTeams();
          } else if (page == "fav-teams"){
            
          } 
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  };

 
  let page = window.location.hash.substr(1);
  console.log(">>> page luar", page)
  if (page == "") page = "home";
  loadPage(page);
});
