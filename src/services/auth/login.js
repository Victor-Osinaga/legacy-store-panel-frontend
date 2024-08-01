import config from "../../../config.js";

async function login(credential) {
    try {
        const response = await fetch(`${config.API_LEGACY_BASE_URL}/clients/auth/login`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(credential)
            })

        const result = await response.json()


        if (!response.ok) {
            throw { msg: result.data }
        }


        console.log('logeado:', result);
        return result.data
    } catch (error) {
        console.log("ERROR DESDE login services: ", error.msg);
        if (error.message == 'Failed to fetch') {
            throw {msg: 'Error al conectar con el servidor'}
        }
        throw error
    }
}

export default login;