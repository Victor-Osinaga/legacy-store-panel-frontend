import config from "../../../config";

let back_panel_url;

if (config.env == "dev") {
  back_panel_url = config.back_panel_url_dev;
} else {
  back_panel_url = config.back_panel_url_prod;
}

export default async function updatePrimaryById(id, data) {
  console.log("id data", id, data);

  try {
    const response = await fetch(
      `${back_panel_url}/categories/update-primary/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data }),
        credentials: "include",
      }
    );
    const result = await response.json();
    console.log("updatePrimaryById: services", result.data);

    if (!response.ok) {
      throw result.data;
    }

    return result.data;
  } catch (error) {
    console.log("ERROR DESDE createCategorie services: ", error.msg);
    if (error.message == "Failed to fetch") {
      throw { msg: "Error al conectar con el servidor" };
    }
    throw error;
  }
}
