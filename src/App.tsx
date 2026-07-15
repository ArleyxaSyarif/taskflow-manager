import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import LoginForm from "./components/auth/LoginForm";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<LoginForm />}
        />


        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />


      </Routes>

    </BrowserRouter>

  )

}


export default App;