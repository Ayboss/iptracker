import React, {useState, useEffect} from 'react';
import MapComponent from './MapComponent';
import arrow  from './assets/icon-arrow.svg';
import './App.css';
import {ipApi} from './apikeys'

function App() {
  const [text, setText] = useState('');
  const [ipInfo, setIpInfo] = useState('');
  const fetchIpInfo = async (ip='')=>{
    const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${ipApi}&ipAddress=${ip}`)
    const data = await response.json();
    setIpInfo(data);
    // &ipAddress=8.8.8.8
  }
  useEffect(()=>{
    fetchIpInfo();
  },[])
  const handleSubmit = (e)=>{
    e.preventDefault();
    fetchIpInfo(text);
  }
  
  return (
    <div className="app_container">
    <div className="app">
      <h1 className="app__heading">IP Address Tracker</h1>
      <form className="app__form" onSubmit={handleSubmit}>
        <input type="text" className="app__form--input" 
        value={text}
        placeholder="Search for any address or domain" 
        onChange={(e)=>setText(e.target.value)}/>
        <button className="app__form--btn">
          <img src={arrow} alt="submit" className="app__form--svg" />
        </button>
      </form>
      {ipInfo && <div className="details">
        <div className="details__stuff">
          <h3 className="details__heading">
            IP Address
          </h3>
        <p className="details__info">{ipInfo?.ip}</p>
        </div>
        <div className="details__stuff">
          <h3 className="details__heading">
            Location
          </h3>
          <p className="details__info">
          {`${ipInfo?.location?.country} ${ipInfo?.location?.region} ${ipInfo?.location?.city}`}
          </p>
        </div>
        <div className="details__stuff">
          <h3 className="details__heading">
            Timezone
          </h3>
          <p className="details__info">
            {`UTC${ipInfo?.location?.timezone}`}
          </p>
        </div>
        <div className="details__stuff">
          <h3 className="details__heading">
            ISP
          </h3>
          <p className="details__info">
          {`${ipInfo?.as?.name}`}
          </p>
        </div>
      </div>
    }
    </div>
    <div>
     {ipInfo && <MapComponent lat={ipInfo?.location?.lat} lng={ipInfo?.location?.lng}/>}
    </div>
    <footer className="footer">
      Project from Frontend Mentor coded by 
      <a href="https://github.com/Ayboss" className="footer__link" target="_blank"> dudeYouHaveNoIdea</a>
    </footer>
    </div>
  );
}

export default App;
