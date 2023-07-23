const carousel = document.querySelector(".imagesCarousel");
const firstImage = carousel.querySelectorAll("img")[0];
const firstImageOffset = carousel.querySelector("img").offsetWidth;
let arrowIcons = document.querySelectorAll(".carouselOfImages i");
let isDragStart = false, prevPageX, prevScrollLeft;
let firstImgWidth = firstImage.clientWidth + 20;
const carouselChildrens = [...carousel.children];

let imagePerView = Math.round(carousel.offsetWidth / firstImageOffset);

carouselChildrens.slice(-imagePerView).reverse().forEach(img => {
    carousel.insertAdjacentHTML("afterbegin", img.outerHTML);
});

carouselChildrens.slice(0, imagePerView).forEach(img => {
    carousel.insertAdjacentHTML("beforeend", img.outerHTML);
});

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        console.log(icon);
        console.log(firstImgWidth);
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    })
});

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    carousel.classList.add("dragging")
    let positionDiff = e.pageX - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging")
};

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition")
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition")
    }
}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('scroll', infiniteScroll);
