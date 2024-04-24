import React, { useEffect, useState } from "react";
import { generarPdf, obtenerCompras } from "../../services/Routes";
import { useSelector } from "react-redux";
import { FetchGeneral } from "../../services/FetchGeneral";
import { CircularProgress, Grid } from "@mui/material";
import {
  ColorButton,
  CustomTextField,
} from "../../globalComponents/StyledComponents";
import { CustomTable } from "../../globalComponents/CustomTable";
import {
  fetchCompras,
  fetchGenerarPdfOrdenCompra,
} from "../../globalComponents/utils/ModuleFunctions";
import { InsertInfoModal } from "../../globalComponents/InsertInfoModal";

export const OrdenesCompra = () => {
  const { token } = useSelector((state) => state.user);

  const [ordenesCompraGeneral, setOrdenesCompraGeneral] = useState({
    tableData: [],
    nuevaCompraModal: false,
    isLoading: false
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

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChangeStateComponent = (key, value) => {
    setOrdenesCompraGeneral(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const generatePdf = () => {
    handleChangeStateComponent("isLoading", true)

    const body = {
      idCompra: "5",
    }; // Set the idCompra value

    fetchGenerarPdfOrdenCompra({ body, token, normalResponse: true })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "archivo.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
      handleChangeStateComponent("isLoading", false);
  }

  const handleFileChange = () => {

    
  };

  const handleChangeOpenNuevaCompraModal = () => {
    setOrdenesCompraGeneral(prev => ({
      ...prev,
      nuevaCompraModal: !ordenesCompraGeneral.nuevaCompraModal
    }))
  }

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
            onClick={handleChangeOpenNuevaCompraModal}
            disabled={ordenesCompraGeneral.isLoading}
          >
            {ordenesCompraGeneral.isLoading ? (
            <CircularProgress
              style={{
                width: "20px",
                height: "20px",
                color: "white",
              }}
            />
          ) : (
            <p>+ Generar orden de compra</p>
          )}
          </ColorButton>
        </Grid>
        <CustomTable columns={columns} data={ordenesCompraGeneral.tableData} />
      </Grid>

      <InsertInfoModal
      open={ordenesCompraGeneral.nuevaCompraModal}
      title={"Generar orden de compra"}
      subTitle={"Selecciona los productos que deseas abastecer"}
      handleClose={handleChangeOpenNuevaCompraModal}
      >
        
      </InsertInfoModal>

      {/* <NuevoInsumo
        open={insumosGeneral.nuevoInsumoModalOpen}
        handleClose={handleStateOpenInsumoModal}
        refresh={fetchInsumos}
      /> */}
    </div>
  );
};
