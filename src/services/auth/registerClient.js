import config from "../../../config.js";

async function registerClient(credential) {
    try {
        const response = await fetch(`${config.API_LEGACY_BASE_URL}/clients/auth/register`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credential),
            })

        const result = await response.json()


        if (!response.ok) {
            throw { msg: result.data }
        }


        console.log('registrado:', result);
        return result.data
    } catch (error) {
        console.log("ERROR DESDE register services: ", error.msg);
        if (error.message == 'Failed to fetch') {
            throw {msg: 'Error al conectar con el servidor'}
        }
        throw error
    }
}

export default registerClient;