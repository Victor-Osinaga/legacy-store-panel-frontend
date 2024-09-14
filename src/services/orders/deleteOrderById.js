import config from "../../../config.js";

let back_panel_url;

if(config.env == 'dev'){
    back_panel_url = config.back_panel_url_dev
}else{
    back_panel_url = config.back_panel_url_prod
}

async function deleteOrderById(orderId, name) {
    try {
        const response = await fetch(`${back_panel_url}/orders/${orderId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });

        const result = await response.json();
        console.log('ORDEN eliminado por id:', result);

        if (!response.ok) {
            // throw new Error('Error al eliminar los clientes');
            // throw {msg: `Error al eliminar el producto: ${productName}`}
            throw {msg: result.data}
        }

        return result
    } catch (error) {
        console.log("ERROR DESDE deleteOrderById services:", error.msg);
        if (error.message == 'Failed to fetch') {
            throw {msg: 'Error al conectar con el servidor'}
        }
        throw error
    }
}

export default deleteOrderById;