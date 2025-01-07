import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Drivers from "./components/Drivers";
import DriverDetails from "./components/DriverDetails";
import Layout from "./components/Layout";
import Home from "./components/Home";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/drivers"
          element={
            <Layout>
              <Drivers />
            </Layout>
          }
        />
        <Route
          path="/driver/:id"
          element={
            <Layout>
              <DriverDetails />
            </Layout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function AnimatedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
