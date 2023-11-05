import { NavLink } from 'react-router-dom';
import classes from './Sidebar.module.css';
import { useContext } from 'react';
import RegisterContext from '../../store/login-context';
import { useSelector } from 'react-redux';

const Sidebar = function(){

  const regContext = useContext(RegisterContext);
  const user = useSelector(state => state.user.user);
  // let invest = user.transaction.filter(transaction => transaction.type === 'Investment');
  let investment;
  if(user && user.accLinked){
    const checkInvestment = user.transaction.filter(transaction => transaction.type === 'Investment');
    investment = checkInvestment.length !== 0
  }
  
  

  return <aside className={`${classes.aside} ${regContext.dropdown ? classes.dropdown : ''}`}>
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
      <h4>Dashboard</h4>
    </div>
    <hr />

    <nav>
      <NavLink to='/transfer'
      className={({ isActive }) =>
      isActive ? classes.active : undefined
    }
    end
     onClick={regContext.dropdown && regContext.dropdownHandler}
      >
        Transfer
      </NavLink>
      <NavLink to='/loan'
      className={({ isActive }) =>
      isActive ? classes.active : undefined
    }
    end
     onClick={regContext.dropdown && regContext.dropdownHandler}
      >
        Loan
      </NavLink>
      <NavLink to='/investment'
      className={({ isActive }) =>
      isActive ? classes.active : undefined
    }
    end
     onClick={regContext.dropdown && regContext.dropdownHandler}
      >
        Investment
      </NavLink>
      <NavLink to='/transaction'
      className={({ isActive }) =>
      isActive ? classes.active : undefined
    }
    end
     onClick={regContext.dropdown && regContext.dropdownHandler}
      >
        Transactions
      </NavLink>

    {investment &&
      <NavLink to='/investment-history'
      className={({ isActive }) =>
      isActive ? classes.active : undefined
    }
    end
     onClick={regContext.dropdown && regContext.dropdownHandler}
      >
        Investment History
      </NavLink>
    }

      

    </nav>
  </aside>
};

export default Sidebar;