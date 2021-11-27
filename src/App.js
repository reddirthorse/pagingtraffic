import './App.css';
import { useState,useEffect } from 'react';
import GetTraffic from './traffic';
import Input from './input';

function App() {
  const [start,setStart] = useState('');
  const [end,setEnd] = useState('')


  const handleChange = (e) =>{
    const {name, value} = e.target

    name ==='start'? setStart(value) : setEnd(value)
    console.log(name,value)
  }


  return(
    <div>
      <Input name = 'start' type = 'text' placeholder ='' onChange = {handleChange}></Input>
      <GetTraffic></GetTraffic>
    </div>
  )

  
}

export default App;
