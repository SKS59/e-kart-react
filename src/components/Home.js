import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getall } from "../action/Action";
import { useNavigate } from "react-router-dom";
import './home.css'
import "../index.css";
import "./wishlist.css"
function Home() {
  let product = useSelector((state) => state.all);
  let deals=useSelector((state)=> state.all.products)
  let dealsProduct=deals.filter((data)=> data.isDeal==='true')
  let dispatch = useDispatch();
  let navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get("https://reactecart.herokuapp.com/products/")
      .then((res) => dispatch(getall(res.data)));
  }, [dispatch]);
  return (
    <>
      <div className="container">
        <h4
          className="mt-4 ml-2 text-center pb-3 pt-3"
          style={{
            backgroundColor: "",
            color: "purple",
            border: "2px solid purple",
            width: "100%",
          }}
        >
          Todays deals
        </h4>
        {/* <div className="row mt-4"> */}

        {/* {product.products?.map((data) => {
          if(data.isDeal==='true'){
            return (
              <div key={data.name} className="col ml-3 mt-1">
                
                <div onClick={()=>{navigate('/product/'+data.id)}} className="card text-center ext" style={{ width: "15rem" }}>
                <img 
                  className="pr-2"
                  src="/images/discount.png"
                  style={{height:'3rem',width:'3rem',zIndex:'2'}}
                  alt='...'
                  />
                  <img
                    className="card-img-top mx-auto d-inline"
                    src={data.image_url}
                    alt="Card cap"
                    style={{ height: "150px", width: "150px",zIndex:'1' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{data.name}</h5>
                    <p className="card-text">{data.description.length >40 ? data.description.substring(0,40)+'...' : data.description.substring(0,40)}</p> 
                  </div>
                </div>
                
              </div>
              
            );
            }else{
              <p>No special deals today</p>
            }
          })} */}

        {/* </div> */}

        <div id="ImageCarouselCSS" className="carousel slide ml-lg-3" data-ride="carousel">
          <ol className="carousel-indicators">
            {/* <li
              data-target="#ImageCarouselCSS"
              data-slide-to="0"
              className="active"
            ></li>

            <li data-target="#ImageCarouselCSS" data-slide-to="1"></li>

            <li data-target="#ImageCarouselCSS" data-slide-to="2"></li> */}
            {
              dealsProduct.map((data,index)=>{
                return <li key={index} data-target="#ImageCarouselCSS" data-slide-to={index.toString()}></li>
              })
            }  
          </ol>

          <div className="carousel-inner">
            {
              dealsProduct.map((data,index)=>{
                return (
                  <div key={index} className={index ? "carousel-item" :"carousel-item active"}>
              {/* <img src="https://source.unsplash.com/fk4tiMlDFF0/900x600/" className="d-block w-50 h-40" alt="tiniest puppy"/> */}
              <div
              onClick={()=>{navigate('/product/'+data.id)}}
                className="container d-flex justify-content-around outerCarousel row">
                <img src={data.image_url} className="imgCarousel col-3" alt=''></img>
                <div className="nameCarousel text-white col-7">
                  {data.name}
                  <div className="priceCarousel">At only Rs. {data.deals.deal_discount ? data.price-(data.price*parseInt(data.deals.deal_discount)/100) : data.price}</div>
                  <div className="discountCarousel">
                    {data.deals.deal_discount}% off
                  </div>
                </div>
                <div className="col-2 pl-lg-5 special"><img src="https://www.transparentpng.com/thumb/special-offer/special-offer-tag-png-pictures-4.png" alt=''></img></div>
              </div>
            </div>
                )
              })
              
            }
            
          </div>
        </div>

        <h4
          className="mt-4 ml-2 text-center pb-3 pt-3"
          style={{ color: "purple", border: "2px solid purple", width: "100%" }}
        >
          All products
        </h4>

        <h4
          className="mt-4 ml-2 text-center pb-3 pt-3"
          style={{ color: "purple" }}
        >
          Laptops
        </h4>
        <div className="row mt-4">
          <br />
          <br />
          {product.products?.map((data) => {
              return (
                data.category === "laptop" ? 
                <div key={data.name} className="d-flex justify-content-center">
                <div className="column">
                  <div
                    onClick={() => {
                      navigate("/product/" + data.id);
                    }}
                    className="card text-center ext"
                    style={{ width: "15rem" }}
                  >
                    <img
                      className="card-img-top mx-auto"
                      src={data.image_url}
                      alt="Card cap"
                      style={{ height: "150px", width: "150px" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{data.name}</h5>
                      <p className="card-text exttext">
                        {data.description}
                        {/* .length > 40
                          ? data.description.substring(0, 40) + "..."
                          : data.description.substring(0, 40)} */}
                      </p>
                    </div>
                  </div>
                </div>
                </div> : null
              );
          })}
        </div>
        <br />
        <h4
          className="mt-4 ml-2 text-center pb-3 pt-3"
          style={{ color: "purple" }}
        >
          Phones
        </h4>
        <br />
        <div className="row mt-4">
          {product.products?.map((data,index) => {
            
              return (
               data.category === "phone" ?
                <div key={data.name} className="d-flex justify-content-center">
                <div className="column">
                  <div
                    onClick={() => {
                      navigate("/product/" + data.id);
                    }}
                    className="card text-center ext"
                    style={{ width: "15rem" }}
                  >
                    <img
                      className="card-img-top mx-auto"
                      src={data.image_url}
                      alt="Card cap"
                      style={{ height: "150px", width: "150px" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{data.name}</h5>
                      <p className="card-text">
                        {data.description.length > 40
                          ? data.description.substring(0, 40) + "..."
                          : data.description.substring(0, 40)}
                      </p>
                    </div>
                  </div>
                </div>
                </div> : null
              );
          })}
        </div>
        <br />
        <h4
          className="mt-4 ml-2 text-center pb-3 pt-3"
          style={{ color: "purple" }}
        >
          Shirts
        </h4>
        <br />
        <div className="row mt-4">
          {product.products?.map((data) => {
            
              return (
                data.category === "shirt" ?    
                <div key={data.name} className="d-flex justify-content-center">
                <div className="column">
                  <div
                    onClick={() => {
                      navigate("/product/" + data.id);
                    }}
                    className="card text-center ext"
                    style={{ width: "15rem" }}
                  >
                    <img
                      className="card-img-top mx-auto"
                      src={data.image_url}
                      alt="Card cap"
                      style={{ height: "150px", width: "150px" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{data.name}</h5>
                      <p className="card-text ext">
                        {data.description
                        .length > 23
                          ? data.description.substring(0, 19) + "..."
                          : data.description.substring(0, 23)}
                      </p>
                    </div>
                  </div>
                </div>
                </div> : null
              );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
