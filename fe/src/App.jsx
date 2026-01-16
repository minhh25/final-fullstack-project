  import Home from './pages/Home.jsx';
  import AboutUs from './pages/AboutUs.jsx';
  import CustomerSupport from './pages/CustomerSupport.jsx';
  import SignIn from './components/SignIn.jsx';
  import SignUp from './components/SignUp.jsx';
  import ProductListingPage from './pages/ProductListingPage.jsx';
  import FloatingCart from './components/FloatingCart.jsx';
  import { CartProvider } from './context/CartContext.jsx';
  import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
  } from 'react-router-dom';
import CartPage from './pages/CartPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import WishListPage from './pages/WishListPage.jsx';

  function PageWrapper({ children }) {
    const location = useLocation();

    return (
      <div
        key={location.pathname}
        className="min-h-screen animate-fade"
      >
        {children}
      </div>
    );
  }

  function AppRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/customer-support" element={<CustomerSupport />} />

        <Route path="/:department" element={<ProductListingPage />} />
        <Route path="/:department/:category" element={<ProductListingPage />} />
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/:department/:category/:productId" element={<ProductDetailPage/>}/>
        <Route path="/wishlist" element = {<WishListPage/>}/>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    );
  }

  export default function App() {
    return (
      <BrowserRouter>
        <CartProvider>
          <PageWrapper>
            <AppRoutes />
          </PageWrapper>

          <FloatingCart/>
        </CartProvider>
      </BrowserRouter>
    );
  }
