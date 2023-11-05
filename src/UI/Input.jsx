import classes from './Input.module.css';

const Input = function(props){

  return <div className={`${classes['input-wrap']} ${props.className}`}>
          <label htmlFor={props.label}>{props.label}: </label>
          <input {...props.input} />
        </div>
  
};

export default Input