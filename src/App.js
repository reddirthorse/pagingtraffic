import './App.css';
import { useState,useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Input} from './input';
import {GetMultiTraffic} from './multiTraffic';

function App() {
  const [inputs,setInputs] = useState({
    startCity:'',
    endCity:''
  })
  const [start,setStart] = useState({
    code:[],
    name:[]
  });
  const [end,setEnd] = useState({
    code:[],
    name:[]
  })


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
      setStart({code:['101'],name:['서울']})
      setEnd({code:['115'],name:['대전']})
    }
    else if(startCity ==='서울' && endCity ==='대구'){
      setStart({code:['101'],name:['서울']})
      setEnd({code:['129'],name:['북대구']})
    }
    else if(startCity ==='서울' && endCity ==='부산'){
      setStart({code:['101','129','131','133'],name:['서울','북대구','경산','건천']})
      setEnd({code:['129','131','133','140'],name:['북대구','경산','건천','부산']})

    }else if(startCity ==='대전' && endCity ==='대구'){
      setStart({code:['115'],name:['대전']})
      setEnd({code:['129'],name:['북대구']})
    }
    else if(startCity ==='대전' && endCity ==='부산'){
      setStart({code:['115','129','131','133'],name:['대전','북대구','경산','건천']})
      setEnd({code:['129','131','133','140'],name:['북대구','경산','건천','부산']})
    }
    else if(startCity ==='대구' && endCity ==='부산'){
      setStart({code:['131','133'],name:['경산','건천']})
      setEnd({code:['133','140'],name:['건천','부산']})
    }
    //경부 고속 도로 하행선 종료
    //경부 고속도로 상행선 시작
    else if (startCity ==='부산' && endCity ==='대구'){
      setStart({code:['140','133'],name:['부산','건천']})
      setEnd({code:['133','131'],name:['건천','경산']})
    }
    else if (startCity ==='부산' && endCity ==='대전'){
      setStart({code:['140','133','131','129'],name:['부산','건천','경산','북대구']})
      setEnd({code:['133','131','129','115'],name:['건천','경산','북대구','대전']})
    }
    else if (startCity ==='부산' && endCity ==='서울'){
      setStart({code:['140','133','131','129'],name:['부산','건천','경산','북대구']})
      setEnd({code:['133','131','129','101'],name:['건천','경산','북대구','서울']})
    }
    else if (startCity ==='대구' && endCity ==='대전'){
      setStart({code:['129'],name:['북대구']})
      setEnd({code:['115'],name:['대전']})
    }
    else if (startCity ==='대구' && endCity ==='서울'){
      setStart({code:['129'],name:['대구']})
      setEnd({code:['101'],name:['서울']})
    }
    else if (startCity ==='대전' && endCity ==='서울'){
      setStart({code:['115'],name:['대전']})
      setEnd({code:['101'],name:['서울']})
    }
    //경부 고속도로 상행선 종료
    //광주 관련 도로 시작

    //광주 관련 도로 종료
 
    
  },[startCity,endCity])

  return(
    <div>
      <Input name = 'startCity' type = 'text' placeholder ='' onChange = {handleChange}></Input>
      <Input name = 'endCity' type = 'text' placeholder ='' onChange = {handleChange}></Input>
      <GetMultiTraffic startCity = {startCity} endCity = {endCity} start = {start} end = {end}></GetMultiTraffic>
    </div>
  )

  
}

export default App;
