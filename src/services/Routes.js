export const ApiHost = "http://localhost:8092/api"

export const userAuthentication = ApiHost + "/auth/login"
export const obtenerInsumos = ApiHost + "/resources";
export const guardarInsumo = ApiHost + "/resources/saveResource"
export const obtenerProveedores = ApiHost + "/supplier/getSupplier"
export const obtenerCompras = ApiHost + "/purchases"
export const guardarCompra = ApiHost + "/purchases/savePurchase"
export const generarPdf = ApiHost + "/generarPdf"