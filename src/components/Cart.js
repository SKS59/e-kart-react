import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { emptycart, removefromcart } from "../action/Action";
import "../index.css";
import axios from "axios";
function Cart() {
  let cartData = useSelector((state) => state.cart.cart);
  const [subtotal, setsubtotal] = useState(cartData.map((elem) => elem.price));
  const [quantity, setquantity] = useState(cartData.map((elem) => 1));
  const [toggle, settoggle] = useState(false);
  const [payment, setpayment] = useState({cvv:'',pin:''});
  const [radioip, setradioip] = useState({'address':'','card':''})
  let temp,deltemp;
  let address=useSelector((state)=>state.login.login[0]?.address)
  let card=useSelector((state)=>state.login.login[0]?.card)
  let dispatch = useDispatch();
  let navigate=useNavigate();
  let id=useSelector((state)=>state.login.login[0]?.id)
  const handleorder = (payment_details) =>{
    let selectedcard=card.filter((data)=> data.number===radioip.card)  
    if(selectedcard[0].cvv ===payment_details.cvv && parseInt(payment_details.pin)===1234){
      axios.post('https://react-e-kart.herokuapp.com/orderdata',{userid:id,date:new Date().toDateString(),products:cartData,quantity:quantity,card:radioip.card,address:radioip?.address,totalPrice:String(subtotal.reduce((prev, curr) => prev + curr, 0))})
      .then((res)=> {
        dispatch(emptycart());
        navigate('/confirm-order',{state:res.data.id});
    })  
    }
  }
  
  return (
    <>
      <div className="container">
        <table id="cart" className="table table-hover table-condensed">
          <thead>
            <tr>
              <th style={{ width: "50%" }}>Product</th>
              <th style={{ width: "10%" }}>Price</th>
              <th style={{ width: "8%" }}>Quantity</th>
              <th style={{ width: "22%" }} className="text-center">
                Subtotal
              </th>
              <th style={{ width: "22%" }} className="text-center">
                Action
              </th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody>
            {cartData.length ? (
              cartData.map((data, index) => {
                return (
                  <tr key={index}>
                    <td data-th="Product">
                      <div className="row">
                        <div className="col-sm-2 hidden-xs">
                          <img
                            src={data.image_url}
                            alt="..."
                            className="img-responsive"
                            style={{ height: "5rem", width: "5rem" }}
                          />
                        </div>
                        <div className="col-sm-10">
                          <h4 className="pl-md-5">{data.name}</h4>
                          <div className="pl-md-5">
                            MRP : {data.price}
                            <br />
                            Discount :{" "}
                            {data.deals?.deal_discount
                              ? data.deals.deal_discount + "%"
                              : "0%"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td data-th="Price">
                      {data.finalprice ? data.finalprice : data.price}
                    </td>
                    <td data-th="Quantity">
                      <input
                        type="number"
                        className="form-control text-center d-inline"
                        value={quantity[index]}
                        max={5}
                        min={1}
                        onChange={(e) => {
                          temp = [...quantity];
                          temp[index] = e.target.value;
                          setquantity(temp);
                          temp = [...subtotal];
                          temp[index] = data.finalprice ? data.finalprice * e.target.value :data.price * e.target.value;
                          setsubtotal(temp);
                        }}
                      />
                    </td>
                    <td data-th="Subtotal" className="text-center">
                      <p>{subtotal[index]}</p>
                    </td>
                    <td className="actions" data-th="">
                      <button
                        onClick={() => {dispatch(removefromcart(data)); 
                          deltemp=[...subtotal];
                          deltemp.splice(index,1)
                          setsubtotal(deltemp)
                        }}
                        className="btn btn-outline-danger ml-4"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p>NO data</p>
            )}
          </tbody>
          <tfoot>
            <tr className="visible-xs">
              <td></td>
              <td></td>
              <td></td>
              <td className="hidden-xs text-center">
                <strong><div className="leftbutton pt-3 text-muted">Delivery is free.</div></strong>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/home" className="btn btn-warning">
                  <i className="fa fa-angle-left"></i> Continue Shopping
                </Link>
              </td>
              <td colSpan="2" className="hidden-xs"></td>
              <td className="hidden-xs text-center">
                <b>Total</b>
                <br />
                <strong>
                  {String(subtotal.reduce((prev, curr) => prev + curr, 0))}
                </strong>
              </td>
              <td>
                <button
                  onClick={() =>{id ? settoggle(!toggle) : toast.warning('You need to login for checkout',{position: toast.POSITION.BOTTOM_CENTER})}}
                  className={toggle ? "btn btn-danger btn-block" : 'btn btn-success btn-block'}
                >
                  {toggle ? "Cancel" : "Checkout"}{" "}
                  <i className="fa fa-angle-right"></i>
                </button>
              </td>
            </tr>
          </tfoot>
        </table>

        {toggle ? (<>
          <div className="container" style={{boxSizing:'border-box'}}>
            <div className="left">
              <p className="text-center h5 mb-3">Select Address</p>
              <div className="middle">
              {Array.isArray(address) ? address.map((data,index)=>{
                return (
                <div key={index} className="ml-3">
                <div
                style={{ width: "25rem" }}
              >
                  <input style={{width:'auto'}} onChange={(e)=>{setradioip({...radioip,address:e.target.value}); }} className='ml-5' type='radio' name="Address" value={data}/>
                  <p className="d-inline card-text pl-3">
                    {data}
                  </p>
                </div>
              </div>
              )
              }) : null}
              </div>
              </div>
            <div className="right">
              <p className="text-center h5 mb-4">Select Card</p>
              <div className="middle">
            {card.map((data,index)=>{
                return (
                <div key={index} className="ml-3">
                <div
                style={{ width: "25rem" }}
              >
                <div>
                  <input style={{width:'auto'}} onChange={(e)=>{setradioip({...radioip,card:e.target.value}); console.log(data.number)}} className="ml-5" type='radio' name="card" value={data.number}/>
                  <p className="d-inline card-text pl-3">
                    {'Card Number : '+data.number}  
                  </p>
                </div>
              </div>
              </div>
              )
              })}
              </div>
              </div>
            </div>
            
          <div className="leftbutton pt-3"><button type="button" data-toggle="modal" data-target="#exampleModal" disabled={radioip.card==='' || radioip.address===''} className="btn btn-success mb-5">Place Order</button></div>
          
          
          </>  
        ) : null}

{/* 
<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button> */}

<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Payment</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body text-center">
        <label>Card Number : </label>{radioip.card}
        <div><label>CVV : </label><input value={payment.cvv} onChange={(e)=> setpayment({...payment,cvv:e.target.value})} className='form-control-inline ml-3' type='password' placeholder="cvv"/></div>
        <div><label>Pin : </label><input value={payment.pin} onChange={(e)=> setpayment({...payment,pin:e.target.value})} className='form-control-inline ml-3' type='password' placeholder="pin"/></div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" data-dismiss="modal" onClick={()=>handleorder(payment)} className="btn btn-primary">OK</button>
      </div>
    </div>
  </div>
</div>


      </div>
      
    </>
  );
}

export default Cart;
