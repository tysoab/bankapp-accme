import { useContext, useEffect, useState } from "react";
import Button from "../UI/Button";
import Goback from "../UI/Goback";
import Input from "../UI/Input";
import Container from "../components/Container";
import classes from './Investment.module.css';
import { getExpireDate } from "../util/formater";
import RegisterContext from "../store/login-context";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers, getUserLoggedin, linkAccount } from "../util/http";
import { useQuery } from "@tanstack/react-query";
import iconImage from '../assets/spinner.gif';

const Investment = function(){

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const regContext = useContext(RegisterContext);
  const user = useSelector(state => state.user.user);
  const [errorMsg, setErrorMsg] = useState(false);
  const [userInput, setUserInput] = useState({
    amount: '',
    duration: '',
    pin: ''
  });

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
        setUserInput({amount: '', pin: '', duration: ''});
        navigate('/dashboard');
      }, 5000);
    }
  }, [isSubmitting]);

  let duration, rate, profit, outcome, matureDate;

  const formIsValid = +userInput.amount.trim() > 0 && 
          userInput.duration.trim() !== '' && userInput.pin.trim() !== '';
  
    if(+userInput.duration === 6 && +userInput.amount > 0){
      rate = 7.5;
    }
    if(+userInput.duration === 12 && +userInput.amount > 0){
      rate = 16;
    }

  if(rate){
    duration = userInput.duration + ' Months';
    profit = (rate / 100) * +userInput.amount;
    outcome =profit + +userInput.amount;
    matureDate = getExpireDate(userInput.duration);
  }

  const userInputHandler = (identifier, value)=>{
    if(identifier === 'amount'){
      setUserInput({...userInput, amount: value});
    }

    if(identifier === 'duration'){
      setUserInput({...userInput, duration: value});
    }

    if(identifier === 'pin'){
      setUserInput({...userInput, pin: value});
    }
  };

  const submitHandler = (event) =>{
    event.preventDefault();
    if(!formIsValid){
      setErrorMsg('Fill the form correctly!')
      return;
    }
  
  let investmentIsValid;
  if(user){
    investmentIsValid = user.transaction.reduce((acc, transaction) => acc + transaction.amount, 0) >= userInput.amount;
  }

  if(!investmentIsValid || user.pin !== userInput.pin){
      setErrorMsg('Amount should be less or equal bal, & check ur Pin!');
      return;
    }
  
  if(investmentIsValid && user.pin === userInput.pin){
      
      const transaction = [{
       date: new Date().toISOString(),
       amount: +`-${userInput.amount}`,
       sender: 'Investment',
       type: 'Investment',
       investDetail: {
        rate,
        duration,
        matureDate,
        profit,
        return: outcome
       }
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
      <h4>Investment</h4>
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
        <div className={classes['input-wrap']}>
          <label htmlFor="choose bank">
            Duration:
          </label>
          <select
            value={userInput.duration}
            onChange={(event) => userInputHandler('duration', event.target.value)}
          >
            <option value=''></option>
            <option value='6'>0 - 6 Month</option>
            <option value='12'>0 - 12 Month</option>
          </select>
        </div>
        {userInput.duration &&
          <div className={classes.investDetail}>
            <p>
              <span>Duration:</span>
              <span>{duration}</span>
            </p>
            <p>
              <span>Rate:</span>
              <span>{rate}%</span>
            </p>
            <p>
              <span>Profit:</span>
              <span>{profit.toFixed(2)}</span>
            </p>
            <p>
              <span>Return:</span>
              <span>{outcome.toFixed(2)}</span>
            </p>
            <p>
              <span>Mature Date:</span>
              <span>{matureDate}</span>
            </p>
          </div>
        }
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
          <Button label='Invest Now' />
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

export default Investment;