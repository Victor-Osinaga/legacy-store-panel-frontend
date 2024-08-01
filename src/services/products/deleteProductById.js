import config from "../../../config";

async function deleteProductById(productId, productName) {
    try {
        const response = await fetch(`${config.API_PANEL_BASE_URL}/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (!response.ok) {
            // throw new Error('Error al eliminar los clientes');
            // throw {msg: `Error al eliminar el producto: ${productName}`}
            throw {msg: result.data}
        }

        console.log('PRODUCTOS eliminado por id:', result);
        return result
    } catch (error) {
        console.log("ERROR DESDE deleteProductById services:", error.msg);
        if (error.message == 'Failed to fetch') {
            throw {msg: 'Error al conectar con el servidor'}
        }
        throw error
    }
}

export default deleteProductById;