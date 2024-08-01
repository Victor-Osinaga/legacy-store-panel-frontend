import config from "../../../config.js";

async function verifySubdomain(sub) {
    try {
        // si no conecta con el backend lanza el error failed to fetch
        const response = await fetch(`${config.API_LEGACY_BASE_URL}/clients/auth/verify-subdomain`,
            {
                //   headers: { Authorization: `Bearer ${token}` },
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({subdomain: sub}),
            })
        const result = await response.json();

        // console.log("response desde verifySubdomain", response);
        if(!response.ok){
            throw {msg: result.data}
        }
        console.log("desde verify subdomain service", result);
        // console.log("subdomain : verifySubdomain : services", result.data);
        return result.data
    } catch (error) {
        if (error.message == 'Failed to fetch') {
            throw {msg: 'Error al conectar con el servidor'}
        }
        throw error
    }
}

export default verifySubdomain;