import './navbar.css'
function Footer() {
    return ( <>
    <div className="pt-2" style={{position:'fixed',left:'0',bottom:'0',width:'100%',height:'3rem',textAlign:'center',background:"#333",color:'white'}}>
    <small style={{color:"white"}} className="copyright">Copyright ©️ reactekart.herokuapp.com</small>
            {/* <i className="fa fa-bullseye"></i>
            <i className="fa fa-google-plus"></i> */}
            <a href="#" class="fa fa-facebook"></a>
<a href="#" class="fa fa-twitter"></a>
            {/* <a href="#"><small style={{color:"grey"}} class="fa fa-lg fa-google-plus pull-right">  </small></a>
            <a href="#"><small style={{color:"grey"}} class="fa fa-lg fa-linkedin pull-right">  </small></a>
            <a href="#"><small style={{color:"grey"}} class="fa fa-lg fa-twitter pull-right">  </small></a>
            <a href="#"><small style={{color:"grey"}} class="fa fa-lg fa-facebook pull-right">  </small></a> */}
    </div></> );
}

export default Footer;