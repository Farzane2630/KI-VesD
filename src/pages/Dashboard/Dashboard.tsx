import { useEffect, useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Table from '../../Components/Table/Table'
import { useMediaQuery } from '../../Hooks/useMediaQuery'
import "./Dashboard.scss"

export default function Dashboard() {
  const xS = useMediaQuery(450)
  const [isClicked, setIsClicked] = useState<boolean>(false)

  useEffect(()=>{
    console.log(isClicked);
    
  },[isClicked])

  return (
    <div className="dashboard">
      {
        xS  ? (
      <button className="style-btn" onClick={()=> setIsClicked(!isClicked)}>
        🎨
      </button>

        ):""
      }
      {
        !xS || isClicked ? (<Sidebar />) : ""
      }
      <Table />
    </div>
  )
}
