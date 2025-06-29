import config from "../../../config.js";

let back_legacy_admin_url;

if (config.env == "dev") {
  back_legacy_admin_url = config.back_legacy_admin_url_dev;
} else {
  back_legacy_admin_url = config.back_legacy_admin_url_prod;
}

async function logoutClient(credential) {
  try {
    const response = await fetch(
      `${back_legacy_admin_url}/clients/auth/logout`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const result = await response.json();
    console.log("logout:", result);

    if (!response.ok) {
      throw { msg: result.data };
    }

    return result.data;
  } catch (error) {
    console.log("ERROR DESDE register services: ", error.msg);
    if (error.message == "Failed to fetch") {
      throw { msg: "Error al conectar con el servidor" };
    }
    throw error;
  }
}

export default logoutClient;
