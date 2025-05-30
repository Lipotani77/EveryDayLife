
// Show button after scrolling down 100px
window.onscroll = function () {
    const btn = document.getElementById("backToTopButton");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 10) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
};

// Scroll to the top
function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

