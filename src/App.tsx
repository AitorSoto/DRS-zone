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
import Circuits from "./components/Circuits";
import CircuitDetails from "./components/CircuitDetail";

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
        <Route
          path="/circuits"
          element={
            <Layout>
              <Circuits />
            </Layout>
          }
        />
        <Route
          path="/circuits/:id"
          element={
            <Layout>
              <CircuitDetails />
            </Layout>
          }
        />

        <Route
          path="*"
          element={
            <Layout>
              <h1>Not Found</h1>
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
