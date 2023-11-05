import { useContext, useEffect, useState } from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";
import Overlay from "../../UI/Overlay";
import { redirect, useNavigate } from 'react-router-dom'

import classes from './Login.module.css';
import { fetchUsers, storeLoginDetail } from "../../util/http";
import { useQuery } from '@tanstack/react-query';
import RegisterContext from "../../store/login-context";

const Login = function(){

  const navigate = useNavigate();
  const regContext = useContext(RegisterContext);
  const [userInput, setUserInput ] = useState({
    loggedinId: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState(false);
  const {data} = useQuery ({
    queryKey: ['users', 'login'],
    queryFn: ({signal, queryKey})=> fetchUsers({signal, ...queryKey[1]}),
    staleTime: 5000,
  });

  useEffect(()=>{
    if(regContext.isLoggedin){
      navigate('/dashboard');
    }
  }, [regContext.isLoggedin]);

  const formIsValid = userInput.loggedinId.trim() !== '' && userInput.password.trim() !== '';

  const userInputHandler = (identiifier, value)=>{
    if(identiifier === 'loggedinId'){
      setUserInput({
        ...userInput,
        loggedinId: value
      })
    }
    if(identiifier === 'password'){
      setUserInput({
        ...userInput,
        password: value
      })
    }
  };

  const submitHandler = (event)=>{
    event.preventDefault();
    let validate;
    if(!formIsValid){
      setErrorMsg(preState => preState = '*All fields is Required!*');
      return;
    }
    setErrorMsg(false);
  
  if(data){
    validate = data.filter(user => (user.email === userInput.loggedinId 
      && user.password === userInput.password) ||
      (user.accountNo === userInput.loggedinId 
      && user.password === userInput.password)
      );
  }

  if(validate.length === 0){
    setErrorMsg(preState => preState = 'Login failed, Please try again!');
    return;
  }

  storeLoginDetail({status: true, loggedinId: userInput.loggedinId});
  regContext.touchLogin(true);
  };

  return <Overlay>
    <Modal className={classes.form}>
      <form onSubmit={submitHandler}>
        <h2>Login to continue</h2>
        <p className={classes['error-msg']}>{errorMsg && errorMsg}</p>
        <Input
        label='Email or Account No'
        input={{
          type: 'text',
          id: 'loginId',
          name: 'loggedinId',
          value: userInput.loggedinId,
          onChange: (event)=> userInputHandler('loggedinId', event.target.value)
        }}
         />
         <Input
         label='Password'
         input={{
          type: 'password',
          id: 'pasword',
          name: 'password',
          value: userInput.password,
          onChange: (event)=> userInputHandler('password', event.target.value)
         }}
          />

        <div className={classes['form-action']}>
          <Button label='Login' Button={{
          type: 'button'
         }} />
        </div>
      </form>
    </Modal>
  </Overlay>
};

export default Login;