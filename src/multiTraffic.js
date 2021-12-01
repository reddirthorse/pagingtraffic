import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";

 const GetMultiTraffic = (props)=>{
    const [dataSumList,setDataSumList] = useState([])
    const [nameSumList,setNameSumList] = useState([])
    const [louteDataList,setLouteDataList] = useState([])
    // let dataList = []
    // let dataSumList = []
 
    console.log(props)

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
    const { start, end } = props
    let tempDataList = []
    let sumTimeAvg = 0
    let sumTimeMax = 0
    let sumTimeMin = 0
    try{
        async function getTraffics(){
        for (let i=0;i<start.code.length;i++){
            const data = await axios.get(`http://data.ex.co.kr/openapi/odhour/trafficTimeByRoute?key=6844121548&type=json&startUnitCode=${start.code[i]}&endUnitCode=${end.code[i]}`)
            const {list} = data.data
            for (let j = 0; j<list.length; j++) {
                if(list[j].startUnitCode ===`${start.code[i]} `&&list[j].endUnitCode ===`${end.code[i]} `&&list[j].carType ==='1'){
                    tempDataList.push({'carType':list[j].carType,'startUnitCode':list[j].startUnitCode,'endUnitCode':list[j].endUnitCode,'timeAvg':list[j].timeAvg,'timeMax':list[j].timeMax,'timeMin':list[j].timeMin,'sumTm':list[j].sumTm});
                }
            }
            }
        for (let j = 0; j < tempDataList.length;j++){
            sumTimeAvg = sumTimeAvg + parseInt(tempDataList[j].timeAvg)
            sumTimeMax = sumTimeMax + parseInt(tempDataList[j].timeMax)
            sumTimeMin = sumTimeMin + parseInt(tempDataList[j].timeMin)
        }
        setDataSumList([sumTimeAvg,sumTimeMax,sumTimeMin])
        }
        getTraffics()
        }
    catch(e){
            console.log('err')
          }

        },[props])

        console.log(dataSumList)
 return(

     <div className = "container">
        
        {/* <strong className="d-inline-block mb-2 text-success">출발 : {props.startCity}</strong>
        <div className = 'endCity'>도착 : {props.endCity}</div> */}
        <div className = "row">
            <div className = "col border">
                <div class="row">
                    <p class="text-start fs-1 text-muted">{props.startCity}</p>
                    </div>
                    <div class="row">
                        <p>&nbsp;</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                        </svg>
                        <p>&nbsp;</p>
                    </div>
                    <div class="row">
                        <p class="text-start fs-1 text-muted">{props.endCity}</p>
                    </div>
            </div>
            <div className = "col-8">
            <div className = "row border">
                <div className = "col">
                    <p class="text-center fs-1 text-muted">평균 예상 시간</p>
                    <p class="text-center fs-1 fw-bold text-success">{timeCal(dataSumList[0])}</p>
                    </div>
            </div>
            <div className = "row border">
                <div className = "col">
                    <p class="text-center fs-4 text-muted">최대 예상 시간</p>
                    <p class="text-center fs-4 fw-bold text-primary">{timeCal(dataSumList[1])}</p>
                    </div>
                <div className = "col">
                    <p class="text-center fs-4 text-muted">최소 예상 시간</p>  
                    <p class="text-center fs-4 fw-bold text-primary">{timeCal(dataSumList[2])}</p>
                    </div>
            </div>
        </div>
        <div className = "col border">
            <p className = "text-center text-muted fs-6">경부고속</p>
        </div>
        </div>
 
</div>
    
            
       
     
 )
}
export {GetMultiTraffic}