
// Configurar Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBKBTk4chsBNOtlGpmAsu-4c__D4DW9J8c",
  authDomain: "paginaweb-99498.firebaseapp.com",
  projectId: "paginaweb-99498",
  storageBucket: "paginaweb-99498.appspot.com",
  messagingSenderId: "23907427037",
  appId: "1:23907427037:web:b2051f3bd80e9a9ee1f134"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

//BOTON REGISTRAR
const btnRegistrar = document.getElementById("btnRegistrar"); //llamando al DOM
btnRegistrar.addEventListener('click', () => {
  let email = document.getElementById("emailRegistrate").value;
  let password = document.getElementById("passwordRegistrate").value;
  console.log(email);
  console.log(password);
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("Inicio de sesión correcto");

      formulario.classList.replace('mostrar', 'ocultar')

      contenidoDelaWeb.classList.replace('ocultar', 'mostrar')
      cargarJSON();
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Inicio de sesión incorrecto");
      alert(errorMessage);
      console.log(errorMessage);
      // ..
    });
})
const contenidoDelaWeb = document.getElementById("contenidoDelaWeb");//llamando al DOM
//INICIAR SESION
btnIniciarSesion.addEventListener('click', () => {
  let email = document.getElementById("emailRegistrate").value;
  let password = document.getElementById("passwordRegistrate").value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("Inicio de sesión correcto");

      formulario.classList.replace('mostrar', 'ocultar')

      contenidoDelaWeb.classList.replace('ocultar', 'mostrar')
      cargarJSON();
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("Inicio de sesión incorrecto");
    });
})
const formulario = document.getElementById("formulario");
//CERRAR CESION
btnCerrarSesion.addEventListener('click', () => {
  firebase.auth().signOut().then(() => {
    formulario.classList.replace('ocultar', 'mostrar')
    contenidoDelaWeb.classList.replace('mostrar', 'ocultar')
    console.log("Se cerro satisfactoriamente")
    // Sign-out successful.
    document.getElementById("emailRegistrate").value = "";
    document.getElementById("passwordRegistrate").value = "";
  }).catch((error) => {
    // An error happened.
  });
})
//FUNCION ESTADO ACTIVO O INACTIVO
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    formulario.classList.replace('mostrar', 'ocultar')
    contenidoDelaWeb.classList.replace('ocultar', 'mostrar')
    // ...
  } else {
    formulario.classList.replace('ocultar', 'mostrarr')
    contenidoDelaWeb.classList.replace('mostrar', 'ocultar')
  }
});
//llamando al DOM
const btnGmial = document.getElementById('btnGmial');
const btnFacebook = document.getElementById('btnFacebook');
//funcion de google
btnGmial.addEventListener('click', () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {

      var credential = result.credential;
      console.log("Inicio con Google correcto");
    }).catch((error) => {

      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
})
// funcion de facebook

btnFacebook.addEventListener('click', () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {

      var credential = result.credential;

      var user = result.user;
      console.log("Inicio con Facebook correcto");

    })
    .catch((error) => {

      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);


    });
})


//

window.fbAsyncInit = function () {
  FB.init({
    appId: '1397933243846983',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v17.0'
  });
};

//Funcion para cargar información json
function cargarJSON() {
  fetch("data1.json")
    .then(function (res) {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let html = '';
      data.forEach((modelos) => {
        html += `
      <div id="producto" class="producto">
        <p>  ${modelos.marca} </p>
        <img src="${modelos.img}" width="50px" class="imgProducto">
        
       <br>
       <div class="informacion">
        <strong> S/.${modelos.precio}<span>.99</span> </strong>
        <a href="${modelos.webpage}">Ver Detalles</a>
        <button>Comprar</button>

        </div>
        


      </div>
    `;
      })
      document.getElementById('resultado').innerHTML = html;
    })
}
