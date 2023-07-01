const setErrors = (message, field, isError = true) => {
    if (isError) {
        field.nextElementSibling.classList.add("errorMensaje")
        field.nextElementSibling.innerText = message
    } else {
        field.nextElementSibling.classList.remove("errorMensaje")
        field.nextElementSibling.innerText = message
    }
}

const isEmpty = (message, event) => {
    const field = event.target
    const fieldValue = field.value

    if (fieldValue.length == 0) {
        setErrors(message, field)
    } else {
        setErrors("", field, false)
    }
}

const validarMatricula = (event) => {
    const field = event.target
    const fieldValue = field.value.trim()
    const regex = new RegExp(/^[A-Z]{2}-\d{1,3}\d*$/)

    if (fieldValue.length > 3 && !regex.test(fieldValue)) {
        setErrors(`🚨 Por favor ingrese una matrícula válida`, field)
    } else {
        setErrors("", field, false)
    }
}