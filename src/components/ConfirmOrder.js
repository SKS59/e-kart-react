import { useLocation } from 'react-router-dom';
import './confirmorder.css'
function ConfirmOrder() {
    let location=useLocation();
    return ( <>
    <div className="text-center" style={{width:'50%',border:'2px solid black',margin:'auto',padding:'5%',marginTop:'6%',borderRadius:'15px'}}>
    <div className="wrapper"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
</svg>
</div>
        <div className="h4">Order ID : {location.state}</div>
        <div className="h6 text-success">Your order has been placed successfully</div>
        </div></> );
}

export default ConfirmOrder;