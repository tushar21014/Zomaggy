import Card from 'react-bootstrap/Card';
import '../Css/Cards.css'
import { useCart, useDispatch } from '../Components/ContextReducer'
import { useRef, useState, useEffect, useContext } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import Alert from '../Screens/Alert';
import a from '../Context/Create';


function Cards(props) {
  let data = useCart()
  // console.log(data)
  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(" ");
  let dispatch = useDispatch();

  const incrementQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decrementQty = () => {
    setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : prevQty));
  };

  const context = useContext(a);
  const {showAlert,alert} = context;  
  // const [alert, setAlert] = useState(null)
  // const showAlert = (type, message) => {
  //   setAlert({
  //     msg: message,
  //     type: type
  //   })
  // }

    const handleCart = async () => {

      let food = []
      for (const item of data) {
        if (item.id === props.data._id) {
          food = item;
          break;
        }
      }

      if (food !== []) {
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: props.data._id, price: finalPrice, qty: qty })
          showAlert('success', "Item Updated Successfully");
          return
        }
        else if (food.size !== size) {
          await dispatch({ type: "ADD", id: props.data._id, name: props.data.name, price: finalPrice, quantity: qty, sizee: size,image:props.data.img,description : props.data.description })
          showAlert('success', "Item Added Successfully");
          return
        }
        return
      }

      await dispatch({ type: "ADD", id: props.data._id, name: props.data.name, price: finalPrice, quantity: qty, sizee: size })
      // await dispatch
      // showAlert('success', "Added Successfully");


    }

  const { foodoption } = props
  let priceOptions = Object.keys(foodoption)
  let finalPrice = qty * parseInt(foodoption[size] || 0);

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 50
    });
  }, [])
  return (
    <>
      <Alert alert={alert} />
      <div className='Cards-cont'>
        <Card style={{ width: '16rem' }} data-aos="zoom-in" className='mainCard' data-toggle="tooltip" title={`${props.fooddec}`}>
          <Card.Img variant="top" src={props.foodimg} />
          <Card.Body className='text-center'>
            <Card.Title >{props.foodname}</Card.Title>
            <div className='options-n-all'>

              <div className='quantity-selector mx-2' style={{ display: 'inline-block' }}>
                <div className='btn-inc' id='uparrow' onClick={incrementQty}>
                  <i className="fa-solid fa-angle-up fa-xs"></i>
                </div>
                <span className='selected-qty'>{qty}</span>
                <div className='btn-dec' id='downarrow' onClick={decrementQty}>
                  <i className="fa-solid fa-angle-down fa-xs"></i>
                </div>
              </div>
              <select className=' h-100 sizeFood' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
              <div className="d-inline-block price ml-2">&#8377;{finalPrice}</div>
            </div>
            {localStorage.getItem('auth-Token') ?
              <>
                <hr />

                <button className='btn btn-success' id='addd' onClick={handleCart}>  <i className="fa-regular fa-cart-circle-plus fa-xl" style={{ color: "#ffffff" }}></i> Add To Cart </button>
              </> :
              <>

              </>}
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Cards;