import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  const [data, setdata] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    address:'',
    gender:'',
    card:{'number':'','cvv':'','expiry':''}
  });
  const [err, seterr] = useState({
    emailerr: "",
    passworderr: "",
    firstnameerr: "",
    lastnameerr: "",
    addresserr:'',
    gendererr:'',
    cardnumbererr:'',
    expiryerr:'',
    cvverr:''
  });
  let navigate = useNavigate();
  const handleSubmit = () => {
    if(data.email==='' || data.password==='' || data.firstname==='' || data.lastname===''
    || data.gender==='' || data.card==='' || data.address===''
    ){
      toast.error('Fill all details')
    }
    else{
    axios
      .post("https://react-e-kart.herokuapp.com/users", {
        email: data.email,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
        gender:data.gender,
        cart: [],
        address: [data.address],
        wishlist: [],
        card: [data.card],
        orders: [],
      })
      .then((res) => {
        toast.success("Added user successfully");
        navigate("/login");
      });
    }
    // }
  };
  return (
    <>
    
      <section className="vh-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ width:'100%',height: "auto", borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-1 mt-md-1 pb-2">
                    <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                    <p className="text-white-50 pb-2">Please Enter Your Data</p>

                    <div className="form-outline form-white">
                      <input
                        placeholder="Email id"
                        value={data.email}
                        onChange={(e) => {
                          setdata({ ...data, email: e.target.value });
                          if (!/\S+@\S+\.\S+/.test(e.target.value)) {
                            seterr({ ...err, emailerr: "Invalid email id" });
                          } else {
                            seterr({ ...err, emailerr: "" });
                          }
                        }}
                        type="email"
                        
                        className="form-control form-control-lg"
                      />
                    </div>
                    <small className="d-block float-left pt-2 text-danger">
                      {err.emailerr}
                    </small>

                    <div className="form-outline form-white pt-1">
                      <input
                        placeholder="password"
                        value={data.password}
                        onChange={(e) => {
                          setdata({ ...data, password: e.target.value });
                          if (
                            6 > e.target.value.length ||
                            e.target.value.length > 12
                          ) {
                            seterr({
                              ...err,
                              passworderr: "Password length should be 6 to 12",
                            });
                          } else {
                            seterr({ ...err, passworderr: "" });
                          }
                        }}
                        type="password"
                        
                        className="form-control form-control-lg"
                      />
                    </div>
                    <small className="d-block float-left pt-2 text-danger">
                      {err.passworderr}
                    </small>
                    <div className="form-outline form-white pt-1">
                      <input
                        placeholder="First Name"
                        value={data.firstname}
                        onChange={(e) => {
                          setdata({ ...data, firstname: e.target.value });
                          if (
                            e.target.value.length > 20 ||
                            e.target.value.length < 3
                          ) {
                            seterr({
                              ...err,
                              firstnameerr:
                                "Firstname should be 3 to 20 of length",
                            });
                          } else {
                            seterr({ ...err, firstnameerr: "" });
                          }
                        }}
                        type="text"
                        
                        className="form-control form-control-lg"
                      />
                    </div>
                    <small className="d-block float-left pt-2 text-danger">
                      {err.firstnameerr}
                    </small>
                    <div className="form-outline form-white pt-1">
                      <input
                        placeholder="Last Name"
                        value={data.lastname}
                        onChange={(e) => {
                          setdata({ ...data, lastname: e.target.value });
                          if (
                            3 > e.target.value.length ||
                            e.target.value.length > 20
                          ) {
                            seterr({
                              ...err,
                              lastnameerr:
                                "Lastname should be 3 to 20 of length",
                            });
                          } else {
                            seterr({ ...err, lastnameerr: "" });
                          }
                        }}
                        type="text"
                        
                        className="form-control form-control-lg"
                      />
                    </div>
                    <small className="d-block float-left pt-2 text-danger">
                      {err.lastnameerr}
                    </small>
                  
                    <div className="form-outline form-white pt-1">
                      <textarea
                        placeholder="Address"
                        value={data.address}
                        onChange={(e) => {
                          setdata({ ...data, address: e.target.value });
                          if (
                            3 > e.target.value.length ||
                            e.target.value.length > 100
                          ) {
                            seterr({
                              ...err,
                              addresserr:
                                "Address should be 3 to 100 of length",
                            });
                          } else {
                            seterr({ ...err, addresserr: "" });
                          }
                        }}
                        type="text"
                        
                        className="form-control form-control-lg"
                      />
                    </div>
                    <small className="d-block float-left pt-2 text-danger">
                      {err.addresserr}
                    </small>
                    <div className="form-outline form-white pt-1">
                      <label className="d-flex float-left ml-3">Gender</label>
                      <input
                        value='M'
                        onChange={(e) => {
                          setdata({ ...data, gender: e.target.value });
                        }}
                        type="radio"
                      />
                      <label className="d-inline mr-3">Male</label>
                    
                      <input
                        value='F'
                        onChange={(e) => {
                          setdata({ ...data, gender: e.target.value });
                        }}
                        type="radio"
                      />
                      <label className="d-inline">Female</label>
                    </div>

                    <div className="form-outline form-white pt-1">
                      <input
                        placeholder="Card Number"
                        value={data.card.number}
                        onChange={(e) => {
                          setdata({ ...data, card: {...data.card,number:e.target.value }});
                          if (
                            e.target.value.length!==16
                          ) {
                            seterr({
                              ...err,
                              cardnumbererr: "Invalid Card Number",
                            });
                          } else {
                            seterr({ ...err, cardnumbererr: "" });
                          }
                        }}
                        type="text"
                        
                        className="form-control form-control-lg"
                      />
                    </div>
                    <small className="d-block float-left pt-2 text-danger">
                      {err.cardnumbererr}
                    </small>

                    <div className="form-outline form-white pt-1">
                      <input
                        placeholder="Expiry Date in MM-YYYY"
                        value={data.card.expiry}
                        onChange={(e) => {
                          setdata({ ...data, card: {...data.card,expiry:e.target.value }});
                          let today=new Date();
                          let tempdate=new Date();
                          let [month,year]=e.target.value.split('-')
                          if (
                            today.getTime() > tempdate.setFullYear(year,month)
                          ) {
                            seterr({
                              ...err,
                              expiryerr: "Expiry should be after today",
                            });
                          } else {
                            seterr({ ...err, expiryerr: "" });
                          }
                        }}
                        type="text"
                        
                        className="form-control form-control-lg"
                      />
                    </div>
                    <small className="d-block float-left pt-2 text-danger">
                      {err.expiryerr}
                    </small>


                    <div className="form-outline form-white pt-1">
                      <input
                        placeholder="CVV"
                        value={data.card.cvv}
                        onChange={(e) => {
                          setdata({ ...data, card: {...data.card,cvv:e.target.value }});
                          if (
                            e.target.value.length!==3
                          ) {
                            seterr({
                              ...err,
                              cvverr: "CVV should be of length 3",
                            });
                          } else {
                            seterr({ ...err, cvverr: "" });
                          }
                        }}
                        type="text"
                        
                        className="form-control form-control-lg"
                      />
                    </div>
                    <small className="d-block float-left pt-2 text-danger">
                      {err.cvverr}
                    </small>


                    <br />
                    <br />
                    <button
                      onClick={handleSubmit}
                      className="btn btn-outline-success btn-lg px-5"
                      type="submit"
                    >
                      Signup
                    </button>
                  </div>
                  {/* {JSON.stringify(data)}={JSON.stringify(err)} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Signup;
