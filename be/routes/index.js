import { getListProducts, getListProductsBySearch, getProductById } from "../controllers/product.js";
import Router from "express";
import { auth } from "../middlewares/authMiddlewares.js";
import { addToCart, clearCart, getCart, removeCartItem, updateCartItemQty } from "../controllers/cart.js";
import { getWishlist, toggleWishlist, checkExistInWishlist } from "../controllers/user.js";
import { createOrder, getMyOrders } from "../controllers/order.js";


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

export default RootRouter;