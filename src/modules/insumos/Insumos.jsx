import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomTable } from "../../globalComponents/CustomTable";
import {
  ColorButton,
  CustomTextField,
} from "../../globalComponents/StyledComponents";
import { FetchGeneral } from "../../services/FetchGeneral";
import { obtenerInsumos } from "../../services/Routes";
import { NuevoInsumo } from "./components/NuevoInsumo";

export const Insumos = () => {
  const { token } = useSelector((state) => state.user);

  const [insumosGeneral, setInsumosGeneral] = useState({
    tableData: [],
    nuevoInsumoModalOpen: false,
  });

  const columns = [
    {
      label: "Nombre",
      key: "nombre",
    },
    {
      label: "Descripción",
      key: "descripcion",
    },
    {
      label: "Proveedor",
      key: "proveedor",
    },
    {
      label: "Precio unitario",
      key: "precioUnitario",
    },
    {
      label: "Cantidad mínima",
      key: "cantidadMinima",
    },
    {
      label: "Cantidad disponible",
      key: "cantidadDisponible",
    },
  ];

  const fetchInsumos = async () => {
    const params = {
      route: obtenerInsumos,
      method: "GET",
      token,
    };
    const resp = await FetchGeneral(params);

    setInsumosGeneral((prev) => ({
      ...prev,
      tableData: resp?.map((data) => ({
        ...data,
        proveedor: data?.proveedor?.nombreProveedor,
      })),
    }));
  };

  const handleStateOpenInsumoModal = () => {
    setInsumosGeneral((prev) => ({
      ...prev,
      nuevoInsumoModalOpen: !insumosGeneral.nuevoInsumoModalOpen,
    }));
  };

  useEffect(() => {
    fetchInsumos();
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
            onClick={handleStateOpenInsumoModal}
            // disabled={isLoading}
          >
            + Nuevo insumo
          </ColorButton>
        </Grid>
        <CustomTable columns={columns} data={insumosGeneral.tableData} />
      </Grid>

      <NuevoInsumo
        open={insumosGeneral.nuevoInsumoModalOpen}
        handleClose={handleStateOpenInsumoModal}
        refresh={fetchInsumos}
      />
    </div>
  );
};
