export class MainMenu extends HTMLElement{
    constructor(){
        super();
        this.render();
    }
    render(){
        this.innerHTML=/* html*/ `
                <nav class="navbar navbar-expand-lg bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="index.html"<img src="img/starwar.png" alt="800px">CampusLatino</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="lista.html">listar Camper</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="customers.html">mostrar</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>        
        `
    }
}

customElements.define("main-menu",MainMenu);