import React, { Component } from 'react'
import './components.css'
import { Link } from "react-router-dom";


export default class Intro extends Component {
  render() {
    return (
        <div className="section" style={{margin: "0px"}}>
            <div className='nav'>
                <div className='innerOne' id='innerOne'>
                <Link to='/detectCovid'><button className="button">Detect Covid!</button></Link>
                <Link to='/findByPin'><button className="button">Locate Center</button></Link>
                </div>
                <div className="innerTwo">
                <a href='#center' className="about">About us❤️</a>
            </div></div>
        </div>
    )
  }
}
