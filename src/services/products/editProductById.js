import config from "../../../config";

async function editProductById(productId, product) {
    try {
        const response = await fetch(`${config.API_PANEL_BASE_URL}/products/${productId}`, {
            headers: {
                // Authorization: `Bearer ${access_token}`,
                // 'Content-Type': 'application/json'
            },
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