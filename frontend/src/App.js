import { BrowserRouter, Switch, Route } from "react-router-dom";
import Topnav from './components/layouts/topnav'
import SLMSideNav from './components/layouts/SLMsidenav'
import EMPSideNav from './components/layouts/EMPsidenav'
import AddServices from './components/service-list-manager/service-details/AddserviceDetailsList'
import ViewServices from './components/service-list-manager/service-details/viewServiceDetails'
import ViewOneServices from './components/service-list-manager/service-details/ViewOneService'
import AddEmployee from './components/employee-manager/AddEmployee'
import ViewEmployees from './components/employee-manager/ViewAllEmployees'
import ViewOneEmployee from './components/employee-manager/ViewOneEmployee'
import SendFeedBack from './components/service-list-manager/feedback/sendFeedback'
import ViewFeedback from './components/service-list-manager/feedback/ViewFeedbacks'
import Addattendant from './components/employee-manager/AddAttendant'
import ViewAttendant from './components/employee-manager/ViewAttendants'
import ApointSideNAV from "./components/layouts/ApointSidenav";
import AddApoinment from "./components/apoinment-manager/AddApoinment";
import ViewOneApoinment from "./components/apoinment-manager/ViewOneApoinment";
import ViewApoinmentDetails from "./components/apoinment-manager/ViewAllApoinments";
import AddOrders from "./components/order-manager/AddOrders";
import ViewOrderDetails from "./components/order-manager/ViewAllOreders";
import ViewOneOrder from "./components/order-manager/ViewOneOrder";
import OrderSideNAV from "./components/layouts/OrderSidenav";
import AddStock from "./components/stock-manager/AddStock";
import ViewOneStock from "./components/stock-manager/ViewOneStock";
import ViewStockDetails from "./components/stock-manager/ViewAllStocks";
import StockSideNAV from "./components/layouts/StockSidenav";
import SalarySideNAV from "./components/layouts/SalarySidenav";
import AddSalary from "./components/salary-manager/AddSalary";
import ViewSalaryDetails from "./components/salary-manager/ViewAllSalary";
import ViewOneSalary from "./components/salary-manager/ViewOneSalary";
import BillSideNAV from "./components/layouts/Billsidenav";
import AddBillings from "./components/billing-manager/AddBillings";
import ViewAllBillings from "./components/billing-manager/ViewAllBillings";
import ViewOneBilling from "./components/billing-manager/ViewOneBilling";
import PaymentSideNAV from "./components/layouts/PAYsidenav";
import AddPayments from "./components/financial-manager/AddPayments";
import ViewAllPayments from "./components/financial-manager/ViewAllPayments";
import ViewOnePayment from "./components/financial-manager/ViewOnePayment";






function App() {
  return (
    <BrowserRouter>

      <Route path = "/"><Topnav/></Route>


      {/* Service List Manager Routes */}
      <Route path = "/serviceListManager"><SLMSideNav/></Route>
      <Route exact path = "/serviceListManager/add"><AddServices/></Route>
      <Route exact path = "/serviceListManager/view"><ViewServices/></Route>
      <Route exact path = "/serviceListManager/view/:id"><ViewOneServices/></Route>
      <Route exact path = "/serviceListManager/feedback"><SendFeedBack/></Route>
      <Route exact path = "/serviceListManager/feedback/view"><ViewFeedback/></Route>
      

      {/* Employee Manager Routes */}
      <Route path = "/employeeManager"><EMPSideNav/></Route>
      <Route exact path = "/employeeManager/add"><AddEmployee/></Route>
      <Route exact path = "/employeeManager/view"><ViewEmployees/></Route>
      <Route exact path = "/employeeManager/view/:id"><ViewOneEmployee/></Route>
      <Route exact path = "/employeeManager/attendant/add"><Addattendant/></Route>
      <Route exact path = "/employeeManager/attendant/view"><ViewAttendant/></Route>


      {/* Apoinment Manager Routes */}
      <Route path = "/apoinmentManager"><ApointSideNAV/></Route>
      <Route exact path = "/apoinmentManager/add"><AddApoinment/></Route>
      <Route exact path = "/apoinmentManager/view"><ViewApoinmentDetails/></Route>
      <Route exact path = "/apoinmentManager/view/:id"><ViewOneApoinment/></Route>


      {/* Order Manager Routes */}
      <Route path = "/orderManager"><OrderSideNAV/></Route>
      <Route exact path = "/orderManager/add"><AddOrders/></Route>
      <Route exact path = "/orderManager/view"><ViewOrderDetails/></Route>
      <Route exact path = "/orderManager/view/:id"><ViewOneOrder/></Route>


       {/* Stock Manager Routes */}
       <Route path = "/stockManager">< StockSideNAV/></Route>
      <Route exact path = "/stockManager/add"><AddStock/></Route>
      <Route exact path = "/stockManager/view"><ViewStockDetails/></Route>
      <Route exact path = "/stockManager/view/:id"><ViewOneStock/></Route>


       {/* Salary Manager Routes */}
       <Route path = "/salaryManager">< SalarySideNAV/></Route>
      <Route exact path = "/salaryManager/add"><AddSalary/></Route>
      <Route exact path = "/salaryManager/view"><ViewSalaryDetails/></Route>
      <Route exact path = "/salaryManager/view/:id"><ViewOneSalary/></Route>


       {/* Billing Manager Routes */}
       <Route path = "/billingManager"><BillSideNAV/></Route>
      <Route exact path = "/billingManager/add"><AddBillings/></Route>
      <Route exact path = "/billingManager/view"><ViewAllBillings/></Route>
      <Route exact path = "/billingManager/view/:id"><ViewOneBilling/></Route>

      {/* Financial Manager Routes */}
      <Route path = "/paymentManager"><PaymentSideNAV/></Route>
      <Route exact path = "/paymentManager/add"><AddPayments/></Route>
      <Route exact path = "/paymentManager/view"><ViewAllPayments/></Route>
      <Route exact path = "/paymentManager/view/:id"><ViewOnePayment/></Route>






    </BrowserRouter>
  );
}

export default App;
