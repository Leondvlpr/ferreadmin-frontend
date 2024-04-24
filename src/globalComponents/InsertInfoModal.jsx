import {
  Divider
} from "@mui/material";
import React from "react";
import { Toaster } from "react-hot-toast";
import { CustomModal } from "./CustomModal";

export const InsertInfoModal = ({
  open,
  handleClose,
  title,
  subTitle,
  children,
}) => {
  return (
    <div>
      <CustomModal
        open={open}
        handleClose={handleClose}
        style={{
          maxWidth: "700px",
          display: "flex",
          // justifyContent: "center",
          boxShadow: "none",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            margin: "20px 40px 40px 40px",
            width: "100%"
          }}
        >
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <h1>{title}</h1>
            <p>{subTitle}</p>
            <Divider />
          </div>
          {children}
        </div>
      </CustomModal>
      <Toaster />
    </div>
  );
};
