import React, { useEffect, useState } from "react";
import { obtenerCompras } from "../../services/Routes";
import { useSelector } from "react-redux";
import { FetchGeneral } from "../../services/FetchGeneral";
import { Grid } from "@mui/material";
import {
  ColorButton,
  CustomTextField,
} from "../../globalComponents/StyledComponents";
import { CustomTable } from "../../globalComponents/CustomTable";
import { fetchCompras } from "../../globalComponents/utils/ModuleFunctions";

export const OrdenesCompra = () => {
  const { token } = useSelector((state) => state.user);

  const [ordenesCompraGeneral, setOrdenesCompraGeneral] = useState({
    tableData: [],
    nuevaCompraModal: false,
  });

  const columns = [
    {
      label: "Id compra",
      key: "idCompra",
    },
    {
      label: "Fecha compra",
      key: "fechaCompra",
    },
    {
      label: "Proveedor",
      key: "proveedor",
    },
    {
      label: "Total compra",
      key: "totalCompra",
    },
  ];

  useEffect(() => {
    fetchCompras({ token }).then((response) => {
      setOrdenesCompraGeneral((prev) => ({
        ...prev,
        tableData: response?.map((data) => ({
          ...data,
          proveedor: data?.proveedor?.nombreProveedor,
        })),
      }));
    });
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Grid
        style={{
          width: "auto",
          margin: "40px",
        }}
      >
        <Grid
          style={{
            display: "flex",
          }}
        >
          <CustomTextField
            label={"Buscar"}
            style={{
              width: "100%",
              margin: "0px 30px 30px 0px",
            }}
            // type="password"
            // onChange={(event) => handleChange(event, "password")}
            // value={inputsLogin.password}
            // className="input-contraseña"
          />

          <ColorButton
            style={{
              width: "160px",
            }}
            // onClick={handleStateOpenInsumoModal}
            // disabled={isLoading}
          >
            + Generar orden de compra
          </ColorButton>
        </Grid>
        <CustomTable columns={columns} data={ordenesCompraGeneral.tableData} />
      </Grid>

      {/* <NuevoInsumo
        open={insumosGeneral.nuevoInsumoModalOpen}
        handleClose={handleStateOpenInsumoModal}
        refresh={fetchInsumos}
      /> */}
    </div>
  );
};
