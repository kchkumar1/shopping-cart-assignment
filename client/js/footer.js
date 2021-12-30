class Footer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        var footer = document.createElement("footer");
        footer.innerText = " Copyright @ 2011-2021 Sabka Bazar Grocery Supplies Pvt Ltd";
        // var styleObj = {
        //     display: 'flex',
        //     alignItems: 'center',
        //     height: '50px',
        //     background: '#dedddd',
        //     : 'center'
        // }
        this.style.display = 'flex'
        this.style.alignItems = 'center'
        this.style.height = '50px'
        this.style.background = '#dedddd'
        this.style.justifyContent = 'center'
        this.shadowRoot.appendChild(footer);
    }
}

window.customElements.define("uc-footer", Footer);
