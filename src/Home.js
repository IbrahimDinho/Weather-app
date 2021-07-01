import Bogota from './cities/Bogota.jpeg';
import Brighton from './cities/Brighton.jpeg';
import Brisbane from './cities/Brisbane.jpeg';
import Cairo from './cities/Cairo.jpeg';
import Delhi from './cities/Delhi.jpeg';
import Detroit from './cities/Detroit.jpeg';
import Edinburgh from './cities/Edinburgh.jpeg';
import Leeds from './cities/Leeds.jpeg';
import Madrid from './cities/Madrid.jpeg';
import Melbourne from './cities/Melbourne.jpeg';
import Nairobi from './cities/Nairobi.jpeg';
import Paris from './cities/Paris.jpeg';
import Santiago from './cities/Santiago.jpeg';
import Shanghai from './cities/Shanghai.jpeg';
import Sydney from './cities/Sydney.jpeg';
import Tokyo from './cities/Tokyo.jpeg';
import Toronto from './cities/Toronto.jpeg';
import Vienna from './cities/Vienna.jpeg';

import './Home.css';
import './Today.css';
import './Today-dark.css';
import {theme,initLocation, getTempUnit} from './Settings.js';

import './forcast.css';
import ReactDOM from 'react-dom';

import React, { Component , useState, useEffect } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Skycons from 'react-skycons';

//import './forcast.js';

import './Recommendations.css';
import './Recommendations-dark.css';
import $ from "jquery";

window.$inde = 0;
window.$counter = 0;
window.$initialLoc = 0;
window.$tempUnit = "metric";
window.$theme = theme();

const api = {key: "6dce6f5a091ae4d7c11d9a2baa018000", base: "https://api.openweathermap.org/data/2.5/"};

