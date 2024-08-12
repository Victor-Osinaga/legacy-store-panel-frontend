import config from "../../../config";

let back_panel_url;

if(config.env == 'dev'){
    back_panel_url = config.back_panel_url_dev
}else{
    back_panel_url = config.back_panel_url_prod
}

async function deleteCategorieById(categorieId, categorieName) {
    try {
        const response = await fetch(`${back_panel_url}/categories/${categorieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
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