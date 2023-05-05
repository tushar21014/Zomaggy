import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import '../Css/Signup.css'
import a from '../Context/Create';
import Alert from '../Screens/Alert';
import emailjs from '@emailjs/browser';



function SignUp() {
    const form = useRef();
    const context = useContext(a);
    const { alert, showAlert, setAlert } = context;
    const [credentials, setCredentials] = useState({ name: "", email: "", pass: "", phone: "", location: "" });
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, phone: credentials.phone, location: credentials.location, pass: credentials.pass })
            });

            const json = await response.json();
            console.log(json);
            
            if (!json.success) {
                // alert('Enter Valid Credentials')
                setAlert(true)
                showAlert('danger', 'Enter Valid Credentials')
            }
            
            else {
                setAlert(true)
                showAlert('success', 'Account Created Successfully')
                navigate('/Login')

                const sendEmail = (e) => {
                    // e.preventDefault();
                    emailjs.sendForm('service_4pet9at', 'template_t907vp4', form.current, 'p0WJz9TGSvB22SYaG')
                      .then((result) => {
                          console.log(result.text);
                      }, (error) => {
                          console.log(error.text);
                      });
                    }
                sendEmail();
                // alert('Account Created Successfull')
            }


        } catch (error) {
            console.log(error);
        }
    }




    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    // const handleLocationClick = (e) => {
    //     e.preventDefault();
    //     if ('geolocation' in window.navigator) {
    //         window.navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 const { latitude, longitude } = position.coords;
    //                 const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
    //                 setCredentials({
    //                     ...credentials,
    //                     location
    //                 });
    //             },
    //             (error) => console.error(error)
    //         );
    //     } else {
    //         console.error('Geolocation not available');
    //     }
    // };


    useEffect(() => {
        AOS.init({ duration: 1000, });
    }, [])
    return (
        <div>
            {alert && <div style={{display:'none'}}>{alert.msg}</div>}
            {/* <Alert alert={alert} /> */}
            <div className='grandfather'>

                <div className='form-container' data-aos="slide-down">
                    <div className='container inner-cont'>
                        <h2 className='text-center' style={{ marginTop: '4vh' }}>Sign Up</h2>
                        <form method="post" ref={form} onSubmit={handleSubmit}>
                            <div className='container fields'>

                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" aria-describedby="name" name='name' onChange={handleChange} value={credentials.name} placeholder="Enter Name" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required name='email' onChange={handleChange} value={credentials.email} placeholder="Enter email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Phone</label>
                                    <input type="number" className="form-control" id="phone" name='phone' placeholder="Mobile Number" onChange={handleChange} value={credentials.phone} required maxLength={10} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="password" name='pass' placeholder="Password" onChange={handleChange} value={credentials.pass} required minLength={5} />
                                </div>
                                {/* <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Location</label>
                            <input type="text" className="form-control" id="confirmpass" name='location' onClick={handleLocationClick} placeholder="Location" onChange={handleChange} value={credentials.location} />
                        </div> */}
                                <center><button type="submit" className="btn btn-primary signupbtn">Sign Up</button>
                                </center>
                            </div>
                            <center>

                                <div className='form-caption my-4'>
                                    <p style={{ marginTop: '0px' }}><b> Already Have An Account?<Link to="/Login" style={{ color: 'black' }}> Login</Link></b></p>
                                </div>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp