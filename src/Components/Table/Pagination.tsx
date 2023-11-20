import { UsersType } from '../Shared/Types'

function Pagination({
   currentPage, setCurrentPage, paginationBtns, paginate, users, postsPerPage, paginationFn
}: {
   currentPage: number, setCurrentPage: Function, paginationBtns: number[], paginate: Function, users: UsersType, postsPerPage: number, paginationFn: Function
}) {
   return (
      <div className="pagination">
         <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
         >
            Previous
         </button>

         <div className="page-btn-wrapper">
            {paginationBtns.map((number, index) => (
               <button
                  className={currentPage === number ? "pageBtns" : undefined}
                  key={index}
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
            type="text"
            min="1"
            value={postsPerPage}
            onChange={e => paginationFn}
         />

      </div>
   )
}

export default Pagination