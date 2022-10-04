import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import '../index.css'
function Orders() {
    const [allOrders, setallOrders] = useState([]);
    let id=useSelector((state)=>state.login.login[0].id)
    useEffect(()=>{
        axios.get('https://reactecart.herokuapp.com/orderdata').then((res)=> {
            setallOrders(res.data.filter((data)=> data.userid===id))
        })
    },[id])
    return ( 
    
    <div className="container row order row">
    { allOrders.map((data,index)=> {return(
    <table key={index} className="table table-hover table-responsive table-success" style={{boxSizing:'content-box'}} >
  <thead>
    <tr className="table-info">
      <th scope="col">#</th>
      <th colSpan="2">Order ID : {data.id}</th>
      <th colSpan="2" className="text-justify">Placed On : {data.date}</th>
    </tr>
  </thead>
  <tbody>
    {data.products.map((product,index)=>{return (
    <tr key={index}>
      <th scope="row">{index+1}</th>
      <td><img src={product.image_url} alt='...' style={{height:'4rem',width:'4rem'}}></img></td>
      <td className="text-left">{product.name}</td>
      <td className="text-left">Qty: {data.quantity[index]}</td>
      <td>{'Rs. '+product.finalprice}</td>
    </tr>
    )})
    }
    <tr className="table-success">
      <th scope="row"></th>
      <td></td>
      <td colSpan="2" className="text-right h6">Total : </td>
      <td className="h6">{'Rs. '+data.totalPrice}</td>
    </tr>
  </tbody>
</table>)})
}
    </div> );
}

export default Orders;