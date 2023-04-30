import React, {useState, useEffect} from "react";
import Store from "../redux/Store.js";
import ActionCreate from "../redux/ActionCreate.js";
import axios from "axios";
function SearchInput(props) {
    const [valueInput, setValueInput] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon ]= useState('');
    const [cityInfo, setCityInfo]= useState(null)

    
    const getLocation = async () =>{
        const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${valueInput}&limit=5&appid=dbbf6ed18aee5a024c56d6aed61104f4`)
            setCityInfo(response.data)
    }

    const getWeather = async () =>{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=dbbf6ed18aee5a024c56d6aed61104f4`)
        Store.dispatch(ActionCreate(response.data))
    }

    const save = (index)=>{
        setCityInfo(cityInfo.map((_,i) => {
            if(index === i){
            setLat(cityInfo[i].lat)
            setLon(cityInfo[i].lon)
        }
        }))
        setCityInfo()
    }

    useEffect(()=>{
      getLocation()
    },
    [valueInput])

    useEffect(()=>{getWeather()},[lat])
   

    return(
        <div className="flex">
            <div className="flex">
                <input placeholder="Search city" value={valueInput} onChange={(e)=> {setValueInput(e.target.value)}}/>
               {cityInfo && <div className="loadOption" >
                    {cityInfo.map((obj,i)=> 
                    <span className="absolut" key={i} onClick={()=>{save(i)}}>{obj.name}</span>
                    )} 
               </div>}
               
                <button onClick={props.onClick}> delet</button>
            </div>            
        </div>
    )
}

export default SearchInput;