import { Route, Routes } from "react-router-dom";
import { useCheckAuthBack } from "./hooks/useCheckAuthBack";
import Login from "./components/ComponentesPrincipales/PaginaLogin/Login/Login";
import ListaDePersonal from "./components/ComponentesPrincipales/ListaDePersonal/ListaDePersonal";
import GuiaDeReparto from "./components/ComponentesPrincipales/GuiaDeReparto/GuiaDeReparto";
import NavBar from "./components/ComponentesPrincipales/NavBar/NavBar";
import NavBarNew from "./components/ComponentesPrincipales/NavBarNew/NavBarNew";
import RendicionVentas from "./components/ComponentesPrincipales/RendicionVentas/RendicionVentas";
import RendicionGeneral from "./components/ComponentesPrincipales/RendicionGeneral/RendicionGeneral";
import RendicionPersonal from "./components/ComponentesPrincipales/RendicionGeneral/RendicionPersonal/RendicionPersonal";
import HistorialAnticipos from "./components/ComponentesPrincipales/HistorialAnticipos/HistorialAnticipos";
import InventarioVales from "./components/ComponentesPrincipales/InventarioVales/InventarioVales";

function App() {
  const authBack = useCheckAuthBack();
  if (authBack.status === "checking") {
    return <h1>Checking...</h1>;
  }

  return (
    <>
      {authBack === "logged" ? (
        //si estoy en guide, no muestro el navbar
        <>
          <NavBarNew />
          <Routes>
            <Route path="/listaDePersonal" element={<ListaDePersonal />} />
            <Route path="/guiaDeReparto" element={<GuiaDeReparto />} />
            <Route path="/rendicionVentas" element={<RendicionVentas />} />
            <Route path="/rendicionGeneral" element={<RendicionGeneral />} />
            <Route path="/rendicionPersonal" element={<RendicionPersonal />} />
            <Route
              path="/historialAnticipos"
              element={<HistorialAnticipos />}
            />
            <Route path="/inventarioVales" element={<InventarioVales />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/*" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default App;
