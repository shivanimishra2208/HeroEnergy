import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Energy from "./components/Energy";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Energy />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
