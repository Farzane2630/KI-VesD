import "./Sidebar.scss"
import ColorPallete from "./ColorPallete";
import { ContentType } from "../Shared/Types";

const bg: ContentType = [
   { id: "1", color: "#d6cbd3" },
   { id: "2", color: "#b5e7a0" },
   { id: "3", color: "#f7cac9" },
   { id: "5", color: "#e6e2d3" },
   { id: "6", color: "#77a8a8" },
   { id: "7", color: "#a2836e" },
   { id: "8", color: "#96ceb4" },
   { id: "4", color: "#fefbd8" },
   { id: "9", color: "#b0aac0" },
]
const headerColers: ContentType = [
   { id: "1", color: "#c08cd5" },
   { id: "2", color: "#e6aaa3" },
   { id: "3", color: "#adbd76" },
   { id: "5", color: "#b1ef95" },
   { id: "6", color: "#ec94e1" },
   { id: "7", color: "#62ab91" },
   { id: "8", color: "#dfc3db" },
   { id: "4", color: "#cdc9a2" },
   { id: "9", color: "#98c8a6" },
]
const fontColor: ContentType = [
   { id: "1", color: "white" },
   { id: "2", color: "#563f46" },
   { id: "3", color: "red" }
]

export default function Sidebar() {
   return (
      <aside className="sidebar">
         <ColorPallete  content={bg} customBorder="1px solid #000" title="Background Color Pallate" />
         <ColorPallete  content={headerColers} customBorder="1px dashed #fff" title="Header Backgroun Color Pallate" />
         <ColorPallete  content={fontColor} customBorder="1px dashed #fff" title="Font Color Pallate" />
      </aside>
   )
}
