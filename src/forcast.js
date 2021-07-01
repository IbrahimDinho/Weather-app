//created by Alex Edwards 02/04/2020, 04:59AM BST
//import $ from jquery;
import Home from "./Home";
import ReactDOM from 'react-dom';

//import React, { Component , useState, useEffect } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Skycons from 'react-skycons';

window.$inde = 0;
window.$counter = 0;


const locations =["London","Athens","Paris"];
const Fapi = {key: "5a3804b4dd5c3b945a6cdb2bc35f2b47", base: "https://api.darksky.net/forecast/"};


var lat = 51.51;
var lon = -0.13;
export function Forcast(lat,lon) {

    //const [query, setQuery] = useState('');
    //const [weather, setForcast] = useState({});

    $.ajax({
      url: `https://api.darksky.net/forecast/${Fapi.key}/`,
      data:{
        f = lat,
        g = ",",
        h = lon,

      },
      dataType: 'json',
      success: function(response) {
        const ren = (
          <div className="forecast-section">
              <div id ="Day1" className = "forcast">
                <h2>Tommorow</h2>
                <canvas id="icon1" width="128" height="128"></canvas>
                <script>
                  Skycons.add(document.getElementById("icon1"),"RAIN");
                </script>
                <div className="forecast-temp">
                  {response.daily.data[1].temperatureMax}
                </div>

              </div>
              <div id ="Day2" className = "forcast"></div>
              <div id ="Day3" className = "forcast"></div>
              <div id ="Day4" className = "forcast"></div>
            </div>
        );

        }

        
      }



    )//end of ajax    
    
  }
}//end of forcast



