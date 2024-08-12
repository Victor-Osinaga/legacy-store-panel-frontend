import config from "../../../config";

let back_panel_url;

if(config.env == 'dev'){
    back_panel_url = config.back_panel_url_dev
}else{
    back_panel_url = config.back_panel_url_prod
}

export default async function getCategories() {
    try {
        const response = await fetch(`${back_panel_url}/categories/`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            }
        )
        const result = await response.json()
        console.log("categories", result);

        if (!response.ok) {
            throw { msg: result.data }
        }

        return result.data
    } catch (error) {
        console.log("ERROR DESDE getCategories services: ", error.msg);
        if (error.message == 'Failed to fetch') {
            throw { msg: 'Error al conectar con el servidor' }
        }
        throw error
    }
}