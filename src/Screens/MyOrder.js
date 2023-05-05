import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Components/Footer'
import Nav from '../Components/Nav'
import '../Css/MyOrder.css'

function MyOrder() {
    const [orderData, setOrderData] = useState([])
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/Order/myOrderData", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: localStorage.getItem("email") })
                });
                const data = await response.json();
                setOrderData(data.data);
                console.log(data)

            } catch (error) {
                console.error(error);
            }
        };

        fetchOrderData();
    }, []);

    return (
        <>
            <div>
                <Nav />
            </div>
            <div>
                {orderData.length === 0 ? <div className='cont'>
                    <div className='inner'>
                        <div className='cartem'>
                            <p> You haven't ordered anything yet <Link to='/'>Order Now</Link></p>
                            
                        </div>
                    </div>
                </div> : <>
                    {orderData.map((order, i) => {
                        return <div key={i}>
                            {order.map((main, index) => {
                                return <div key={index}>
                                    <div id='parent-cont'>
                                        <div id='child-cont' className='row'>
                                            <div className='col-3 imageCont'><img src={main.img} style={{width:'-webkit-fill-available'}} alt={main.name}/></div>
                                            <div className='col-9 nameCont'>
                                                <div>{main.name}</div>
                                                <div className='descriptionn'>{main.desc}</div>
                                                <div className='priceanddate'>{main.qty} {main.price}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    })}
                </>}
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default MyOrder