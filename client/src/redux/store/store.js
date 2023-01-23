import { configureStore } from "@reduxjs/toolkit";
import { AutenticacionSlice } from "../autenticacionSlice/autenticacionSlice";
import { NovaSlice } from "../novaSlice/novaSlice";

export default configureStore({
    reducer: {
        Autenticacion: AutenticacionSlice.reducer,
        Nova: NovaSlice.reducer,
    },
});
