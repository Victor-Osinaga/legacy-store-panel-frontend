const nameProductValidator = (value) => {
    if (value.length < 5 || value.length > 30) {
        return "Entre 5 y 30 caracteres"
    }
}

const nameCategorieValidator = (value) => {
    if (value.length < 3 || value.length > 20) {
        return "Entre 3 y 20 caracteres"
    }
}

const validatePassword = (value) => {
    if (value.length < 3 || value.length > 20) {
        return "Entre 3 y 20 caracteres"
    }
}

const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    const isValid = regex.test(value)
    if (!isValid) {
        return "Formato no válido"
    }
}

const validateProyectName = (value) => {
    if (value.length < 5 || value.length > 30) {
        return "Entre 5 y 30 caracteres"
    }
}

const validateName = (value) => {
    if (value.length < 2 || value.length > 30) {
        return "Entre 2 y 30 caracteres"
    }
}

const validateLastname = (value) => {
    if (value.length < 2 || value.length > 30) {
        return "Entre 2 y 30 caracteres"
    }
}

const validateSubdomain = (value) => {
    if (value.length < 2 || value.length > 30) {
        return "Entre 2 y 30 caracteres"
    }
}

const validateStoreConfigurationName = (value) => {
    if (value.length < 3 || value.length > 30) {
        return "Entre 3 y 30 caracteres"
    }
}

const validateStoreConfigurationPrimaryColor = (value) => {
    if (value.length < 3 || value.length > 30) {
        return "Entre 3 y 30 caracteres"
    }
}

// FORM CREAR SUCURSAL VALIDATORS:
const validateProvince = (value) => {
    if (value.length < 2 || value.length > 60) {
        return "Entre 2 y 60 caracteres"
    }
}
const validateLocality = (value) => {
    if (value.length < 2 || value.length > 60) {
        return "Entre 2 y 60 caracteres"
    }
}
const validatePostalCode = (value) => {
    if (value.length < 2 || value.length > 20) {
        return "Entre 2 y 20 caracteres"
    }
}
const validateStreetName = (value) => {
    if (value.length < 2 || value.length > 60) {
        return "Entre 2 y 60 caracteres"
    }
}
const validateStreetNumber = (value) => {
    if (value.length < 1 || value.length > 10) {
        return "Entre 1 y 10 caracteres"
    }
}

export {
    nameProductValidator,
    nameCategorieValidator,
    validatePassword,
    validateEmail,
    validateProyectName,
    validateName,
    validateLastname,
    validateSubdomain,
    validateStoreConfigurationName,
    validateStoreConfigurationPrimaryColor,
    validateProvince,
    validateLocality,
    validatePostalCode,
    validateStreetName,
    validateStreetNumber,

}