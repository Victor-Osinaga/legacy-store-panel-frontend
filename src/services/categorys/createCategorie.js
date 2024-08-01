import config from "../../../config";

export default async function createCategorie(categorie) {
    try {
        const response = await fetch(`${config.API_PANEL_BASE_URL}/categories/`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categorie)
            }
        )
        const result = await response.json()

        if (!response.ok) {
            throw { msg: result.data }
        }

        console.log("crated categorie: services", result.data);
        return result.data
    } catch (error) {
        console.log("ERROR DESDE createCategorie services: ", error.msg);
        if (error.message == 'Failed to fetch') {
            throw { msg: 'Error al conectar con el servidor' }
        }
        throw error
    }
}