function Home() {
  if (initLocation() != null){
    console.log("IT IS not NULL");
    window.$initialLoc = initLocation();
    
  }
  useEffect(() => {
    loca(window.$initialLoc);
  },[]);

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const locations =["London","Athens","Paris"];

  const gTempUnit = () =>{
    if (getTempUnit() == "Imperial"){
      return "Imperial"
    } else if (getTempUnit() == "metric"){
      return "metric"
    }else{
      return window.$tempUnit
    }
  }
  const getTempMeter = () =>{
    if (getTempUnit() == "Imperial"){
      return "°F"
    }else{
      return "°C"
    }

  }
  const getTheme = ()=>{
    console.log("ibrahim")
    if (theme() === true){
      console.log("its dark")
      return "dark"
      
    }else{
      console.log("its light")
      return ""
    }
  }
  const getIconThem = ()=>{
    if (theme() === false){
      return "white"
    }else{
      return "ivory"
    }
  }

  const search=(location_search) => {
    fetch(`${api.base}weather?q=${location_search}&units=${gTempUnit()}&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);});
  };
  

  const incrLoc = () => {
    let temp = window.$inde + 1;
    window.$inde = temp;
    if(temp >= locations.length){
      window.$inde = 0;
      temp = window.$inde;
    }
    loca(temp);
  };

  const decrLoc = () => {
    let temp = window.$inde;
    if (temp <=0){
      temp = locations.length-1;
    }else{
       temp = window.$inde - 1;
    }
    window.$inde = temp;
    loca(temp);
  };

  const loca = (n) => {
    window.$counter = n;
    search(locations[n]);
  };

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  };

  const iconName = () => {
    
    var idIcon = weather.weather[0].id;
    if (idIcon>=200 && idIcon <= 232){
      return 'RAIN'
    }
    else if (idIcon>=300 && idIcon<= 321){
      return 'RAIN'
    }
    else if( idIcon>=500 && idIcon <= 531){
      return 'RAIN'
    }
    else if( idIcon>=600 && idIcon<= 602){
      return 'SNOW';
    }
    else if( idIcon>=611 && idIcon <= 622){
      return 'SLEET';
    }
    else if( idIcon>=701 && idIcon <= 781){
      return 'FOG';
    }
    else if( idIcon==800){
      return 'CLEAR_DAY';
    }
    else if( idIcon == 801){
      return 'PARTLY_CLOUDY_DAY';
    }
    else if( idIcon>=802 && idIcon <= 804){
      return 'CLOUDY';
    }
  };

    //don't touch this below:
    const [count, setCount] = useState(0);

    return (
      // HOME CONTAINER START
      <div className={`Home${getTheme()}`}> 
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>

         {/*NAVIGATION BAR START*/}
         <div className="Home-header">

<div className="Home-header-button">
  <Link to={'/Settings'} className="nav-link">
    <i className={`${getTheme()} fa fa-gear fa-2x`}></i>
  </Link>
</div>

<div className="Home-header-content">{dateBuilder(new Date())}</div>

<div className="Home-header-invisible">
  <i className= "fa fa-gear fa-2x " ></i>
</div>

</div>
{/*NAVIGATION BAR END*/}

{/*TODAY'S WEATHER START*/}
<div className="Home-today">

{(typeof weather.main != "undefined") ? (
<div>
      <div className="Today-carousel">
        <div className="Today-carousel-button">
          <button className={`${getTheme()} fa fa-arrow-left fa-2x`} onClick={decrLoc}></button>
        </div>

        <div className={`Today-carousel-content${getTheme()}`}>
          <div>{weather.name}, {weather.sys.country}</div>
        </div>

        <div className="Today-carousel-button">
          <button className={`${getTheme()} fa fa-arrow-right fa-2x`} onClick={incrLoc}></button>
        </div>
      </div>

      <div class="Today-icon-container">
        <div className="Today-icon">
          <Skycons width="96" height="96" color={getIconThem()} icon={iconName()} autoplay={true}/>
        </div>
      </div>

      <div className= {`Today-temp${getTheme()}`}>
        <div className="Today-temp-overlay">
          {Math.round(weather.main.temp)}{getTempMeter()}
        </div>
      </div>

      <div className={`Today-conditions${getTheme()}`}>{weather.weather[0].main}</div>
</div>
  ) : ('')}
</div>
{/*TODAY'S WEATHER END*/}

        {/*WEATHER FORECAST START*/}
        <div id = "forecast" className="Home-forecast">  
          {Forcast(weather.name)}

        </div>
        {/*WEATHER FORECAST END*/}

        {/*RECOMMENDATIONS START*/}
        <div className="Home-recommendations">
          <div className="Home-recommendations">

            <button className="fa fa-caret-left fa-3x" onClick={() => {setCount(count + 1); leftRecommendation();}}></button>
            <a href={'https://duckduckgo.com/?q=' + storedLocations[index][0] + '+hotel+booking&ia=web'} className={`Home-recommendations-banner${getTheme()}`} style ={{ backgroundImage: "url("+storedLocations[index][4]+")" }}>
              <div className="Home-recommendations-frame">
                <div className="Home-recommendations-top">
                  <div className="Home-recommendations-location">
                    &ensp;&ensp;{storedLocations[index][0]}&nbsp;
                  </div>
                  <img className="Home-recommendations-icon" src={storedLocations[index][1]} />&ensp;&ensp;
                </div>

                <div className="Home-recommendations-middle">{storedLocations[index][2]}°C</div>

                <div className="Home-recommendations-bottom">{storedLocations[index][3]}</div>
              </div>
            </a>

            <button className="fa fa-caret-right fa-3x" onClick={() => {setCount(count + 1); rightRecommendation();}}></button>

          </div>
        </div>
        {/*RECOMMENDATIONS END*/}

        {/*RECOMMENDATIONS START*/}
        <div className="Home-footer">
					 <h4>Build Information</h4>
          <p>v2020.10.1.260206, Made in London &copy;</p>
        </div>
        {/*RECOMMENDATIONS END*/}

      </div>
      // HOME CONTAINER END
      );
}

function setIcons(icon,iconID){

  const skycons = new Skycons({"color": "white"});
  const currentIcon = icon.replace(/-/g, "_").toUpperCase();//takes api data and converts to a readable format for skycon
  skycons.play();// plays animation
  return skycons.set(iconID, Skycons[currentIcon]);
}



function Forcast(contry) {
  var lat = 0;
  var lon = 0;

  if (contry === "London"){
    lat = 51.51;
    lon = -0.13;

  }
  else if(contry ==="Paris"){
    lat = 48.8566;
    lon = 2.3522;
  }
  else{
    lat = 37.9838;
    lon = 23.7275;
  }


  const apikey = '5a3804b4dd5c3b945a6cdb2bc35f2b47';
  const proxy = 'https://cors-anywhere.herokuapp.com/';

  let iicon = ["","","","",""];
  let temp = ["","","","",""];
  let des = ["","","","",""];

  let d = new Date();
  var day = ["","","","",""];
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  //shows next 5 days of the week
  var j = d.getDay();
  for(var m = 0; m < 5; m++){
    if(j === 6){
      j = 0; 
      day[m] = days[j];
      j++;
    }
    else{
    day[m] = days[j];
    j++;
    }
  }

  

  //fetches the forcast data
  fetch(`${proxy}https://api.darksky.net/forecast/${apikey}/${lat},${lon}`)
    .then(result => {
      return result.json();
    })
    .then(data => {

      var i = 0;
      //for loop to set the details of the forcast
      for(i = 0; i < 5; i++){

        var dat = data.daily.data[i].icon;
        
        iicon[i] = dat.replace(/-/g,"_").toUpperCase();
        
        des[i] = dat.replace(/-/g, " ");

        var F = data.daily.data[i].temperatureMax;
        var c = ((F -32) *5/9)

        temp[i] = Math.floor(c);
      }

      const out = (
        
        <div className="forecast-section">
              <div id ="Day1" className = "forcast">
                <div>Tommorow</div>

                <div id = "temp1" className="forecast-temp">
                  {temp[1]}°C
                </div>
                <div id = "description" className="forecast-description">
                  {des[1]}
                  
                </div>

              </div>
              <div id ="Day2" className = "forcast">
                <div>{day[1]}</div>

                

                <div id = "temp1" className="forecast-temp">
                  {temp[2]}°C
                </div>
                <div id = "description" className="forecast-description">
                  {des[2]}
                </div>

              </div>
              
        </div>

      );
      ReactDOM.render(out,document.getElementById("forecast"));
      return;    
    })
    
  
}

//////////////////////////////////////////////////////////////////////////////////////////////// AIVARAS CODE START
function leftRecommendation() {
  index = index - 1;
  if (index < 0) {index = limit - 1;}
}
function rightRecommendation() {
  index = index + 1;
  if (index === limit) {index = 0;}
}

function locationQuery(temperatureScale, location) {
  let content =
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather',
      data: {q: location, units: temperatureScale, appid: 'b68d2af4558e21877e694c6014b50e1a',},
      dataType: "json",
      async: false
    }).responseJSON;
  return content;
}
function storeLocations(defaultLocations, temperatureScale, imageArray) {
  let storage = [];
  for (let i = 0; i < defaultLocations.length; i++) {
    let location = defaultLocations[i];
    let result = locationQuery(temperatureScale, location);
    let locality = result.name + ", " + result.sys.country;
    let icon = 'http://openweathermap.org/img/w/' + result.weather[0].icon + '.png';
    let temperature = Math.round(result.main.temp);
    let conditions = result.weather[0].main;
    let background = imageArray[i];
    storage.push([locality, icon, temperature, conditions, background]);
  }
  return storage;
}

var index = 0;
const imageArray = [Bogota, Brighton, Brisbane, Cairo, Delhi, Detroit, Edinburgh, Leeds, Madrid, Melbourne, Nairobi, Paris, Santiago, Shanghai, Sydney, Tokyo, Toronto, Vienna];

const defaultLocations = ["Bogota", "Brighton", "Brisbane", "Cairo", "Delhi", "Detroit", "Edinburgh", "Leeds", "Madrid", "Melbourne", "Nairobi", "Paris", "Santiago", "Shanghai", "Sydney", "Tokyo", "Toronto", "Vienna"];
const temperatureScale = 'metric';
const storedLocations = storeLocations(defaultLocations, temperatureScale, imageArray);
const limit = storedLocations.length;

////////////////////////////////////////////////////////////////////////////////////////////////

export default Home;
