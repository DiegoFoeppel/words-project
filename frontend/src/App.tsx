import { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router";
import Quiz from "./components/Quiz";
import type { Word } from "./types";
import Home from "./components/Home";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      {/* {children} */}
      <Routes>
        <Route index element={<Home />} />
        <Route path='quiz' element={<Quiz />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
