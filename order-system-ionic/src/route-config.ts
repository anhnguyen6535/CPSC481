import Details from "./pages/Details/Details";
import HomePage from "./pages/HomePage/HomePage";
import Welcome from "./pages/Welcome/Welcome";
import QR from "./pages/QRcode";
import Cart from "./pages/Cart/Cart";
import Pay from "./pages/Payment/Pay";
import OrderPlaced from "./pages/OrderPlaced/OrderPlaced";

// add new routes here 
// routes will be mapped automatically in App.tsx
const routes = [
    {path: '/', component: Welcome, exact: true},
    {path: '/welcome', component: Welcome, exact: true},
	  {path: '/scan', component: QR, exact: true},
    {path: '/home', component: HomePage, exact: true},
    {path: '/cart', component: Cart, exact: true},
    {path: '/pay', component: Pay, exact: true},
    {path: '/details/:itemid', component: Details, exact: true},
    {path: '/order-placed', component: OrderPlaced, exact: true},
]

export default routes;