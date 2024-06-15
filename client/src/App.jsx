import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./views/Landing";
import Login from "./views/Login";
import About from "./views/About";
import Schedule from "./views/Schedule";
import Proposal from "./views/Proposal";
import UserStats from "./views/UserStats";
import EmailVerify from "./components/EmailVerify";
// import { Toaster } from "react-hot-toast";
function App() {
  return (
    <Router>
      <Routes>
        {/* <Toaster /> */}
        <Route path="/" exact element={<Landing />}>
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/proposal" element={<Proposal />} />
          <Route path="/user" element={<UserStats />} />
          <Route path="/auth/:id/verify/:token" element={<EmailVerify />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
