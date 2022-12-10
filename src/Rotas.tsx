import { Routes, Route } from "react-router-dom";
import App from "./App";
import { Membros } from "./components/Admin/Membros";
import { Painel } from "./pages/Painel";
import { RequireAdmin } from "./services/RequireAdmin";
import { RequireAuth } from "./services/RequireAuth";

export const Rotas = () => {

    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/painel" element={<RequireAuth><RequireAdmin><Painel children={<h1 className="bg-wallpaper w-full bg-cover bg-center">home</h1>} /></RequireAdmin></RequireAuth>} />
            {/* <Route path="/register" element={<Register />} /> */}

            <Route path="/membros" element={<RequireAuth><RequireAdmin><Painel children={<Membros />} /></RequireAdmin></RequireAuth>} />
            <Route path="/dashboard" element={<RequireAuth><RequireAdmin><Painel children={<Membros />} /></RequireAdmin></RequireAuth>} />

        </Routes>
    )
}