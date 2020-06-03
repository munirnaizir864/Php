eventListeners();

function eventListeners() {
    document.querySelector('#formulario').addEventListener('submit', validarRegistro);
}


function validarRegistro(e) {
    e.preventDefault();

    var usuario = document.querySelector('#usuario').value,
        password = document.querySelector('#password').value,
        tipo = document.querySelector('#tipo').value;

    if (usuario === '' || password === '') {

        swal({
            type: 'error',
            title: 'Error!',
            text: 'Ambos campos son obligatorios!'
        })
    } else {

        var datos = new FormData();
        datos.append('usuario', usuario);
        datos.append('password', password);
        datos.append('accion', tipo);


        var xhr = new XMLHttpRequest();


        xhr.open('POST', 'inc/modelos/modelo-admin.php', true);


        xhr.onload = function() {
            if (this.status === 200) {
                var respuesta = JSON.parse(xhr.responseText);

                console.log(respuesta);

                if (respuesta.respuesta === 'correcto') {

                    if (respuesta.tipo === 'crear') {
                        swal({
                            title: 'Usuario Creado',
                            text: 'El usuario se creó correctamente',
                            type: 'success'
                        });
                    } else if (respuesta.tipo === 'login') {
                        swal({
                                title: 'Login Correcto',
                                text: 'Bienvenido',
                                type: 'success'
                            })
                            .then(resultado => {
                                if (resultado.value) {
                                    window.location.href = 'index.php';
                                }
                            })
                    }
                } else {

                    swal({
                        title: 'Error',
                        text: 'Hubo un error',
                        type: 'error'
                    })
                }
            }
        }


        xhr.send(datos);

    }
}