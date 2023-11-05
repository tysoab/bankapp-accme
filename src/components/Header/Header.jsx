import { useContext } from 'react';
import Button from '../../UI/Button';
import classes from './Header.module.css';
import RegisterContext from '../../store/login-context';
import { useSelector } from 'react-redux';

const Header = function(){

  const regContext = useContext(RegisterContext);
  let userName = '...';

  const user = useSelector(state => state.user.user);
  
  if(user){
    userName = String(user.fullname).split(' ')
    .map(char => char.replace(char.at(0), char.at(0).toUpperCase())).at(0);
    
  }

  return <header className={classes.header}>
    <span className={classes.logo}>accme</span>
    <div>
      <h4>
        Welcome back, {userName}
      </h4>
      <Button label='Logout' button={{
        type: 'button',
        onClick: ()=>{
          regContext.touchLogin(false);
          regContext.closeToggleHandler();
          regContext.logoutHandler();
        }
      }} />

      <div className={classes.menubar}>
        <svg
        onClick={regContext.dropdownHandler}
         xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
      </div>
    </div>
  </header>
};

export default Header;