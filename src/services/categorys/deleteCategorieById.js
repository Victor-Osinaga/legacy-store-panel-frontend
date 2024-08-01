import config from "../../../config";

async function deleteCategorieById(categorieId, categorieName) {
    try {
        const response = await fetch(`${config.API_PANEL_BASE_URL}/categories/${categorieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok) {
            // throw {msg: `Error al eliminar el producto: ${categorieName}`}
            throw { msg: result.data }
        }

        console.log('Categoria eliminada por id:', result);
        return result
    } catch (error) {
        console.log("ERROR DESDE deleteproductbyid services: ", error.msg);
        if (error.message == 'Failed to fetch') {
            throw {msg: 'Error al conectar con el servidor'}
        }
        throw error
    }
}

export default deleteCategorieById;