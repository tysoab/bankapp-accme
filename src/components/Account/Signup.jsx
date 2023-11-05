import { createNewUser, fetchUsers, queryClient, storeLoginDetail } from "../../util/http";
import SignupForm from "./SignupForm";
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import Overlay from "../../UI/Overlay";

import classes from './Signup.module.css';
import Modal from "../../UI/Modal";
import { useEffect, useState } from "react";

const Signup = function(){

  const navigate = useNavigate();
  const [emailIsRegistered, setEmailIsRegistered] = useState(false);

  useEffect(()=>{
    let timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(()=>{
      setEmailIsRegistered(false);
    }, 2500)
  }, [emailIsRegistered]);

  const {data: fetchData, isLoading: fetchingUser} = useQuery({
    queryKey: ['users', 'signup'],
    queryFn: ({signal, queryKey})=> fetchUsers({signal, ...queryKey[1]}),
    staleTime: 5000,
  });

  const {mutate, isPending, isError, error} = useMutation({
    mutationKey: ['newUser'],
    mutationFn: createNewUser,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['newUser']}),
      navigate('/dashboard')
    }
  });


  const submitHandler = (formData)=>{
    let checkEmail;
    if(fetchData){
      checkEmail = fetchData.find(user => user.email === formData.email);
    }

    if(checkEmail){
      setEmailIsRegistered(true);
      return;
    }
     
    const users = !checkEmail && !fetchData ? [formData] : fetchData && !checkEmail ? [...fetchData, formData] : null;
    if(users){
    mutate(users);
    storeLoginDetail({status: true, loggedinId: formData.email});
    }
  };
  
  if(emailIsRegistered){
    return <div className={classes.emailUsed}>
      <p>Email address is already used, try again</p>
    </div>
  }

  if(isPending){
    return <Overlay>
      <Modal className={classes.loading}>
        <p>Submitting...</p>
      </Modal>
    </Overlay>
  }

  if(isError){
    return <Overlay>
      <Modal className={classes.isError}>
          <h4>Registration failed</h4>
          <p>{error.message}, try again later...</p>
      </Modal>
    </Overlay>
  }
  

  return <>
  <SignupForm onSubmit={submitHandler} />
  </>
};

export default Signup;