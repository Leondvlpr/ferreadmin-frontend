import { Backdrop, Fade, Grid, IconButton, Modal, Paper } from "@mui/material";
import React from "react";
import { Close } from "@mui/icons-material";
import { globalColors } from "./utils/GlobalColors";

export const CustomModal = ({ open, handleClose, children, style }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        // closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            style: {
              backgroundColor: globalColors.dominant,
              opacity: "0.5",
            },
          },
        }}
      >
        <Fade in={open}>
          <Paper
            style={{
              ...style,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              position: "relative",
              zIndex: "99999",
            }}
          >
            <IconButton
              style={{
                position: "absolute",
                right: 0,
              }}
              onClick={handleClose}
            >
              <Close />
            </IconButton>
            {children}
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};
