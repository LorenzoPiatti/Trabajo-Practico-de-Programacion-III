import { createContext, useState, useEffect } from "react";

// Creamos el contexto
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Leemos el tema guardado o usamos "light" por defecto
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Cuando cambia el tema, lo guardamos y actualizamos el DOM
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Alterna entre claro y oscuro
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
