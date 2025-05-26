import { Menu as MenuMUI } from "@mui/material";

const Menu = ({ children, anchorEl, handleClose }: any) => {
  return (
    <MenuMUI
      sx={{ top: "14px" }}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      {children}
    </MenuMUI>
  );
};

export default Menu;
