import { motion } from 'framer-motion';
import classes from './Modal.module.css';

const Modal = function(props){

  return <motion.div className={`${classes.modal} ${props.className}`}
      variants={{hidden: {opacity: 0, y: 30}, visible: {opacity: 1, y: '-50%', x: '-50%'}}}
      initial='hidden'
      animate='visible'
      exit='hidden'
      transition={{duration: 0.5}}
   >
    {props.children}
  </motion.div>
};

export default Modal;