import { useState } from "react"
import StyleContext from "./Hooks/useContext"
import AllRoutes from "./Routes"

function App() {

  const [backgroundColor, setBachgroundColor] = useState("")
  const [headerColor, setHeaderColor] = useState("")
  const [fontColor, setFontColor] = useState("")

  return (
    <StyleContext.Provider value={{
      backgroundColor: backgroundColor,
      setBachgroundColor: setBachgroundColor,
      headerColor: headerColor,
      setHeaderColor: setHeaderColor,
      fontColor: fontColor,
      setFontColor: setFontColor,
    }}>
      <AllRoutes />
    </StyleContext.Provider>
  )
}

export default App

