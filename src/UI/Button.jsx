import { motion } from 'framer-motion';
import classes from './Button.module.css';

const Button = function(props){

  return <motion.button
  whileHover={{scale: 1.2}}
  transition={{type: 'spring', stiffness: 500, duration: 0.5}}
  className={`${classes.button} ${props.className}`}
  {...props.button}
  >
    {props.label}
  </motion.button>
};

export default Button;