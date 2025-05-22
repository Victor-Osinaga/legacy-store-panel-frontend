import config from "../../../config.js";

let back_panel_url;

if (config.env == "dev") {
  back_panel_url = config.back_panel_url_dev;
} else {
  back_panel_url = config.back_panel_url_prod;
}

async function getShipmentDeliveryById(id) {
  try {
    // si no conecta con el backend lanza el error failed to fetch
    const response = await fetch(`${back_panel_url}/shipment-delivery/${id}`, {
      credentials: "include",
    });
    const result = await response.json();
    console.log("getShipmentDeliveryById : services", result.data);

    if (!response.ok) {
      throw { msg: result.data };
    }

    return result.data;
  } catch (error) {
    if (error.message == "Failed to fetch") {
      throw { msg: "Error al conectar con el servidor" };
    }
    throw error;
  }
}

export default getShipmentDeliveryById;
