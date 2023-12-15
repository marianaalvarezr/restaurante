//CHEF
//variables globales
let tablas= document.querySelectorAll(".table > tbody");
//agregar evento al navegador para mostrar los datos
document.addEventListener("DOMContentLoaded", function(){
    obtenerPedidosBD();
})
//funcion para obtener los pedidos de la base de datos
function obtenerPedidosBD(){
    let url="http://localhost:3005/chef";
    fetch(url, {
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
    }).then((e)=>e.json())
    .then((datos)=>{
        console.log(datos.dataPorPreparar);
        const{dataPorPreparar, dataPreparando, dataPorentregar}=datos;
        dataPorPreparar.forEach((platillo, i)=>{
                let fila = document.createElement("tr");
                fila.innerHTML = `
                    <TD> ${platillo.platillo}<td>
                    <td>
                        <button onclick="actualizarPedido(${platillo.id})" class="btn-editar btn btn-primary" type="button">Actualizar</button>
                    <td>
                `
                tablas[0].appendChild(fila);
            })
            dataPreparando.forEach((platillo, i)=>{
                let fila = document.createElement("tr");
                fila.innerHTML = `
                    <TD> ${platillo.platillo}<td>
                    <td>
                        <button onclick="actualizarPedido(${platillo.id} , 'preparando')" class="btn-editar btn btn-primary" type="button">Actualizar</button>
                    <td>
                `
                tablas[1].appendChild(fila);
            })
            dataPorentregar.forEach((platillo, i)=>{
                let fila = document.createElement("tr");
                fila.innerHTML = `
                    <TD> ${platillo.platillo}<td>
                    <td>
                        <button onclick="actualizarPedido(${platillo.id}, 'por entregar')" class="btn-editar btn btn-primary" type="button">Actualizar</button>
                    <td>
                `
                tablas[2].appendChild(fila);
            })
     })
    .catch((err)=>console.log(err))
    
    
}


function actualizarPedido( id, estado="por preparar"){
    let url;
    let url1= "http://localhost:3005/preparando/"+id;
    let url2= "http://localhost:3005/listo/"+id;
    switch(estado){
        case "preparando": url = url2;break;
        default: url = url1; break;
    }
    fetch(url,{
        method:"PUT",
        headers:{
            "Content-Type": "application/json"
        }
    }).then((e)=>e.text())
    .then((datos)=>{
        alert(datos);
       location.reload();
     })
    .catch((err)=>console.log(err))

}