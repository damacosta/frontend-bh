import React from "react";
import logo from "/assets/bh.svg";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const location = useLocation();
  const { loginWithRedirect } = useAuth0();

  const fromPath = (location.state as { from: string })?.from || "/dashboard";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginWithRedirect({ appState: { returnTo: fromPath } });
  };

  const handleRegister = () => {
    loginWithRedirect({ screen_hint: "signup", appState: { returnTo: fromPath } });
  };

  const handleResetPassword = () => {
    loginWithRedirect({ screen_hint: "reset_password" });
  };


  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f6f6f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        sx={{
          width: "45vw",
          height: "85vh",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
        }}
      >
        <img src={logo} alt="Logo" style={{ maxWidth: "300px", marginBottom: "20px" }} />
      </Grid>

      <Grid
        sx={{
          width: "45vw",
          height: "85vh",
          background: "linear-gradient(to bottom, #0A4D9C, #3b95fbff)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        <Container maxWidth="xs">
          <Typography component="h1" variant="h3" align="center" gutterBottom>
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#4f9ef8ff", ":hover": { backgroundColor: "#3b82f6" } }}
            >
              Entrar com Auth0
            </Button>
            <Typography variant="body2" align="center">
              Não tem conta?{" "}
              <Box
                component="button"
                onClick={handleRegister}
                sx={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  margin: 0,
                  color: "#fff",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: "inherit",
                  fontFamily: "inherit",
                }}
              >
                Registre-se
              </Box>
            </Typography>
            <Typography variant="body2" align="center" sx={{ mt: 1 }}>
              Esqueceu a senha?{" "}
              <Box
                component="button"
                onClick={handleResetPassword}
                sx={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  margin: 0,
                  color: "#fff",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontSize: "inherit",
                  fontFamily: "inherit",
                }}
              >
                Clique aqui
              </Box>
            </Typography>

          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
