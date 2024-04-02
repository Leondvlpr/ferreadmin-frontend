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
import {
  AssignmentTurnedIn,
  EmojiObjects,
  HighlightOff,
  Inventory,
  Sell,
  Wallet,
} from "@mui/icons-material";
import { globalColors } from "./utils/GlobalColors";

export const NavBar = () => {
  const { email, username } = useSelector((state) => state.user);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState();

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const listItems = [
    {
      name: "Insumos",
      icon: <EmojiObjects color={"white"} />,
      id: "1",
      function: () => {
        navigate("/insumos");
      },
      path: "/insumos",
    },
    {
      name: "Compras",
      icon: <Wallet color={"white"} />,
      id: "2",
      function: () => {
        navigate("/compras");
      },
      path: "/compras",
    },
    {
      name: "Stock",
      icon: <Inventory color={"white"} />,
      id: "3",
      path: "/stock",
    },
    {
      name: "Ordenes de compra",
      icon: <AssignmentTurnedIn color={"white"} />,
      id: "4",
      path: "/ordenes_compra",
      function: () => {
        navigate("/ordenes_compra");
      },
    },
    {
      name: "Ventas",
      icon: <Sell color={"white"} />,
      id: "5",
      path: "/ventas",
    },
    {
      id: "6",
      name: "Cerrar sesión",
      icon: <HighlightOff color={"white"} />,
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
            <h4
              style={{
                marginBottom: "-10px",
              }}
            >
              Nombre usuario
            </h4>
            <p>{username}</p>

            <h4
              style={{
                marginBottom: "-10px",
              }}
            >
              Correo electrónico
            </h4>
            <p>{email}</p>
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
                backgroundColor: globalColors?.accentuated,
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
                color: globalColors?.dominant,
                marginRight: "10px",
                fontWeight: "800",
              }}
            >
              {items.icon}
            </Grid>
            <Grid
              style={{
                color: globalColors?.textColor,
                fontFamily: "Public Sans",
                fontWeight: "800",
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
