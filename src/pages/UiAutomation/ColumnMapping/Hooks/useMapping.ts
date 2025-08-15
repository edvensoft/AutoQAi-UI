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

interface ValidRecords{
  selected:string[]|null;
  mappedFields:string[]|null;
}

import { useEffect, useState } from "react";

type MappingFields = Record<string|undefined, string|undefined>; 

const useMapping = (mappingFields: MappingFields) => {
  const [selectedFields, setSelectedFields] = useState<ValidRecords>({selected:[],mappedFields:[]}); 
  


  useEffect(() => {
    if(Object.entries(mappingFields).length){
          let selected = Object.entries(mappingFields)
      .map(([_, value]) => value);
      
    let mappedFields= Object.entries(mappingFields).filter(([_,value])=>!value).map((field)=>field[0]);
       setSelectedFields({selected,mappedFields});
    }
  
  }, [mappingFields]);

  return { selectedFields };
};

export default useMapping;
