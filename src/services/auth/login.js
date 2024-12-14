import config from "../../../config.js";

let back_legacy_admin_url;

if (config.env == "dev") {
  back_legacy_admin_url = config.back_legacy_admin_url_dev;
} else {
  back_legacy_admin_url = config.back_legacy_admin_url_prod;
}

async function login(credential) {
  try {
    const response = await fetch(
      `${back_legacy_admin_url}/clients/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credential),
      }
    );

    const result = await response.json();
    console.log("logeado:", result);

    if (!response.ok) {
      throw { msg: result.data };
    }

    return result.data;
  } catch (error) {
    console.log("ERROR DESDE login services: ", error);
    if (error.message == "Failed to fetch") {
      throw { msg: "Error al conectar con el servidor" };
    }
    throw error;
  }
}

export default login;
