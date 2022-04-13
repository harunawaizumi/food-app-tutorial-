import { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const [ meals, setMeals ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ httpError, setHttpError ] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
        const response = await fetch('https://foodapp-3e762-default-rtdb.firebaseio.com/meals.jsonn');
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error('something is not correct');
        }

        const loadedMeals = [];

        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
    };
    try {
      fetchMeals();
    } catch (error) {
      setIsLoading(false);
      setHttpError(error);
    }
  }, []);
  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    )
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) =>
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  );

  return (
      <div className={classes.meals}>
        <ul>{mealsList}</ul>
      </div>
  );
};

export default AvailableMeals;
