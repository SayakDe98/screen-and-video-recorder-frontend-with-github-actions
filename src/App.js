import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import Signup from "./components/Signup";
import Login from "./components/Login";

const App = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn) || localStorage.getItem('token');
  return (
    <>
      <Router>
        <Routes>
          <Route Component={Home} path="/" />
          {!isLoggedIn && <Route Component={Signup} path="/signup" />}
          {!isLoggedIn && <Route Component={Login} path="/login" />}
        </Routes>
      </Router>
    </>
  );
}

export default App;
