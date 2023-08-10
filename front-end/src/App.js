import "@fontsource/poppins";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/400-italic.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SearchResults from "./pages/search-results";
import ParkDetails from "./pages/park-details";
import { getRoutes } from "./routes";
import { NavigationBar } from "./components/NavigationBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Login } from "./pages/login";
import { OAuthCallbackPage } from "./pages/callback";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/User/User.slice";
import { isInLocalStorage, USER_SESSION } from "./session";
import { useEffect } from "react";
import jwt from "jwt-decode";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  button: {
    fontFamily: ["Poppins", "serif"].join(","),
    fontSize: 16,
    fontWeight: 500,
  },
  palette: {
    primary: {
      main: "#667761",
      dark: "#545E56",
    },
    secondary: {
      main: "#B79492",
      dark: "#917C78",
    },
  },
});

function App() {
  const dispatch = useDispatch();

  function getDecodedToken() {
    if (isInLocalStorage(USER_SESSION)) {
      dispatch(setUser(jwt(localStorage.getItem(USER_SESSION))));
    }
  }

  useEffect(() => {
    getDecodedToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <NavigationBar />
        <div className="App">
          <ToastContainer />
          <Routes>
            <Route path={getRoutes().home} element={<Home />} />
            <Route
              path={getRoutes().searchResults}
              element={<SearchResults />}
            />
            <Route path={getRoutes().parkDetails} element={<ParkDetails />} />
            <Route path={getRoutes().parkDetails} element={<ParkDetails />} />
            <Route path={getRoutes().login} element={<Login />} />
            <Route
              path={getRoutes().callback}
              element={<OAuthCallbackPage />}
            />
          </Routes>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
