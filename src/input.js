import React from "react";

const Input = ({name,type,placeholder,onChange}) =>{
    return(
        
            <div>
                <input name = {name} type = {type} placeholder = {placeholder} onChange = {onChange} ></input>
            </div>
            
        
    )
}
export {Input};