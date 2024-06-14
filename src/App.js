
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inventory from './Inventory';
import Shipment from './Shipment';
import Supplier from './Supplier'
import Layout from './Layout';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inventory />} />
          <Route path="Shipment" element={<Shipment />} />
           <Route path="supplier" element={<Supplier />} /> 
         </Route>
      </Routes>
    </BrowserRouter>
      {/* <ButtonAppBar title = {"Inventory Details"}/>
     <Inventory/> */}
    </div>
  );
}

export default App;
