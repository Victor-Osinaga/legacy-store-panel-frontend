import config from "../../../config";

let back_panel_url;

if(config.env == 'dev'){
    back_panel_url = config.back_panel_url_dev
}else{
    back_panel_url = config.back_panel_url_prod
}

async function createProduct(product) {
    try {
        const response = await fetch(`${back_panel_url}/products/`,
            {
                //   headers: { Authorization: `Bearer ${token}` },
                method: 'POST',
                // headers: { 'Content-Type': 'application/json' },
                body: product,
                credentials: 'include',
            }
        )

        const result = await response.json();
        console.log('PRODUCTO creado:', result);

        if (!response.ok) {
            // throw {msg: `Error al crear el producto`}
            throw {msg: result.data}
        }

        
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