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
import PaymentPage from './pages/PaymentPage.jsx';
import MyOrderPage from './pages/MyOrderPage.jsx';
import Dashboard from './admin/pages/Dashboard.jsx';
import Users from './admin/pages/Users.jsx';
import Products from './admin/pages/Products.jsx';
import Orders from './admin/pages/Orders.jsx';
import AdminLogin from './admin/pages/AdminLogin.jsx';


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

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />


      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/customer-support" element={<CustomerSupport />} />


      <Route path="/:department" element={<ProductListingPage />} />
      <Route path="/:department/:category" element={<ProductListingPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/:department/:category/:productId" element={<ProductDetailPage />} />
      <Route path="/wishlist" element={<WishListPage />} />


      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/my-orders" element={<MyOrderPage />} />


      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/products" element={<Products />} />
      <Route path="/admin/orders" element={<Orders />} />
      <Route path="/admin" element={<AdminLogin />} />

    </Routes>
  );
}

export default function App() {

  const isAdmin = location.pathname.startsWith('/admin');

  
  return (
    <BrowserRouter>
      <CartProvider>
        <PageWrapper>
          <AppRoutes />
        </PageWrapper>

        {!isAdmin && <FloatingCart />}
      </CartProvider>
    </BrowserRouter>
  );
}
