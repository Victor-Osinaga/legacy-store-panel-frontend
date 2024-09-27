import './App.css'
import { Toaster } from 'react-hot-toast';
import { StoreContextProvider } from './provider/storeProvider';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Products from './components/Views/Products/Products';
import CreateProduct from './components/Views/CreateProduct/CreateProduct';
import EditProduct from './components/Views/EditProduct/EditProduct';
import Categories from './components/Views/Categories/Categories';
import CreateCategorie from './components/Views/CreateCategorie/CreateCategorie';
import FormLogin from './components/Views/FormLogin/FormLogin';
import FormRegister from './components/Views/FormRegister/FormRegister';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import StoreConfigForm from './components/Views/StoreConfigForm/StoreConfigForm.jsx';
import RetiroSucursal from './components/Views/RetiroSucursal/RetiroSucursal.jsx';
import CrearSucursal from './components/Views/CrearSucursal/CrearSucursal.jsx';
import EditarSucursal from './components/Views/EditarSucursal/EditarSucursal.jsx';
import ShipmentsDelivery from './components/Views/ShipmentsDelivery/ShipmentsDelivery.jsx';
import CreateShipmentDelivery from './components/Views/CreateShipmentDelivery/CreateShipmentDelivery.jsx';
import OrdersShipmentLocal from './components/Views/OrdersShipmentLocal/OrdersShipmentLocal.jsx';
import OrderDetail from './components/Views/OrderDetail/OrderDetail.jsx';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');

  return (
    <>
      {!isAuthPage && <Header />}
      {!isAuthPage && <Navigation />}
      {children}
    </>
  );
};

function App() {
  return (
    <>
      <StoreContextProvider>
        <Toaster position='top-right' reverseOrder={true} />

        <BrowserRouter>
          {/* <Header></Header>
          <Navigation></Navigation> */}
          <Layout>
            <Routes>
              <Route path='/auth/login' element={<FormLogin />} />
              <Route path='/auth/register' element={<FormRegister />} />
              <Route element={<ProtectedRoute />}>
                <Route path='/admin/productos' element={<Products />} />
                <Route path='/' />
                
                {/* PRODUCTS */}
                <Route path='/admin/productos/crear' element={<CreateProduct />} />
                <Route path='/admin/productos/editar/:productId' element={<EditProduct />} />
                
                {/* CATEGORIES */}
                <Route path='/admin/categorias' element={<Categories />} />
                <Route path='/admin/categorias/crear' element={<CreateCategorie />} />

                {/* OrdersShipmentLocal */}
                <Route path='/admin/ordenes-retiro' element={<OrdersShipmentLocal />}/>
                <Route path='/admin/ordenes-retiro/ver/:orderId' element={<OrderDetail />}/>

                {/* SHIPMENTS LOCAL */}
                <Route path='/admin/retiro-en-sucursal' element={<RetiroSucursal/>}/>
                <Route path='/admin/retiro-en-sucursal/crear' element={<CrearSucursal/>}/>
                <Route path='/admin/retiro-en-sucursal/editar/:shipmentLocalId' element={<EditarSucursal/>}/>
                

                {/* SHIPMENTS DELIVERY */}
                <Route path='/admin/envios' element={<ShipmentsDelivery/>}/>
                <Route path='/admin/envios/crear' element={<CreateShipmentDelivery/>}/>

                {/* SETTINGS STORE*/}
                <Route path='/admin/ajustes/tienda/colores' element={<StoreConfigForm />} />
              </Route>
            </Routes>
          </Layout>

        </BrowserRouter>
      </StoreContextProvider>
    </>
  )
}

export default App
