export const FetchGeneral = ({body = {}, route, methodFetch, token}) => {

  const method = {
    POST: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
      body: JSON.stringify(body || {}),
    },
    GET: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
    },
  };

  return fetch(route || "", method[methodFetch])
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("Error en la solicitud:", error);
      throw error;
    });
};
