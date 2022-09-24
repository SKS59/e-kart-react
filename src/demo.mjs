import axios from "axios";
let dat;
axios.get('products_data.json').then((res)=> {dat=res.data})
console.log(dat)
