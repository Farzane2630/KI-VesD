import "./Table.scss";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { UsersType } from "../Shared/Types";
import { useMediaQuery } from "../../Hooks/useMediaQuery";

export default function Table() {
   const sm = useMediaQuery(900)
   const [users, setUsers] = useState<UsersType>([])
   const [tableCell, settableCell] = useState("")
   const [headerIndex, setHeaderIndex] = useState<number>(0)
   const lastIndex = sm ? 5 : 6

   useEffect(() => {
      console.log("index=", headerIndex);
      console.log("tablecell=", tableCell);

   }, [tableCell, headerIndex])

   useEffect(() => {
      fetch(' http://localhost:3000/users')
         .then(res => res.json())
         .then(users => setUsers(users))
         .catch(error => alert(error))
   }, [])

   const [search, setSearch] = useState<string>("");


   // pagination functions 👇
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [postsPerPage, setPostsPerPage] = useState<number>(60);

   let paginationBtn: number[] = [];

   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;

   for (let i = 1; i <= Math.ceil(users.length / (postsPerPage ? postsPerPage : users.length)); i++) {
      paginationBtn.push(i);
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
         <input type="search" placeholder="Search..." onChange={searchFn} />
         <table>
            <thead>
               <tr>

                  {dataList.slice(0, lastIndex).map((data, index) => (
                     <th key={index}>
                        <select className="select"
                           onChange={e => {
                              setHeaderIndex(index)
                              settableCell(e.target.value)

                           }}
                        >
                           <option value="">{data.id}</option>
                           {dataList.map((title, index) => (
                              <option key={index}>{title.id}</option>
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
                     <tr key={index}>
                        <td>{index === headerIndex && user[tableCell!] || user.id}</td>
                        <td>{user[tableCell!] || user.name}</td>
                        <td>{user[tableCell!] || user.entry_date}</td>
                        <td>{user[tableCell!] || user.salary}</td>
                        <td>{user[tableCell!] || `$ ${user.salary && (parseFloat((user.salary).replace(/[^\d.]/g, '')) / 12).toFixed(3)}`}</td>
                        {
                           !sm ? <td>{user[tableCell!] || user.address} </td> : ""
                        }

                     </tr>
                  ))}
            </tbody>
         </table>
         <Pagination
            paginate={paginate}
            paginationFn={paginationFn}
            paginationBtn={paginationBtn}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            postsPerPage={postsPerPage}
            users={users}
         />
      </main>
   );
}
