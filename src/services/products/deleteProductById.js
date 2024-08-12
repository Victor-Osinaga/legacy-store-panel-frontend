import config from "../../../config";

let back_panel_url;

if(config.env == 'dev'){
    back_panel_url = config.back_panel_url_dev
}else{
    back_panel_url = config.back_panel_url_prod
}

async function deleteProductById(productId, productName) {
    try {
        const response = await fetch(`${back_panel_url}/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });

        const result = await response.json();
        console.log('PRODUCTOS eliminado por id:', result);

        if (!response.ok) {
            // throw new Error('Error al eliminar los clientes');
            // throw {msg: `Error al eliminar el producto: ${productName}`}
            throw {msg: result.data}
        }

        return result
    } catch (error) {
        console.log("ERROR DESDE deleteProductById services:", error.msg);
        if (error.message == 'Failed to fetch') {
            throw {msg: 'Error al conectar con el servidor'}
        }
        throw error
    }
}

export default deleteProductById;