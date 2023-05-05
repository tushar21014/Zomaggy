import React, { useContext } from 'react'
import '../Css/Cart.css'
import { useCart, useDispatch } from '../Components/ContextReducer';
import a from '../Context/Create';
import Alert from './Alert';
import Nav from '../Components/Nav';
import { Link, useNavigate } from 'react-router-dom';

export default function Anothercart() {
    const naviagte = useNavigate();
    const context = useContext(a);
    const { showAlert, alert } = context;


    let data = useCart();
    console.log(data)
    let dispatch = useDispatch();

    if (!data || data.length === 0) {
        return (<>
            <Nav />
            <div className='emptyCart'>
                {/* <img src="../Screens/cart.png"/> */}
                <div style={{ color: 'black', fontSize:'20px' }} className='w-100 text-center emptyCartText'>Your Cart is empty <Link to='/'>Shop now</Link> <br /></div>
            </div>
        </>
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
            showAlert('success', 'Food will be delivered soon!!')
            naviagte('/')
        }
        // showAlert('Success','Food will be delivered soon!!')
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>
            <Nav />
            {console.log(data)}
            <h1 className='text-center mb-4'>Items in Your Cart</h1>
            {data.map((food, index) => (
                <div key={index} className='container mt-4'>
                    <div className='card-cont row'>
                        <div className='col-3'>
                            <img src={`${food.img}`} style={{ width: "-webkit-fill-available", borderRadius:'25px',margin: "17px 17px" }} alt='Food' />
                        </div>
                        <div className='col-8'>
                            <div className='foodName'>{food.name}</div>
                            <div className='my-3'>
                                {food.desc}
                            </div>
                            <div className=''>
                                <div className='foodqty-cont my-3'>
                                    <div className='px-2 mx-2' style={{ border: '1px solid black' }}>
                                        +
                                    </div>
                                    {food.qty}
                                    <div className='px-2 mx-2' style={{ border: '1px solid black' }}>
                                        -
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-1 trash'>
                            <button type="button" className="btn  p-0"><i className="fa-sharp fa-solid fa-trash" style={{ color: 'black' }} onClick={() => { dispatch({ type: "REMOVE", index: index });
                            showAlert('danger','Item Removed From your cart')
                         }}></i></button>

                        </div>
                        <center>
                        <hr className='hrline' style={{maxWidth:"80%"}}/>
                        </center>
                            <div className='price-cont'>
                                <div className='text-end pricee'>
                                <b>Price:</b><span className='ml-3'>&#8377;{food.price}</span>
                            </div>
                            </div>
                    </div>

                <Alert alert={alert} />

                </div>
            ))}

            <div className='container my-4 '>
                <div className='text' style={{fontSize:'23px'}}><b className='mr-3'>Total Price</b>&#8377;{totalPrice}</div>
                <div className='text-end'>

                <button className='btn bg-success mt-5 text-end mr-3 ' style={{ color: 'white',position:'relative',bottom:'8vh' }}  onClick={handleCheckOut} > <i className="fa-solid fa-cart-circle-check"></i> Check Out </button>
                </div>
            </div>
        </div>
    )
}
