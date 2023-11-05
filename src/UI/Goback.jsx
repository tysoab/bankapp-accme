import { useNavigate } from "react-router-dom";
import classes from './Goback.module.css';

const Goback = function(){

  const navigate = useNavigate();

  return <div className={classes.goback}>
        <h3 onClick={()=> navigate('/dashboard')}>&larr; Back</h3>
      </div>
};

export default Goback;