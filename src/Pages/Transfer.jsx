import { useContext, useEffect, useState } from "react";
import Goback from "../UI/Goback";
import Container from "../components/Container";
import { fetchUsers, getUserLoggedin, linkAccount } from "../util/http";
import { useNavigate } from "react-router-dom";
import RegisterContext from "../store/login-context";
import { useDispatch, useSelector } from "react-redux";

import classes from './Transfer.module.css';
import Input from "../UI/Input";
import Button from "../UI/Button";
import iconImage from '../assets/spinner.gif';
import { useQuery } from "@tanstack/react-query";

const Transfer = function(){

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const regContext =useContext(RegisterContext);
  const user = useSelector(state=> state.user.user);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userInput, setUserInput] = useState({
    accountNo: '',
    bankName: '',
    amount: '',
    pin: ''
  });

  const formIsValid = userInput.accountNo.trim().length === 10 &&
      userInput.bankName.trim() !== '' && userInput.amount.trim() !== ''
      && userInput.pin.trim() !== '';

  const {data: fetchData, isPending: fetchingUser} = useQuery({
    queryKey: ['users', 'accme'],
    queryFn: ({signal, queryKey})=> fetchUsers({signal, ...queryKey[1]}),
    staleTime: 5000,
  });

    useEffect(()=>{
    if(!user)
    navigate('/')
    
    const isLoggedin = getUserLoggedin();
    if(!isLoggedin){
      navigate('/');
    }
    else{
      regContext.touchLogin(true);
    }
  }, [regContext.isLoggedin]);

  useEffect(()=>{
    if(isSubmitting){
      let timeoutId;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(()=>{
        setIsSubmitting(false);
        setUserInput({amount: '', pin: ''});
        navigate('/dashboard');
      }, 5000);
    }
  }, [isSubmitting]);

  const userInputHandler = (identifier, value)=>{
    if(identifier === 'accountNo'){
      setUserInput({...userInput, accountNo: value});
    }
    if(identifier === 'bankName'){
      setUserInput({...userInput, bankName: value});
    }
    if(identifier === 'amount'){
      setUserInput({...userInput, amount: value});
    }
    if(identifier === 'pin'){
      setUserInput({...userInput, pin: value});
    }
  };

  
  const submitHandler = (event)=>{
    event.preventDefault();
    if(!formIsValid){
      setErrorMsg('Fill the form correctly!');
      return;
    }

    let transferIsValid;
    if(user){
      transferIsValid = user.transaction.reduce((acc, transaction) => acc + transaction.amount, 0) >= userInput.amount;
    }

    if(!transferIsValid || user.pin !== userInput.pin || user.accountNo === userInput.accountNo){
      setErrorMsg('Amount should be less or equal bal, check ur Pin!');
      return;
    }

    if(transferIsValid && user.pin === userInput.pin){
      
      const transaction = [{
       date: new Date().toISOString(),
       amount: +`-${userInput.amount}`,
       sender: user.accountNo,
       to: userInput.accountNo,
       type: 'Transfer',
      }, ...user.transaction
      ];

      const userData = {...user,transaction};
      dispatch(linkAccount({fetchData, userData}));
    }

    regContext.touchLogin();
    setErrorMsg(false);
    setIsSubmitting(true);
  };

  return <Container>
    <div className={classes['loan-container']}>
      <h4>Transfer Money</h4>
      <p className={classes['error-msg']}>{errorMsg && errorMsg}</p>
      <form onSubmit={submitHandler}>
        <Input
         className={classes.input}
         label='Account Number' input={{
          type: 'number',
          id: 'accountNo',
          name: 'accountNo',
          value: userInput.accountNo,
          onChange: (event)=>userInputHandler('accountNo', event.target.value)
        }}/>
        <div className={classes['input-wrap']}>
          <label htmlFor="choose bank">
            Choose Bank
          </label>
          <select
            value={userInput.bankName}
            onChange={(event) => userInputHandler('bankName', event.target.value)}
          >
            <option value=''></option>
            <option value='first bank'>First Bank</option>
            <option value='access bank'>Access Bank</option>
            <option value='gtb'>GT Bank</option>
            <option value='uba'>UBA Bank</option>
            <option value='zenith'>Zenith Bank</option>
            <option value='union bank'>Union Bank</option>
          </select>
        </div>
        <Input
         className={classes.input}
         label='Amount' input={{
          type: 'number',
          id: 'amount',
          name: 'amount',
          value: userInput.amount,
          onChange: (event)=>userInputHandler('amount', event.target.value)
        }}/>
        
        <Input
         className={classes.input}
         label='PIN' input={{
          type: 'number',
          id: 'pin',
          name: 'pin',
          value: userInput.pin,
          onChange: (event)=>userInputHandler('pin', event.target.value)
        }}/>

        <div className={classes['form-action']}>
          <Button label='Transfer' button={{
            type: 'submit'
          }} />
        </div>
        {isSubmitting && 
          <div className={classes.spinner}>
          <img src={iconImage} alt="spinner" />
        </div>
        }
      </form>
    </div>
    <Goback />
  </Container>
};
export default Transfer;