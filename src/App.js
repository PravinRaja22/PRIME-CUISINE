import "./App.css";
import SideBar from "./Components/SideBar";
import Homepagedata from "./Components/homepage";
import AfricanFood from "./Components/AfricanFood";
import ChineseFood from "./Components/ChineseFood";
import ItalianFood from "./Components/ItalianFood";
import DesertFood from "./Components/DesertFood";
import Help from "./Components/Help";
import Profile from "./Components/Profile";
import ComingSoon from "./Components/ComingSoon";
import Chat from "./Components/Chat";
import Modal from "./Components/Modal";
import PaymentSect from "./Components/PaymentSect";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurentIndex from "./Components/RestaurentIndex";
import RestaurantDetailPage from "./Components/restaurentDetailPage";

function App() {
  return (
    <>
      <div className="App">

        <Router>
          <SideBar />
          {/* <Container /> */}
          <Routes>
            {/* <Route path="/" element={<Container />} /> */}
            <Route path="/" element={<Homepagedata />} />
            <Route path="/african" element={<AfricanFood />} />
            <Route path="/PaymentSect" element={<PaymentSect />} /> 
            <Route path="/restaurents" element={<RestaurentIndex/>}/>  
            <Route path="/new-restaurents" element={<RestaurantDetailPage/>}/>
            <Route path="/restaurentPage" element={<RestaurantDetailPage/>}/>  
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
