import { motion } from 'framer-motion';
import classes from './Overlay.module.css';
import { useContext } from 'react';
import RegisterContext from '../store/login-context';

const Overlay = function(props){

  const regContext = useContext(RegisterContext);

  return <div className={`${classes.overlay} ${props.className}`}>
    <div className={classes.closeBtn}>
      <motion.button
      onClick={regContext.closeToggleHandler}
      whileHover={{scale: 1.2}}
      transition={{type: 'spring', stiffness: 500, duration: 0.5}}
      >
        &times;
      </motion.button>
    </div>
    {props.children}
  </div>
};

export default Overlay;