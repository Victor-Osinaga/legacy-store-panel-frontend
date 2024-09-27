import config from "../../../config";

let back_panel_url;

if(config.env == 'dev'){
    back_panel_url = config.back_panel_url_dev
}else{
    back_panel_url = config.back_panel_url_prod
}

async function updateOrderStatus(id, status) {
    try {
        const response = await fetch(`${back_panel_url}/orders/update-status/${id}`, {
            headers: {
                // Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            method: 'PUT',
            body: JSON.stringify(status)
        });

        if (!response.ok) {
            // throw new Error('Error al eliminar los clientes');
            throw {msg: `Error al cambiar el estado de la orden`}
        }

        const result = await response.json();
        console.log('ORDEN editado por id:', result);
        return result.data
    } catch (error) {
        console.log("ERROR DESDE updateOrderStatus services:", error.msg);
        throw error
    }
}

export default updateOrderStatus;