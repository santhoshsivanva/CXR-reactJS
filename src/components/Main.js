import "./components.css"
import side from "../assets/images/side.jpg"
import React, { Component } from 'react'

export default class Main extends Component {
  render() {
    return (
      <div className="main">
        <div className="article">
            <div className="articleleft">
                <img src={side} alt="covid-new"  className="covidImg"></img>
                <p className="txt">"This infection is not going to disappear...without science leading us to vaccines, we will get second and third waves of this" - <b>Farrar</b> </p>
            </div>
            <div className="articleRight">
                <div className="notes-contect">
                  <p className="notes">"Vaccination is a key tool in the fight against COVID-19. By receiving a vaccine, individuals can reduce their risk of getting sick and spreading the virus to others. This is critical in controlling the pandemic and reaching herd immunity. With multiple vaccines authorized for emergency use, countries are making progress towards widespread vaccination and the eventual end of the pandemic."</p>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
