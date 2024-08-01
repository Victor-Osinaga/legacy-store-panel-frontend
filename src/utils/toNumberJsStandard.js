// Convertidor de numeros de formato argentino a formato javascript estandar (para poder realizar operaciones)

export default function toNumberJsStandard (number){
    return parseFloat(number.replace(/\./g, '').replace(',', '.'));
}