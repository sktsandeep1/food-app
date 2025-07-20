import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import ItemPage from "./pages/ItemPage";
import CartPage from "./pages/CartPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BillsPage from "./pages/BillsPage";
import CustomerPage from "./pages/CustomerPage";
import LogoutPage from "./pages/LogoutPage"
import AddUser from "./pages/AddUser";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ItemPage />} />
          <Route path="/bills" element={<BillsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer-page" element={<CustomerPage />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
