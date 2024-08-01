import config from "../../../config.js";

async function getProductById(id) {
    try {
        // si no conecta con el backend lanza el error failed to fetch
        const response = await fetch(`${config.API_PANEL_BASE_URL}/products/${id}`)
        const result = await response.json();

        console.log("response", response);
        if(!response.ok){
            throw {msg: result.data}
        }

        console.log("Producto : getProductById : services", result);
        return result.data
    } catch (error) {
        if (error.message == 'Failed to fetch') {
            throw {msg: 'Error al conectar con el servidor'}
        }
        throw error
    }
}

export default getProductById;