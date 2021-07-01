import './Settings.css';
import './Settings-dark.css';
import React, { Component , useState, useEffect } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Skycons from 'react-skycons';
window.$unit="metric";
window.$themeunit = false
window.$defaultLoca = 0 //find out what is london 0? or null
//instead handleClick(e) then put theme = and return 
// MUST RETURN "dark" FOR DARK THEME AND "" FOR LIGHT
const theme = () =>{
  return window.$themeunit;
}
// IT MUST RETURN 0,1,2 FOR THE CITY AND NULL OR NULL OTHERWISE 
const initLocation = () =>{
  return window.$defaultLoca;
}
const getTempUnit = () =>{
  return window.$unit;
}

  const getTheme2 = ()=>{

    if (theme() === true){
      return "dark"
      
    }else{
      return ""
    }
  }

// IT MUST RETURN "Imperial" FOR FAHRENEIT AND "metric" FOR CELCIUS (WHICH IS THE DEFAULT)

class Settings extends Component {
  constructor(props){
  super(props)
  this.state = {defaultLocation : '0',
                temperatureUnit: 'metric',
                mode: false
                }
  
                
  }
  
  getinitLocation = ({target}) =>{
    console.log(target.value);
    if (target.value == 0){
      window.$defaultLoca = 0;
      this.setState({defaultLocation: window.$defaultLoca})
    }
    else if (target.value == 1){
      window.$defaultLoca = 1;
      this.setState({defaultLocation: window.$defaultLoca})
    }
    else{
      window.$defaultLoca = 2;
      this.setState({defaultLocation: window.$defaultLoca})
    }
  }

  getTemp = ({target}) =>{
    console.log(target.value);
  if(target.value === 'Imperial' ){
    window.$unit = "Imperial"
    this.setState({temperatureUnit: window.$unit})
  }
  else{
    window.$unit = "metric"
    this.setState({temperatureUnit: window.$unit})
  }
}
getTheme = ({target}) => {
 
  console.log(target.checked)
  if (target.checked === true){
    window.$themeunit = true
    this.setState({mode: window.$themeunit})
   
    
  }
  else{
    
    console.log(target.checked)
    window.$themeunit = false
    this.setState({mode: window.$themeunit})
    
  }
}


  
  render() {
    return (
      <div className={`Settings${getTheme2()}`}> 
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>

        {/*NAVIGATION BAR START*/}
        <div className="Settings-header">

          <div className="Settings-header-button">
            <Link to={'/'} className="nav-link">
              <i className="fa fa-angle-double-left fa-2x"></i>
            </Link>
          </div>

          <div className="Settings-header-content">SETTINGS</div>

          <div className="Settings-header-invisible">
            <i className="fa fa-gear fa-2x"></i>
          </div>
        </div>
        {/*NAVIGATION BAR END*/}


        <div className="Settings-content">

        <div className = 'maincontainer'>
    
           <div className = 'container2'>
            <h2>Temperature Unit  </h2>
            <select class={`select-css${getTheme2()}`} value={window.$unit} onChange={this.getTemp}>
              <option value = 'metric'>Celsius</option>
              <option value = 'Imperial'>Fahrenheit</option>
            </select>
            </div>
            <div className='container-left'>
            <h4>More Weather</h4>
            
              <a href="https://www.meteogroup.com/">Meteogroup</a>
              <br/>
              <a href="https://www.bbc.co.uk/weather/features/36446957">BBC Weather</a>
              <br/>
              <a href="https://public.wmo.int/en">World Meteorological Organization</a>
              <br/>
              <a href="https://www.metoffice.gov.uk/">Met Office</a>
              <br/>
            </div>
           <div className='container3'>
             <h2>Your Location </h2>
             <select class={`select-css${getTheme2()}`}  value={window.$defaultLoca} onChange={this.getinitLocation}>
            <option value='0'>London, GB</option>
            <option value = '1' >Athens, GR</option>
            <option value = '2' >Paris, FR</option>
            </select>
             
           </div>
           <div className='container4'>
             <h2>Language </h2>
             <select class={`select-css${getTheme2()}`}>
            <option>English -en</option>
            <option>English -us</option>
            <option>More to come</option>
            </select>
            
           </div>
           <div className= 'container5'>
             <h2>Dark Mode </h2>
             <label class="switch">
              <input type="checkbox"  checked={window.$themeunit} onChange={this.getTheme}/> 
              <span class="slider round"></span>
              </label>
              
            </div>
            </div>

        </div>

        <div className="Settings-footer">
          <h4>Build Information</h4>
          <p>v2020.10.1.260206, Made in London &copy;</p>
        </div>
      </div>
    );
  }
}

export { Settings , theme,initLocation , getTempUnit};
