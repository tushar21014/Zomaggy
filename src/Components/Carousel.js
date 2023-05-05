import React, { useState } from 'react'
import '../Css/Carousel.css'
import TypeWriter from './TypeWriter'


function Carousel() {
    const [search, setSearch] = useState('')
    return (
        <div id="carouselExampleControls" className="carousel slide carousel" data-ride="carousel" style={{objectFit:"contain !important"}}>
            <div className="carousel-inner" style={{maxHeight:'500px'}}>
                <div className='Content'>
                <div className='blas'>
                        <span className='auto-typed'>
                            <TypeWriter />
                        </span>
                    </div>
                </div>
                <div className="carousel-caption d-none d-md-block">
                    <div className="form-inline" style={{justifyContent:"center"}}>
                        <input className="form-control mr-sm-2" id='searchCarousel' type="search" value={search} onChange={(e) => {setSearch(e.target.value)}} placeholder="Search" aria-label="Search"/>
                        {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
                    </div>
                </div>
                <div className="carousel-item active fade">
                    <img className="d-block w-100" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" style={{filter: "brightness(30%"}} alt="First slide" />
                </div>
                <div className="carousel-item fade">
                    <img className="d-block w-100" src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" style={{filter: "brightness(30%"}} alt="Second slide" />
                </div>
                <div className="carousel-item fade">
                    <img className="d-block w-100" src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Third slide" style={{filter: "brightness(30%"}} />
                </div>
            </div>
            {/* <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a> */}
        </div>
    )
}

export default Carousel
