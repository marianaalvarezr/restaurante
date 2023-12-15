//variables globales
let platillos = document.querySelectorAll(".platillo");
let clientes = document.querySelectorAll(".cliente");
let precios = document.querySelectorAll(".precios");
let cantidades = document.querySelectorAll(".cantidad");
let fechas = document.querySelectorAll(".fecha");
let observaciones = document.querySelectorAll(".observaciones");
let btnPedidos = document.querySelectorAll(".btn-pedido");


//agregar evento a los botones
btnPedidos.forEach((btn, i)=>{
    btn.addEventListener("click",()=>{
        let datosPedido = obtenerDatosPedidos(i);
        enviarPedido(datosPedido);
    });
});
//obtener datos del formulario pedidos
function obtenerDatosPedidos(pos){
    let datosRegistro;
    if (platillos[pos].value == "" || clientes[pos].value=="" || cantidades[pos].value == "" || fechas[pos].value == "" || observaciones[pos].value==""){
        alert("Todos los campos son obligatorios");
    }else{
        datosPedido = {
            platillo: platillos[pos].value,
            precio: precios[pos].textContent,
            cantidad: cantidades[pos].value,
            observaciones: observaciones[pos].value,
            cliente: clientes[pos].value,
            fecha: fechas[pos].value
        }
        console.log(datosPedido);
        platillos[pos].value="";
        precios[pos].value="";
        cantidades[pos].value="";
        observaciones[pos].value="";
        clientes[pos].value="";
        fechas[pos].value="";
    }
    return datosPedido;
}

//funcion para enviar datos del pedido
async function enviarPedido(pedido){
    let url = "http://localhost:3005/pedido";
    try{
        let respuesta= await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify( pedido )
        });
        if(!respuesta.ok){
            throw new Error('No se puede enviar el pedido');
        }
        let mensaje = await respuesta.text();
        //mostrar en la consola del navegador
        console.log(mensaje);
        //mostrar mensaje al usuario
        alert(mensaje);
        //location.href = "login.html";
    }catch(error){
        console.log("Error: " + error);
    }
}