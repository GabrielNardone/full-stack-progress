window.addEventListener('load', function () {

    //*VARIABLES Y CONSTANTES 
    const url = "http://localhost:8080/dentist";
    const section = document.querySelector("section")
    const backButton = document.querySelector(".back");
    const queryForm = document.querySelector(".queryForm");
    const queryInput = document.querySelector(".idSearchInput");

    //*FETCH A LA API ----------------
    const settings = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    fetch(url, settings)
        .then(response => response.json())
        .then(data => data.map(
            elem => {
                section.innerHTML += `<div class="cartas">
                     <span>Nombre: ${elem.nombre}</span>
                     <span>Apellido: ${elem.apellido}</span>
                     <span>Matrícula: ${elem.matricula}</span>
                     <button class="actualizarBtn"> Actualizar </button>
                 </div>`

                const updateBtn = document.querySelectorAll(".actualizarBtn")

                //*BOTÓN PARA ACTUALIZAR
                updateBtn.forEach(elem => elem.addEventListener("click", function () {
                    location.replace("actualizarOdontologo.html")
                }))
            })
        )
        .catch(err => section.innerHTML = `<span class="errorMensaje">There isn´t any dentist</span>`)


    //*BOTÓN PARA REGRESAR A LA PÁGINA ANTERIOR -------------
    backButton.addEventListener("click", function () {
        location.replace("odontologoPost.html")
    })


    //*BOTÓN PARA BUSCAR
    queryForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const id = queryInput.value.trim()

        if (id === "") {
            return section.innerHTML = `<span class="errorMensaje">You have to select a number</span>`
        }

        const settings = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        fetch(`${url}/${id}`, settings)
            .then(response => response.json())
            .then(data => {
                section.innerHTML = 
                `<div class="cartas">
                   <span>Nombre: ${data.nombre}</span>
                   <span>Apellido: ${data.apellido}</span>
                   <span>Matrícula: ${data.matricula}</span>
                   <button class="actualizarBtn"> Actualizar </button>
                </div>`

                const updateBtn = document.querySelector(".actualizarBtn")

                //*BOTÓN PARA ACTUALIZAR
                updateBtn.addEventListener("click", function () {
                    location.replace("actualizarOdontologo.html")
                })
            }
            )
            .catch(err => section.innerHTML = `<span class="errorMensaje">Id doesn´t exist</span>`)
    })

})

