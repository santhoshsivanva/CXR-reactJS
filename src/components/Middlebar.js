import React, { useState } from 'react';
import rotate from "../assets/images/rotatelg.gif";
import lungs from "../assets/images/lungs.jpg";
import { Link } from "react-router-dom";
import poster from "../assets/images/nd.png";

function Middlebar() {
  const [val, setVal] = useState(null);

  const handleChange = (event) => {
    setVal({values:event.target.value});
  }

  return (
    <div className="main">
      <div className='article1'>
        <div className="articleleft1">
        <a href='http://t.me/CovidXray19_bot'><img src={poster} alt="poster" width={'100%'} className="new"></img></a>
          <div className="notes-contect">
            <p className="notes-id" id='minor'>"Locating a vaccination center can be a challenging task, especially during a widespread pandemic. With the increasing demand for vaccines, finding a center that has availability and is near your location can be a time-consuming process.By using our website, you can search for nearby centers by simply entering your zip code or address. Our website will then display a list of available centers, along with their addresses and contact information."</p>
          </div>
        </div>
        <div className="articleright1" style={{marginTop:'0.5em'}}>
          <div className="imageSection">
            <img src={rotate} alt="world" id="worldImg" className="worldImg"></img>
          </div>
          <div className="contentSection">
            <div className='innerSection'>
              <label style={{ marginTop: "20px",fontFamily:"sans-sarif",fontSize:"1em" }} htmlFor="pincode">Find nearby vaccination centers</label><br></br>
              <input
                type="text"
                id="pin"
                className="inp"
                pattern="^[A-Z]"
                placeholder="Enter your pin-code"
                minLength={6}
                onChange={handleChange}
              ></input><br></br>
              <Link to="/findByPin" state={{data:val}} ><button className="butt">continue</button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className='article2' id='article2'>
        <div className="articleright2" style={{padding:'1em'}}>
          <div className="notes-contect">
            <p className="notes">"The COVID-19 pandemic has brought unprecedented challenges to healthcare systems worldwide. Deep learning algorithms offer a solution by providing a highly accurate and objective approach to the diagnosis of COVID-19 using X-rays. By analyzing the X-rays with deep learning algorithms,
              healthcare
              professionals can quickly and accurately identify the presence of the virus, providing a
              valuable tool in the fight against COVID-19."</p>
          </div>
        </div>
        <div className="articleleft" id="articleleft">
          <img src={lungs} alt="covid-image2" id="covid" className="covidImg"></img>
          <div className='inner3left' style={{ display: "flex", justifyContent: "center" }}>
            <Link to="/detectCovid"><button className="butt">Detect</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Middlebar;
