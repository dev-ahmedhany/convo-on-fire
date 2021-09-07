import React from "react";
import {
  createTheme,
  CssBaseline,
  MuiThemeProvider,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AccountCircle, Notifications } from "@material-ui/icons";
import { signOut } from "firebase/auth";
import useAuthState from "./customHooks/useAuthState";
import Login from "./pages/Login";
import Home from "./pages/Home";

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)",
          backgroundAttachment: "fixed",
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const menuId = "account-menu";

  const { loading, user, auth } = useAuthState();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {!loading && (
        <>
          {user?.uid ? (
            <>
              <div>
                <Box height="100vh" display="flex" flexDirection="column">
                  <Box>
                    <AppBar position="static">
                      <Toolbar>
                        <Typography variant="h6" noWrap>
                          Convo On Fire
                        </Typography>
                        <div className={classes.grow} />
                        <IconButton aria-label="notifications" color="inherit">
                          <Badge badgeContent={17} color="secondary">
                            <Notifications />
                          </Badge>
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="account of current user"
                          aria-controls={menuId}
                          aria-haspopup="true"
                          onClick={handleProfileMenuOpen}
                          color="inherit"
                        >
                          <AccountCircle />
                        </IconButton>
                      </Toolbar>
                    </AppBar>
                    <Menu
                      anchorEl={anchorEl}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      id={menuId}
                      keepMounted
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleMenuClose();
                          signOut(auth);
                        }}
                      >
                        Log out
                      </MenuItem>
                    </Menu>
                  </Box>
                  <Box flex={1} overflow="auto">
                    <Home uid={user.uid} />
                  </Box>
                </Box>
              </div>
            </>
          ) : (
            <Login />
          )}
        </>
      )}
    </MuiThemeProvider>
  );
}

export default App;
