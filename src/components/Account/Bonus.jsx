import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button";

import classes from './Bonus.module.css';
import { useContext, useState } from "react";
import Overlay from "../../UI/Overlay";
import RegisterContext from "../../store/login-context";
import Modal from "../../UI/Modal";
import Input from "../../UI/Input";
import { fetchUsers, linkAccount } from "../../util/http";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import iconImage from '../../assets/spinner.gif';

const Bonus = function(){

const navigate = useNavigate();
const dispatch = useDispatch();
const user = useSelector(state => state.user.user);
const changed = useSelector(state => state.user.changed);
const [isClick, setIsClick] = useState(false);
const regContext = useContext(RegisterContext);
const [isSubmitting, setIsSubmitting] = useState(false);
const [userInput, setUserInput] = useState({
  accountNo: '',
  pin: ''
});

const formIsvalid = +userInput.accountNo.trim().length === 10
      && +userInput.pin.trim().length === 4;

const {data: fetchData, isPending: fetchingUser} = useQuery({
    queryKey: ['users', 'bonus'],
    queryFn: ({signal, queryKey})=> fetchUsers({signal, ...queryKey[1]}),
    staleTime: 5000,
  });


const userInputHandler = (identifier, value)=>{
  if(identifier === 'accountNo'){
    setUserInput({
      ...userInput,
      accountNo: value
    })
  }

  if(identifier === 'pin'){
    setUserInput({
      ...userInput,
      pin: value
    })
  }
};

const isClickHandler = ()=>{
  setIsClick(true);
  regContext.toggleModalHandler('signup')
};

const submitHandler = async (event)=>{
  event.preventDefault();
  if(!formIsvalid){
    return
  }
  const transaction = [{
    type: 'Deposit',
    sender: 'bonus',
    date: new Date().toISOString(),
    amount: 5000
  }];

  const userData = {...user, ...userInput, accLinked: true, transaction}
  dispatch(linkAccount({fetchData, userData}))
  regContext.touchLogin(false);
  setIsSubmitting(true);

  if(!user.accLinked){
    let timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(()=>{
    window.location.reload();
    setIsSubmitting(false);
    }, 5000);
  }
  
};

return <div>
  <div className={classes['bonus-btn']}>
    <p>Link your bank account to claim N5000 bonus</p>
    <Button label='Link Account' button={{
      type: 'button',
      onClick: isClickHandler
    }} />
  </div>

  {isClick && regContext.showSignupModal &&
  <Overlay>
    <Modal className={classes.modal}>
      <form onSubmit={submitHandler}>
        <Input label='Account Number *'
        input={{
          type: 'number',
          id: 'accountNo',
          name: 'accountNo',
          onChange: (event)=>userInputHandler('accountNo', event.target.value),
          value: userInput.accountNo
        }} />

        <h5>Create Transaction PIN:</h5>
        <Input label='PIN *' 
        input={{
          type: 'number',
          id: 'pin',
          name: 'pin',
          onChange: (event)=>userInputHandler('pin', event.target.value),
          value: userInput.pin
        }}
        />

        <div className={classes['form-action']}>
          <Button label='Link Account' />
        </div>
      </form>

      {isSubmitting && 
          <div className={classes.spinner}>
          <img src={iconImage} alt="spinner" />
        </div>
        }
    </Modal>
  </Overlay>
  }
</div>
};

export default Bonus;