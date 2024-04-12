import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import {
  ColorButton,
  CustomTextField,
} from "../../../globalComponents/StyledComponents";
import { globalColors } from "../../../globalComponents/utils/GlobalColors";

export const RenderInsumoFields = ({
  value,
  handleChange,
  handleClose,
  fetchSaveInsumo,
  isLoading
}) => {
  return (
    <div>
      <CustomTextField
        label={"Nombre insumo"}
        onChange={(event) => handleChange(event.target.value, "nombre")}
        value={value?.inputs?.nombre}
        className="input-usuario"
        style={{
          margin: "0px 0px 20px 0px",
        }}
        fullWidth
      />

      <CustomTextField
        label={"Descrición"}
        onChange={(event) => handleChange(event.target.value, "descripcion")}
        value={value?.inputs?.descripcion}
        className="input-usuario"
        style={{
          margin: "0px 0px 20px 0px",
        }}
        fullWidth
      />

      <CustomTextField
        label={"Precio unitario"}
        onChange={(event) => handleChange(event.target.value, "precioUnitario")}
        value={value?.inputs?.precioUnitario}
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
          value={value?.inputs?.proveedor}
          label="Proveedor"
          onChange={(event) => handleChange(event.target.value, "proveedor")}
        >
          {value?.proveedoresInfo?.map((proveedor) => (
            <MenuItem value={proveedor?.idProveedor}>
              {proveedor?.nombreProveedor}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <CustomTextField
        label={"Cantidad mínima"}
        onChange={(event) => handleChange(event.target.value, "cantidadMinima")}
        value={value?.inputs?.cantidadMinima}
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
        value={value?.inputs?.cantidadDisponible}
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
          disabled={isLoading}
        >
          {isLoading ? (
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
  );
};
