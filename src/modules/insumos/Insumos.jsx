import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InsertInfoModal } from "../../globalComponents/InsertInfoModal";
import {
  ColorButton,
  CustomTextField,
} from "../../globalComponents/StyledComponents";
import { FetchGeneral } from "../../services/FetchGeneral";
import { guardarInsumo, obtenerInsumos } from "../../services/Routes";
import { RenderInsumoFields } from "./components/RenderInsumoFields";
import {
  fetchGetProveedores,
  fetchInsumos,
  fetchSaveInsumos,
} from "../../globalComponents/utils/ModuleFunctions";
import { insumosTablecolumns } from "./utils/TableColumns";
import { NuevoInsumo } from "../../assets/icons/NuevoInsumo";
import { globalColors } from "../../globalComponents/utils/GlobalColors";
import { CustomTable } from "../../globalComponents";

export const Insumos = () => {
  const { token } = useSelector((state) => state.user);

  const [insumoData, setInsumoData] = useState({
    inputs: {
      nombre: "",
      descripcion: "",
      precioUnitario: "",
      proveedor: "",
      cantidadMinima: "",
      cantidadDisponible: "",
    },
    proveedoresInfo: [],
    tableData: [],
    isLoading: false,
    nuevoInsumoModalOpen: false,
  });

  const handleStateOpenInsumoModal = () => {
    setInsumoData((prev) => ({
      ...prev,
      nuevoInsumoModalOpen: !insumoData.nuevoInsumoModalOpen,
    }));
  };

  const handleChange = (value, key) => {
    setInsumoData((prev) => ({
      ...prev,
      inputs: {
        ...prev.inputs,
        [key]: value,
      },
    }));
  };

  const resetFields = () => {
    setInsumoData((prev) => ({
      ...prev,
      inputs: {
        nombre: "",
        descripcion: "",
        precioUnitario: "",
        proveedor: "",
        cantidadMinima: "",
        cantidadDisponible: "",
      },
    }));
  };

  const saveInsumo = async () => {
    setInsumoData((prev) => ({
      ...prev,
      isLoading: false,
    }));

    const body = {
      nombre: insumoData?.inputs?.nombre,
      descripcion: insumoData?.inputs?.descripcion,
      precioUnitario: insumoData?.inputs?.precioUnitario,
      idProveedor: insumoData?.inputs?.proveedor,
      cantidadMinima: insumoData?.inputs?.cantidadMinima,
      cantidadDisponible: insumoData?.inputs?.cantidadDisponible,
    };

    await fetchSaveInsumos({ body, token }).then((resp) => {
      if (resp?.code === 200) {
        resetFields();
        handleStateOpenInsumoModal();
        fetchInsumos({ token });
        toast.success("Información guardada correctamente");
        setInsumoData((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    });
  };

  const assignFunction = (value, key) => {
    setInsumoData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    fetchInsumos({ token }).then((response) => {
      setInsumoData((prev) => ({
        ...prev,
        tableData: response?.map((data) => ({
          ...data,
          proveedor: data?.proveedor?.nombreProveedor,
        })),
      }));
    });
    fetchGetProveedores({ token }).then((response) => {
      assignFunction(response, "proveedoresInfo");
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
          />

          <ColorButton
            style={{
              width: "160px",
            }}
            onClick={handleStateOpenInsumoModal}
          >
            <NuevoInsumo color={"#FFFF"} size={"20px"} />
            <p
            style={{
              fontWeight: 400,
              marginLeft: 6
            }}
            >Nuevo insumo</p>
          </ColorButton>
        </Grid>
        <CustomTable
          columns={insumosTablecolumns}
          data={insumoData.tableData}
        />
      </Grid>

      <InsertInfoModal
        open={insumoData.nuevoInsumoModalOpen}
        handleClose={handleStateOpenInsumoModal}
        title={"Nuevo insumo"}
        subTitle={
          "Porfavor ingrese la información correspondiente en cada uno de los campos"
        }
      >
        <RenderInsumoFields
          value={insumoData}
          handleChange={handleChange}
          handleClose={handleStateOpenInsumoModal}
          fetchSaveInsumo={saveInsumo}
          isLoading={insumoData.isLoading}
        />
      </InsertInfoModal>
    </div>
  );
};
