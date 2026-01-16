import React, { createContext, useContext, useMemo, useEffect, useState } from 'react'

const CartContext = createContext(null);

export function CartProvider({ children }){
    const [cartItems, setCartItems] = useState(() => {
        try {
           const listCartItems = localStorage.getItem("cart_items");
           return listCartItems ? JSON.parse(listCartItems) : []; 
        } catch {
            return [];
        }
    });

    useEffect(() => {
      localStorage.setItem("cart_items",JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, qty = 1) => {
        const id = product._id ?? product.id;
        if(!id) return;

        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === id);
            if(existingItem){
                return prev.map((item) => item.id === id ? {...item, quantity: item.quantity + qty} : item); 
            }
            return [...prev,{
                id,
                name: product.name,
                price: product.price,
                discountPrice: product.discountPrice !== null ? product.discountPrice : null,
                image: product.image || "",
                quantity: qty, 
            }]
        })
    }
    const removeFromCart = (productId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
    }
    const clearCart = () => {
        setCartItems([]);
    }
    const updateQuantity = (productId,nextQuantity) => {
        setCartItems((prev) => {
            if(nextQuantity <= 0) return prev.filter((item) => item.id !== productId);
            return prev.map((item) => item.id === productId ? {...item, quantity: nextQuantity} : item);
        })
    }

    const increaseQuantity = (productId, step = 1) => {
        setCartItems((prev) => prev.map((item) => item.id === productId ? {...item, quantity: item.quantity + step} : item));
    }
    const decreaseQuantity = (productId, step = 1) => {
        setCartItems((prev) => prev.map((item) => item.id === productId ? {...item, quantity: item.quantity - step} : item))
        .filter((item) => item.quantity > 0);
    }

    const totals = useMemo(() => {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cartItems.reduce((sum, item) => {
            const price = item.discountPrice !== null ? item.discountPrice : item.price;
            return sum + price * item.quantity;
        }, 0);
        return { totalItems, totalPrice };
    }, [cartItems]);
    
    const value = useMemo(() => ({
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        totals
    }), [cartItems, totals]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(){
    const context = useContext(CartContext);
    if(!context){
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}

