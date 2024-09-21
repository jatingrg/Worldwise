import React from 'react'
import styles from "./CityItem.module.css";
import  {Link, useNavigate} from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';
const formDate = (date)=>
    new Intl.DateTimeFormat("en",{
        day:"numeric",
        month:"long",
        year:"numeric",

    }).format(new Date(date));

export default function CityItem({city}) {
     const {currentCity} = useCities();
    const {cityName,emoji,date,id,position} = city;
const {deleteCity} = useCities();
const navigate = useNavigate();

   async function handleClick(e){
    e.preventDefault();
    console.log("test");
    await deleteCity(id);
    navigate('/app/cities')

   }

  return (
    <div>
        <li>

        
<Link className={`${styles.CityItem} ${id === currentCity.id ? styles['cityItem--active'] : ""}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
    <span className={styles.emoji}>{emoji}</span>
    <h3 className={styles.name}>{cityName}</h3>
    <time className={styles.date}>{formDate(date)}</time>
<button className={styles.deletebtn} onClick ={handleClick}>&times;</button>

</Link>
</li>
    </div>
  )
}
