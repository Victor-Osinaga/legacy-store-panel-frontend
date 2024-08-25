import config from "../../../config";

let back_panel_url;

if(config.env == 'dev'){
    back_panel_url = config.back_panel_url_dev
}else{
    back_panel_url = config.back_panel_url_prod
}

async function deleteShipmentLocalById(shipmentLocalId) {
    try {
        const response = await fetch(`${back_panel_url}/shipment-local/${shipmentLocalId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });

        const result = await response.json();
        console.log('SUCURSAL eliminado por id:', result);

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

export default deleteShipmentLocalById;