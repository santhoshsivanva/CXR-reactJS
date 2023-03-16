import React, { Component } from 'react'
import santhosh from "../assets/images/santhosh.jpg";
import selva from "../assets/images/selva.jpeg";

export class footer extends Component {
  render() {
    return (
      <div className='footer' id='footer'>
        <div className='about'>
            <p className='center' id='center'>About us</p>
        </div>
        <div className='persons' id='persons'>
            <div className='person1' >
              <div className='cn'>
                <img src={santhosh} id='cn' className='rounded' alt="santhoshsivan"></img>
                <h4>Santhoshsivan V</h4>
                <p>connect on</p>
                <a rel="noreferrer" href='https://www.linkedin.com/in/santhoshsivan-vallatharasu/' target={'_blank'}><button className='author'>LinkedIn</button></a>
            </div></div>
            <div className='person2'>
            <div className='cn'>
            <img src={selva} id='cn' className='rounded' alt="selvakumar"></img>
            <h4>Selvakumar R</h4>
            <p>connect on</p>
            <a rel="noreferrer" href='https://www.linkedin.com/in/selvakumar-r-637268262/' target={'_blank'}><button className='author'>LinkedIn</button></a>
            </div></div>
        </div>
        <div className='end'>
        <p className='foot'>Created with react library support!❤️</p>
        </div>

      </div>
    )
  }
}

export default footer