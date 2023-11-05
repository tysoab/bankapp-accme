import { useContext, useEffect } from "react";
import Container from "../components/Container";
import { getUserLoggedin } from "../util/http";
import { useNavigate } from "react-router-dom";
import RegisterContext from "../store/login-context";
import classes from './Transaction.module.css';
import { useSelector } from "react-redux";
import { formatDate } from "../util/formater";
import Goback from "../UI/Goback";

const Transaction = function(){
  const navigate = useNavigate();
  const regContext = useContext(RegisterContext);
  const user = useSelector(state => state.user.user);

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

    if(user){
      return;
    }
  }, [regContext.isLoggedin]);

  let content;

  if(user){
    content =     <div className={classes.transaction}>
      <h2>Transaction Histories</h2>
      <ul className={classes.accordion}>
        {user.transaction.map((transaction, index) =>
          <li className={`${transaction.type === 'Deposit' ? classes.credit : classes.debit}`}>
          <input type="radio" id={index} name="accordion" />
          <label for={index}>
            <span>
              {transaction.amount}
            </span>
            <span>
              {formatDate(new Date(transaction.date), 'en-US')}
            </span>
            </label>
          <div className={classes.content}>
            <h5>{transaction.type === 'Deposit' ? 'Credit' : 'Debit'}</h5>
            <p>
              <span>Sender:</span>
              <span>{transaction.sender}</span>
            </p>
            {
              transaction.type !== 'Deposit' && transaction.type !== 'Investment' &&
              <p>
                <span>To:</span>
                <span>{transaction.to}</span>
              </p>
            }
            <p>
              <span>Date:</span>
              <span>
                {new Intl.DateTimeFormat(navigator.language,{
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }).format(new Date(transaction.date))}
              </span>
            </p>
            <p>
              <span>Amount:</span>
              <span>{transaction.amount}</span>
            </p>
          </div>
        </li>
          )}
        </ul>
       </div>
  }

  return <Container>
      {content}

      <Goback />
  </Container>
};
export default Transaction;