import { Grid } from "@mui/material";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import imageLogin from "../../assets/images/image-login.svg";
import {
  ColorButton,
  CustomTextField,
} from "../../globalComponents/StyledComponents";
import { addUser } from "../../redux/userSlice";
import { FetchGeneral } from "../../services/FetchGeneral";
import { userAuthentication } from "../../services/Routes";

export const Login = () => {
  const { token } = useSelector((state) => state.user);

  const [inputsLogin, setInputsLogin] = useState({
    user: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event, key) => {
    setInputsLogin((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  const handleLogin = async () => {
    setIsLoading(true);

    const body = {
      username: inputsLogin.user,
      password: inputsLogin.password,
    };

    const resp = await FetchGeneral({
      body,
      route: userAuthentication,
      token,
      methodFetch: "POST",
    });

    if (resp?.code === 200) {
      dispatch(
        addUser({
          user: {
            username: resp?.data?.usuario?.username,
            email: resp?.data?.usuario?.correo,
            isAuthenticated: true,
            token: resp?.data?.token,
          },
        })
      );
      navigate("/insumos");
    } else {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  return (
    <>
      <div
        id="root"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Grid
          container
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
          }}
        >
          <Grid
            item
            style={{
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
            className="image-login"
          >
            <img
              src={imageLogin}
              style={{
                maxWidth: "90%", // Asegurar que la imagen no sea más ancha que el contenedor
                height: "auto", // Mantener la proporción de aspecto original
                display: "block", // Eliminar el espacio adicional debajo de la imagen,
                // objectFit: 'cover',
              }}
            />
          </Grid>
          <Grid
            justifyContent={"center"}
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
            }}
            className="inputs-login"
          >
            <Grid
              style={{
                textAlign: "center",
              }}
            >
              <Grid style={{ marginBottom: "80px" }}>
                <h1>Bienvenido a FerreAdmin</h1>
                <p>Ingresa tus credenciales para acceder</p>
              </Grid>
              <Grid
                item
                style={{
                  margin: "20px",
                }}
              >
                <CustomTextField
                  label={"Usuario"}
                  onChange={(event) => handleChange(event, "user")}
                  value={inputsLogin.user}
                  className="input-usuario"
                />
              </Grid>
              <Grid item style={{ margin: "20px" }}>
                <CustomTextField
                  label={"Contraseña"}
                  type="password"
                  onChange={(event) => handleChange(event, "password")}
                  value={inputsLogin.password}
                  className="input-contraseña"
                />
              </Grid>
              <ColorButton
                variant="contained"
                className="boton-iniciar-sesion"
                onClick={() => handleLogin()}
                disabled={isLoading}
              >
                Login
              </ColorButton>
              <Toaster />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
