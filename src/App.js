import './App.css';
import { useState,useEffect } from 'react';
import GetTraffic from './traffic';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from './input';
import GetMultiTraffic from './multiTraffic';

function App() {
  const [inputs,setInputs] = useState({
    startCity:'',
    endCity:''
  })
  const [start,setStart] = useState([]);
  const [end,setEnd] = useState([])


  const {startCity, endCity} = inputs;

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
   
  }

  useEffect(() =>{
    //경부 고속도로 하행선 시작
    if (startCity ==='서울' && endCity ==='대전'){
      setStart(['101'])
      setEnd(['115'])
    }
    else if(startCity ==='서울' && endCity ==='대구'){
      setStart(['101'])
      setEnd(['129'])
    }
    else if(startCity ==='서울' && endCity ==='부산'){
      setStart(['101','129','131','133'])
      setEnd(['129','131','133','140'])
    }else if(startCity ==='대전' && endCity ==='대구'){
      setStart(['115'])
      setEnd(['129'])
    }
    else if(startCity ==='대전' && endCity ==='부산'){
      setStart(['115','129','131','133'])
      setEnd(['129','131','133','140'])
    }
    else if(startCity ==='대구' && endCity ==='부산'){
      setStart(['131','133'])
      setEnd(['133','140'])
    }
    //경부 고속 도로 하행선 종료
    //경부 고속도로 상행선 시작
    else if (startCity ==='부산' && endCity ==='대구'){
      setStart(['133','140'])
      setEnd(['131','133'])
    }
    else if (startCity ==='부산' && endCity ==='대전'){
      setStart(['123','131','133','140'])
      setEnd(['115','123','131','133'])
    }
    else if (startCity ==='부산' && endCity ==='서울'){
      setStart(['123','131','133','140'])
      setEnd(['101','123','131','133'])
    }
    else if (startCity ==='대구' && endCity ==='대전'){
      setStart(['123'])
      setEnd(['115'])
    }
    else if (startCity ==='대구' && endCity ==='서울'){
      setStart(['123'])
      setEnd(['101'])
    }
    else if (startCity ==='대전' && endCity ==='서울'){
      setStart(['115'])
      setEnd(['101'])
    }
    //경부 고속도로 상행선 종료
    //광주 관련 도로 시작

    //광주 관련 도로 종료
    console.log(start)
    console.log(end)
    
  },[inputs])
  console.log(inputs)
  console.log(startCity)
  console.log(endCity)
  console.log(start)
  console.log(end)
  return(
    <div>
      <Input name = 'startCity' type = 'text' placeholder ='' onChange = {handleChange}></Input>
      <Input name = 'endCity' type = 'text' placeholder ='' onChange = {handleChange}></Input>
      <GetMultiTraffic startCity = {startCity} endCity = {endCity} start = {start} end = {end}></GetMultiTraffic>
    </div>
  )

  
}

export default App;
