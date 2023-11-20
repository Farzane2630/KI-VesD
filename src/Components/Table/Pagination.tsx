import React, { useState } from 'react';
import { UsersType } from '../Shared/Types';

function Pagination({
   currentPage,
   setCurrentPage,
   paginationBtns,
   paginate,
   users,
   postsPerPage,
   paginationFn,
}: {
   currentPage: number;
   setCurrentPage: Function;
   paginationBtns: number[];
   paginate: Function;
   users: UsersType;
   postsPerPage: number;
   paginationFn: Function;
}) {
   const lastPage = Math.ceil(users.length / postsPerPage);
   const totalPagesToShow = 4;
   const [showNextBtn, setShowNextBtn] = useState<boolean>(false)

   return (
      <div className="pagination">
         <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
         >
            Prev
         </button>

         <div className="page-btn-wrapper">
            {
               lastPage >= totalPagesToShow ? (
                  <>
                     {paginationBtns.slice(0, totalPagesToShow).map((number, index) => (
                        <button
                           className={currentPage === number ? "pageBtns" : undefined}
                           key={index}
                           onClick={() => {
                              paginate(number)
                              if (index >= totalPagesToShow - 1 && index < lastPage) {
                                 setShowNextBtn(true)
                                 paginate(totalPagesToShow)
                              }
                           }}
                        >
                           {number}
                        </button>
                     ))}
                     {showNextBtn &&
                        <button
                           onClick={() => {
                              currentPage < lastPage &&
                                 paginate(currentPage + 1)
                              setShowNextBtn(true)

                           }}
                        >
                           {currentPage < totalPagesToShow ? currentPage + 1 : currentPage}
                        </button>
                     }
                     <button onClick={() => paginate(lastPage)}>{lastPage}</button>

                  </>
               ) : paginationBtns.map((number, index) => (
                  <button
                     className={currentPage === number ? "pageBtns" : undefined}
                     key={index}
                     onClick={() => {
                        paginate(number)
                     }}
                  >
                     {number}
                  </button>))
            }
         </div>

         <button
            disabled={currentPage === lastPage}
            onClick={() => paginate(currentPage + 1)}
         >
            Next
         </button>

         <input
            type="text"
            min="1"
            value={postsPerPage}
            onChange={(e) => paginationFn(e)}
         />
      </div>
   );
}

export default Pagination;
