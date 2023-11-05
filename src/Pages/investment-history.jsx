import { useContext, useEffect } from "react";
import Container from "../components/Container";
import { getUserLoggedin } from "../util/http";
import { useNavigate } from "react-router-dom";
import RegisterContext from "../store/login-context";
import classes from './investment-history.module.css';
import { useSelector } from "react-redux";
import { formatDate } from "../util/formater";
import Goback from "../UI/Goback";

const InvestmentHistory = function(){
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

  let investment = false;
  if(user){
    investment = user.transaction.filter(invest => invest.type === 'Investment');
  }

  let content;

  if(user){
    content =     <div className={classes.transaction}>
      <h2>Investment Histories</h2>
      <ul className={classes.accordion}>
        {investment &&
        investment.map((transaction, index) =>
          <li className={`${classes.debit}`}>
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
            <p>
              <span>Rate:</span>
              <span>{transaction.investDetail.rate}%</span>
            </p>
            <p>
              <span>Duration:</span>
              <span>{transaction.investDetail.duration}</span>
            </p>
            <p>
              <span>Mature Date:</span>
              <span>{transaction.investDetail.matureDate}</span>
            </p>
            <p>
              <span>Profit:</span>
              <span>{transaction.investDetail.profit}</span>
            </p>
            <p>
              <span>Return:</span>
              <span>{transaction.investDetail.return}</span>
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
export default InvestmentHistory;