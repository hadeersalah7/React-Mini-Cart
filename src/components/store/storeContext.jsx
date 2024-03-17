import { createContext } from "react";
import { DUMMY_PRODUCTS } from "../../dummy-products";
import { useState, useReducer } from "react";
export const CreateCart = createContext({
    items: [],
    handleAddCart: () => { },
    updateQuantity: () => {}
})

const shoppingCartReducer = (state, action) => {
    if (action.type === "ADD-ITEM") {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            items: updatedItems,
        }; 
    }

    if (action.type === "UPDATE-ITEM") {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems,
        };
    }

return state
}

export const CreateCartProvider = ({ children }) => {
    const [shoppingCartState, dispatch] = useReducer(shoppingCartReducer, {
        items: [],
    })
    const [shoppingCart, setShoppingCart] = useState({
        items: [],
    });

    function handleAddItemToCart(id) {
        dispatch({
            type: "ADD-ITEM",
            payload: id
        })
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        dispatch({
            type: "UPDATE-ITEM",
            payload: {
                productId,
                amount
            }
        })
        setShoppingCart((prevShoppingCart) => {
            const updatedItems = [...prevShoppingCart.items];
            const updatedItemIndex = updatedItems.findIndex(
                (item) => item.id === productId
            );

            const updatedItem = {
                ...updatedItems[updatedItemIndex],
            };

            updatedItem.quantity += amount;

            if (updatedItem.quantity <= 0) {
                updatedItems.splice(updatedItemIndex, 1);
            } else {
                updatedItems[updatedItemIndex] = updatedItem;
            }

            return {
                items: updatedItems,
            };
        });
    }

    const ctxValue = {
        items: shoppingCartState.items,
        handleAddCart: handleAddItemToCart,
        updateQuantity: handleUpdateCartItemQuantity
    }

    return <CreateCart.Provider value={ctxValue}>
            {children}
        </CreateCart.Provider>
    
}