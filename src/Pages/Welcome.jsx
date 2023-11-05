import { Fragment, useContext, useEffect} from "react";
import Header from "../components/Welcome/Header";
import Sections from "../components/Welcome/Sections";
import RegisterContext from "../store/login-context";
import { AnimatePresence } from "framer-motion";
import Signup from '../components/Account/Signup';
import { useNavigate } from "react-router-dom";
import { getUserLoggedin } from "../util/http";
import Login from "../components/Account/Login";


const Welcome = function(){
  const navigate = useNavigate();
  const regContext = useContext(RegisterContext);

  useEffect(()=>{
    const isLoggedin = getUserLoggedin();
    if(isLoggedin){
      regContext.touchLogin(false)
      navigate('/dashboard');
    }
  },[regContext.isLoggedin]);

  
  return <Fragment>
    <AnimatePresence>
    {regContext.showSignupModal && <Signup />}
    {regContext.showLoginModal && <Login />}
    </AnimatePresence>
    <Header />
    <Sections />
  </Fragment>
};

export default Welcome;