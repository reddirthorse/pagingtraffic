import React, { useState, useEffect } from 'react';
import axios from "axios";

function GetTraffic(props){
    const [isLoading,setLoading] = useState('true')
    const [start,setStart] = useState('101');
    const [end,setEnd] = useState('115');
    const [trafficData,setTrafficData] = useState([])
    const url = `http://data.ex.co.kr/openapi/odhour/trafficTimeByRoute?key=6844121548&type=json&startUnitCode=${start}&endUnitCode=${end}`
    
    function timeCal(t){
        let minutes = 0;
        let hour = 0;
        if (3600 > t ){
            minutes = parseInt(t/60)
            return `${minutes}분` 
        }
        else if (t>=3600){
            hour = parseInt(t/3600)
            minutes = parseInt((t - hour*3600)/60)
            return `${hour}시간 ${minutes}분`
        }
    }

    useEffect( () =>{
        try{ async function getTraffic(){
           const res = await axios.get(url);
           const data = res.data.list
           setTrafficData(data)
           console.log(data)}
           getTraffic().then(setLoading('false'))
           
       }catch{
         console.log('err')
       }
     },[url]);

    
     return(
        <div>
        {
        trafficData
        .filter((d)=>d.startUnitCode ===`${start} ` && d.endUnitCode ===`${end} ` && d.carType ==='1')
        .map((d,cnt)=>{
            return(
            <div className = "traffic">
            <div className="sumTm">측정시간:{trafficData[cnt].sumTm[0]}{trafficData[cnt].sumTm[1]}:{trafficData[cnt].sumTm[2]}{trafficData[cnt].sumTm[3]}</div>
            <div className="carType">차종:{trafficData[cnt].carType}</div>
            <div className="startUnitName">시작지점:{trafficData[cnt].startUnitName}</div>
            <div className="endUnitName">종료지점:{trafficData[cnt].endUnitName}</div>
            <div className="timeAvg">평균시간:{timeCal(trafficData[cnt].timeAvg)}</div>
            <div className="timeMax">최대시간:{timeCal(trafficData[cnt].timeMax)}</div>
            <div className="timeMin">최저시간:{timeCal(trafficData[cnt].timeMin)}</div>
            </div>
            )
        })}
    </div>
     )
}
export default GetTraffic;