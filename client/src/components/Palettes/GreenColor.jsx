import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import React from "react";

const savedMode = window.localStorage.getItem("ThemeMode")
  ? window.localStorage.getItem("ThemeMode")
  : "light";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  mode: savedMode,
});

export const ColorProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");
  //console.log(mode);
  const colorMode = useMemo(
    () => ({
      toggleMode: () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        window.localStorage.setItem("ThemeMode", newMode);
      },
      mode,
    }),
    [mode]
    );

    const colorMiScusi = createTheme({
      palette: {
        mode: mode,
        primary: {
          main: "#287ccb",
        },
        secondary: {
          main: "#34495e",
        },
      },
    });
    
    return (
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={colorMiScusi}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
// import { createTheme } from '@mui/material/styles';

// const colorMiScusi = createTheme({
//     palette: {
//       primary: {
//         main: '#287ccb',
//       },
//       secondary: {
//         main: '#34495e',
//       },
//     },
// });

// export default colorMiScusi