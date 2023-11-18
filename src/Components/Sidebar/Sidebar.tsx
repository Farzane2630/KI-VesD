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
const borderColers: ContentType = [
   { id: "1", color: "#ff7b25" },
   { id: "2", color: "#7a3b2e" },
   { id: "3", color: "#622569" },
   { id: "5", color: "#c83349" },
   { id: "6", color: "#3b3a30" },
   { id: "7", color: "#4f3222" },
   { id: "8", color: "#667292" },
   { id: "4", color: "#d64161" },
   { id: "9", color: "#588c7e" },
]
const fontColor: ContentType = [
   { id: "1", color: "#3b3a30" },
   { id: "2", color: "#563f46" },
   { id: "3", color: "#000" }
]

export default function Sidebar() {
   return (
      <aside className="sidebar">
         <ColorPallete content={bg} customBorder="1px solid #000" title="Background Color Pallate" />
         <ColorPallete content={borderColers} customBorder="1px dashed #fff" title="Border Color Pallate" />
         <ColorPallete content={fontColor} customBorder="1px dashed #fff" title="Font Color Pallate" />
      </aside>
   )
}
