import config from "../../../config";

let back_panel_url;

if(config.env == 'dev'){
    back_panel_url = config.back_panel_url_dev
}else{
    back_panel_url = config.back_panel_url_prod
}

async function editProductById(productId, product) {
    try {
        const response = await fetch(`${back_panel_url}/products/${productId}`, {
            headers: {
                // Authorization: `Bearer ${access_token}`,
                // 'Content-Type': 'application/json'
            },
            credentials: 'include',
            method: 'PUT',
            body: product
        });

        if (!response.ok) {
            // throw new Error('Error al eliminar los clientes');
            throw {msg: `Error al editar el producto: ${product.name}`}
        }

        const result = await response.json();
        console.log('PRODUCTOS editado por id:', result);
        return result.data
    } catch (error) {
        console.log("ERROR DESDE editProductById services:", error.msg);
        throw error
    }
}

export default editProductById;