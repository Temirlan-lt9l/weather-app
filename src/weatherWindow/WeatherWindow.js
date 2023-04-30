
import React from 'react';


function WeatherWindow(props) {

const temp = (t)=>{

    const a = Number(t) - 273
    return Math. round(a) 

}

    return(     
    <div className="flex" >
                    <div className="flex" style={{flexDirection:"column",borderRadius:"8px",backgroundColor:"#fff",margin:"10px", justifyContent:"space-evenly"}}>
                                <h3>{props.day}</h3>
                                <div>
                                    <img src={props.src}/>
                                </div>
                    <div>
                    <p>
                        {props.weather}
                        </p>
                        <p>
                        {temp(props.temp)} °C
                        </p>
                    <p>
                        speed wind:{props.wind} m/s
                    </p>
                    </div>
                        
                </div>
           
     </div>
    );

}

export default WeatherWindow;