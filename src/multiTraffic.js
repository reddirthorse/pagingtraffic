import React, { useState, useEffect } from 'react';
import axios from "axios";

 function GetMultiTraffic(props){
    const [dataSumList,setDataSumList] = useState([])
    // let dataList = []
    // let dataSumList = []
    let i=0;
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


    useEffect( async()=>{
        console.log(props)
        const { start, end } = props
        let tempDataList = []
        let sumTimeAvg = 0
        let sumTimeMax = 0
        let sumTimeMin = 0
        try{ 
            for (let i=0;i<start.length;i++){
                const data = await axios.get(`http://data.ex.co.kr/openapi/odhour/trafficTimeByRoute?key=6844121548&type=json&startUnitCode=${start[i]}&endUnitCode=${end[i]}`)
                
                console.log(i,data)
                const {list} = data.data
                console.log(list)
                
                for (let j = 0; j<list.length; j++) {
                    if(list[j].startUnitCode ===`${start[i]} `&&list[j].endUnitCode ===`${end[i]} `&&list[j].carType ==='1'){
                        tempDataList.push({'carType':list[j].carType,'startUnitCode':list[j].startUnitCode,'endUnitCode':list[j].endUnitCode,'timeAvg':list[j].timeAvg,'timeMax':list[j].timeMax,'timeMin':list[j].timeMin,'sumTm':list[j].sumTm});
                    }
                }
             }
             for (let j = 0; j < tempDataList.length;j++){
                sumTimeAvg = sumTimeAvg + parseInt(tempDataList[j].timeAvg)
                sumTimeMax = sumTimeMax + parseInt(tempDataList[j].timeMax)
                sumTimeMin = sumTimeMin + parseInt(tempDataList[j].timeMin)
            }

            // async function getTraffics(){
            // const res = await axios.all(url);
            // console.log(res);
            setDataSumList([sumTimeAvg,sumTimeMax,sumTimeMin])
            console.log(dataSumList)
            console.log(sumTimeMin)
        }
        
        // getTraffics()
    catch(e){
            console.log('err')
          }
        },[props])

        console.log(dataSumList)
 return(

     <div className = "col-md-12">
        <div className = 'startCity'>출발 : {props.startCity}</div>
        <div className = 'endCity'>도착 : {props.endCity}</div>
        <div className = 'sumTimeAvg'>평균예상시간 : {timeCal(dataSumList[0])}</div>
        <div className = 'sumTimeMax'>최대예상시간 : {timeCal(dataSumList[1])}</div>
        <div className = 'sumTimeMin'>최소예상시간 : {timeCal(dataSumList[2])}</div>
     </div>
 )
}
export default GetMultiTraffic