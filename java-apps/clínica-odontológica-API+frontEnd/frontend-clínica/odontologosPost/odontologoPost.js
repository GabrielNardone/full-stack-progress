window.addEventListener('load', function () {

    //* VARIABLES------------------------------------------------
    const formulario = document.querySelector('.registrarForm');
    const nombre = document.querySelector('.nombreInput')
    const apellido = document.querySelector('.apellidoInput')
    const matricula = document.querySelector('.matriculaInput')

    //* VALIDACIONES---------------------------------------------
    nombre.addEventListener("blur", (event) => isEmpty(`⚠️ Se requiere que ingrese un nombre`, event))
    apellido.addEventListener("blur", (event) => isEmpty(`⚠️ Se requiere que ingrese un apellido`, event))
    matricula.addEventListener("blur", (event) => isEmpty(`⚠️ Se requiere que ingrese una matrícula`, event))

    matricula.addEventListener("input", (event) => validarMatricula(event))

    //* FETCH----------------------------------------------------
    formulario.addEventListener('submit', function (event) {
        event.preventDefault()
        
        const formData = {
            nombre: nombre.value.trim(),
            apellido: apellido.value.trim(),
            matricula: matricula.value.trim(),
        };
        

        const url = 'http://localhost:8080/dentist/register';
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                formulario.innerHTML += `<p class="exitoMensaje">La información se actualizó correctamente</p>`
                resetUploadForm();
            })
            .catch(error => {
                formulario.innerHTML += `<p class="errorMensaje">Error al actualizar la información</p>`
                resetUploadForm();
            })
    });

    //* RESET FUNCTION---------------------------------------------
    function resetUploadForm() {
        document.querySelector('.nombreInput').value = "";
        document.querySelector('.apellidoInput').value = "";
        document.querySelector('.matriculaInput').value = "";
    }
});