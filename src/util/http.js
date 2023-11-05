import { QueryClient } from "@tanstack/react-query";
import { userActions } from "../store/userReducer";

export const queryClient = new QueryClient();

export const fetchUsers = async function({signal}) {
  const response = await fetch(`https://tysoab-swapi-3c8eb-default-rtdb.firebaseio.com/accme_users.json`,
  { signal: signal });

  if (!response.ok) {
    const error = new Error('An error occurred while creating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const userData = await response.json();
  return userData;
}

export const createNewUser = async function(formData) {
  const response = await fetch(`https://tysoab-swapi-3c8eb-default-rtdb.firebaseio.com/accme_users.json`, {
    method: 'PUT',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const userData = await response.json();
}

export const storeLoginDetail = (userData)=>{
  localStorage.setItem('isLoggedin', JSON.stringify(userData))
}

export const getUserLoggedin = () =>{
  const isLogged = JSON.parse(localStorage.getItem('isLoggedin'));
  if(isLogged){
    return isLogged;
  }else{
    return false;
  }
};

export const sendUserDataToRedux = (userData)=>{
  return async(dispatch)=>{
    dispatch(userActions.replaceUserData(userData || false));
  }
};

export const linkAccount = ({fetchData, userData})=>{
  return async(dispatch)=>{
    const index = fetchData.findIndex(user => user.email === userData.email);
    fetchData[index] = userData;
  
    createNewUser(fetchData);
  
    dispatch(userActions.linkAccount());
  }
};

export const transactions = ({fetchData, userData})=>{
    const index = fetchData.findIndex(user => user.email === userData.email);
    fetchData[index] = userData;  
    createNewUser(fetchData);

};