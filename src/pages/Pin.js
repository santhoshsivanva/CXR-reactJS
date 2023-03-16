import React, { useState } from "react";
import "./Pin.css";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

function BingMap(props){
  //States
  const location = useLocation();  
  const [Api, setApi] = useState(null);
  const [map, setMap] = useState(null);
  const datas = useRef({});

  useEffect(() => {
    fetch("https://www.covidapiss.site/map/12va@")
      .then(response => response.json())
      .then((data) => setApi(data.api_map))
      .catch((err) => console.log(err));

      if(location.state?.data != null){
      var pinCodeInput = document.getElementById('pin');
      if (location.state && location.state?.data.values) {
        pinCodeInput.value = location.state.data.values;
        location.state.data = null;
      }}

  }, [location]);


  //InitializeMap
  const InitializeMap = async () => {
    let index = 1;
    let pinCode = NaN;

    //validation string & value length
    if (isNaN(document.getElementById("pin").value) || document.getElementById("pin").value.length!==6) {
      console.log(isNaN(document.getElementById("pin").value));
      console.log(document.getElementById("pin").value.length <= 6);
      alert("Please enter correct indian pincode (6 digits)");
      document.getElementById("pin").value = "";
      return;
    }
    else {
      pinCode = parseInt(document.getElementById("pin").value);
    }

    //fetch location lat and long from pinCode
    const response = await fetch(
      `https://dev.virtualearth.net/REST/v1/Locations?q=${pinCode}+vaccination+center&key=${Api}`
    );

    //format the response
    const data = await response.json();
    try {
      datas.current.latitude = parseFloat((data.resourceSets[0].resources[0].point.coordinates[0]).toFixed(2));
      datas.current.longitude = parseFloat((data.resourceSets[0].resources[0].point.coordinates[1]).toFixed(2));
    }
    catch (e) {
      alert("please check your internet connection");
      document.getElementById("pin").value = "";
      return;
    }

    //use covid api from lang and long
    try{
    const vaCenter = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/centers/public/findByLatLong?lat=${datas.current.latitude}&long=${datas.current.longitude}`)
    const list = await vaCenter.json();
    datas.current.center = list.centers;
    }
    catch(error){
      console.log("An error occured at the API function",error);
    }

    // Create the map
    const bingMap = new window.Microsoft.Maps.Map(
      document.getElementById("bing-map"),
      {
        center: new window.Microsoft.Maps.Location(
          datas.current.latitude,
          datas.current.longitude
        ),
        zoom: 12
      }
    );
    setMap(bingMap);

    // Push all the latitude and longitude as pushpins
    datas.current.center.forEach(center => {
      try {
        const pin = new window.Microsoft.Maps.Pushpin(
          new window.Microsoft.Maps.Location(center.lat, center.long),
          {}
        );
        const pinInfobox = new window.Microsoft.Maps.Infobox(pin.getLocation(), {
          htmlContent: `<div class="pushpin-text">${(index + "." + center.name).toLowerCase()}</div>`,

        });
        pinInfobox.setMap(bingMap);
        bingMap.entities.push(pin);
        index = index + 1;
      } catch (err) {
        console.log("An error occured at the server:",err);
      }
    });
   
  }

  // Create the map
  return (
    <div className="map-outer">
      <div className="innerleft">
        <center>
          <input
            type="text"
            id="pin"
            className="inp"
            pattern="^[A-Z]"
            placeholder="Enter your pin-code"
          ></input>
          <br></br>
          <button className="butt" onClick={InitializeMap}>
            Find out
          </button><br></br><br></br>
          <Link to='/' style={{ fontWeight: "bold" }}>back to home</Link></center>
        <hr></hr>
        <center><p style={{ padding: 10, color: 'rgb(125, 27, 125)', fontWeight: "bold" }}>Only Indian pincodes are allowed!</p></center>
        {datas.current.center ?
          <ul id="list-center">
            {datas.current.center.map((ctr, index) => (
              <li className="inner" key={index}>
                <div className="num">
                  <h4>{index + 1}</h4>
                </div>
                <div className="value">
                  <center>
                    <p style={{ fontSize: '1em', fontWeight: 'bold' }}>{ctr.name}</p>
                    <p style={{ fontSize: '1em' }}>Location : {ctr.location}</p>
                  </center>
                </div>
              </li>
            ))}
          </ul> : <div><center><h4>No generated list ...</h4></center></div>
        }
      </div>
      <div className="innerright" style={{backgroundColor:"wheat"}}>
        <div id="bing-map" />
      </div>
    </div>
  );
}

export default BingMap;