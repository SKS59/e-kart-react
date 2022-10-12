import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../index.css";
import { useSelector } from "react-redux";
export default function Profile() {
  let sdata = useSelector((state) => state.login.login);
  const [toggle, settoggle] = useState(1);
  const [addAddress, setaddAddress] = useState("");
  const [addcard, setaddcard] = useState({ number: "", expiry: "", cvv: "" });
  const [data, setdata] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    address: "",
    gender: "",
    card: { number: "", cvv: "", expiry: "" },
  });
  const [err, seterr] = useState({
    emailerr: "",
    passworderr: "",
    firstnameerr: "",
    lastnameerr: "",
    addresserr: "",
    gendererr: "",
    cardnumbererr: "",
    expiryerr: "",
    cvverr: "",
  });
  const handleSubmit = () => {
    axios
      .put("https://reactecart.herokuapp.com/users/" + sdata[0].id, {
        email: data.email,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
        cart: [],
        address: data.address,
        wishlist: [],
        card: data.card,
        orders: [],
      })
      .then((res) => {
        toast.success("Updated user successfully");
      });
  };
  useEffect(() => {
    // axios.get('http://localhost:4000/users/'+id).then((res)=> setdata(res.data))
    setdata(sdata[0]);
  }, [sdata]);
  return (
    <>
      <section style={{ height: "100%" }} className="vh-100">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <nav className="d-flex justify-content-around text-center mb-3 bg-secondary text-white">
                <li
                  onClick={() => settoggle(1)}
                  className={
                    toggle === 1
                      ? "d-inline-block border rounded border-warning w-100 p-2 text-warning"
                      : "d-inline-block border rounded border-light w-100 p-2"
                  }
                >
                  My Profile
                </li>
                <li
                  onClick={() => settoggle(2)}
                  className={
                    toggle === 2
                      ? "d-inline-block border rounded border-warning w-100 p-2 text-warning"
                      : "d-inline-block border rounded border-light w-100 p-2"
                  }
                >
                  Address
                </li>
                <li
                  onClick={() => settoggle(3)}
                  className={
                    toggle === 3
                      ? "d-inline-block border rounded border-warning w-100 p-2 text-warning"
                      : "d-inline-block border rounded border-light w-100 p-2"
                  }
                >
                  Card
                </li>
              </nav>

              {toggle === 1 ? (
                <div
                  className="card bg-dark text-white"
                  style={{ height: "100%", borderRadius: "1rem" }}
                >
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-1 mt-md-1 pb-2">
                      <h2 className="fw-bold mb-2 text-uppercase">
                        My Profile
                      </h2>
                      <p className="text-white-50 pb-2">Your Data</p>
                      <div className="form-outline form-white pt-2 pb-2">
                        Gender : {data?.gender}
                        <div />
                      </div>
                      <div className="form-outline form-white">
                        <input
                          placeholder={data?.email}
                          value={data?.email}
                          onChange={(e) => {
                            setdata({ ...data, email: e.target.value });
                            if (!/\S+@\S+\.\S+/.test(e.target.value)) {
                              seterr({ ...err, emailerr: "Invalid email id" });
                            } else {
                              seterr({ ...err, emailerr: "" });
                            }
                          }}
                          type="email"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                        />
                      </div>
                      <small className="d-block float-left pt-2 text-danger">
                        {err.emailerr}
                      </small>

                      <div className="form-outline form-white pt-1">
                        <input
                          placeholder={data?.password}
                          value={data?.password}
                          onChange={(e) => {
                            setdata({ ...data, password: e.target.value });
                            if (
                              6 > e.target.value.length ||
                              e.target.value.length > 12
                            ) {
                              seterr({
                                ...err,
                                passworderr:
                                  "Password length should be 6 to 12",
                              });
                            } else {
                              seterr({ ...err, passworderr: "" });
                            }
                          }}
                          type="text"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                        />
                      </div>
                      <small className="d-block float-left pt-2 text-danger">
                        {err.passworderr}
                      </small>
                      <div className="form-outline form-white pt-1">
                        <input
                          placeholder="First Name"
                          value={data?.firstname}
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
                          id="typeEmailX"
                          className="form-control form-control-lg"
                        />
                      </div>
                      <small className="d-block float-left pt-2 text-danger">
                        {err.firstnameerr}
                      </small>
                      <div className="form-outline form-white pt-1">
                        <input
                          placeholder="Last Name"
                          value={data?.lastname}
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
                          id="typeEmailX"
                          className="form-control form-control-lg"
                        />
                      </div>
                      <small className="d-block float-left pt-2 text-danger">
                        {err.lastnameerr}
                      </small>

                      <br />
                      <br />
                    </div>
                    {/* {JSON.stringify(data)}={JSON.stringify(err)} */}
                  </div>
                </div>
              ) : null}

              {toggle === 2 ? (
                <div style={{ width: "100%", height: "100%" }}>
                  <div
                    style={{
                      background: "#333",
                      color: "white",
                    }}
                  >
                    <p className="text-center p-3 h5">Address Details</p>
                    <ul>
                      {Array.isArray(data.address)
                        ? data.address?.map((elem, index) => (
                            <div key={index} className="d-flex justify-content-center pb-4">
                              <div
                                className="border text-left p-2 mb-2"
                                style={{ width: "80%" }}
                                key={index}
                              >
                                {index + 1 + ". " + elem}
                              </div>
                            </div>
                          ))
                        : null}
                    </ul>

                    
                    
                  </div>
                  <div className="form-outline form-white mt-4">
                      <textarea
                        placeholder="Add New Address"
                        value={addAddress}
                        onChange={(e) => {
                          setaddAddress(e.target.value);
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
                      <br></br>
                      <small className="d-block float-left pt-2 text-danger">
                        {err.addresserr}
                      </small>
                      <br />
                      
                    </div>
                  <div className="d-flex justify-content-center mt-3">
                  <button
                        onClick={() => {
                          setdata({
                            ...data,
                            address: [...data.address, addAddress],
                          });
                          setaddAddress("");
                        }}
                        className="btn btn-info btn-lg px-5 d-flex justify-content-center mt-1"
                      >
                        Add
                      </button></div>
                </div>
                
              ) : null}

              {toggle === 3 ? (
                <>
                  <div
                    className="pb-3"
                    style={{
                      height: "auto",
                      background: "#333",
                      color: "white",
                      boxSizing: "border-box",
                    }}
                  >
                    <p className="text-center h5 p-3">Card Details</p>
                    <div className="text-center">
                      {Array.isArray(data.card)
                        ? data.card.map((elem, index) => {
                            return (
                              <div key={index} className="d-flex justify-content-center pb-4 pl-5 pr-5">
                              <div
                                key={index}
                                className="border text-left mb-3 col p-2"
                                style={{ width: "20%",boxSizing:'border-box' }}
                              >
                                <div>{"Card Number : " + elem.number}</div>
                                <div>{"Expiry (MM-YYYY) : " + elem.expiry}</div>
                                <div>{"CVV : " + elem.cvv}</div>
                              </div>
                              
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </div>
                  <div className="form-outline form-white pt-1">
                    <input
                      placeholder="Card Number"
                      value={addcard.number}
                      onChange={(e) => {
                        setaddcard({ ...addcard, number: e.target.value });
                        if (e.target.value.length !== 16) {
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
                      value={addcard.expiry}
                      onChange={(e) => {
                        setaddcard({ ...addcard, expiry: e.target.value });
                        let today = new Date();
                        let tempdate = new Date();
                        let [month, year] = e.target.value.split("-");
                        if (
                          today.getTime() > tempdate.setFullYear(year, month)
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
                      value={addcard.cvv}
                      onChange={(e) => {
                        setaddcard({ ...addcard, cvv: e.target.value });
                        if (e.target.value.length !== 3) {
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
                  <div className="d-flex justify-content-center">
                    <button
                      
                      onClick={() => {data.card.push(addcard); setdata({ ...data, card: data.card }); setaddcard({number:'',expiry:'',cvv:''})}}
                      className="btn btn-info btn-lg px-5 d-flex justify-content-center mt-4"
                      type="submit"
                    >
                      Add
                    </button>
                  </div>
                </>
              ) : null}
              <div className="d-flex justify-content-center">
                <button
                  onClick={handleSubmit}
                  className="btn btn-success btn-lg px-5 d-flex justify-content-center mt-4"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
