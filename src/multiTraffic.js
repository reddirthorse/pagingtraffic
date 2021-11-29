import React, { useState, useEffect } from 'react';
import axios from "axios";

 function GetMultiTraffic(props){
    let dataList = []
    let dataSumList = []
    let i=0;
    console.log(props)


    useEffect( async()=>{
        console.log(props)
        const { start, end } = props
        dataList = []
        dataSumList = []
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
                        dataList.push({'carType':list[j].carType,'startUnitCode':list[j].startUnitCode,'endUnitCode':list[j].endUnitCode,'timeAvg':list[j].timeAvg,'timeMax':list[j].timeMax,'timeMin':list[j].timeMin,'sumTm':list[j].sumTm});
                    }
                }
             }
             for (let j = 0; j < dataList.length;j++){
                sumTimeAvg = sumTimeAvg + parseInt(dataList[j].timeAvg)
                sumTimeMax = sumTimeMax + parseInt(dataList[j].timeMax)
                sumTimeMin = sumTimeMin + parseInt(dataList[j].timeMin)
            }

            // async function getTraffics(){
            // const res = await axios.all(url);
            // console.log(res);
            dataSumList.push(sumTimeAvg,sumTimeMax,sumTimeMin)
            console.log(dataList)
            console.log(dataSumList)
            console.log(sumTimeMin)
        }
        
        // getTraffics()
    catch(e){
            console.log('err')
          }
        })

 return(

     <div>
          {dataList
         .map((d,cnt)=>{
             return(
                 <div>
                     
                 </div>
             )
         })} 
     </div>
 )
}
export default GetMultiTraffic