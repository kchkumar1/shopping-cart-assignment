const modal = document.querySelector(".modal");
const trigger = document.querySelector(".cart-section");
const closeButton = document.querySelector(".close-button");

function startShopping() {
    location.href = "./products.html";
}

function updateCartItems() {
    const totalItems = parseInt(JSON.parse(localStorage.getItem("cartItems")));
    const cartItemcount = document.getElementById('card-ItemsCount')
    cartItemcount.innerHTML = isNaN(totalItems) ? '0 items' : totalItems > 1 ? `${totalItems} Items` : `${totalItems} Item`
}

function toggleModal() {
    modal.classList.toggle("show-modal");
    buildCart();
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);


function buildCart() {
    const cartData = JSON.parse(localStorage.getItem("cartData"));
    document.querySelector('.cart-main')?.remove();
    if (cartData?.length > 0) {
        document.querySelector('.desc-empty').classList.add("display-none");
        document.querySelector('.cart-empty').classList.add("display-none");

        const cartMain = document.createElement("div");
        cartMain.setAttribute("class", "cart-main");

        const cartItems = document.createElement("div");
        cartItems.setAttribute("class", "cart-items");

        const cartItem = document.createElement("div");
        cartItem.setAttribute("class", "cart-itemcontainer");


        cartData.forEach((product, index) => {
            cartItem.appendChild(buildCartCard(product, index));
        });
        const banner = document.createElement("div");
        banner.setAttribute("class", "banner");

        const bannerImgDiv = document.createElement("div");
        bannerImgDiv.setAttribute("class", "banner-img");

        let bannerImage = document.createElement('img');
        bannerImage.setAttribute("src", '../../static/images/lowest-price.png');
        bannerImage.setAttribute("alt", 'banner');

        const bannerDescDiv = document.createElement("div");
        bannerDescDiv.setAttribute("class", "banner-desc");

        const bannerDesc = document.createElement('p');
        bannerDesc.setAttribute('class', 'banner-desc')
        bannerDesc.innerHTML = 'You wont find it cheaper anywhere';
        bannerDescDiv.append(bannerDesc);

        const proceedButton = document.createElement('button')
        proceedButton.setAttribute('class', 'promo-button')
        proceedButton.innerHTML = 'Proceed to Checkout';


        bannerImgDiv.append(bannerImage)
        banner.append(bannerImgDiv)
        banner.append(bannerDescDiv)
        cartItems.append(cartItem)
        cartItem.append(banner)
        cartItem.append(proceedButton)
        cartMain.append(cartItems)
        document.querySelector('.cart-container').appendChild(cartMain)
    }
}

function buildCartCard(product, index) {
    const cartItem = document.createElement("div");
    cartItem.setAttribute("class", "cart-item");

    const cartImageDiv = document.createElement("div");
    cartImageDiv.setAttribute("class", "cart-image");

    let cartImage = document.createElement('img');
    cartImage.setAttribute("src", product.imageURL);
    cartImage.setAttribute("alt", 'cartimg');
    cartImageDiv.append(cartImage)

    const cartItemDesc = document.createElement("div");
    cartItemDesc.setAttribute("class", "cart-item-description");

    const itemName = document.createElement("div");
    itemName.setAttribute("class", "item-name");

    const itemNameh2 = document.createElement("h2");
    itemNameh2.innerHTML = product.name
    itemName.append(itemNameh2)
    cartItemDesc.append(itemName)

    const itemBar = document.createElement("div");
    itemBar.setAttribute("class", "item-bar");

    const minusButton = document.createElement("button");
    minusButton.setAttribute("class", "button-item");
    minusButton.innerHTML = ' - '
    minusButton.addEventListener("click", () => updateProduct(index, 'remove'));

    const itemQunatity = document.createElement("div");
    itemQunatity.setAttribute("class", "item-qty");
    itemQunatity.setAttribute("id", `qty-${product.id}`);
    itemQunatity.innerHTML = product.count

    const plusButton = document.createElement("button");
    plusButton.setAttribute("class", "button-item");
    plusButton.innerHTML = ' + '
    plusButton.addEventListener('click', () => updateProduct(index, 'add'))

    itemBar.append(minusButton)
    itemBar.append(itemQunatity)
    itemBar.append(plusButton)

    const itemPrice = document.createElement("div");
    itemPrice.setAttribute("class", "item-price");
    itemPrice.innerHTML = ` X  Rs.${product.price}`
    itemBar.append(itemPrice)

    const itemTotal = document.createElement("div");
    itemTotal.setAttribute("id", `total-${product.id}`);
    itemTotal.setAttribute("class", "item-total");
    itemTotal.innerHTML = `Rs.${product.count * product.price}`
    itemBar.append(itemTotal)

    cartItemDesc.append(itemBar)
    cartItem.append(cartImageDiv)
    cartItem.append(cartItemDesc)

    return cartItem
}

function updateProduct(idx, func) {
    let cartData = JSON.parse(localStorage.getItem("cartData"));
    if (func === 'remove' && cartData[idx].count === 0) {
        return;
    }
    const updateddata = cartData.map(cd => {
        return cd.id === cartData[idx].id ? { ...cd, count: func === 'remove' ? cd.count - 1 : cd.count + 1 } : cd
    })
    const finalList = updateddata.filter(itm => (itm.count > 0))
    localStorage.setItem('cartData', JSON.stringify(finalList))

    cartData[idx].count = func === 'remove' ? (cartData[idx].count > 0 ? cartData[idx].count - 1 : cartData[idx].count) : cartData[idx].count + 1;
    const value = parseInt(JSON.parse(localStorage.getItem("cartItems")));
    func === 'remove' ? localStorage.setItem('cartItems', value - 1) : localStorage.setItem('cartItems', value + 1)
    updateCartItems()
    document.querySelector(`#qty-${cartData[idx].id}`).innerHTML = cartData[idx].count;
    document.querySelector(`#total-${cartData[idx].id}`).innerHTML = `Rs. ${cartData[idx].count * cartData[idx].price
        }`;
}
