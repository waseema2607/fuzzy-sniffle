import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
       
            <Link to="/">Home</Link>
             <br/>
            <Link to="/shipment">Shipment</Link>
            <br/>
            <Link to="/supplier">Supplier</Link>
          
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;