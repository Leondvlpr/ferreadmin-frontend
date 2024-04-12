import { FetchGeneral } from "../../services/FetchGeneral";
import {
  guardarInsumo,
  obtenerCompras,
  obtenerInsumos,
  obtenerProveedores,
} from "../../services/Routes";

export const fetchGetProveedores = async ({ token }) => {
  const resp = await FetchGeneral({
    route: obtenerProveedores,
    token,
    methodFetch: "GET",
  });

  return resp;
};

export const fetchInsumos = async ({ token }) => {
  const resp = await FetchGeneral({
    route: obtenerInsumos,
    methodFetch: "GET",
    token,
  });

  return resp;
};

export const fetchSaveInsumos = async ({ body, token }) => {
  const resp = await FetchGeneral({
    body,
    route: guardarInsumo,
    methodFetch: "POST",
    token,
  });

  return resp;
};

export const fetchCompras = async ({token}) => {
  const resp = await FetchGeneral({
    route: obtenerCompras,
    methodFetch: "GET",
    token,
  });

  return resp;
}
