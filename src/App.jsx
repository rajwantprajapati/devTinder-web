import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import Home from "./Pages/Home/Home";
import appStore from "./Redux/appStore";

const Login = lazy(() => import("./Pages/Login/Login"));
const Feed = lazy(() => import("./Pages/Feed/Feed"));
const Profile = lazy(() => import("./Pages/Profile/Profile"));
const Error = lazy(() => import("./Pages/Error/Error"));

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/error" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
