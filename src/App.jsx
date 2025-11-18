import { ChakraProvider,
  Box
 } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { DealProvider } from "./context/DealContext";
import Navbar from "./components/layout/Navbar";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <DealProvider>
            <Box minH="100vh" w="100%" bg="gray.50" display="flex" flexDirection="column">
              <Navbar />
              {/* This will now fill the remaining space */}
              <Box flex="1">
                <AppRoutes />
              </Box>
            </Box>
          </DealProvider>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
