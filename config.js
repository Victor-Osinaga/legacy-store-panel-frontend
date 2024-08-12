const config = {
    // ENTORNO
    env: import.meta.env.VITE_ENV,

    // BACK PANEL
    back_panel_url_dev : import.meta.env.VITE_BACK_PANEL_URL_DEV,
    back_panel_url_prod : import.meta.env.VITE_BACK_PANEL_URL_PROD,

    // BACK LEGACY STORE ADMIN
    back_legacy_admin_url_dev : import.meta.env.VITE_BACK_LEGACY_ADMIN_URL_DEV,
    back_legacy_admin_url_prod : import.meta.env.VITE_BACK_LEGACY_ADMIN_URL_PROD,
}

export default config;