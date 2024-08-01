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
import { useEffect } from 'react';
import verifySubdomain from './services/auth/verifySubdomain.js';

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
                <Route path='/admin/productos/crear' element={<CreateProduct />} />
                <Route path='/admin/productos/editar/:productId' element={<EditProduct />} />
                <Route path='/admin/categorias' element={<Categories />} />
                <Route path='/admin/categorias/crear' element={<CreateCategorie />} />
              </Route>
            </Routes>
          </Layout>

        </BrowserRouter>
      </StoreContextProvider>
    </>
  )
}

export default App
