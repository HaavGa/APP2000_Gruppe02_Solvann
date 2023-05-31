import { useState } from "react";
import ReactPaginate from "react-paginate";
import Spinner from "../utils/Spinner";
import { ImUserTie } from "react-icons/im";

/**
 * @author Håvard Garsrud
 * Oppretter en tabell med brukere
 * @param {array} users users
 * @param {boolean} isLoading isLoading
 * @param {method} updateUser updateUser
 * @param {method} deleteUser deleteUser
 * @returns Liste med brukere
 */
const UsersList = ({ users, isLoading, updateUser, deleteUser }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  if (isLoading) {
    return (
      <div className="flex w-[38rem] items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <table>
      <div className="h-[40rem] w-[38rem] overflow-hidden rounded-lg bg-white">
        <thead className="bg-white">
          <tr>
            <th
              scope="col"
              className="p-5 text-left text-xs font-medium uppercase text-gray-500"
            >
              Navn
            </th>
            <th
              scope="col"
              className="p-5 text-left text-xs font-medium uppercase text-gray-500"
            >
              Rolle
            </th>
          </tr>
        </thead>
        {users
          .slice(pagesVisited, pagesVisited + usersPerPage)
          .map(({ _id, firstName, lastName, email, isAdmin }) => {
            return (
              <tbody key={_id} className="divide-y divide-gray-200 bg-white">
                <tr className=" hover:bg-gray-100">
                  <td className="flex items-center whitespace-nowrap p-4">
                    <div className="flex items-center space-x-4">
                      <ImUserTie className="h-8 w-8 rounded outline outline-2" />
                      <div className="text-left text-sm font-normal text-gray-500">
                        <div className="text-base font-semibold text-gray-900">
                          {firstName} {lastName}
                        </div>
                        <div className="text-sm font-normal text-gray-500">
                          <a href="#">{email}</a>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap p-4 text-base font-normal text-gray-900 lg:p-5">
                    <div className="flex items-center font-semibold">
                      {isAdmin ? "Administrator" : "Bruker"}
                    </div>
                  </td>
                  <td className="space-x-2 whitespace-nowrap p-4 lg:p-5">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-lg bg-gray-200 py-2 px-3 text-center text-sm font-medium text-gray-700 transition-all hover:scale-[1.02] hover:bg-gray-300 hover:text-gray-900"
                      onClick={() => updateUser(_id)}
                    >
                      <svg
                        className="mr-2 h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                        <path
                          fillRule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Rediger
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-lg bg-red-500 py-2 px-3 text-center text-sm font-medium text-white shadow-md shadow-gray-300 transition-transform hover:scale-[1.02] hover:bg-red-600"
                      onClick={() => deleteUser(_id)}
                      // onClick={openModal}
                    >
                      <svg
                        className="mr-2 h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Slett
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        <div className="flex justify-center pt-10">
          <ReactPaginate
            previousLabel="←"
            nextLabel="→"
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName="paginationBtns"
            previousClassName="prevBtn"
            nextClassName="nextBtn"
            activeClassName="activeBtn"
            disabledClassName="disabledBtn"
          />
        </div>
      </div>
    </table>
  );
};

export default UsersList;
