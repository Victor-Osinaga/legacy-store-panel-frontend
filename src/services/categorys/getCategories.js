import config from "../../../config";

export default async function getCategories() {
    try {
        const response = await fetch(`${config.API_PANEL_BASE_URL}/categories/`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
        )
        const result = await response.json()

        if (!response.ok) {
            throw { msg: result.data }
        }

        console.log("categories", result.data);
        return result.data
    } catch (error) {
        console.log("ERROR DESDE getCategories services: ", error.msg);
        if (error.message == 'Failed to fetch') {
            throw { msg: 'Error al conectar con el servidor' }
        }
        throw error
    }
}