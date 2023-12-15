//REGISTRO
//variables gobales
let inputUsuario=document.querySelector("#user");
let inputNombre=document.querySelector("#name");
let inputRol=document.querySelector("#rol");
let inputContra=document.querySelector("#password");
let btnRegistrar=document.querySelector(".btn-guardar");

//LOGIN
//variables login
let usuario = document.querySelector("#user");
let contrasena = document.querySelector("#password");
let btnLogin = document.querySelector(".btn-iniciar");

//validar existencia de los botones
if(btnRegistrar != null){
    btnRegistrar.addEventListener("click", function(){
        let datosUser= obtenerDatosRegistro ();
        enviarRegistro(datosUser);
    });  
}else if(btnLogin != null){
    btnLogin.addEventListener("click", function(){
        //alert("di click");
        let usuario=obtenerCredenciales();
        enviarLogin(usuario);

    })
}
//obtener datos del login
function obtenerCredenciales(){
    let datosLogin;
    if (usuario.value == "" || contrasena.value == ""){
        alert("Todos los campos son obligatorios");
    }else{
        datosLogin={
            user:usuario.value,
            password: contrasena.value
        }
        console.log(datosLogin);
        usuario.value="";
        contrasena.value = "";
    }
    return datosLogin;
}

//enviar credencial al back end
function enviarLogin(datos){
    let url = "http://localhost:3005/login";
    fetch(url, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify( datos )
        })
        .then((usuarioRegistrado)=>usuarioRegistrado.json())
        .then((usuario)=>{
            //validar rol
        if(usuario.rol === "mesero" && usuario.password === datos.password){
            alert("¡Bienvenido!"+usuario.user)
            location.href="mesero.html";
        }else if(usuario.rol === "cajero" && usuario.password === datos.password){
            alert("¡Bienvenido!"+usuario.user)
            location.href="cajero.html";
        }else if (usuario.rol === "chef" && usuario.password === datos.password){
            alert("¡Bienvenido! "+usuario.user)
            location.href="chef.html";
        }else{
            alert(usuario.mensaje);
        }
        //mostrar mensaje al usuario
        alert(mensaje);
        location.href = "login.html";
        })
        .catch((error)=>console.log("Error: " + error))

        
        
        

}

//obtener datos del formulario
function obtenerDatosRegistro(){
    let datosRegistro;
    if (inputUsuario.value == "" || inputNombre.value=="" || inputRol.value == "" || inputContra.value == ""){
        alert("Todos los campos son obligatorios");
    }else{
        datosRegistro = {
            user: inputUsuario.value,
            name: inputNombre.value,
            rol: inputRol.value,
            password: inputContra.value
        }
        console.log(datosRegistro);
        inputUsuario.value="";
        inputNombre.value="";
        inputRol.value="";
        inputContra.value="";
    }
    return datosRegistro;
}

//funcion para enviar datos del registro
async function enviarRegistro(usuario){
    let url = "http://localhost:3005/register";
    try{
        let respuesta= await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify( usuario )
        });
        if(!respuesta.ok){
            throw new Error('No se puede enviar registro');
        }
        let mensaje = await respuesta.text();
        //mostrar en la consola del navegador
        console.log(mensaje);
        //mostrar mensaje al usuario
        alert(mensaje);
        location.href = "login.html";
    }catch(error){
        console.log("Error: " + error);
    }
}