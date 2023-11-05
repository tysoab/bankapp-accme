import classes from './Container.module.css';
import Sidebar from './Sidebar/Sidebar';

const Container = function(props){

  return <main className={classes.container}>
    <Sidebar />
    <div className={classes['main-content']}>
      {props.children}
    </div>
  </main>
};

export default Container