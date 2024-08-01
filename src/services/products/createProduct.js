import config from "../../../config";

async function createProduct(product) {
    try {
        const response = await fetch(`${config.API_PANEL_BASE_URL}/products/`,
            {
                //   headers: { Authorization: `Bearer ${token}` },
                method: 'POST',
                // headers: { 'Content-Type': 'application/json' },
                body: product,
                credentials: 'include',
            }
        )

        const result = await response.json();

        if (!response.ok) {
            // throw {msg: `Error al crear el producto`}
            throw {msg: result.data}
        }

        
        console.log('PRODUCTO creado:', result);
        return result.data
    } catch (error) {
        console.log("ERROR DESDE createProduct services: ", error.msg);
        if (error.message == 'Failed to fetch') {
            throw {msg: 'Error al conectar con el servidor'}
        }
        throw error
    }
}

export default createProduct;