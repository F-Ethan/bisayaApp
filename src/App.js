import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import UserForm from "./components/UserForm";
import Home from "./components/Home";
import Settings from "./components/Settings";
import RelatedApps from "./components/RelatedApps";
import Learn from "./components/Learn";

function App() {
  const { name } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={name ? <Navigate to="/home" /> : <UserForm />} />
      <Route path="/home" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/related-apps" element={<RelatedApps />} />
      <Route path="/learn" element={<Learn />} />
    </Routes>
  );
}

export default App;
