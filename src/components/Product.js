import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getone, removeone,addtocart, addtowishlist } from "../action/Action";
import {toast} from 'react-toastify';
function Product() {
  let param = useParams();
  let cartData = useSelector((state) => state.cart.cart);
  let wishlistData = useSelector((state) => state.wishlists.wishlist);
  let dispatch = useDispatch();

  useEffect(() => {
    axios.get("https://react-e-kart.herokuapp.com/products/" + param.id).then((res) => {
      dispatch(getone(res.data));
    });
    return () => {
      dispatch(removeone());
    };
    
  }, [dispatch,param.id]);
  let product = useSelector((state) => {
    return state.one;
  });
  
  let finalprice=product?.price -(
    0.01 *
    parseInt(product.deals?.deal_discount) *
    product?.price
  ).toFixed()
  return (
    <>
      <div className="main-wrapper">
        <div className="container">
          {Object.keys(product).length === 0 ? (
            <p>Loading</p>
          ) : (
            <div className="product-div">
              <div className="product-div-left">
                <div className="img-container">
                  <img
                    style={{ height: "20rem", width: "20rem" }}
                    src={product.image_url}
                    alt="watch"
                  />
                </div>
              </div>
              <div className="product-div-right">
                <span className="product-name">{product.name} <button 
                onClick={()=> {
                  if(wishlistData.find((elem)=>elem.id===product.id)===undefined){ 
                  dispatch(addtowishlist(product))
                  }
                  else{toast.warning('Item added to wishlist already')}
                  }}
                className="ml-3 btn btn-outline-danger"><i className="fa fa-heart"></i></button></span>
                
                <span className="product-price">
                  {"MRP : "}
                  <s>{product.price}</s>
                </span>
                <span className="product-price">
                  Price :{" "}
                  {product.deals?.deal_discount
                    ? finalprice
                    : product.price}
                </span>
                <span className="product-price">
                  Discount :{" "}
                  {product.deals?.deal_discount
                    ? product.deals?.deal_discount
                    : 0}
                </span>
                <span className="product-price">
                  {"Category : " + product.category}
                </span>
                <span className="product-price">
                  {"Description : " + product.description}
                </span>
                <div className="product-price">
                  <span>
                    Ratings :{product.avg_rating ? product.avg_rating : 0}/5
                  </span>
                </div>
                <div className="btn-groups">
                  <button type="button" onClick={()=> {
                    if(cartData.find((elem)=>elem.id===product.id)===undefined){ 
                    product={...product,finalprice:finalprice};
                    dispatch(addtocart(product))
                    }
                    else{toast.warning('Item added to cart already')}
                    }} className="add-cart-btn">
                    <i className="fas fa-shopping-cart"></i>add to cart
                  </button>
                  <button type="button" className="buy-now-btn">
                    <i className="fas fa-wallet"></i>buy now
                  </button>
                </div>
              </div>
              <center>
                <b>Feedback:</b>
                {product.feedback?.length ? (
                  product.feedback?.map((elem, index) => {
                    return (
                      <div
                        key={index}
                        className="card text-white bg-secondary mb-3"
                        style={{ maxWidth: "18rem" }}
                      >
                        <div className="card-body">
                          <p className="card-text">
                            {product.feedback[index].comment}
                          </p>
                        </div>

                        <div className="card-header">
                          Rating : {product.feedback[index].rating}/5
                        </div>
                        <div className="card-header">
                          By {product.feedback[index].user_name} <br />
                          {product.feedback[index].added_date}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h6>No Feedback Till Now</h6>
                )}
              </center>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Product;
