import {
  Button,
  createTheme,
  CssBaseline,
  MuiThemeProvider,
  Typography,
} from "@material-ui/core";

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import Login from "./pages/Login";

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

function App() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {!loading && (
        <>
          {user?.email ? (
            <>
              <Typography>Convo on Fire</Typography>
              <Button
                onClick={() => {
                  signOut(auth);
                }}
              >
                Log out
              </Button>
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
