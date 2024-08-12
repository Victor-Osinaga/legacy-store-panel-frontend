import config from "../../../config.js";

let back_legacy_admin_url;

if(config.env == 'dev'){
    back_legacy_admin_url = config.back_legacy_admin_url_dev
}else{
    back_legacy_admin_url = config.back_legacy_admin_url_prod
}

async function getClient() {
    try {
        const response = await fetch(`${back_legacy_admin_url}/api-admin/clients/auth/profile`,
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