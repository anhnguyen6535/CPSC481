import Details from "./pages/Details/Details";
import HomePage from "./pages/HomePage/HomePage";
import Welcome from "./pages/Welcome/Welcome";
import Cart from "./pages/Cart/Cart";
import Pay from "./pages/Payment/Pay";
import SplitNames from "./pages/Payment/SplitNames/SplitNames";
import OrderPlaced from "./pages/OrderPlaced/OrderPlaced";
import Waiter from "./pages/Waiter/Waiter";
import SplitBill from "./pages/Payment/SplitFoodItems/SplitFoodItems";
import SplitBillBreakdown from "./pages/Payment/SplitBillBreakDown/SplitBillBreakdown";

// add new routes here 
// routes will be mapped automatically in App.tsx
const routes = [
    {path: '/', component: Welcome, exact: true},
    {path: '/welcome', component: Welcome, exact: true},
    {path: '/home', component: HomePage, exact: true},
    {path: '/cart', component: Cart, exact: true},
    {path: '/pay', component: Pay, exact: true},
    {path: '/pay/add-diners', component: SplitNames, exact: true},
    {path: '/pay/split-bill', component: SplitBill, exact: true},
    {path: '/pay/split-bill-breakdown', component: SplitBillBreakdown, exact: true},
    {path: '/details/:itemid', component: Details, exact: true},
    {path: '/order-placed', component: OrderPlaced},
    {path: '/waiter', component: Waiter, exact: true},
]

export default routes;