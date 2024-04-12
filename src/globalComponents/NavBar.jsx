import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Home01Icon } from "@hugeicons/react-pro";
import {
  AssignmentTurnedIn,
  EmojiObjects,
  HighlightOff,
  Inventory,
  Sell,
  Wallet,
} from "@mui/icons-material";
import { globalColors } from "./utils/GlobalColors";
import { NuevoInsumo } from "../assets/icons/NuevoInsumo";
import { NuevaOrdenCompra } from "../assets/icons/NuevaOrdenCompra";
import { Stock } from "../assets/icons/Stock";
import { Ventas } from "../assets/icons/Ventas";
import { CerrarSesion } from "../assets/icons/CerrarSesion";
import { User } from "../assets/icons/User";
import { Email } from "../assets/icons/Email";

export const NavBar = () => {
  const { email, username } = useSelector((state) => state.user);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const listItems = [
    {
      name: "Insumos",
      icon: <NuevoInsumo color={globalColors.dominant} size={"20px"} />,
      id: "1",
      function: () => {
        navigate("/insumos");
      },
      path: "/insumos",
    },
    {
      name: "Compras",
      icon: <NuevaOrdenCompra color={globalColors.dominant} size={"20px"} />,
      id: "2",
      function: () => {
        navigate("/compras");
      },
      path: "/compras",
    },
    {
      name: "Stock",
      icon: <Stock color={globalColors.dominant} size={"20px"} />,
      id: "3",
      path: "/stock",
    },
    {
      name: "Ordenes de compra",
      icon: <NuevaOrdenCompra color={globalColors.dominant} size={"20px"} />,
      id: "4",
      path: "/ordenes_compra",
      function: () => {
        navigate("/ordenes_compra");
      },
    },
    {
      name: "Ventas",
      icon: <Ventas color={globalColors.dominant} size={"20px"} />,
      id: "5",
      path: "/ventas",
    },
    {
      id: "6",
      name: "Cerrar sesión",
      icon: <CerrarSesion color={globalColors.redColor} size={"20px"} />,
      function: () => {
        navigate("/login");
      },
      path: "",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          backgroundColor: globalColors?.dominant,
          boxShadow: "none",
        }}
      >
        <Toolbar
          style={{
            padding: 0,
          }}
        >
          <Button
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            style={{
              borderRadius: "6px",
              margin: "0px 10px",
              minWidth: "50px",
            }}
          >
            <MenuIcon />
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FerreAdmin
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        open={isDrawerOpen}
        anchor="left"
        onClose={handleDrawerToggle}
        PaperProps={{
          style: {
            width: "300px",
          },
        }}
      >
        <div
          style={{
            margin: "20px",
            backgroundColor: globalColors.accentuated,
            borderRadius: "8px",
          }}
        >
          <Avatar
            src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg"
            style={{
              width: "60px",
              height: "60px",
              margin: "20px 0px -30px 100px",
            }}
          ></Avatar>
          <div
            style={{
              margin: "50px 20px 20px 20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User color={globalColors.dominant} size={20} />
              <h4
                style={{
                  marginLeft: "6px",
                }}
              >
                Nombre usuario
              </h4>
            </div>
            <p
              style={{
                marginTop: "-10px",
              }}
            >
              {username}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Email color={globalColors.dominant} size={20} />
              <h4
                style={{
                  marginLeft: "6px",
                }}
              >
                Correo electrónico
              </h4>
            </div>
            <p
              style={{
                marginTop: "-10px",
              }}
            >
              {email}
            </p>
          </div>
        </div>
        {listItems.map((items) => (
          <ListItemButton
            key={items.id}
            style={{
              display: "flex",
              alignItems: "center",
              maxHeight: "40px",
            }}
            selected={window.location.pathname === items?.path}
            onClick={() => {
              console.log(window.location.pathname);
              items?.function();
              handleDrawerToggle();
            }}
            sx={{
              margin: "0px 20px 10px 20px",
              height: "50px",
              borderRadius: "5px",
              fontFamily: "Public Sans",
              transition: ".2s",
              ":hover": {
                backgroundColor:
                  items.id === "6"
                    ? globalColors.redColorAccentuated
                    : globalColors?.accentuated,
                margin: "0px 12px 10px 12px",
                borderRadius: "5px",
              },
              "&.Mui-selected": {
                backgroundColor: globalColors?.accentuated,
                margin: "0px 20px 10px 20px",
                borderRadius: "5px",
              },
            }}
          >
            <Grid
              style={{
                color:
                  window.location.pathname === items?.path
                    ? globalColors.dominant
                    : globalColors?.textColor,
                marginRight: "10px",
                marginTop: "4px",
                fontWeight: "800",
              }}
            >
              {items.icon}
            </Grid>
            <Grid
              style={{
                color:
                  window.location.pathname === items?.path
                    ? globalColors.dominant
                    : globalColors?.textColor,
                fontFamily: "Public Sans",
                fontWeight: "600",
              }}
            >
              {items.name}
            </Grid>
          </ListItemButton>
        ))}
      </Drawer>
    </Box>
  );
};
