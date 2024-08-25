import config from "../../../config.js";

let back_panel_url;

if(config.env == 'dev'){
    back_panel_url = config.back_panel_url_dev
}else{
    back_panel_url = config.back_panel_url_prod
}

async function createShipmentDelivery(shipmentDelivery) {
    try {
        const response = await fetch(`${back_panel_url}/shipment-delivery/`,
            {
                //   headers: { Authorization: `Bearer ${token}` },
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(shipmentDelivery),
                credentials: 'include',
            }
        )

        const result = await response.json();
        console.log('SHIPMENT DELIVERY creado:', result);

        if (!response.ok) {
            throw {msg: result.data}
        }

        
        return result.data
    } catch (error) {
        console.log("ERROR DESDE createShipmentDelivery services: ", error.msg);
        if (error.message == 'Failed to fetch') {
            throw {msg: 'Error al conectar con el servidor'}
        }
        throw error
    }
}

export default createShipmentDelivery;