import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Analytics from "./pages/Analytics.jsx";
import Logout from "./pages/Logout.jsx";

//Nishadi
import NavbarNishadi from "./components/SupplierOrderNavbar.jsx";
import DashboardN from "./pages/SupplierOrderDashboard.jsx";
import MyProfileN from "./pages/SupplierOrderProfile.jsx";
import Orders from "./pages/SupplierOrder_Order.jsx";
import Suppliers from "./pages/SupplierOrderSuppliers.jsx";
import AnalyticsN from "./pages/SupplierOrderAnalytics.jsx";
import SupplierEdit from "./components/SupplierEdit.jsx"; // Import the UpdateSupplier component
import SupplierOrderForm from "./components/SupplierOrderForm.jsx"//Import supplier order form component
import SupplierOrderEdit from "./components/SupplierOrderEdit.jsx" //Import the Update supplier Order component
import Home from "./pages/Home.jsx";
import SupplierOrderReport from "./components/SupplierOrderRepo.jsx";
import Materials from "./pages/Materials.jsx";
import SupplierEmail from "./pages/supplierEmail.jsx"//Importing supplier email component



//Dulari_IT22121110
import DonationNavbar from "./components/DonationNavbar.jsx";
import Donation_Dashboard from "./pages/Donation_Dashboard.jsx";
import New_Projects from "./pages/New_Projects.jsx";
import Doner_Feedback from "./pages/Doner_Feedback.jsx";
import Doner_Analystics from "./pages/Doner_Analytics.jsx";
import DFeedbackFetch from "./components/dFeedbackFetch.jsx";

//Primal
import SalesFeedback from "./pages/salesFeedback.jsx";
import InvoiceCreate from "./pages/invoiceCreate.jsx";
import SfeedbackFetch from "./components/sfeedbackFetch.jsx";
import ViewInvoice from "./pages/viewInvoice.jsx";
import PinVerification from "./components/PinVerification.jsx";
import { SalesContextProvider } from "./context/SalesContext.jsx";
import InvoiceUpdate from "./pages/InvoiceUpdate.jsx";

//Dinithi
import OrderPlace from "./pages/OrderPlacement.js";
import OrderHistory from "./pages/OrderHistory.js";
import OrderSuccess from "./pages/OrderSucess.js";
import UpdateOrder from "./pages/UpdateOrderDetails.js";
//Senith
//import Materials from "./pages/Materials.jsx";
import Production from "./pages/Production.jsx";
import Products from "./pages/Products.jsx";
import AddProducts from "./pages/AddProducts.jsx";
import ProductForm from "./components/ProductForm";

//Shanali
import ExportsDashboard from "./pages/ExportsDashboard.jsx";
import ExportsNavBar from "./components/ExportsNavBar.jsx";
import ExportsProfile from "./pages/ExportsProfile.jsx";
import ExportOrderDetails from "./pages/ExportOrderDetails.jsx";
import ExportOrders from "./pages/ExportOrders.jsx";
import Importer from "./pages/Importer.jsx";
import ExportAnalytics from "./pages/ExportAnalytics.jsx";
import UpdateExports from "./pages/UpdateExports.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <SalesContextProvider>
      
          <Routes>
           {/* <Route path="/" element={<Dashboard />} />*/}
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Analytics" element={<Analytics />} />
            <Route path="/MyProfile" element={<MyProfile />} />
            <Route path="/Logout" element={<Logout />} />

          {/* Nishadi */}
          <Route path="/SupplierOrderDashboard" element={<DashboardN />} />
          <Route path="/Suppliers" element={<Suppliers />} />
          <Route path="/Order" element={<Orders />} />
          <Route path="/analyticsN" element={<AnalyticsN />} />
          <Route path="/MyProfileN" element={<MyProfileN />} />
          <Route path="/supplier/:id" element={<SupplierEdit />} /> {/* Define route for updating orders */}
          <Route path="/supplierorderform" element ={< SupplierOrderForm/>}/> {/*View Supplier Order Form */}
          <Route path="/supplierOrder/:id" element={<SupplierOrderEdit />} /> {/* Define route for updating orders */}
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/supplierOrderReport" element ={<SupplierOrderReport/>}/>
          <Route path="/Materials" element={<Materials/>}/>
          <Route path="/SupplierEmail" element={<SupplierEmail/>}/>
        

        
          
  
            {/* Shanali */}
           {/* <Route path="/" element={<ExportsDashboard />} />*/}

            <Route path="/ExportsDashboard" element={<ExportsDashboard />} />
            <Route path="/Importer" element={<Importer />} />
            <Route path="/ExportOrders" element={<ExportOrders />} />
            <Route
              path="/ExportOrderDetails"
              element={<ExportOrderDetails />}
            />
            <Route path="/ExportAnalytics" element={<ExportAnalytics />} />
            <Route path="/ExportsProfile" element={<ExportsProfile />} />
            <Route path="/update/:id" element={<UpdateExports />} />{" "}
            {/* Define route for updating orders */}
            {/* Dulari */}
            <Route path="/New_Projects" element={<New_Projects />} />
            <Route path="/Doner_Feedback" element={<Doner_Feedback />} />
            <Route path="/Doner_Analytics" element={<Doner_Analystics />} />
            <Route path="/Dashboard" element={<DFeedbackFetch />} />
            <Route
              path="/Donation_Dashboard"
              element={<Donation_Dashboard />}
            />
            {/* Primal */}
            <Route path="/salesFeedback" element={<SalesFeedback />} />
            <Route path="/invoiceCreate" element={<InvoiceCreate />} />
            <Route path="/sfeedbackFetch" element={<SfeedbackFetch />} />
            <Route path="/viewInvoice" element={<ViewInvoice />} />
            <Route path="/PinVerification" element={<PinVerification />} />
            <Route path="/InvoiceUpdate" element={InvoiceUpdate} />
            {/* Dinithi */}
            <Route path="/OrderForm" element={<OrderPlace />} />
            <Route path="/OrderHistory" element={<OrderHistory />} />
            <Route path="/OrderSuccess" element={<OrderSuccess />} />
            <Route path="/update/:id" element={<UpdateOrder />} />{" "}
            {/* Define route for updating orders */}
            {/*Senith */}
            <Route path="/Products" element={<Products />} />
            <Route path="/Production" element={<Production />} />
            <Route path="/Materials" element={<Materials />} />
            <Route path="/AddProducts" element={<AddProducts />} />
            <Route path="./components/ProductForm" component={ProductForm} />
          </Routes>
       
      </SalesContextProvider>
    </BrowserRouter>
  );
};

export default App;




