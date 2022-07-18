import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import Index from "./pages/index";
import Calc from "./pages/calc";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="calc" element={<Calc />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
