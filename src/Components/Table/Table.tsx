import "./Table.scss";
import { useState, useEffect, useContext } from "react";
import Pagination from "./Pagination";
import { UsersType } from "../Shared/Types";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import StyleContext from "../../Hooks/useContext";

export default function Table() {
   const md = useMediaQuery(1100)
   const lastIndex = md ? 4 : 6
   const [users, setUsers] = useState<UsersType>([])

   const style = useContext(StyleContext)

   // store header value
   const [header0, setHeader0] = useState<string | null>(null);
   const [header1, setHeader1] = useState<string | null>(null);
   const [header2, setHeader2] = useState<string | null>(null);
   const [header3, setHeader3] = useState<string | null>(null);
   const [header4, setHeader4] = useState<string | null>(null);
   const [header5, setHeader5] = useState<string | null>(null);


   function handleSelectHeader(e: any, index: number) {
      switch (index) {
         case 0:
            setHeader0(dataList[e.target.options.selectedIndex - 1].id);
            break;
         case 1:
            setHeader1(dataList[e.target.options.selectedIndex - 1].id);
            break;
         case 2:
            setHeader2(dataList[e.target.options.selectedIndex - 1].id);
            break;
         case 3:
            setHeader3(dataList[e.target.options.selectedIndex - 1].id);
            break;
         case 4:
            setHeader4(dataList[e.target.options.selectedIndex - 1].id);
            break;
         case 5:
            setHeader5(dataList[e.target.options.selectedIndex - 1].id);
            break;
         default:
            break;
      }
   }


   useEffect(() => {
      fetch(' http://localhost:3000/users')
         .then(res => res.json())
         .then(users => setUsers(users))
         .catch(error => alert(error))
   }, [])

   const [search, setSearch] = useState<string>("");


   // pagination functions 👇
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [postsPerPage, setPostsPerPage] = useState<number>(10);

   let paginationBtns: number[] = [];

   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;

   for (let i = 1; i <= Math.ceil(users.length / (postsPerPage ? postsPerPage : users.length)); i++) {
      paginationBtns.push(i);
   }

   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

   const searchFn = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value.toLowerCase());
      setCurrentPage(1);
   };

   const paginationFn = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPostsPerPage(Number(e.target.value));
      setCurrentPage(1);
   };
   // pagination functions 👆

//header options
   const dataList = [
      { id: "id", value: "ID" }, { id: "name", value: "Name" }, { id: "entry_date", value: "Entry Date" },
      { id: "salary", value: "Annual Salary" },
      { id: "monthly_salary", value: "Monthly Salary" }, { id: "address", value: "Address" }, { id: "phone", value: "Phone" },
      { id: "Experience Score", value: "Experience Score" }, { id: "pk_dataset", value: "pk Dataset" },
      { id: "region", value: "Region" }, { id: "country", value: "Country" }, { id: "latlang", value: "latlang" },
      { id: "personal_quote", value: "Personal Qoutes" }, { id: "birthday", value: "Birthday" },
      { id: "favorite_food", value: "Favorite Food" }
   ]

   return (
      <main className="table">
         <input className="input" type="search" placeholder="Search..." onChange={searchFn} />
         <table style={{ color: style.fontColor ? style.fontColor : "#000" }}>
            <thead>
               <tr
                style={{ backgroundColor: style.headerColor ? style.headerColor : "", 
                color: style.fontColor ? style.fontColor : "#000" }}>

                  {dataList.slice(0, lastIndex).map((data, index) => (
                     <th key={index}>
                        <select className="select"
                           onChange={e => handleSelectHeader(e, index)}>
                           <option value="">{data.value}</option>
                           {dataList.map((title, index) => (
                              <option key={index}>{title.value}</option>
                           ))}
                        </select>
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {users
                  .filter(
                     (user) =>
                        user.name.toLowerCase().includes(search) ||
                        user.entry_date.includes(search) ||
                        user.address.toLowerCase().includes(search) ||
                        user.phone.includes(search)
                  )
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((user, index) => (
                     <tr key={index} 
                     style={{ backgroundColor: index % 2 === 0 && style.backgroundColor ? style.backgroundColor : "",
                      color: style.fontColor ? style.fontColor : "#000" }}>
                        <td>{header0 ? user[header0] : user.id}</td>
                        <td>{header1 ? user[header1] : user.name}</td>
                        <td>{header2 ? user[header2] : user.entry_date}</td>
                        <td>{header3 ? user[header3] : user.salary}</td>
                        {
                           !md ?
                              <>
                                 <td>{header4 ? user[header4] : `$ ${(parseFloat((user.salary).replace(/[^\d.]/g, '')) / 12).toFixed(3)}`}</td>
                                 <td>{header5 ? user[header5] : user.address} </td>
                              </>
                              : ""
                        }

                     </tr>
                  ))}
            </tbody>
         </table>
         <Pagination
            paginate={paginate}
            paginationFn={paginationFn}
            paginationBtns={paginationBtns}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            postsPerPage={postsPerPage}
            users={users}
         />
      </main>
   );
}

