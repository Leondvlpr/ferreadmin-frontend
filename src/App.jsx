import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "./globalComponents/NavBar";
import { PrivateRoute } from "./globalComponents/PrivateRoute";
import { Login, Insumos, OrdenesCompra } from "./modules";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);

  console.log(isAuthenticated);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/insumos"
            element={
              <>
                <NavBar />
                <Insumos />
              </>
            }
          />
          <Route
            path="/ordenes_compra"
            element={
              <>
                <NavBar />
                <OrdenesCompra />
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
