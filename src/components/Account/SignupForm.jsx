import Overlay from "../../UI/Overlay";
import Modal from "../../UI/Modal";

import classes from './SignupForm.module.css';
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { useContext, useState } from "react";
import RegisterContext from "../../store/login-context";
import { stagger, useAnimate } from "framer-motion";

const SignupForm = function({onSubmit}){

  const [scope, animate] = useAnimate();

  const regContext = useContext(RegisterContext);

  const [userInput, setUserInput ] = useState({
    fullname: '',
    email: '',
    phoneNo: '',
    password: ''
  });

  const fullnameIsValid = userInput.fullname.trim() !== '';
  const emailIsValid = userInput.email.trim().includes('@');
  const phoneIsValid = userInput.phoneNo.trim() !== '';
  const passwordIsValid = userInput.password.trim().length > 5;

  const formIsValid = fullnameIsValid && emailIsValid && phoneIsValid && passwordIsValid;

  const userInputHandler = (identifier, value) => {
    if(identifier === 'fullname'){
      setUserInput({
        ...userInput,
        fullname: value
      })
    }
    if(identifier === 'email'){
      setUserInput({
        ...userInput,
        email: value
      })
    }
    if(identifier === 'phoneNo'){
      setUserInput({
        ...userInput,
        phoneNo: value
      })
    }
    if(identifier === 'password'){
      setUserInput({
        ...userInput,
        password: value
      })
    }

  };

  const closeFormHandler = (event) => {
    event.preventDefault();
    setUserInput({
      fullname: '',
      email: '',
      phoneNo: '',
      password: ''
    })
    regContext.closeToggleHandler();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(!formIsValid){
      animate('input', {x: [-10, 0, 10, 0]}, {type: 'spring', duration: 0.3,
      delay: stagger(0.05)
    })
      return;
    }

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const id = String(Date.now()).slice(-10);
    onSubmit({
      ...data,
      id,
      accLinked: false,
      accountNo: ''
  })
  };

  return <Overlay>
    <Modal className={classes.signup}>
      <form className={classes['form-group']} onSubmit={submitHandler}
      ref={scope}
      >
        <h2>Create Your Online Banking in just a seconds</h2>
        <p>*All fields is required*</p>
        <Input
          label='Fullname'
          input={{
            type: 'text',
            id: 'fname',
            name: 'fullname',
            value: userInput.fullname,
            onChange: (event) => userInputHandler('fullname', event.target.value)
          }}
         />
        
        <Input
          label='Email'
          input={{
            type: 'email',
            id: 'email',
            name: 'email',
            value: userInput.email,
            onChange: (event) => userInputHandler('email', event.target.value)
          }}
         />
        
        <Input
          label='Phone No'
          input={{
            type: 'text',
            id: 'phoneno',
            name: 'phoneNo',
            value: userInput.phoneNo,
            onChange: (event) => userInputHandler('phoneNo', event.target.value)
          }}
         />

         <Input
          label='Password'
          input={{
            type: 'password',
            id: 'password',
            name: 'password',
            value: userInput.password,
            onChange: (event) => userInputHandler('password', event.target.value)
          }}
         />

        <div className={classes['form-action']}>
          <a href=""
          onClick={closeFormHandler}
          >
            Cancel
          </a>
          <Button label='Register' Button={{
          type: 'submit'
         }} />
        </div>
      </form>
    </Modal>
  </Overlay>
};

export default SignupForm;