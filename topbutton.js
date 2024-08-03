window.onscroll = function() {scrollcheck();};
function scrollcheck() {
    const topbutton = document.getElementById("topbutton");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        topbutton.style.display = "block";
    } else {
        topbutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}