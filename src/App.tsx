import { useState, useEffect } from "react";
import StyleContext from "./Hooks/useContext";
import AllRoutes from "./Routes";

function App() {
  // Helper function to get stored values from localStorage
  const getStoredValue = (key: string, defaultValue: string) => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  };

  const [backgroundColor, setBachgroundColor] = useState(() => getStoredValue("backgroundColor", ""));
  const [headerColor, setHeaderColor] = useState(() => getStoredValue("headerColor", ""));
  const [fontColor, setFontColor] = useState(() => getStoredValue("fontColor", ""));

  // useEffect to update localStorage when state changes
  useEffect(() => {
    localStorage.setItem("backgroundColor", JSON.stringify(backgroundColor));
  }, [backgroundColor]);

  useEffect(() => {
    localStorage.setItem("headerColor", JSON.stringify(headerColor));
  }, [headerColor]);

  useEffect(() => {
    localStorage.setItem("fontColor", JSON.stringify(fontColor));
  }, [fontColor]);

  return (
    <StyleContext.Provider
      value={{
        backgroundColor,
        setBachgroundColor,
        headerColor,
        setHeaderColor,
        fontColor,
        setFontColor,
      }}
    >
      <AllRoutes />
    </StyleContext.Provider>
  );
}

export default App;
