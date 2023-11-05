import { useContext } from 'react';
import classes from './Header.module.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import RegisterContext from '../../store/login-context';
import Button from '../../UI/Button';

const Header = function(){

  const regContext = useContext(RegisterContext);

  const {scrollY} = useScroll();
  const opacityImage = useTransform(scrollY, [0, 200, 300, 500], [1, 0.5, 0.6, 1]);

  return <header className={classes.header} id='header'>
    <motion.img src="https://www.accessbankplc.com/getmedia/8593ad6c-8c40-40ef-b649-975af6c4cb67/business-banking-slider_1.jpg?width=1920&height=1080&ext=.jpg"
    style={{opacity: opacityImage}}
    alt="accme" />

    <div className={classes['header-nav']}>
      <span className={classes.logo}>ACCME</span>

      <nav className={classes['header-navbar']}>
        <Button 
          button={{
            type:'button',
            onClick: ()=> regContext.toggleModalHandler('login')
          }}
          label='LOGIN'
        />
        <Button 
          button={{
            type:'button',
            onClick: ()=> regContext.toggleModalHandler('signup')
          }}
          label='CREATE ACCOUNT'
        />
      </nav>
    </div>
  </header>
};

export default Header;