import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import SideNav from './components/SideNav';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { useState } from 'react';
import Login from './pages/Login';
import axios from 'axios';

function App() {

  const [state, UpdateState] = useState({ isLoggedIn: false})

  const setState = data => {
    UpdateState(current => ({...current, ...data}))
}

  const logedIn = status => {
    setState({isLoggedIn: status});
  }

  useState(()=>{
    axios.get('http://localhost:8000/api/me').then(res => {
      logedIn(true)
    }).catch(error => {
      console.log('Error', error)
    })
  }, [])

  if(state.isLoggedIn){
    return (
      <div className="wrapper">
        <Header />
        <SideNav />
        <MainContent />
        <Footer />
      </div>
    );
  }else{
    return <Login logedIn={logedIn} />
  }
 
}

export default App;
