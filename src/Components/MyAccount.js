import React, { useContext, useEffect, useState } from 'react'
import a from '../Context/Create'
import '../Css/MyAccount.css'
import { Link, useNavigate } from "react-router-dom"
import AOS from 'aos';
import 'aos/dist/aos.css';


function MyAccount() {
  const Context = useContext(a);
  const [showModal, seTshowModal] = useState(false)
  const [personal, setPersonal] = useState(false)
  const navigate = useNavigate();
  const { getDetail, detail } = Context;

  const editFunc = () => {
    const editbut = document.getElementById('editword');
    editbut.innerHTML = 'Cancel'
    const phone = document.getElementById('phoneinput');
    phone.style.display = 'none'
    
  }

  useEffect(() => {
    if (localStorage.getItem("auth-Token")) {
      getDetail()
      // console.log(detail);
    }
    else {
      navigate("/Login");
    }
  }, [])

  useEffect(() => {
    AOS.init({
      duration: 1000
    });

  }, [])

  return (
    <div className='body'>
      <div className='header-div'>
        {/* <div className='profile-pic'>
                    <i className="fa-solid fa-user fa-xl" style={{ color: "black" }}></i>
                </div> */}
        <div className='profile-name' data-aos="zoom-in">
          <h1>Welcome {detail.name}</h1>
        </div>
      </div>

      <div className='cardd-cont container'>
        <div className='cardd' data-aos='fade-up' data-aos-delay='0' onClick={(e) => setPersonal(true)}><span className='ic'><i className="fa-solid fa-user fa-2xl my-4"></i></span>Personal Information</div>
        <Link to='/MyOrder' style={{ textDecoration: 'none', color: 'black' }} ><div className='cardd' data-aos='fade-up' data-aos-delay='50'><span className='ic'><i className="fa-regular fa-plate-utensils"></i></span>My Orders</div></Link>
        <Link to='/Anothercart' style={{ textDecoration: 'none', color: 'black' }}> <div className='cardd' data-aos='fade-up' data-aos-delay='100'><span className='ic'><i className="fa-solid fa-2xl fa-cart-shopping my-4"></i></span>My Cart</div></Link>
        <div className='cardd' data-aos='fade-up' id='logoutCard' onClick={() => { seTshowModal(true); console.log(true); document.getElementById('logoutCard').setAttribute('data-toggle', 'modal'); document.getElementById('logoutCard').setAttribute('data-target', '#exampleModal') }} data-aos-delay='150'><span className='ic'><i className="fa-solid fa-arrow-right-from-bracket fa-2xl my-4"></i></span>Log Out</div>
      </div>

      {showModal && (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Logout</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to log out?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { seTshowModal(false) }}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={() => { localStorage.clear(); navigate('/'); seTshowModal(false); document.body.classList.remove('modal-open') }}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {personal && (
        <div className='personal-grand-cont container' >
          {/* <h1 className='text-center'>Personal Information</h1> */}
          <div className='fields-cont'>
            <b>Name</b>
            <div className='inputbox'>
              {detail.name}
            </div>

          </div>
          <div className='fields-cont'>
            <b>Email</b>
            <div className='inputbox'>
              {detail.email}
            </div>

          </div>
          <div className='fields-cont'>
            <b>Phone</b> <span className='editfunc' id='editword' onClick={editFunc}>Edit</span>
            <div className='inputbox' id='phoneinput'>
              {detail.phone == null ? 'Add phone number' : detail.phone}
            </div>

          </div>
          <div className='fields-cont'>
            <b>Password</b>
            <div className='inputbox'>
              *******
            </div>

          </div>
        </div>
      )}
    </div>

  )
}

export default MyAccount