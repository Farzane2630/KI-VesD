import { Dispatch, createContext } from "react";

interface contextPropTypes {
   backgroundColor: string,
   setBachgroundColor: Dispatch<string>,
   headerColor: string,
   setHeaderColor: Dispatch<string>,
   fontColor: string,
   setFontColor: Dispatch<string>,
}

const StyleContext = createContext<contextPropTypes>({
   backgroundColor: "",
   setBachgroundColor: () => {},
   headerColor: "",
   setHeaderColor: () => {},
   fontColor: "",
   setFontColor: () => {},
});

export default StyleContext;
