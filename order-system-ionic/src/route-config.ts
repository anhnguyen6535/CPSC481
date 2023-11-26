<<<<<<< HEAD
import Details from "./pages/Details/Details";
=======
import Details from "./pages/Details";
>>>>>>> f630f90 (onclick and persisit reduc state)
import HomePage from "./pages/HomePage/HomePage";
import Order from "./pages/Order";
import Pay from "./pages/Pay";
import Welcome from "./pages/Welcome";

<<<<<<< HEAD
// add new routes here 
// routes will be mapped automatically in App.tsx
=======
>>>>>>> f630f90 (onclick and persisit reduc state)
const routes = [
    {path: '/', component: Welcome, exact: true},
    {path: '/welcome', component: Welcome, exact: true},
    {path: '/home', component: HomePage, exact: true},
    {path: '/order', component: Order, exact: true},
    {path: '/pay', component: Pay, exact: true},
    {path: '/details', component: Details, exact: true},
]

export default routes;