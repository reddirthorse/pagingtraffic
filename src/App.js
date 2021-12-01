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
  const [startList,setStartList] = useState({
    code:[],
    name:[]
  });
  const [endList,setEndList] = useState({
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
      setStartList({code:['101'],name:['서울']})
      setEndList({code:['115'],name:['대전']})
    }
    else if(startCity ==='서울' && endCity ==='대구'){
      setStartList({code:['101'],name:['서울']})
      setEndList({code:['129'],name:['북대구']})
    }
    else if(startCity ==='서울' && endCity ==='부산'){
      setStartList({code:['101','129','131','133'],name:['서울','북대구','경산','건천']})
      setEndList({code:['129','131','133','140'],name:['북대구','경산','건천','부산']})

    }else if(startCity ==='대전' && endCity ==='대구'){
      setStartList({code:['115'],name:['대전']})
      setEndList({code:['129'],name:['북대구']})
    }
    else if(startCity ==='대전' && endCity ==='부산'){
      setStartList({code:['115','129','131','133'],name:['대전','북대구','경산','건천']})
      setEndList({code:['129','131','133','140'],name:['북대구','경산','건천','부산']})
    }
    else if(startCity ==='대구' && endCity ==='부산'){
      setStartList({code:['131','133'],name:['경산','건천']})
      setEndList({code:['133','140'],name:['건천','부산']})
    }
    //경부 고속 도로 하행선 종료
    //경부 고속도로 상행선 시작
    else if (startCity ==='부산' && endCity ==='대구'){
      setStartList({code:['140','133'],name:['부산','건천']})
      setEndList({code:['133','131'],name:['건천','경산']})
    }
    else if (startCity ==='부산' && endCity ==='대전'){
      setStartList({code:['140','133','131','129'],name:['부산','건천','경산','북대구']})
      setEndList({code:['133','131','129','115'],name:['건천','경산','북대구','대전']})
    }
    else if (startCity ==='부산' && endCity ==='서울'){
      setStartList({code:['140','133','131','129'],name:['부산','건천','경산','북대구']})
      setEndList({code:['133','131','129','101'],name:['건천','경산','북대구','서울']})
    }
    else if (startCity ==='대구' && endCity ==='대전'){
      setStartList({code:['129'],name:['북대구']})
      setEndList({code:['115'],name:['대전']})
    }
    else if (startCity ==='대구' && endCity ==='서울'){
      setStartList({code:['129'],name:['대구']})
      setEndList({code:['101'],name:['서울']})
    }
    else if (startCity ==='대전' && endCity ==='서울'){
      setStartList({code:['115'],name:['대전']})
      setEndList({code:['101'],name:['서울']})
    }
    //경부 고속도로 상행선 종료
    //광주 관련 도로 시작
    //상행선 시작
    else if (startCity ==='서울' && endCity ==='광주'){
      setStartList({code:['101','612','608'],name:['서울','풍세하','남논산']})
      setEndList({code:['108','608','167'],name:['천안','남논산','광주']})
    }
    else if (startCity ==='대전' && endCity ==='광주'){
      setStartList({code:['152','608'],name:['대전','남논산']})
      setEndList({code:['155','167'],name:['논산','광주']})
    }
    //상행선 종료
    //하행선 시작
    else if (startCity ==='광주' && endCity ==='서울'){
      setStartList({code:['101','612','608'],name:['서울','풍세하','남논산']})
      setEndList({code:['108','608','167'],name:['천안','남논산','광주']})
      //광주서 서울로 가는 건 데이터가 없음 걍 똑같이 두겠음
    }
    else if (startCity ==='광주' && endCity ==='대전'){
      setStartList({code:['152','608'],name:['대전','남논산']})
      setEndList({code:['155','167'],name:['논산','광주']})
      //광주서 대전로 가는 건 데이터가 없음 걍 똑같이 두겠음
    }
    else if (startCity ==='대구' && endCity ==='광주'){
      setStartList({code:['101','612','608'],name:['서울','풍세하','남논산']})
      setEndList({code:['108','608','167'],name:['천안','남논산','광주']})
    }

    //하생선 종료
    //광주 관련 도로 종료
 
    
  },[startCity,endCity])

  return(
    <div>
      <Input name = 'startCity' type = 'text' placeholder ='' onChange = {handleChange}></Input>
      <Input name = 'endCity' type = 'text' placeholder ='' onChange = {handleChange}></Input>
      <GetMultiTraffic startCity = {startCity} endCity = {endCity} start = {startList} end = {endList}></GetMultiTraffic>
    </div>
  )

  
}

export default App;
