import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink,Link, useNavigate } from "react-router-dom";
import { loggedin } from "../action/Action";
import "../index.css";
function Navbar() {
  let Cart_count = useSelector((state) => state.cart.cart.length);
  let WishList_count = useSelector((state) => state.wishlists.wishlist.length);
  let isloggedin = useSelector((state) => state.login.login);
  let navigate=useNavigate()
  let dispatch = useDispatch();
  const [searchData, setsearchData] = useState('');
  const handleSearch = (e) =>{
    e.preventDefault()
    console.log('aala')
      // let regExpression= new RegExp(searchData,'i');
      navigate('/search-product',{state:searchData})
  }
  //let isloggedin=true
  //let [res,setres]=useState('false');
  // useEffect(() => {
  //   setres(localStorage.getItem("login"));
  // });
  return (
    <>
      {
      isloggedin ? (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <NavLink className="navbar-brand" href="#">
            <img src="/images/logo.png" style={{width:'50%'}} alt=''/>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav mr-auto">
              <NavLink
                style={({isActive})=>({color: isActive ? 'skyblue' : 'white',textDecoration:'none'})}
                to="/home"
              >
                Home
              </NavLink>
              <NavLink
                className="ml-3"
                style={({isActive})=>({color: isActive ? 'skyblue' : 'white',textDecoration:'none'})}
                to="/cart"
              >
                Cart <span className="badge badge-warning text-white">{Cart_count}</span>
              </NavLink>
              <NavLink
                className="ml-3"
                style={({isActive})=>({color: isActive ? 'skyblue' : 'white',textDecoration:'none'})}
                to="/wishlist"
              >
                Wishlist <span className="badge badge-danger text-white">{WishList_count}</span>
              </NavLink>
              
            </div>

            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchData}
                onChange={(e)=> {
                  setsearchData(e.target.value)
                }}
              />
              <button
                className="btn btn-warning my-2 my-sm-0 text-white"
                type="submit"
                onClick={handleSearch}
              >
                Search
              </button>
            </form>
            <li className="nav-item dropdown d-flex">
        <div className="nav-link dropdown-toggle text-light" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="far fa-user-circle fa-lg" ></i>
        </div>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to='/profile'> My Profile</Link>
          <Link className="dropdown-item" to='/orders'>My Orders</Link>
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to='/home' onClick={() => {dispatch(loggedin(false)); localStorage.setItem('login','false')}}>Log out</Link>
        </div>
      </li>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <NavLink className="navbar-brand" href="#">
          <img src="/images/logo.png" style={{width:'40%'}} alt='..'/>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav mr-auto float-left">
              <NavLink
                className="ml-3"
                style={({isActive})=>({color: isActive ? 'skyblue' : 'white',textDecoration:'none'})}
                to="/home"
              >
                Home
              </NavLink>
              <NavLink
                className="ml-3"
                style={({isActive})=>({color: isActive ? 'skyblue' : 'white',textDecoration:'none'})}
                to="/cart"
              >
                Cart <span className="badge badge-warning text-white">{Cart_count}</span>
              </NavLink>
              <NavLink
                className="ml-3"
                style={({isActive})=>({color: isActive ? 'skyblue' : 'white',textDecoration:'none'})}
                to="/wishlist"
              >
                Wishlist <span className="badge badge-danger text-white">{WishList_count}</span>
              </NavLink>
              <NavLink
                className="ml-3"
                style={({isActive})=>({color: isActive ? 'skyblue' : 'white',textDecoration:'none'})}
                to="/login"
              >
                Login
              </NavLink>
            </div>

            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchData}
                onChange={(e)=> setsearchData(e.target.value)}
              />
              <button
                className="btn btn-warning my-2 my-sm-0 text-white"
                type="submit"
                onClick={handleSearch}
              >
                Search
              </button>
            </form>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
