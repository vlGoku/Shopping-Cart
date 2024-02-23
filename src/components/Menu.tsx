import { Outlet, Link, NavLink } from "react-router-dom";
import Footer from "./Footer";

export default function Menu() {
  return (
    <>
      <header>
        <div className="header-container">
          <NavLink id="linkStyle" to={`/`}>
            <div className="shop-name">Mein Shop</div>
          </NavLink>
          <nav className="header-menu">
            <ul>
              <Link id="linkStyle" to={`/`}>
                Home
              </Link>
              <Link id="linkStyle" to={`/shop`}>
                Shop
              </Link>
              <Link id="linkStyle" to={`/cart`}>
                Cart
              </Link>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
      <Footer />
    </>
  );
}
