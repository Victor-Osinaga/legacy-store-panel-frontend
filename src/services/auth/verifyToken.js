import config from "../../../config.js";

async function verifyToken(sub) {
    try {
        // si no conecta con el backend lanza el error failed to fetch
        const response = await fetch(`${config.API_LEGACY_BASE_URL}/clients/auth/verify-token`,
            {
                //   headers: { Authorization: `Bearer ${token}` },
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            })
        const result = await response.json();

        console.log("response desde veriyToken", response);
        console.log("desde verifyToken service", result);
        console.log("verifyToken : services", result.data);

        if(!response.ok){
            throw {msg: result.data}
        }
        
        return result.data
    } catch (error) {
        if (error.message == 'Failed to fetch') {
            throw {msg: 'Error al conectar con el servidor'}
        }
        throw error
    }
}

export default verifyToken;