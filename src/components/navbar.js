import { Link } from "react-router-dom"

export const Navbar = () => {
    return ( 
        <div className="navbar">
            <Link to='/'> Home </Link>
            <Link to='/create-order'> Create Order </Link>
            <Link to='/saved-orders'> Saved Orders </Link>
            <Link to='/auth'> Login/Register </Link>
        </div>
    );
};