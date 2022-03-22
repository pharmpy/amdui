import {useMemo} from "react";
import {createTheme} from "@mui/material/styles";

const useTheme = () => useMemo(() => createTheme({
  palette: {
    mode: 'dark'
  }
}), []);

export default useTheme;
