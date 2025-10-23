import Dashboard from "./pages/dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Landing } from "./pages/Landing";
import { SharedView } from "./pages/SharedView";
import { SingleSharedView } from "./pages/SingleSharedView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/shared/:shareLink" element={<SharedView/>}></Route>
        <Route path="/note/:shareLink" element={<SingleSharedView/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
