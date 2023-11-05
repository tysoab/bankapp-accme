import React, { useContext, useEffect, useState } from "react";

const initialState = {
  showLoginModal: false,
  showSignupModal: false,
  isLoggedin: false,
  touch: false,
  dropdown: false,
  toggleModalHandler: (type) => {},
  closeToggleHandler: () => {},
  logoutHandler: () =>{},
  touchLogin: ()=>{},
  dropdownHandler: ()=>{}
};
const RegisterContext = React.createContext(initialState);

export default RegisterContext;

export const RegisterContextProvider = function(props){

const [showLoginModal, setShowLoginModal] = useState(false);
const [showSignupModal, setShowSignupModal] = useState(false);
const [isLoggedin, setIsLoggedin] = useState(false);
const [touch, setTouch] = useState(false);
const [dropdown, setDropdown] = useState(false);
const regContext = useContext(RegisterContext);

useEffect(()=>{
  const data = JSON.parse(localStorage.getItem('isLoggedin'));
  // if(!data){
  //   return
  // }
  if(data){
    setIsLoggedin(data);
  }
}, [touch]);


const logoutHandler = ()=>{
  localStorage.removeItem('isLoggedin');
  setIsLoggedin(false);
};


const toggleModalHandler = (type)=>{
  if(type === 'login'){
    setShowLoginModal(true);
  }
  if(type === 'signup'){
    setShowSignupModal(true);
  }
};

const closeToggleHandler = ()=>{
  setShowLoginModal(false);
  setShowSignupModal(false);
};

const touchLogin = (option)=>{
  setTouch(option);
  // setTouch(false)
};

const dropdownHandler = ()=>{
  setDropdown(preState => !preState);
}

  const registerContext = {
    showLoginModal,
    showSignupModal,
    isLoggedin,
    touch,
    dropdown,
    toggleModalHandler,
    closeToggleHandler,
    logoutHandler,
    touchLogin,
    dropdownHandler
  };
  return <RegisterContext.Provider value={registerContext}>
    {props.children}
  </RegisterContext.Provider>
};