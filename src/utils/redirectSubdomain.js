import config from "../../config.js";

export default function redirectSubdomain(subdomain) {
    if (config.env == 'dev') {
        const urlClient = `http://${subdomain}.${config.front_panel_url_dev}/admin/productos`
        window.location.href = urlClient;
    } else {
        const urlClient = `https://${subdomain}.${config.front_panel_url_prod}/admin/productos`
        window.location.href = urlClient;
    }
}