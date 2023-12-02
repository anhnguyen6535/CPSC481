import Details from "./pages/Details/Details";
import HomePage from "./pages/HomePage/HomePage";
import Welcome from "./pages/Welcome/Welcome";
import Cart from "./pages/Cart/Cart";
import Pay from "./pages/Payment/Pay";
import SplitBill from "./pages/Payment/SplitBill";

// add new routes here 
// routes will be mapped automatically in App.tsx
const routes = [
    {path: '/', component: Welcome, exact: true},
    {path: '/welcome', component: Welcome, exact: true},
    {path: '/home', component: HomePage, exact: true},
    {path: '/cart', component: Cart, exact: true},
    {path: '/pay', component: Pay, exact: true},
    {path: '/pay/split-bill', component: SplitBill},
    {path: '/details/:itemid', component: Details, exact: true},
]

export default routes;