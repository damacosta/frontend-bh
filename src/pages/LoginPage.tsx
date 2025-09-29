import React, { useState } from "react";
import logo from "../assets/logo.svg"
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log("Email:", data.get("email"));
    console.log("Senha:", data.get("password"));
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f6f6f6ff",
        display:"flex",
        alignItems:"center",
        justifyContent: "center"
      }}
    >
      {/* Lado esquerdo com logo */}
      <Grid
        size={{ xs: 12}}
        sx={{
          width: "45vw",
          height:"85vh",
          backgroundColor: "#ffffffff",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ maxWidth: "300px", marginBottom: "20px" }}
        />
      </Grid>

      {/* Lado direito com formulário */}
      <Grid
        size={{ xs: 12, md: 6}}
        sx={{
          width:"45vw",
          height:"85vh",
          background: "linear-gradient(to bottom, #0A4D9C, #3b95fbff)",
          color: "#fff",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        {/* Botão voltar */}
        <IconButton
          onClick={() => navigate("/")}
          sx={{ position: "absolute", top: 16, right: 16, color: "#fff" }}
        >
          <ArrowBack />
        </IconButton>

        <Container maxWidth="xs">
          <Typography component="h1" variant="h3" align="center" gutterBottom>
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Usuário ou Email"
              name="email"
              autoComplete="off"
              autoFocus
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
              }}
              variant="standard"
            />

            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Senha"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />

            <Box textAlign="right" mt={1}>
              <MuiLink
                href="/reset-password"
                variant="body2"
                underline="hover"
                sx={{ color: "white" }}
              >
                Esqueceu a senha?
              </MuiLink>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#4f9ef8ff",
                ":hover": { backgroundColor: "#3b82f6" },
              }}
            >
              Entrar
            </Button>

            <Typography variant="body2" align="center">
              Não tem conta?{" "}
              <Link to="/" style={{ color: "#ffffffff" }}>
                Registre-se
              </Link>
            </Typography>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
