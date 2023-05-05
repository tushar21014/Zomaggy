import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Home } from './Screens/Home';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { CartProvider } from './Components/ContextReducer';
import MyOrder from '../src/Screens/MyOrder'
import MyAccount from './Components/MyAccount';
import CreateState from './Context/CreateStates';
import Anothercart from './Screens/Anothercart';
import Resetpassword from './Components/Resetpassword';
import Forgotpassword from './Components/Forgotpassword';
// import About from './Screens/About';


function App() {

  return (

    <CreateState>
      <CartProvider>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            {/* <Route exact path='/About' element={<About />}></Route> */}
            <Route exact path='/Login' element={<Login />}></Route>
            <Route exact path='/SignUp' element={<SignUp />}></Route>
            <Route exact path='/MyOrder' element={<MyOrder />}></Route>
            <Route exact path='/MyAccount' element={<MyAccount />}></Route>
            <Route exact path='/Anothercart' element={<Anothercart />}></Route>
            <Route exact path='/Forgotpassword' element={<Forgotpassword />}></Route>
            <Route exact path='/Resetpassword/:id/:token' element={<Resetpassword />}></Route>

          </Routes>
        </Router>
      </CartProvider>
    </CreateState>
  );
}

export default App;
