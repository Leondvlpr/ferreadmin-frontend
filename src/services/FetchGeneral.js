export const FetchGeneral = (params) => {
  //EN LA ESTRUCTURA DEL PARAMS SE DEBE INCLUIR EL BODY, LA ESTRUCTURA DEBE SER DE LA SIGUIENTE MANERA

  // {
  //     body: {
  //         CAMPOS NECESARIOS PARA EL ENDPOINT
  //     },
  //     route: //RUTA DEL ENDPOINT
  //     token: //TOKEN DEL USUARIO
  //     method: //TIPO DE PETICIÓN
  // }

  const method = {
    POST: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params?.token || ""}`,
      },
      body: JSON.stringify(params?.body || {}),
    },
    GET: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params?.token || ""}`,
      },
    },
  };

  return fetch(params?.route || "", method[params?.method])
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("Error en la solicitud:", error);
      throw error;
    });
};
