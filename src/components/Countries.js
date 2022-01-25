import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useLocation } from 'react-router-dom';
import Card from './Card';

const Countries = () => {
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [playOnce, setPlayOnce] = useState(true);
    const [rangeValue, setRangeValue] = useState(40);
    const [selectedRadio,setSelctedRadio] = useState('');
    const radios = ['Africa','America','Asia','Europe','Oceania'];


    useEffect(() => {
        if(playOnce){
            axios.get('https://restcountries.com/v2/all').then((res) => {
                setData(res.data);
                setPlayOnce(false);
            })
        }
        

        const sortedCountry = () => {
            const countryObj = Object.keys(data).map((i) => data[i]);
            const sortedArray = countryObj.sort((a,b) => {
                return b.population - a.population;
            });
            // console.log(sortedArray);
            sortedArray.length = rangeValue;
            setSortedData(sortedArray);
        }
        sortedCountry()
    },[data,rangeValue,playOnce]);

    return (
        <div className="countries">
            <div className='sort-container'>
                <input type="range" min="1" max="250" value={rangeValue} onChange={(e) => setRangeValue(e.target.value)}/>
                <ul>
                    {radios.map((radio) => {
                        return (
                            <li kay={radio}>
                                <input type="radio" value={radio} id={radio} checked={radio === selectedRadio} onChange={(e) =>{
                                    setSelctedRadio(e.target.value)
                                }}/>
                                <label htmlFor={radio}>{radio}</label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className='cancel'>
                {selectedRadio && 
                    <h5 onClick={() => setSelctedRadio('')}>Annuler la recherche</h5>}
                </div>
           <ul className="countries-list">
               {sortedData
               .filter((country) => country.region.includes(selectedRadio))
               .map((country) => (
                   <Card key={country.name} country={country}/>
                ))}
           </ul>
        </div>
    );
};

export default Countries;
