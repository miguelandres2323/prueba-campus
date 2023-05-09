import { getDataAll,searchDataById,opc } from '../../Apis/customer-api.js';

export class CustomerLista extends HTMLElement{
    idUsr=0;
    constructor(){
        super();
        this.render();
        this.requestApiGetCliente();
        this.abrirModal();
        
    }
    render(){
        this.innerHTML = /* html */ `
            <table class="table table-striped">
                <thead>
                    <th>Id</th>
                    <th>Nombre</th>    
                    <th>edad</th>
                    <th>Email</th>
                    <th>Tel</th>
                    <th>Fecha Nac</th>
                    <th>Direccion</th>
                    <th>Numero de Documento</th>
                    <th>fecha ingreso</th>
                    </thead>
                <tbody id="lista-clientes">

                </tbody>
            </table>
            <div class="modal fade " id="putCliente" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="card">
        <h5 class="card-header">Registro de Camper</h5>
        <div class="card-body">
            <div class="container">
                <div class="row g-3">
                    <div class="col-12">
                        <form id = "frmData">
                            <div class="row g-3">
                                <div class="col-3">
                                    <label for="idCamper" class="form-label">Id del Camper</label>
                                    <input type="text" class="form-control" id="idCamper" name="idCamper">                  
                                </div>
                                <div class="col-3">
                                    <label for="nombres" class="form-label">Nombres</label>
                                    <input type="text" class="form-control" id="nombres" name="nombres">                  
                                </div>
                                <div class="col-3">
                                    <label for="edad" class="form-label">Edad</label>
                                    <input type="text" class="form-control" id="edad" name="edad">                  
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col-4">
                                    <label for="email" class="form-label">Email </label>
                                    <input type="email" class="form-control" id="email" name="email">
                                </div>
                                <div class="col-4">
                                    <label for="telefono" class="form-label">Nro Movil</label>
                                    <input type="text" class="form-control" id="telefono" name="telefono">                  
                                </div>
                                <div class="col-4">
                                    <label for="fechanac" class="form-label">Fecha Nacimiento</label>
                                    <input type="date" class="form-cjson-server --watchontrol" id="fechanac" name="fechanac">                  
                                </div>
                                <div class="col-4">
                                    <label for="direccion" class="form-label">Direccion</label>
                                    <input type="text" class="form-control" id="direccion" name="direccion">                  
                                </div>
                                <div class="col-4">
                                    <label for="cc" class="form-label">Ingrese el numero de Documento</label>
                                    <input type="text" class="form-control" id="cc" name="cc">                  
                                </div>
                                <div class="col-4">
                                    <label for="fechaIngreso" class="form-label">Ingrese la fecha en la que ingreso </label>
                                    <input type="date" class="form-control" id="fechaIngreso" name="fechaIngreso">                  
                                </div>
                                <div class="col-4">
                                    <label for="IdTeam" class="form-label">Id del Team </label>
                                    <input type="text" class="form-control" id="IdTeam" name="IdTeam">                  
                                </div>
                                
                                
                                    <div class="container mt-4 text-center" >
                                        <input type="submit" data-accion="POST" class="btn btn-primary" value="Guardar Z">
                                    </div>
                            </div>
                        </form>                         
                </div>
            </div>
        </div>
        </div>
    </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                    </div>
                </div>
            </div>        
        `
    }

    abrirModal = () =>{
        var myModal = document.querySelector('#putCliente')
        myModal.addEventListener('shown.bs.modal', function () {
            //myInput.focus()
        })
    }
    requestApiGetCliente = () =>{
        getDataAll()
            .then((result)=>{
                this.renderClientes(result);
            })
    }
    renderClientes = (clientes)=>{
        let clientesHTML = '';
        for(let cliente of clientes){
            clientesHTML += this.crearListaClientesHTML(cliente);
        }
        document.getElementById('lista-clientes').innerHTML = clientesHTML;
        this.callModal();
        this.putData();
    }
    crearListaClientesHTML = (clientes)=>{
        let listaHTML = /* html */ `
        <tr>
            <tr>
            <td>${clientes.id}</td>
            <td>${clientes.nombre}</td>
            <td>${clientes.edad}</td>
            <td>${clientes.email}</td>
            <td>${clientes.tel}</td>
            <td>${clientes.fechaNac}</td>
            <td>${clientes.direccion}</td>
            <td>${clientes.cc}</td>
            <td>${clientes.ingreso}</td>
        <td>
            <button type="submit" class="btn btn-success">+</button>
            <button type="submit" class="btn btn-danger">-</button>
        </td>
            </tr>
        `;
        return listaHTML;
    }
    callModal = () =>{
        document.querySelectorAll('#putData').forEach((item,id) =>{
            item.addEventListener("click",(e) =>{
                this.idUsr=e.target.dataset.idcli;
                this.requestApiGetClienteById(e.target.dataset.idcli);
                e.stopImmediatePropagation();
                e.preventDefault();
            })
        })

    }
    requestApiGetClienteById = (id) =>{
        searchDataById(id)
            .then((result)=>{
                this.loadDataFrm(result);
            })
    }
    loadDataFrm(data){
        
        const myForm = document.querySelector("#frmData");
        const {id,nombre,edad,email,tel,fechaNac,direccion,cc,ingreso} = data;
        const frm = new FormData(myForm);
        frm.set("id",id);
        frm.set("nombre",nombre);
        frm.set("edad",edad);
        frm.set("email",email);
        frm.set("tel",tel);
        frm.set("fechaNac",fechaNac);
        frm.set("direccion",direccion);
        frm.set("cc",cc);
        frm.set("ingreso",ingreso);
        // Itera a través de los pares clave-valor de los datos
        for (var pair of frm.entries()) {
            // Establece los valores correspondientes en el formulario
            myForm.elements[pair[0]].value = pair[1];
        }

    }
    putData = (id) =>{
        let myForm = document.querySelector("#frmData");
        myForm.addEventListener("submit", (e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            opc[e.submitter.dataset.accion](data,this.idUsr);  
        })
    }

}
customElements.define("customer-lista",CustomerLista);