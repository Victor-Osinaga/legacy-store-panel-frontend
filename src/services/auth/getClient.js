import config from "../../../config.js";

async function getClient() {
    try {
        const response = await fetch(`${config.API_LEGACY_BASE_URL}/api-admin/clients/auth/profile`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })

        const result = await response.json()


        if (!response.ok) {
            throw { msg: result.data }
        }


        console.log('desde get client:', result);
        return result.data
    } catch (error) {
        console.log("ERROR DESDE get client services: ", error.msg);
        if (error.message == 'Failed to fetch') {
            throw {msg: 'Error al conectar con el servidor'}
        }
        throw error
    }
}

export default getClient;