import { useContext, useEffect, useState } from "react";
import RegisterContext from "../store/login-context";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers, getUserLoggedin, sendUserDataToRedux } from "../util/http";
import { useDispatch, useSelector } from "react-redux";
import Bonus from "../components/Account/Bonus";
import SectionWrapper from '../UI/SectionWrapper';
import { motion } from "framer-motion";
import classes from './Dashboard.module.css';

const Dashboard = function(){
  const navigate = useNavigate();
  const regContext = useContext(RegisterContext);
  let currAccount, content, balance = 0;
  const changed = useSelector(state => state.user.changed);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const {data: fetchData, isPending: fetchingUser} = useQuery({
    queryKey: ['users', 'accme'],
    queryFn: ({signal, queryKey})=> fetchUsers({signal, ...queryKey[1]}),
    staleTime: 5000,
    
  });

  useEffect(()=>{
    const isLoggedin = getUserLoggedin();
    if(!isLoggedin){
      navigate('/');
    }
    else{
      regContext.touchLogin(true);
    }

    dispatch(sendUserDataToRedux(currAccount));
    
    
  }, [regContext.isLoggedin,fetchData, changed, regContext.touch]);


  if(fetchingUser){
    content = <p>Loading...</p>
  }

  if(fetchData){
    const findUser = fetchData.find(user => user.email === regContext.isLoggedin.loggedinId
      || user.accountNo === regContext.isLoggedin.loggedinId
      );
    currAccount = findUser;
  }

  //calculate balance
if(user && user.transaction){
  const availBal = user.transaction.map(amount => amount.amount).reduce((acc, amount) => acc + amount, 0);
  balance = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'NGN'
  }).format(availBal);
}

  if(currAccount){
    content = <Container>
      <div className={classes.balance}>
        <h4>Avail Balance: </h4>
        <p>{balance}</p>
        </div>
      {!user.accLinked && <Bonus />}
      <SectionWrapper className={classes.content}>
        <motion.div
        whileHover={{backgroundColor: ['#e9e9e9', '#014086', '#e9e9e9'], scale: 1.01}}
        transition={{duration: 1.2}}
        >
          <img src="data:image/jpeg;base64,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"
          alt="reward" />
          <span>
            Rewards & Referral
          </span>
        </motion.div>
        <motion.div
        whileHover={{backgroundColor: ['#e9e9e9', '#014086', '#e9e9e9'], scale: 1.01}}
        transition={{duration: 1.2}}>
          <img src="https://www.accessbankplc.com/getmedia/e409e8a2-bf0b-4016-8e54-7b7eb8997b48/Group-959.png?width=756&height=756&ext=.png"
          alt="access" />
          <span>
            Access Transfer
          </span>
        </motion.div>
        <motion.div
        whileHover={{backgroundColor: ['#e9e9e9', '#014086', '#e9e9e9'], scale: 1.01}}
        transition={{duration: 1.2}}>
          <img src="https://img.squadhelp.com/story_images/visual_images/1633368001-breezypay.png?class=show"
          alt="breezy"
           />
          <span>
            BreezyPay
          </span>
        </motion.div>
        <motion.div
        whileHover={{backgroundColor: ['#e9e9e9', '#014086', '#e9e9e9'], scale: 1.01}}
        transition={{duration: 1.2}}>
          <img src="https://www.iconpacks.net/icons/1/free-user-group-icon-296-thumb.png"
          alt="obt"
           />
          <span>
            Other Banks Transfer
          </span>
        </motion.div>
        <motion.div
        whileHover={{backgroundColor: ['#e9e9e9', '#014086', '#e9e9e9'], scale: 1.01}}
        transition={{duration: 1.2}}>
          <img src="https://images.ctfassets.net/hwj1wtw91qpy/4yIHDnQkIjU7uqk6aIeVaJ/bc04d3cfb7d4d65295a9808edcb74f6e/Airtime_01.gif?w=1200&q=70"
          alt="airtime"
           />
          <span>
            Airtime & Data Top-up
          </span>
        </motion.div>
        <motion.div
        whileHover={{backgroundColor: ['#e9e9e9', '#014086', '#e9e9e9'], scale: 1.01}}
        transition={{duration: 1.2}}>
          <img src="https://www.shutterstock.com/image-vector/wallet-icon-trendy-flat-style-260nw-414685651.jpg"
          alt="wallet" />
          <span>
            Wallet Funding
          </span>
        </motion.div>
        <motion.div
        whileHover={{backgroundColor: ['#e9e9e9', '#014086', '#e9e9e9'], scale: 1.01}}
        transition={{duration: 1.2}}>
          <img src="https://storage.googleapis.com/sheldoniowa-com-1/2020/03/5f598088-pay-bill-icon-6.jpg.png"
          alt="bill" />
          <span>
            Bill Payment
          </span>
        </motion.div>
        <motion.div
        whileHover={{backgroundColor: ['#e9e9e9', '#014086', '#e9e9e9'], scale: 1.01}}
        transition={{duration: 1.2}}>
          <img src="https://connected.co.za/images/kazang/Kazang-Zambia-Products-Global-Airtime.png"
          alt="bill" />
          <span>
            International Airtime
          </span>
        </motion.div>
        <motion.div
        whileHover={{backgroundColor: ['#e9e9e9', '#014086', '#e9e9e9'], scale: 1.01}}
        transition={{duration: 1.2}}>
          <img src="data:image/jpeg;base64,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"
          alt="loan" />
          <span>
            Loan
          </span>
        </motion.div>
        <motion.div
        whileHover={{backgroundColor: ['#e9e9e9', '#014086', '#e9e9e9'], scale: 1.01}}
        transition={{duration: 1.2}}>
          <img src="data:image/png;base64,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"
          alt="investment" />
          <span>
            Investment Management
          </span>
        </motion.div>
        <motion.div
        whileHover={{backgroundColor: ['#e9e9e9', '#014086', '#e9e9e9'], scale: 1.01}}
        transition={{duration: 1.2}}>
          <img src="https://cdn-icons-png.flaticon.com/512/3595/3595867.png" alt="evoucher" />
          <span>
            eVoucher (Gift Card)
          </span>
        </motion.div>
        <motion.div
        whileHover={{backgroundColor: ['#e9e9e9', '#014086', '#e9e9e9'], scale: 1.01}}
        transition={{duration: 1.2}}>
          <img src="https://cdn-icons-png.flaticon.com/512/9764/9764509.png" alt="evoucher" />
          <span>
            Transaction History
          </span>
        </motion.div>
      </SectionWrapper>
    </Container>
  }

  return <>
    {content}
    </>
};

export default Dashboard;