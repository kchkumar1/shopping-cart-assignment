const template = document.createElement("template");
template.innerHTML = `
<style>
@import "../css/login.css";
</style>
<header>
<div>
    <a href="/"><img class="logo" src='../../static/images/logo.png' alt='Logo'></img></a>
    <nav class='app-navlinks'>
        <ul>
            <li>
                <a href="./home.html">Home</a>
            </li>
            <li>
                <a href="./products.html">Products</a>
            </li>
        </ul>
    </nav>
</div>
<div class="logincart-section">
    <nav class='login-navlinks'>
        <ul>
            <li>
                <a href='./login.html'>SignIn</a>
            </li>
            <li>
                <a href="./register.html">Register</a>
            </li>
        </ul>
    </nav>
    <div class="cart-section">
        <img class="cart-image" src='../../static/images/cart.svg' alt='cartImage'></img>
        <p id='cart-count'>0 items</p>
    </div>
    <div class="modal">
        <div class="modal-content">
            <span class="close-button">×</span>
            <h1>Hello, I am a modal!</h1>
        </div>
    </div>
</div>
</header>
`;

class Header extends HTMLElement {
    cartCount;
    modal;
    trigger;
    closeButton;
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.cartCount = this.shadowRoot.querySelector("#cart-count");
        this.modal = this.shadowRoot.querySelector(".modal");
        this.trigger = this.shadowRoot.querySelector(".cart-section");
        this.closeButton = this.shadowRoot.querySelector(".close-button");
    }

    connectedCallback() {
        function toggleModal() {
            modal.classList.toggle("show-modal");
        }

        function windowOnClick(event) {
            if (event.target === modal) {
                toggleModal();
            }
        }
        this.trigger.addEventListener("click", toggleModal);
        this.closeButton.addEventListener("click", toggleModal);
        // window.addEventListener("click", windowOnClick);
    }

    attributeChangedCallback(newValue) {
        this.cartCount.textContent = `${+newValue || localStorage.getItem("cartCount") || "0"
            } items`;
    }

    static get observedAttributes() {
        return ["cartCount"];
    }

}


window.customElements.define("uc-header", Header);
