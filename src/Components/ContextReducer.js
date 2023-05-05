import React, { createContext, useContext, useReducer } from 'react'
const cartStateContext = createContext();
const cartDispatchContext = createContext();
const reducer = (state, action) => {
    try {


        switch (action.type) {
            case "ADD":
                return [...state, { id: action.id, name: action.name, price: action.price, qty: action.quantity, size: action.sizee, img: action.image,desc:action.description }];

            case "REMOVE":
                let newArr = [...state]
                newArr.splice(action.index, 1);
                return newArr
            case "UPDATE":
                let arr = [...state];
                arr.forEach((food, index) => {
                    if (food.id === action.id) {
                        arr[index] = {
                            ...food,
                            qty: parseInt(action.qty ?? 1) + food.qty,
                            price: action.price + food.price
                          };
                    }
                });
                return arr;
            case "DROP":
                let emptyArr = [];
                return emptyArr;
            default:
                console.log('Error in adding dispatch')
        }
    } catch (error) {
        console.log("here", error)
    }

}
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <cartDispatchContext.Provider value={dispatch}>
            <cartStateContext.Provider value={state}>
                {children}
            </cartStateContext.Provider>
        </cartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(cartStateContext)
export const useDispatch = () => useContext(cartDispatchContext)