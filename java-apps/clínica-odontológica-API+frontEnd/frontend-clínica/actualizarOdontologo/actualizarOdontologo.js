window.addEventListener('load', function () {

    //*VARIABLES-----------------------------------------------------
    const url = "http://localhost:8080/dentist";
    const formActualizar = document.querySelector(".formActualizar")
    const nombreInput = document.querySelector(".nombreInput")
    const apellidoInput = document.querySelector(".apellidoInput")
    const matriculaInput = document.querySelector(".matriculaInput")
    const idSearchForm = document.querySelector(".idSearchForm")
    const idInput = document.querySelector(".idInput")
    const idForm = document.querySelector(".idForm")


    //*VALIDEACIONES-------------------------------------------------
    idInput.addEventListener("blur", (event) => isEmpty(`⚠️ Se requiere que ingrese un id`, event))
    idForm.addEventListener("blur", (event) => isEmpty(`⚠️ Se requiere que ingrese un id`, event))
    nombreInput.addEventListener("blur", (event) => isEmpty(`⚠️ Se requiere que ingrese un nombre`, event))
    apellidoInput.addEventListener("blur", (event) => isEmpty(`⚠️ Se requiere que ingrese un apellido`, event))
    matriculaInput.addEventListener("blur", (event) => isEmpty(`⚠️ Se requiere que ingrese una matrícula`, event))

    matriculaInput.addEventListener("input", (event) => validarMatricula(event))


    //*FETCH A LA API------------------------------------------------
    idSearchForm.addEventListener("submit", function (event) {
        event.preventDefault()

        const id = idInput.value.trim()

        const settings = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        fetch(`${url}/${id}`, settings)
            .then(response => response.json())
            .then(data => {
                formActualizar.innerHTML =
                    `<div class="title">
                    <h2>Modificá los datos necesarios</h2>
                </div>

                <form action="submit" class="formSubmit">

                    <label for="id" class="form__label">Id:</label>
                    <input type="text" class="idForm" name="id" value="${data.id}" placeholder="Ingrese el id" required>
                    <span></span>

                    <label for="nombre" class="form__label">Nombre:</label>
                    <input type="text" class="nombreInput" name="nombre" value="${data.nombre}" placeholder="Ingrese el nombre" required>
                    <span></span>

                    <label for="apellido" class="form__label">Apellido:</label>
                    <input type="text" class="apellidoInput" name="apellido" value="${data.apellido}" placeholder="Ingrese el apellido" required>
                    <span></span>

                    <label class="form__label" for="matricula">Matrícula:</label>
                    <input type="text" class="matriculaInput" name="matricula" value="${data.matricula}" placeholder="Ingrese la matrícula" required>
                    <span></span>

                    <button type="submit" class="actualizar">Actualizar</button>

                </form>`

                //*VARIABLES-----------------------------------------------------
                const actualizarForm = document.querySelector(".formSubmit")
                const nombreInput = document.querySelector(".nombreInput")
                const apellidoInput = document.querySelector(".apellidoInput")
                const matriculaInput = document.querySelector(".matriculaInput")
                const idForm = document.querySelector(".idForm")

                //*VALIDACIONES-----------------------------------------------------
                idForm.addEventListener("blur", (event) => isEmpty(`⚠️ Se requiere que ingrese un id`, event))
                nombreInput.addEventListener("blur", (event) => isEmpty(`⚠️ Se requiere que ingrese un nombre`, event))
                apellidoInput.addEventListener("blur", (event) => isEmpty(`⚠️ Se requiere que ingrese un apellido`, event))
                matriculaInput.addEventListener("blur", (event) => isEmpty(`⚠️ Se requiere que ingrese una matrícula`, event))

                matriculaInput.addEventListener("input", (event) => validarMatricula(event))

                //*PUT FETCH---------------------------------------------------------
                actualizarForm.addEventListener("submit", function (event) {
                    event.preventDefault()

                    const payload = {
                        id: idForm.value.trim(),
                        nombre: nombreInput.value.trim(),
                        apellido: apellidoInput.value.trim(),
                        matricula: matriculaInput.value.trim(),
                    }

                    const settings = {
                        method: 'PUT',
                        body: JSON.stringify(payload),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }

                    fetch(`${url}/update`, settings)
                        .then(response => response.json())
                        .then(data => {
                            formActualizar.innerHTML += `<p class="exitoMensaje">La información se actualizó correctamente</p>`
                            resetUploadForm()
                        })
                        .catch(err => {
                            formActualizar.innerHTML += `<p class="errorMensaje">Error al actualizar la información</p>`
                            resetUploadForm()
                        })
                })

                function resetUploadForm() {
                    idInput.value = "";
                    nombreInput.value = "";
                    apellidoInput.value = "";
                    matriculaInput.value = "";
                }

            })
            .catch(err => console.log(err))

    })

})