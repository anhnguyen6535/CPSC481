import Details from "./pages/Details/Details";
import HomePage from "./pages/HomePage/HomePage";
import Order from "./pages/Order";
import Pay from "./pages/Pay";
import Welcome from "./pages/Welcome";

// add new routes here 
// routes will be mapped automatically in App.tsx
const routes = [
    {path: '/', component: Welcome, exact: true},
    {path: '/welcome', component: Welcome, exact: true},
    {path: '/home', component: HomePage, exact: true},
    {path: '/order', component: Order, exact: true},
    {path: '/pay', component: Pay, exact: true},
    {path: '/details/:itemid', component: Details, exact: true},
]

export default routes;