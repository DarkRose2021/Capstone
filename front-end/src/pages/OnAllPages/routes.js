import Home from "../MainPages/Home";
import About from "../MainPages/About";
import Contact from "../MainPages/Contact";
import Services from "../MainPages/Services";
import Team from "../MainPages/Team";
import Login from "../MainPages/Login";
import Signin from "../MainPages/Signin";
import Checkout from "../CheckoutProcess/Checkout";
import Products from "../CheckoutProcess/Products";
import ClientPics from "../Client/ClientPics";
import Admin from "../Admin/Admin";
import Cart from "../CheckoutProcess/Cart";
import ClientStories from "../MainPages/ClientStories";
import Confirm from "../CheckoutProcess/Confirm";
import EditRoles from "../Admin/EditRoles";
import NotFound from "../ErrorPages/NotFound";
import EditImages from "../Admin/EditImages";
import ShowClientPics from "../Admin/ShowClientPics";
import BookingForm from "../MainPages/BookingForm";
import BookingInfo from "../Admin/BookingInfo";
import ReviewOrder from "../CheckoutProcess/ReviewOrder";

const routes = [
	{ path: "/", element: <Home /> },
	{ path: "/about", element: <About /> },
    {path:"/services", element:<Services />},
    {path:"/contact", element: <Contact />},
    {path: "/team", element: <Team />},
    {path: "/login", element: <Login />},
    {path: "/signup", element: <Signin />},
    {path: "/admin", element: <Login />},
    {path: "/checkout", element: <Checkout />},
    {path: "/products", element: <Products />},
    {path: "/client-pictures", element: <ClientPics />},
    {path: "/adminHome", element: <Admin />},
    {path: "/cart", element: <Cart />},
    {path: "/clientStories", element: <ClientStories />},
    {path: "/confirm", element: <Confirm />},
    {path: "/editRoles", element: <EditRoles />},
    {path: "/editImages", element: <EditImages />},
    {path: "/ShowImages", element: <ShowClientPics />},
    {path: "/BookingForm", element: <BookingForm />},
    {path: "/BookingInfo", element: <BookingInfo />},
    {path: "/ReviewOrder", element: <ReviewOrder />},
    {path: "*", element: <NotFound />},
];

export default routes;