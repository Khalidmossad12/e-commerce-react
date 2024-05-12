import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let cartContext = createContext()

export default function CartContextProvider(props) {

const [numOfCartItems, setnumOfCartItems] = useState(0)

const [cardId, setCardId] = useState(null)
let headers = {
  token : localStorage.getItem('userToken')
} 

async function getCart() {
    let {data} = await getLoggedUserCart();
    setCardId(data?.data._id);
    setnumOfCartItems(data.numOfCartItems)  
}
useEffect(()=>{
    getCart()
},[])

function addToCart(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId : productId
    },{
        headers:headers
    }).then((response)=>response)
    .catch((error)=>error)
}

function getLoggedUserCart() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers:headers
    }).then((response)=>response)
    .catch((error)=>error)
}

function removeCartItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        headers:headers
    }).then((response)=>response)
    .catch((error)=>error)
}

function updateProductQuantity(productId , count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        count : count
    },{
        headers:headers
    }).then((response)=>response)
    .catch((error)=>error)
}

function onlinePayment(cardId , url , values){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}`,{
        shippingAddress:values
    },{
        headers:headers
    }).then((response)=>response)
    .catch((error)=>error)
}

async function getAllOrders(orderId) {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${orderId}`,{
        headers:headers
    }).then((response)=>response)
    .catch((error)=>error);   
}
    return <cartContext.Provider value={{numOfCartItems,cardId, setnumOfCartItems , getAllOrders, onlinePayment , getCart ,addToCart , getLoggedUserCart , removeCartItem , updateProductQuantity}}>
        {props.children}
    </cartContext.Provider>
}