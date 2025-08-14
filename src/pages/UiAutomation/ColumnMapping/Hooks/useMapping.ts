// import {useEffect,useState} from 'react'

// const useMapping = (mappingFields) => {
//     const [selectedFields, setSelectedFields] = useState([]);

// useEffect(() => {

// let selected=Object.entries(mappingFields).map((_,value)=>{
//     return value
// }).flat()
// setSelectedFields(selected)
// }, [mappingFields])

// return {selectedFields}
// }

// export default useMapping

import { useEffect, useState } from "react";

type MappingFields = Record<string|undefined, string|undefined>; // or replace `any[]` with the exact type of your values

const useMapping = (mappingFields: MappingFields) => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]); 
  
  // Replace `any[]` with the actual type if known

  useEffect(() => {
    console.log("inside-useEffect")
    if(Object.entries(mappingFields).length){
          let selected = Object.entries(mappingFields)
      .map(([_, value]) => value) // value is an array here
      
      console.log(selected,"selected*")
       setSelectedFields(selected);
    }
  
  }, [mappingFields]);

  return { selectedFields };
};

export default useMapping;
