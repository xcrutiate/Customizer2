/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav(i) {
    //Close all
    document.getElementById("mySidenav1").style.width = "0";
    document.getElementById("mySidenav2").style.width = "0";
    document.getElementById("mySidenav3").style.width = "0";

    document.getElementById("mySidenav"+i).style.width = "250px";
    document.getElementById("main").style.marginLeft = "300px";
    document.body.style.backgroundColor = "rgba(0,0,0,0)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav1").style.width = "0";
    document.getElementById("mySidenav2").style.width = "0";
    document.getElementById("mySidenav3").style.width = "0";

    document.getElementById("main").style.marginLeft = "50";
    
}