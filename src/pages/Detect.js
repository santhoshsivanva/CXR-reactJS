import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Detect.css"
import detect from "../assets/images/detect.jpg"

export const Detect = () => {
  const files = useRef({});
  const [error, setError] = useState(null);

  const loadFile = (event) => {
    var image = document.getElementById("get");
    image.src = URL.createObjectURL(event.currentTarget.files[0]);
    var filename = event.currentTarget.files[0];
    files.current.name = filename;
  }

  const handleSubmit = async () => {
    let fil = new FormData();
    fil.append('file', files.current.name);
    var result = document.getElementById("output");
    result.innerText = "Loading ..."
    const sendRequest = await fetch("https://www.covidapiss.site/", { method: "POST", body: fil });
    var responce = await sendRequest.json();
    
    try {
      if (responce.result === "Covid") {
        setError(null);
        result.style.backgroundColor = "lightcoral";
        result.innerText = "COVID";
      }

      else if (responce.result === "Normal") {
        setError(null);
        result.style.backgroundColor = "lightgreen";
        result.innerText = "NORMAL";
      }

      else {
        setError("*"+responce.error);
        result.style.backgroundColor = "white";
      }
      
    }

    catch (e) {
      alert("{Server error}: Something went wrong" + e);
    }

  }

  return (
    <>
      <div className="section" style={{ margin: "0px" }}>
        <div className='nav'>
          <div className='innerOne'>
            <Link to='/'><button className="button">Home</button></Link>
            <Link to='/findByPin'><button className="button">Locate Center</button></Link>
          </div>
          <div className="innerTwo">
            <a rel="noreferrer" href='https://github.com/santhoshsivanva/CXRDetection' className="about">Github❤️</a>
          </div></div>
      </div>
      <div className='mainn'>
        <div className='leftSide1'>
          <img alt="covid" id="get" className="img" src={detect}></img>
        </div>
        <div className='rightSide1'>
          <div className='innernew'>
            <div className='inner1' style={{ fontFamily: 'sans-serif' }}>
              <h3><strong>Instructions to follow:</strong></h3>
              <br></br>
              <p>1.Please select your correct lungs x-ray image using the "Choose" button.</p>
              <br></br>
              <p>2.The image must be in the correct format.</p>
              <br></br>
              <p>3.Finally, click the "Detect" button and verify the result.</p>
              <br></br>
              <p>4.Any other images rather than lungs x-ray it will generate false result.</p>
              <br></br>
              <p><b style={{color:'red'}}>Important:</b>Its only trained on lungs x-ray Images.</p>
              <br></br>
              <center><p style={{ color: 'rgb(125, 27, 125)', fontWeight: "bold" }}>Caution: The machine learning model may sometimes generate incorrect results.</p></center>
            </div>
            <div className='inner2'>
              <input type="file" className="Input" id="getfile" accept="image/*"
                onChange={loadFile} name="file" />
            </div>
            <div className='inner3'>
              <div className='inner3left'>
                <button id="nn" onClick={handleSubmit} className="butt">Detect</button>
              </div>
              {error ?
                <p style={{ textAlign: "center", color: "red", fontSize: "1.2em" }}>{error}</p> :
                <div></div>
              }
              <div className='inner3right'>
                <p id="output" style={{ color: "white", fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: "1.5rem" }}>Result</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Detect