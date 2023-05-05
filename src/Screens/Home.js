import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'
import Cards from '../Components/Card'
import '../Css/Carousel.css'
import TypeWriter from '../Components/TypeWriter'
import '../Css/Cards.css'
export const Home = () => {
    const [fooditem, setFooditem] = useState([]);
    const [search, setSearch] = useState('')
    const [load, setLoad] = useState(false)

    const loadData = async () => {
        setLoad(true);
        let response = await fetch("http://localhost:5000/api/foodDisplay/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();
        setFooditem(response)
        console.log(response);
        setLoad(false);
    }

    useEffect(() => {
        loadData();
    }, [])


    return (
        <div>
            {load ? (
                <div className='loading-cont'>
                <img src='https://media.tenor.com/rec5dlPBK2cAAAAd/mr-bean-waiting.gif' className='loadingimg' alt='loading ' />
                </div>
            ) :
                (<>
                    <div>
                        <Nav />
                    </div>
                    <div>

                        <div id="carouselExampleControls" className="carousel slide carousel-fade" data-ride="carousel" style={{ objectFit: "contain !important" }}>
                            <div className="carousel-inner" style={{ maxHeight: '500px' }}>
                                <div className='Content'>
                                    <div className='blas'>
                                        <span className='auto-typed'>
                                            <TypeWriter />
                                        </span>
                                    </div>
                                </div>
                                <div className="carousel-caption d-none d-md-block">
                                    <div className="form-inline" style={{ justifyContent: "center" }}>
                                        <input className="form-control mr-sm-2" id='searchCarousel' type="search" value={search} onChange={(e) => { setSearch(e.target.value) }} placeholder="Search" aria-label="Search" />
                                        {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
                                    </div>
                                </div>
                                <div className="carousel-item active fade">
                                    <img className="d-block w-100" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" style={{ filter: "brightness(30%" }} alt="First slide" />
                                </div>
                                <div className="carousel-item fade">
                                    <img className="d-block w-100" src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" style={{ filter: "brightness(30%" }} alt="Second slide" />
                                </div>
                                <div className="carousel-item fade">
                                    <img className="d-block w-100" src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Third slide" style={{ filter: "brightness(30%" }} />
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                    <div className='row' style={{ maxWidth: '90%' }}>
                        {fooditem.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
                            .map((e) => {
                                return (
                                    <div key={e._id} className="col-sm-12 col-md-6 col-lg-3 my-3 cardsSending">
                                        {/* <div key={e._id} className="my-3 cardsSending">  */}
                                        <Cards data={e} foodname={e.name} foodimg={e.img} fooddec={e.description} foodoption={e.options[0]} />
                                    </div>
                                );
                            })}
                    </div>
                    <div>
                        <Footer />
                    </div>
                </>)}
        </div>
    )
}
