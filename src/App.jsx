import "./App.css";
import { Toaster } from "react-hot-toast";
import { StoreContextProvider } from "./provider/storeProvider";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import Products from "./components/Views/Products/Products";
import CreateProduct from "./components/Views/CreateProduct/CreateProduct";
import EditProduct from "./components/Views/EditProduct/EditProduct";
import Categories from "./components/Views/Categories/Categories";
import CreateCategorie from "./components/Views/CreateCategorie/CreateCategorie";
import FormLogin from "./components/Views/FormLogin/FormLogin";
import FormRegister from "./components/Views/FormRegister/FormRegister";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import ColorsStoreConfig from "./components/Views/ColorsStoreConfig/ColorsStoreConfig.jsx";
import RetiroSucursal from "./components/Views/RetiroSucursal/RetiroSucursal.jsx";
import CrearSucursal from "./components/Views/CrearSucursal/CrearSucursal.jsx";
import EditarSucursal from "./components/Views/EditarSucursal/EditarSucursal.jsx";
import ShipmentsDelivery from "./components/Views/ShipmentsDelivery/ShipmentsDelivery.jsx";
import CreateShipmentDelivery from "./components/Views/CreateShipmentDelivery/CreateShipmentDelivery.jsx";
import OrdersShipmentLocal from "./components/Views/OrdersShipmentLocal/OrdersShipmentLocal.jsx";
import OrderDetail from "./components/Views/OrderDetail/OrderDetail.jsx";
import FooterConfig from "./components/Views/FooterConfig/FooterConfig.jsx";
import LogoConfig from "./components/Views/LogoConfig/LogoConfig.jsx";
import Pricing from "./components/Views/Pricing/Pricing.jsx";
import EditCategory from "./components/Views/EditCategory/EditCategory.jsx";
import EditShipmentDelivery from "./components/Views/EditShipmentDelivery/EditShipmentDelivery.jsx";

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");
  const isPricingPage = location.pathname.startsWith("/precios");

  return (
    <>
      {!isAuthPage && !isPricingPage && <Header />}
      {!isAuthPage && !isPricingPage && <Navigation />}
      {children}
    </>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <StoreContextProvider>
          <Toaster position="top-right" reverseOrder={true} />

          {/* <Header></Header>
          <Navigation></Navigation> */}
          <Layout>
            <Routes>
              <Route path="/auth/login" element={<FormLogin />} />
              <Route path="/auth/register" element={<FormRegister />} />
              <Route path="/precios" element={<Pricing />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin/productos" element={<Products />} />
                <Route path="/" />

                {/* PRODUCTS */}
                <Route
                  path="/admin/productos/crear"
                  element={<CreateProduct />}
                />
                <Route
                  path="/admin/productos/editar/:productId"
                  element={<EditProduct />}
                />

                {/* CATEGORIES */}
                <Route path="/admin/categorias" element={<Categories />} />
                <Route
                  path="/admin/categorias/crear"
                  element={<CreateCategorie />}
                />
                <Route
                  path="/admin/categorias/editar/:catid"
                  element={<EditCategory />}
                />

                {/* OrdersShipmentLocal */}
                <Route
                  path="/admin/ordenes-retiro"
                  element={<OrdersShipmentLocal />}
                />
                <Route
                  path="/admin/ordenes-retiro/ver/:orderId"
                  element={<OrderDetail />}
                />

                {/* SHIPMENTS LOCAL */}
                <Route
                  path="/admin/retiro-en-sucursal"
                  element={<RetiroSucursal />}
                />
                <Route
                  path="/admin/retiro-en-sucursal/crear"
                  element={<CrearSucursal />}
                />
                <Route
                  path="/admin/retiro-en-sucursal/editar/:shipmentLocalId"
                  element={<EditarSucursal />}
                />
                <Route
                  path="/admin/envios/editar/:shipmentDeliveryId"
                  element={<EditShipmentDelivery />}
                />

                {/* SHIPMENTS DELIVERY */}
                <Route path="/admin/envios" element={<ShipmentsDelivery />} />
                <Route
                  path="/admin/envios/crear"
                  element={<CreateShipmentDelivery />}
                />

                {/* SETTINGS STORE*/}
                <Route
                  path="/admin/ajustes/tienda/colores"
                  element={<ColorsStoreConfig />}
                />
                {/* SETTINGS FOOTER */}
                <Route
                  path="/admin/ajustes/tienda/footer"
                  element={<FooterConfig />}
                />
                {/* SETTINGS LOGO */}
                <Route
                  path="/admin/ajustes/tienda/logo"
                  element={<LogoConfig />}
                />
              </Route>
            </Routes>
          </Layout>
        </StoreContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
