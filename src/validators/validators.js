const nameProductValidator = (value) =>{
    if(value.length < 5  || value.length > 30){
        return "Entre 5 y 30 caracteres"
    }
}

const nameCategorieValidator = (value) =>{
    if(value.length < 3  || value.length > 20){
        return "Entre 3 y 20 caracteres"
    }
}

const validatePassword = (value) => {
    if(value.length < 3  || value.length > 20){
        return "Entre 3 y 20 caracteres"
    }
}

const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    const isValid = regex.test(value)
    if (!isValid){
        return "Formato no válido"
    }
}

const validateProyectName = (value) => {
    if(value.length < 5  || value.length > 30){
        return "Entre 5 y 30 caracteres"
    }
}

const validateName = (value) => {
    if(value.length < 2  || value.length > 30){
        return "Entre 2 y 30 caracteres"
    }
}

const validateLastname = (value) => {
    if(value.length < 2  || value.length > 30){
        return "Entre 2 y 30 caracteres"
    }
}

const validateSubdomain = (value) => {
    if(value.length < 2  || value.length > 30){
        return "Entre 2 y 30 caracteres"
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
    validateSubdomain
}