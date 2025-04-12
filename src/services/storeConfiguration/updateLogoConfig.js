import config from "../../../config.js";

let back_panel_url;

if (config.env == "dev") {
  back_panel_url = config.back_panel_url_dev;
} else {
  back_panel_url = config.back_panel_url_prod;
}

export default async function updateLogoConfig(id, data) {
  try {
    const response = await fetch(
      `${back_panel_url}/store-configuration/update-logo/${id}`,
      {
        // headers: { "Content-Type": "application/json" },
        method: "PUT",
        credentials: "include",
        body: data,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw { msg: result.data };
    }

    return result.data;
  } catch (error) {
    console.log("error updateStoreConfiguration : services", error);

    if (error.message == "Failed to fetch") {
      throw { msg: "Error al conectar con el servidor" };
    }
    throw error;
  }
}
