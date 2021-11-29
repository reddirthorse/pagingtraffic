import './App.css';
import { useState,useEffect } from 'react';
import GetTraffic from './traffic';
import Input from './input';
import GetMultiTraffic from './multiTraffic';

function App() {
  const [start,setStart] = useState('101');
  const [end,setEnd] = useState('115')


  const handleChange = (e) =>{
    const {name, value} = e.target
    if (name ==='start'){
      if(value==='서울'){
        setStart(['101'])
      }
      else if(value ==='대구'){
        setStart(['131','133'])
      }
    }else{
      if(value==='대전'){
        setEnd(['115'])
      } 
      if(value === '부산'){
        setEnd(['133','140'])
      }
    }
  }

  useEffect(() =>{
    console.log(start)
    console.log(end)
  },[start])

  return(
    <div>
      <Input name = 'start' type = 'text' placeholder ='' onChange = {handleChange}></Input>
      <Input name = 'end' type = 'text' placeholder ='' onChange = {handleChange}></Input>
      <GetTraffic start = {start} end = {end}></GetTraffic>
      <GetMultiTraffic start = {start} end = {end}></GetMultiTraffic>
    </div>
  )

  
}

export default App;
