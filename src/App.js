import './App.css';
import React, { useState } from 'react';
import Header from './components/Header';
import Main from './components/main';
import Reviews from './components/reviews';
import Services from './components/services';
import Contacts from './components/contacts';
import Appointment from './components/Appointment';

class App extends React.Component {
  render()  {
    return (
      <div>
        <Header />
        <Main />
        <Services />
        <Reviews />
        <Appointment />
        <Contacts /> 

      </div> 
    )
  }
}

export default App