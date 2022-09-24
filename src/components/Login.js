import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'
import { useDispatch } from 'react-redux';
import { loggedin } from '../action/Action';
function Login() {
    const [email,setemail]=useState('');
    const [password, setpassword] = useState('');
    let navigate=useNavigate();
    let dispatch=useDispatch();
    const handlesubmit = () => {
        axios.get(`https://react-e-kart.herokuapp.com/users?email=${email}&password=${password}`)
        .then((res)=>{
            if(res.data.length === 1){
                dispatch(loggedin(res.data))
                localStorage.setItem('login','true')
                navigate('/home')
            }else{
                toast.error('Invalid credentials')
            }
        })
    }
    return ( <>
    <section className="gradient-custom">
  <div className="container py-5">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-dark text-white" style={{borderRadius: '1rem'}}>
          <div className="card-body p-5 text-center" style={{height: '31.3rem'}}>

            <div className="mb-md-1 mt-md-2 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white mb-5">Please enter your login and password!</p>

              <div className="form-outline form-white mb-2">
                <input placeholder='Email id' value={email} onChange={(e)=>setemail(e.target.value)} type="email" id="typeEmailX" className="form-control form-control-lg" />
              </div>
              

              <div className="form-outline form-white mb-2">
                <input placeholder='password' value={password} onChange={(e)=>setpassword(e.target.value)} type="password" id="typePasswordX" className="form-control form-control-lg" />
              </div>

              <p className=""><a className="text-white" href="#!">Forgot password?</a></p>

              <button onClick={handlesubmit} className="btn btn-outline-warning btn-lg px-5" type="submit">Login</button>

            </div>

            <div>
              <p className="mb-0">Don't have an account? <button onClick={()=>navigate('/signup')} className="btn btn-outline-success">Sign Up</button>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </> );
}

export default Login;