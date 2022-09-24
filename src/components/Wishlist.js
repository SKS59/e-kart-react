import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addtocart,removefromwishlist } from '../action/Action';
import './wishlist.css'
function Wishlist() {
    let wishlistData = useSelector((state) => state.wishlists.wishlist);
    let cartData = useSelector((state) => state.cart.cart);
    let navigate=useNavigate();
    let dispatch=useDispatch();
    // let product=useSelector((state)=>state.one)
    let finalprice;
    return ( <>
    {
        wishlistData.length ? 
        <div className="container row mt-4">
        { 
            wishlistData.map((data,index)=>{
                return (<>
                <div key={index} className="column">
          <div className="card hovering">
            <div onClick={()=>{navigate('/product/'+data.id)}} >
            <img src={data.image_url} className="image" alt='...'/>
            <p className='h6'>{data.name}</p>
            </div>
            <div className='d-flex justify-content-around'>
            <button onClick={()=> {
                    if(cartData.find((elem)=>elem.id===data.id)===undefined){
                    finalprice=data.price -(
                        0.01 *
                        parseInt(data.deals?.deal_discount) *
                        data?.price
                      ).toFixed() 
                    data={...data,finalprice:finalprice};
                    dispatch(addtocart(data))
                    }
                    else{toast.warning('Item added to cart already',{position:'bottom-center'})}
                    }} className='btn btn-warning' style={{width:'30%'}}><i className='fas fa-shopping-cart'></i></button>
            <button onClick={() => {dispatch(removefromwishlist(data))}} className='btn btn-danger' style={{width:'30%'}}><i className='fa fa-trash'></i></button>
            </div>
          </div>
        </div>
                </>)
            })}
        </div>
        
        
        
      
        
        
        :<center style={{paddingTop:'20%'}}>No records found in wishlist</center>
    }
    
    </> );
}

export default Wishlist;