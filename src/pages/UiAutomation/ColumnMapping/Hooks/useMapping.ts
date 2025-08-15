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

type MappingFields = Record<string|undefined, string|undefined>; 

const useMapping = (mappingFields: MappingFields) => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]); 
  


  useEffect(() => {
    if(Object.entries(mappingFields).length){
          let selected = Object.entries(mappingFields)
      .map(([_, value]) => value) 
       setSelectedFields(selected);
    }
  
  }, [mappingFields]);

  return { selectedFields };
};

export default useMapping;
