import { useState, useEffect } from "react";
import "./Table.scss";

interface Users {
   id: "",
   pk_usersset?: ""
   name: ""
   country: "",
   region?: "",
   latlng?: ""
   personal_quote?: ""
   salary: "",
   birthday?: "",
   entry_date: "",
   address: "",
   phone: "",
   experience_score: Number,
   favorite_food?: ""
}

export default function Table() {
   const [users, setUsers] = useState<Users[]>([])

   useEffect(() => {
      fetch(' http://localhost:3000/users')
         .then(res => res.json())
         .then(users => setUsers(users))
         .catch(error => alert(error))
   }, [])

   const [search, setSearch] = useState<string>("");
   const [sorted, setSorted] = useState<{ reversed: boolean }>({ reversed: false });
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [postsPerPage, setPostsPerPage] = useState<number>(60);

   const sortFunction = (e: string) => {
      const usersCopy = [...users];

      if (e === "sortByName") {
         usersCopy.sort((a, b) => {
            if (sorted.reversed) {
               return b.name.localeCompare(a.name);
            }
            return a.name.localeCompare(b.name);
         });
         setSorted({ reversed: !sorted.reversed });
      } else if (e === "sortByLastName") {
         usersCopy.sort((a, b) => {
            if (sorted.reversed) {
               return b.id.localeCompare(a.id);
            }
            return a.id.localeCompare(b.id);
         });
         setSorted({ reversed: !sorted.reversed });
      }
   };

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

   return (
      <>
         <input type="search" placeholder="Search..." onChange={searchFn} />
         <table>
            <thead>
               <tr>
                  <th>Index</th>
                  <th>ID</th>
                  <th onClick={() => sortFunction("sortByName")}>Name</th>
                  <th>Entry Date</th>
                  <th>Annual Salary</th>
                  <th>Monthly Salary</th>
                  <th>Adress</th>
                  <th>Phone</th>
                  <th>Experience Score</th>

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
                     <tr key={user.id}>
                        <td>{index}</td>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.entry_date}</td>
                        <td>{user.salary}</td>
                        {/* count monthly salary based on the annual salary */}
                        <td>${user.salary && parseFloat((user.salary).replace(/[^\d.]/g, '')) / 12 }</td>
                        <td>{user.address}</td>
                        <td>{user.phone}</td>
                        {/* @ts-ignore */}
                        <td>{user.experience_score}</td>
                     </tr>
                  ))}
            </tbody>
         </table>
         <div className="pagination">
          
               <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
               >
                  Previous
               </button>

            <div className="page-btn-wrapper">
            {paginationBtn.map((number) => (
               <button
                  className={currentPage === number ? "pageBtns" : undefined}
                  key={number}
                  onClick={() => paginate(number)}
               >
                  {number}
               </button>
            ))}
            </div>

               <button
                  disabled={currentPage === Math.ceil(users.length / postsPerPage)}
                  onClick={() => setCurrentPage(currentPage + 1)}
               >
                  Next
               </button>
     
        
               <input
                  type="number"
                  min="1"
                  value={postsPerPage}
                  onChange={paginationFn}
               />
         
         </div>
      </>
   );
}
