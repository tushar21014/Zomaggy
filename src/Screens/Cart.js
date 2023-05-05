import React, { useContext } from 'react'
import '../Css/Cart.css'
import { useCart, useDispatch } from '../Components/ContextReducer';
import a from '../Context/Create';
import Alert from './Alert';
export default function Cart() {
    const context = useContext(a);
    const {showAlert,alert} = context;


    let data = useCart();
    console.log(data)
    let dispatch = useDispatch();

    if (!data || data.length === 0) {
        return (
            <div>
                <div style={{ color: 'white' }} className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        )
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("email");
        let response = await fetch("http://localhost:5000/api/Order/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderData: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        console.log(response.status)
        if (response.status === 200) {
            dispatch({ type: "DROP" })
            // showAlert('Success','Food will be delivered soon!!')
        }
        // showAlert('Success','Food will be delivered soon!!')
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>
            <Alert alert = {alert}/>
            {console.log(data)}
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover ' style={{ color: 'white' }}>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope='row' >{index + 1}</th>
                                <td >{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                {/* <td ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr> */}
                                <td ><button type="button" className="btn p-0"><i className="fa-sharp fa-solid fa-trash" style={{ color: 'white' }} onClick={() => { dispatch({ type: "REMOVE", index: index }) }}></i></button> </td></tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2' style={{ color: 'white' }}>Total Price: {totalPrice}/-</h1></div>
                <div>
                {/* <button className="btn btn-success" style={{color:'white'}} onClick={handleCheckOut} ><i className="fa-solid fa-xs fa-cart-shopping mr-2"></i>My Cart</button> */}
                    <button className='btn bg-success mt-5 ' style={{color:'white'}} onClick={handleCheckOut} > <i className="fa-solid fa-cart-circle-check"></i> Check Out </button>
                </div>
            </div>



        </div>
    )
}