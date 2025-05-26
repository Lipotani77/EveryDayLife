
document.getElementById('rotateImage').onclick = function () {
    document.getElementById('earthModal').style.display = "block";
};
document.querySelector('.modal .close').onclick = function () {
    document.getElementById('earthModal').style.display = "none";
};
window.onclick = function (event) {
    if (event.target == document.getElementById('earthModal')) {
        document.getElementById('earthModal').style.display = "none";
    }
};
