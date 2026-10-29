
const images = document.querySelectorAll(".gallery img");

const modal = document.getElementById("slideshow");
const slideImage = document.getElementById("slideImage");
const caption = document.getElementById("caption");
const autoPlayBtn = document.getElementById("autoPlayBtn");

let currentIndex = 0;
let autoPlayTimer = null;

// Open the slideshow
function openSlide(index) {
    currentIndex = index;
    modal.classList.add("active");
    showSlide();
}

// Display the selected image
function showSlide() {
    slideImage.src = images[currentIndex].src;
    caption.textContent = images[currentIndex].alt;
}

// Next and Previous navigation
function changeSlide(direction) {
    currentIndex =
        (currentIndex + direction + images.length) % images.length;

    showSlide();
}

// Start or stop auto-play
function toggleAutoPlay() {
    if (autoPlayTimer !== null) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
        autoPlayBtn.textContent = "Start Auto-play";
    } else {
        autoPlayTimer = setInterval(function () {
            changeSlide(1);
        }, 2000);

        autoPlayBtn.textContent = "Stop Auto-play";
    }
}

// Close the slideshow
function closeSlide() {
    modal.classList.remove("active");

    if (autoPlayTimer !== null) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }

    autoPlayBtn.textContent = "Start Auto-play";
}

// Close when clicking outside the image
modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeSlide();
    }
});

// Keyboard navigation
document.addEventListener("keydown", function (event) {
    if (!modal.classList.contains("active")) return;

    if (event.key === "ArrowRight") {
        changeSlide(1);
    } else if (event.key === "ArrowLeft") {
        changeSlide(-1);
    } else if (event.key === "Escape") {
        closeSlide();
    }
});
