import { useEffect } from "react";
import swal from "sweetalert2";
 function Example() {
  useEffect(()=>{ async function fetchData() {
  console.log("Start fetching...");

  let res = await fetch("https://dummyjson.com/quotes");
  let data = await res.json();

  console.log("Fetched data:", data);
}
fetchData();


const z= function x(){
   return "hui";
}
},[])
  
return(<>
    {`${z}`}
</>)

 
}
export default Example;
