import config from "../../../config.js";

let back_panel_url;

if (config.env == "dev") {
  back_panel_url = config.back_panel_url_dev;
} else {
  back_panel_url = config.back_panel_url_prod;
}

async function updateShipmentDeliveryById(shipmentId, data) {
  try {
    const response = await fetch(
      `${back_panel_url}/shipment-delivery/${shipmentId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    console.log("Provincia editado por id RESULT:", result);
    console.log("Provincia editado por id RESPONSE:", response);

    if (!response.ok) {
      // throw new Error('Error al eliminar los clientes');
      throw { msg: result.data };
    }

    return result.data;
  } catch (error) {
    console.log("ERROR DESDE updateShipmentDeliveryById services:", error.msg);
    throw error;
  }
}

export default updateShipmentDeliveryById;
