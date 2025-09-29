// import { MantineProvider } from "@mantine/core";
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <MantineProvider withGlobalStyles withNormalizeCSS>
//       <App />
//     </MantineProvider>
//   </React.StrictMode>,
// );

import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
