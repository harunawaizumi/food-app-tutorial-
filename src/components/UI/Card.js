import classes from './Card.module.css';

const Card = props => {
  return <div className={classes.card}>{props.chidren}</div>;
};

export default Card;
