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
        displayCategoriesList(ctry);
    }
    getPageview(window)
}

window.addEventListener("DOMContentLoaded", displayCategories);

function getPageview(event) {
    const getScreenWidth = event.currentTarget ? event.currentTarget.innerWidth : event.innerWidth
    if (getScreenWidth < 550) {
        document.getElementById('categoriesdd').classList.remove('display-none')
        document.getElementById('categoriesdd').classList.add('dropdownlist')

    } else {
        document.getElementById('categoriesdd').classList.add('display-none')
        document.getElementById('categoriesdd').classList.remove('dropdownlist')
    }
}

window.addEventListener('resize', function (event) {
    getPageview(event)
}, true);

function handleOnchange(e) {
    location.href = `./products.html?id=${e.target.value}`;
}

function displayCategoriesList(category) {
    let Sidebarlist = document.createElement('li');
    let SidebarItem = document.createElement('a');
    SidebarItem.setAttribute("href", `./products.html?id=${category.id}`);
    SidebarItem.innerHTML = category.name
    Sidebarlist.append(SidebarItem);


    let dropdownOptions = document.createElement('option');
    dropdownOptions.setAttribute("value", category.id);
    dropdownOptions.innerHTML = category.name
    const urlId = location?.search.replace("?id=", "")
    if (urlId.length > 0 && category.id == urlId) {
        dropdownOptions.setAttribute("selected", true);
    }
    document.getElementById('categoriesdd').appendChild(dropdownOptions)
    document.getElementById('sidebar-list').appendChild(Sidebarlist)
}

function getProducts() {
    return fetch("http://localhost:5000/products").then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error("unable to fetch products!");
        }
    });
}

async function displayProducts() {
    const id = location.search.replace("?id=", "");
    let productList = await getProducts();
    let finalList = id?.length > 0 ? productList?.filter(item => { return item.category == id }) : productList
    for (const prd of finalList) {
        displayProductCard(prd);
    }
}

window.addEventListener("DOMContentLoaded", displayProducts);

function displayProductCard(prdt) {

    let productCard = document.createElement('div');
    productCard.setAttribute('class', 'product-card')

    let productName = document.createElement('p');
    productName.setAttribute('class', 'product-name')
    productName.innerHTML = prdt.name;
    productCard.append(productName);

    let prdimageConatainer = document.createElement('div');
    prdimageConatainer.setAttribute("class", "image-container");

    let productImage = document.createElement('img');
    productImage.setAttribute("src", prdt.imageURL);
    productImage.setAttribute("alt", prdt.name);

    prdimageConatainer.append(productImage);
    productCard.append(prdimageConatainer);

    let productDesc = document.createElement('p');
    productDesc.setAttribute('class', 'product-desc')
    productDesc.innerHTML = prdt.description;
    productCard.append(productDesc);

    let productInfo = document.createElement('div');
    productInfo.setAttribute('class', 'product-info')

    let productPriceDiv = document.createElement('div');
    productPriceDiv.setAttribute('class', 'product-price')

    let productprice = document.createElement('p');
    // productDesc.setAttribute('class', 'product-desc')
    productprice.innerHTML = `MRP Rs${prdt.price}`;
    productPriceDiv.append(productprice);
    productInfo.append(productPriceDiv)

    let productBuy = document.createElement('button');
    productBuy.setAttribute("class", 'prd-buynow');
    productBuy.setAttribute("id", prdt.id);
    productBuy.innerHTML = 'Buy Now'
    let productpricemobile = document.createElement('span');
    productpricemobile.innerHTML = `@ Rs${prdt.price}`;
    productBuy.append(productpricemobile)
    productBuy.addEventListener("click", () => handleProductBuy(prdt));
    productInfo.append(productBuy)

    productCard.append(productInfo);

    document.querySelector('.product-container').appendChild(productCard)
}

function handleProductBuy(prdt) {
    const itemCount = document.getElementById("card-ItemsCount");

    let getCartData = JSON.parse(localStorage.getItem("cartData"));
    if (getCartData) {
        let isdup = false;
        getCartData.forEach(element => {
            if (element.id === prdt.id) {
                element.count = element.count + 1;
                isdup = true;
                return;
            }
        });
        if (!isdup) getCartData.push({ ...prdt, count: 1 });
        const totalItems = getCartData?.length > 1 ? Object.values(getCartData).reduce((a, { count }) => a + count, 0) :
            getCartData[0].count
        itemCount.innerHTML = totalItems > 1 ? `${totalItems} Items` : `${totalItems} Item`
        setItemsInLocalStorage(getCartData, totalItems);
    } else {
        itemCount.innerHTML = `${1} Item`
        setItemsInLocalStorage([{ ...prdt, count: 1 }], 1);
    }
}

function setItemsInLocalStorage(data, totalItems) {
    localStorage.setItem("cartItems", totalItems);
    localStorage.setItem("cartData", JSON.stringify(data));
}