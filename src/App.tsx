import { Routes, Route } from "react-router-dom";
import PaginabaseAdmin from "./paginas/Administracao/PaginaBaseAdmin";
import AdministracaoRestaurantes from "./paginas/Administracao/Restaurantes/AdministracaoRestaurantes";
import FormularioRestaurante from "./paginas/Administracao/Restaurantes/FormularioRestaurante";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />


      <Route path='/admin' element={<PaginabaseAdmin/>}>

        <Route
          path="restaurantes"
          element={<AdministracaoRestaurantes />}
        />
        <Route
          path="restaurantes/novo"
          element={<FormularioRestaurante />}
        ></Route>
        <Route
          path="restaurantes/:id"
          element={<FormularioRestaurante />}
        ></Route>  
      </Route>



    </Routes>
  );
}

export default App;
