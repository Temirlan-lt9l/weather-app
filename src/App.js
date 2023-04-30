import React, {useState, useEffect} from "react";
import SearchInput from "./searchInput/SearchInput.js"
import WeatherWindow from "./weatherWindow/WeatherWindow.js"
import Store from "./redux/Store.js";
import "./style/main.css"
import "./style/bgColor.css"


function App() {

	const [addInput] = useState('0');
	const [newInput, setNewInput] = useState(["0"]);
	const [weatherInfo, setWeatherInfo] = useState([])

	useEffect(()=>{	
		const unsubscribe = Store.subscribe(() => {
			const data = Store.getState();
			setWeatherInfo([data.weatherValue, ...weatherInfo]);
			console.log(data);
		  });
		  return () => {
			unsubscribe();
		  };

    },[weatherInfo])


	useEffect(() => {
		const storedWeatherInfo = localStorage.getItem('weatherInfo');
		if (storedWeatherInfo) {
		  setWeatherInfo(JSON.parse(storedWeatherInfo));
		}
	  }, []);
	  
	  useEffect(() => {
		localStorage.setItem('weatherInfo', JSON.stringify(weatherInfo));
	  }, [weatherInfo]);


	 
  const addNewInput = () =>{
	setNewInput([addInput, ...newInput ]);
  }
  const deleteInput = (index)=>{
	setNewInput(newInput.filter((_,i)=> i !== index))
  }
  const deletAllInput = ()=>{
	setNewInput([])
  }
  const deleteWeather = (index)=>{
	setWeatherInfo(weatherInfo.filter((_,i)=> i !== index))
  }
  

  return (
    <div className="wrapper">
      <div className="conteiner aquamarine">
			<div className="box none">
				{newInput.length > 0 && newInput.map((_, i )=>(
					<SearchInput key={i} onClick={()=>{deleteInput(i)}}/>
				))}
				<div>
					<button onClick={()=> {addNewInput()}}>
						Add input
					</button>
					<button onClick={()=> {deletAllInput()}}>
						delet all input
					</button>
				</div>
			</div>

			{weatherInfo && weatherInfo.map((weather,i) =><div  key={i} className="flex" style={{flexDirection:"column", justifyContent:"space-evenly"}}>
				<div className="flex">
					<h2>{weather.city.name}</h2>
					<button onClick={()=>{deleteWeather(i)}}>
						delet
					</button>
				</div>
				{/* <WeatherWindow/> */}
				<div className="flex">
					{weather.list.splice(0,5).map((obj,i) =><WeatherWindow key={i} day={obj.dt_txt} src={`https://openweathermap.org/img/wn/${obj.weather[0].icon}.png`} weather={obj.weather[0].main} temp={obj.main.temp} wind={obj.wind.speed}/> ) }
				</div>
			</div>)
				}
      </div>
    </div>
  );
}

export default App;
