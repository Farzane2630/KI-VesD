import "./Sidebar.scss"
import { ContentType } from "../Shared/Types"
import { useContext, useState } from "react"
import StyleContext from "../../Hooks/useContext"


export default function ColorPallete({ content, customBorder, title }: { content: ContentType, customBorder: string, title: string }) {
   const [unitIndex, setUnitIndex] = useState<Number>(0)
   const style = useContext(StyleContext)

   const handleClick = (index: number, color: { id: string, color: string }) => {
      setUnitIndex(index)
      title === "Background Color Pallate" && style.setBachgroundColor(color.color)
      title === "Header Backgroun Color Pallate" && style.setHeaderColor(color.color)
      title === "Font Color Pallate" && style.setFontColor(color.color)
   }


   return (
      <div className='container'>
         <p className="title">
            {title}
         </p>
         <div className="color-pllate">
            {
               content.map((color, index) => (
                  <div
                     onClick={() => handleClick(index, color)}
                     key={index}
                     className="color-unit"
                     style={{
                        backgroundColor: `${color.color}`,
                        border: `${unitIndex === index ? customBorder : ""}`}} ></div>
               ))
            }
         </div>
      </div>
   )
}

