import "./Sidebar.scss"
import { ContentType } from "../Shared/Types"
import { useState } from "react"


export default function ColorPallete({ content, customBorder, title }: { content: ContentType, customBorder: String, title: String }) {
   const [unitIndex, setUnitIndex] = useState<Number>(0)
   return (
      <div className='container'>
         <p className="title">
            {title}
         </p>
         <div className="color-pllate">
            {
               content.map((color, index) => (
                  <div
                     onClick={() => setUnitIndex(index)}
                     key={index}
                     className="color-unit"
                     style={{
                        backgroundColor: `${color.color}`,
                        border: `${unitIndex === index ? customBorder : ""}`
                     }}
                  >
                  </div>
               ))
            }
         </div>
      </div>
   )
}

