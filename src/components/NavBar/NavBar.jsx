import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
function NavBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { utilisateur, panier } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = [
    {
      id: 1,
      text: "Catégories",
      action: () => {
        navigate("/categorie");
      },
      roles: ["admin", "vendeur", "vendeur_super"],
    },
    {
      id: 2,
      text: "Utilisateurs",
      action: () => {
        navigate("/utilisateurs");
      },
      roles: ["admin", "vendeur", "vendeur_super"],
    },
    {
      id: 3,
      text: "Réservations",
      action: () => {
        navigate("/reservations");
      },
      roles: ["admin", "vendeur", "vendeur_super"],
    },
  ];
  const settings = [
    {
      id: 1,
      text: "Profil",
      action: () => {
        navigate("/profile");
      },
    },
    {
      id: 2,
      text: "Mes réservations",
      action: () => {
        navigate("/mes_reservations");
      },
    },
    {
      id: 3,
      text: "Logout",
      action: () => {
        dispatch({ type: actions.deconnecter });
        navigate("/");
      },
    },
  ];
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Baby-Fashion
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {utilisateur && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            )}

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {utilisateur &&
                pages.map((page) => {
                  return (
                    page.roles.includes(utilisateur.role) && (
                      <MenuItem
                        key={page.id}
                        onClick={() => {
                          handleCloseNavMenu();
                          page.action();
                        }}
                      >
                        <Typography textAlign="center">{page.text}</Typography>
                      </MenuItem>
                    )
                  );
                })}

              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center">Contacter nous</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center">Contacter nous</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Baby-Fashion
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/home");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              PRODUITS
            </Button>
            {utilisateur &&
              pages.map(
                (page) =>
                  page.roles.includes(utilisateur.role) && (
                    <Button
                      key={page.id}
                      onClick={() => {
                        handleCloseNavMenu();
                        page.action();
                      }}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page.text}
                    </Button>
                  )
              )}

            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/contact");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              CONTACT US
            </Button>
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/AboutUs");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              ABOUT US
            </Button>
          </Box>
          {utilisateur && (
            <Badge sx={{ mx: 5 }} badgeContent={panier.length} color="primary">
              <IconButton
                sx={{ color: "white" }}
                onClick={() => navigate("/panier")}
              >
                <ShoppingCartIcon />
              </IconButton>
            </Badge>
          )}

          {utilisateur != null ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={utilisateur.nom}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.id}
                    onClick={() => {
                      handleCloseUserMenu();
                      setting.action();
                    }}
                  >
                    <Typography textAlign="center">{setting.text}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <>
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  navigate("/connecter");
                }}
              >
                Se Connecter
              </Button>
              <Button
                style={{ margin: "0 10px" }}
                variant="contained"
                color="success"
                onClick={() => {
                  navigate("/inscrire");
                }}
              >
                Inscrire
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
