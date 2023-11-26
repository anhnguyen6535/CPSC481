import Details from "./pages/Details/Details";
import HomePage from "./pages/HomePage/HomePage";
import Cart from "./pages/Cart/Cart";
import Pay from "./pages/Payment/Pay";
import Welcome from "./pages/Welcome";

// add new routes here 
// routes will be mapped automatically in App.tsx
const routes = [
    {path: '/', component: Welcome, exact: true},
    {path: '/welcome', component: Welcome, exact: true},
    {path: '/home', component: HomePage, exact: true},
    {path: '/order', component: Cart, exact: true},
    {path: '/pay', component: Pay, exact: true},
    {path: '/details', component: Details, exact: true},
]

export default routes;