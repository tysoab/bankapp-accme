import { useContext, useEffect, useState } from "react";
import Button from "../UI/Button";
import Goback from "../UI/Goback";
import Input from "../UI/Input";
import Container from "../components/Container";
import classes from './Loan.module.css';
import { useNavigate } from "react-router-dom";
import { fetchUsers, getUserLoggedin, linkAccount } from "../util/http";
import RegisterContext from "../store/login-context";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import iconImage from '../assets/spinner.gif';

const Loan = function(){
  const regContext = useContext(RegisterContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const [userInput, setUserInput] = useState({
    amount: '',
    pin: ''
  });
  const [errorMsg, setErrorMsg] = useState(false);
  const formIsValid = userInput.amount > 0 && userInput.pin.trim().length === 4;

  const userInputHandler = (identifier, value)=>{
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
      setErrorMsg('Fill the form correctly!')
      return;
    }
    let preDeposit;
    if(user){
      preDeposit = user.transaction.filter(transaction => 
        (transaction.type === 'Deposit' && +userInput.amount  <= (transaction.amount * 1.2))
        );
    }

    if(preDeposit.length === 0 || user.pin !== userInput.pin){
      setErrorMsg('You are not eligible for that amount or check ur Pin!');
      return;
    }
    
    if(preDeposit.length > 0 && user.pin === userInput.pin){
      const transaction = [{
       date: new Date().toISOString(),
       amount: +userInput.amount,
       sender: 'Loan-from-bank',
       type: 'Deposit',
      }, ...user.transaction
      ];

      const userData = {...user,transaction};
      dispatch(linkAccount({fetchData, userData}));
    }

    regContext.touchLogin(true);
    setErrorMsg(false);
    setIsSubmitting(true);
  };  

  return <Container>
    <div className={classes['loan-container']}>
      <h4>Request for loan</h4>
      <p className={classes['error-msg']}>{errorMsg && errorMsg}</p>
      <form onSubmit={submitHandler}>
        <Input
         className={classes.input}
         label='Amount' input={{
          type: 'number',
          id: 'amount',
          name: 'amount',
          value: userInput.amount,
          onChange: (event)=> userInputHandler('amount', event.target.value)
        }}/>
        <Input
         className={classes.input}
         label='PIN' input={{
          type: 'number',
          id: 'pin',
          name: 'pin',
          value: userInput.pin,
          onChange: (event)=> userInputHandler('pin', event.target.value)
        }}/>

        <div className={classes['form-action']}>
          <Button label='Request' />
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

export default Loan;