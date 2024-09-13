import config from "../../../config.js";

let back_panel_url;

if(config.env == 'dev'){
    back_panel_url = config.back_panel_url_dev
}else{
    back_panel_url = config.back_panel_url_prod
}

async function deleteShipmentDeliveryById(shipmentDeliveryId) {
    try {
        const response = await fetch(`${back_panel_url}/shipment-delivery/${shipmentDeliveryId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });

        const result = await response.json();
        console.log('PROVINCIA eliminado por id:', result);

        if (!response.ok) {
            throw {msg: result.data}
        }

        return result.data
    } catch (error) {
        console.log("ERROR DESDE deleteShipmentLocalById services:", error.msg);
        if (error.message == 'Failed to fetch') {
            throw {msg: 'Error al conectar con el servidor'}
        }
        throw error
    }
}

export default deleteShipmentDeliveryById;