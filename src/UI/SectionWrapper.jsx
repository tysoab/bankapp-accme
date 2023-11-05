import classes from './SectionWrapper.module.css';

const SectionWrapper = function(props){

  return <div className={`${classes.wrapper} ${props.className}`}>
    {props.children}
  </div>
};

export default SectionWrapper;