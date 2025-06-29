import config from "../../../config.js";

let back_legacy_admin_url;

if (config.env == "dev") {
  back_legacy_admin_url = config.back_legacy_admin_url_dev;
} else {
  back_legacy_admin_url = config.back_legacy_admin_url_prod;
}

async function registerClient(credential) {
  try {
    const response = await fetch(
      `${back_legacy_admin_url}/clients/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credential),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw { msg: result.data };
    }

    console.log("registrado:", result);
    return result.data;
  } catch (error) {
    console.log("ERROR DESDE register services: ", error.msg);
    if (error.message == "Failed to fetch") {
      throw { msg: "Error al conectar con el servidor" };
    }
    throw error;
  }
}

export default registerClient;
