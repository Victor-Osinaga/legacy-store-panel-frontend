import config from "../../../config";

let back_panel_url;

if(config.env == 'dev'){
    back_panel_url = config.back_panel_url_dev
}else{
    back_panel_url = config.back_panel_url_prod
}

export default async function createStoreConfiguration(storeConfig) {
    try {
        const response = await fetch(`${back_panel_url}/store-configuration`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(storeConfig),
                credentials: 'include',
            }
        )
        const result = await response.json()
        console.log("created store config: services", result.data);
        console.log("created store config: services", result);

        if (!response.ok) {
            throw { msg: result.data }
        }

        return result.data
    } catch (error) {
        console.log("ERROR DESDE createStoreConfiguration services: ", error.msg);
        if (error.message == 'Failed to fetch') {
            throw { msg: 'Error al conectar con el servidor' }
        }
        throw error
    }
}