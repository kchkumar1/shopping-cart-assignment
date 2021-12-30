function getCategories() {
    return fetch("http://localhost:5000/categories").then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("unable to fetch categories!");
        }
    });
}

async function displayCategories() {
    let categoriesList = await getCategories();
    let finalList = categoriesList?.filter(item => { return item.order !== -1 }).sort((a, b) => a.order - b.order)
    for (const ctry of finalList) {
        displayCategoryCard(ctry);
    }
}

window.addEventListener("DOMContentLoaded", displayCategories);

function displayCategoryCard(category) {
    let categoryCard = document.createElement('div');
    categoryCard.setAttribute('class', 'category-card')

    let imageConatainer = document.createElement('div');
    imageConatainer.setAttribute("class", "image-container");

    let categoryImage = document.createElement('img');
    categoryImage.setAttribute("src", category.imageUrl);
    categoryImage.setAttribute("alt", category.name);
    categoryImage.setAttribute("loading", 'lazy');

    imageConatainer.append(categoryImage);

    categoryCard.append(imageConatainer);


    let categoryInfo = document.createElement('div');
    categoryInfo.setAttribute('class', 'category-info')

    let categoryName = document.createElement('p');
    categoryName.setAttribute('class', 'category-name')
    categoryName.innerHTML = category.name;
    categoryInfo.append(categoryName)

    let categoryDesc = document.createElement('p');
    categoryDesc.setAttribute('class', 'category-desc')
    categoryDesc.innerHTML = category.description;
    categoryInfo.append(categoryDesc)

    let categoryExplore = document.createElement('button');
    categoryExplore.setAttribute("id", category.id);
    categoryExplore.innerHTML = `Explore${category.key}`
    categoryExplore.addEventListener("click", () => handleCategoryClick(category.id));
    categoryInfo.append(categoryExplore)

    categoryCard.append(categoryInfo);
    document.querySelector(".category-container").appendChild(categoryCard);

}

function handleCategoryClick(categoryId) {
    location.href = `./products.html?id=${categoryId}`;
}

// carousel

function getBanners() {
    return fetch("http://localhost:5000/banners").then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("unable to fetch banners!");
        }
    });
}

async function displayBanners() {
    let bannerList = await getBanners();
    for (const banner of bannerList) {
        displayBannerImages(banner);
    }
}

window.addEventListener("DOMContentLoaded", displayBanners);

function displayBannerImages(banner) {
    let bannerImage = document.createElement('img');
    bannerImage.setAttribute("src", banner.bannerImageUrl);
    bannerImage.setAttribute("alt", banner.bannerImageAlt);
    bannerImage.setAttribute("loading", 'lazy');

    document.querySelector(".slides").appendChild(bannerImage);
}

const delay = 3000; //ms

let current = 0;
function changeSlide(next = true) {
    const slides = document.querySelector(".slides");
    const slidesCount = slides.childElementCount;
    const maxLeft = (slidesCount - 1) * 100 * -1;

    if (next) {
        current += current > maxLeft ? -100 : current * -1;
    } else {
        current = current < 0 ? current + 100 : maxLeft;
    }

    slides.style.left = current + "%";
}

let autoChange = setInterval(changeSlide, delay);
const restart = function () {
    clearInterval(autoChange);
    autoChange = setInterval(changeSlide, delay);
};

// Controls
document.querySelector(".next-slide").addEventListener("click", function () {
    changeSlide();
    restart();
});

document.querySelector(".prev-slide").addEventListener("click", function () {
    changeSlide(false);
    restart();
});