import { getListProducts, getListProductsBySearch, getProductById } from "../controllers/product.js";
import Router from "express";
import { auth, isAdmin } from "../middlewares/authMiddlewares.js";
import { addToCart, clearCart, getCart, removeCartItem, updateCartItemQty } from "../controllers/cart.js";
import { getWishlist, toggleWishlist, checkExistInWishlist } from "../controllers/user.js";
import { createOrder, getMyOrders } from "../controllers/order.js";
import {getAllUsers , getAllProducts, getAllOrders, createUser, updateUser, deleteUser, getDashboardData, createProduct, updateProduct, deleteProduct} from "../controllers/adminController.js";


const RootRouter = Router();

RootRouter.get("/products/search", getListProductsBySearch);
RootRouter.get("/products", getListProducts);
RootRouter.get("/products/:id",getProductById);


RootRouter.get("/cart",auth, getCart);
RootRouter.post("/cart/add",auth, addToCart);
RootRouter.patch("/cart/update",auth, updateCartItemQty);
RootRouter.delete("/cart/item/:productId",auth,removeCartItem);
RootRouter.delete("/cart/clear",auth,clearCart);

RootRouter.get("/wishlist",auth, getWishlist);
RootRouter.post("/wishlist/toggle",auth, toggleWishlist);
RootRouter.get("/wishlist/:productId",auth, checkExistInWishlist)

RootRouter.post("/orders",auth,createOrder);
RootRouter.get("/orders/my",auth,getMyOrders);

//user
RootRouter.get("/admin/users",auth, getAllUsers, isAdmin);
RootRouter.post("/admin/users",auth, createUser, isAdmin);
RootRouter.put("/admin/users/:id",auth, updateUser, isAdmin);
RootRouter.delete("/admin/users/:id",auth, deleteUser, isAdmin);

//product
RootRouter.get("/admin/products",auth, getAllProducts, isAdmin);
RootRouter.post("/admin/products",auth, createProduct, isAdmin);
RootRouter.put("/admin/products/:id",auth, updateProduct, isAdmin);
RootRouter.delete("/admin/products/:id",auth, deleteProduct, isAdmin);

//orders
RootRouter.get("/admin/orders",auth, isAdmin, getAllOrders);
// RootRouter.put("/admin/orders/:id",auth, isAdmin, updateOrderStatus);

//dashboard
RootRouter.get("/admin/dashboard",auth, getDashboardData, isAdmin);


export default RootRouter;