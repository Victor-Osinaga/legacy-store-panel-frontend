import config from "../../../config.js";

async function getProducts() {
    try {
        // si no conecta con el backend lanza el error failed to fetch
        const response = await fetch(`${config.API_PANEL_BASE_URL}/products`, {
            credentials: 'include',
        })
        const result = await response.json();

        console.log("response", response);
        if(!response.ok){
            throw {msg: result.data}
        }

        console.log("Productos : getProducts : services", result.data);
        return result.data
    } catch (error) {
        if (error.message == 'Failed to fetch') {
            throw {msg: 'Error al conectar con el servidor'}
        }
        throw error
    }
}

export default getProducts;