import {
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CustomModal } from "../../../globalComponents/CustomModal";
import { globalColors } from "../../../globalComponents/utils/GlobalColors";
import {
  ColorButton,
  CustomTextField,
} from "../../../globalComponents/StyledComponents";
import { FetchGeneral } from "../../../services/FetchGeneral";
import {
  guardarInsumo,
  obtenerInsumos,
  obtenerProveedores,
} from "../../../services/Routes";
import toast, { Toaster } from "react-hot-toast";

export const NuevoInsumo = ({ open, handleClose, refresh }) => {
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
    isLoading: "",
  });


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
    setInsumoData(prev => ({
      ...prev,
      inputs: {
        nombre: "",
        descripcion: "",
        precioUnitario: "",
        proveedor: "",
        cantidadMinima: "",
        cantidadDisponible: "",
      }
    }))
  };

  const changeValue = (key, value) => {
    setInsumoData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const fetchSaveInsumo = async () => {

    changeValue("isLoading", true);

    const body = {
      nombre: insumoData?.inputs?.nombre,
      descripcion: insumoData?.inputs?.descripcion,
      precioUnitario: insumoData?.inputs?.precioUnitario,
      idProveedor: insumoData?.inputs?.proveedor,
      cantidadMinima: insumoData?.inputs?.cantidadMinima,
      cantidadDisponible: insumoData?.inputs?.cantidadDisponible,
    };

    const resp = await FetchGeneral({
      body,
      route: guardarInsumo,
      token,
      method: "POST",
    });

    if (resp?.code === 200) {
      resetFields();
      handleClose();
      refresh?.();
      toast.success("Información guardada correctamente");
    }

    changeValue("isLoading", false);
  };

  const fetchGetProveedores = async () => {
    const resp = await FetchGeneral({
      route: obtenerProveedores,
      token,
      method: "GET",
    });

    setInsumoData((prev) => ({
      ...prev,
      proveedoresInfo: resp,
    }));
  };

  useEffect(() => {
    fetchGetProveedores();
  }, []);

  return (
    <div>
      <CustomModal
        open={open}
        handleClose={handleClose}
        style={{
          maxWidth: "700px",
          display: "flex",
          justifyContent: "center",
          boxShadow: "none",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            margin: "20px 40px 40px 40px",
          }}
        >
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <h1>Nuevo insumo</h1>
            <p>
              Porfavor ingrese la información correspondiente en cada uno de los
              campos
            </p>
            <Divider />
          </div>
          <CustomTextField
            label={"Nombre insumo"}
            onChange={(event) => handleChange(event.target.value, "nombre")}
            value={insumoData?.inputs?.nombre}
            className="input-usuario"
            style={{
              margin: "0px 0px 20px 0px",
            }}
            fullWidth
          />

          <CustomTextField
            label={"Descrición"}
            onChange={(event) =>
              handleChange(event.target.value, "descripcion")
            }
            value={insumoData?.inputs?.descripcion}
            className="input-usuario"
            style={{
              margin: "0px 0px 20px 0px",
            }}
            fullWidth
          />

          <CustomTextField
            label={"Precio unitario"}
            onChange={(event) =>
              handleChange(event.target.value, "precioUnitario")
            }
            value={insumoData?.inputs?.precioUnitario}
            className="input-usuario"
            style={{
              margin: "0px 0px 20px 0px",
            }}
            fullWidth
          />

          <FormControl
            fullWidth
            style={{
              marginBottom: "20px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Proveedor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={insumoData?.inputs?.proveedor}
              label="Proveedor"
              onChange={(event) =>
                handleChange(event.target.value, "proveedor")
              }
            >
              {insumoData?.proveedoresInfo?.map((proveedor) => (
                <MenuItem value={proveedor?.idProveedor}>
                  {proveedor?.nombreProveedor}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <CustomTextField
            label={"Cantidad mínima"}
            onChange={(event) =>
              handleChange(event.target.value, "cantidadMinima")
            }
            value={insumoData?.inputs?.cantidadMinima}
            className="input-usuario"
            style={{
              margin: "0px 0px 20px 0px",
            }}
            fullWidth
          />

          <CustomTextField
            label={"Cantidad disponible"}
            onChange={(event) =>
              handleChange(event.target.value, "cantidadDisponible")
            }
            value={insumoData?.inputs?.cantidadDisponible}
            className="input-usuario"
            fullWidth
          />

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <ColorButton
              style={{
                // width: "160px",
                backgroundColor: "white",
                color: globalColors.dominant,
                border: `1px solid ${globalColors.dominant}`,
                marginRight: "20px",
              }}
              fullWidth
              onClick={handleClose}
              // disabled={isLoading}
            >
              Cancelar
            </ColorButton>

            <ColorButton
              fullWidth
              onClick={fetchSaveInsumo}
              disabled={insumoData?.isLoading}
            >
              {insumoData.isLoading ? (
                <CircularProgress
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "white",
                  }}
                />
              ) : (
                <p>Guardar</p>
              )}
            </ColorButton>
          </div>
        </div>
      </CustomModal>
      <Toaster />
    </div>
  );
};
