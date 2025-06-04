import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Users = () => {
  const { users } = useSelector((state) => state.user);

  const formateDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getFullYear())}`;
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    const result = `${formattedDate} ${formattedTime}`;
    return result;
  };

  return (
    <>
      <main className="relative flex-1 p-6 pt-6 bg-gradient-to-r from-blue-50 via-indigo-100 to-pink-100 overflow-hidden">
        {/* Sub Header */}
        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center animate__animated animate__fadeIn overflow-hidden">
          <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg overflow-hidden  animate-pulse">
            Registered Users
          </h2>
        </header>

        {/* Table */}
        {users && users.filter((u) => u.role === 'User').length > 0 ? (
          <div className="mt-6 bg-white rounded-md  shadow-xl shadow-cyan-400/20 hover:shadow-xl transition-all duration-300 overflow-hidden">
            <table className="min-w-full border-collapse table-auto">
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800">
                  <th className="px-6 py-3 text-left text-lg font-semibold sticky left-0 bg-blue-100 z-10 shadow-md">
                    <span className="text-indigo-700 drop-shadow-[0_0_6px_rgba(99,102,241,0.7)]">
                      ID
                    </span>
                  </th>
                  <th className="px-6 py-3 text-left text-lg font-semibold text-pink-700 drop-shadow-[0_0_5px_rgba(236,72,153,0.6)]">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-lg font-semibold text-cyan-700 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-lg font-semibold text-blue-700 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
                    Role
                  </th>
                  <th className="px-6 py-3 text-center text-lg font-semibold text-purple-700 drop-shadow-[0_0_5px_rgba(139,92,246,0.5)]">
                    No. of Books
                  </th>
                  <th className="px-6 py-3 text-center text-lg font-semibold text-gray-700 drop-shadow-[0_0_4px_rgba(75,85,99,0.4)]">
                    Registered On
                  </th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((u) => u.role === 'User')
                  .map((user, index) => (
                    <tr
                      key={user._id}
                      className={`transition-transform duration-300 ease-in-out ${
                        (index + 1) % 2 === 0
                          ? 'bg-gradient-to-r from-gray-50 to-gray-100'
                          : 'bg-white'
                      } hover:scale-[1.01] hover:shadow-xl transition-all duration-300`}
                    >
                      <td className="px-6 py-3 font-bold text-indigo-600 sticky left-0 bg-white z-10 shadow-md">
                        {index + 1}
                      </td>
                      <td className="px-6 py-3 text-indigo-700 font-semibold hover:text-indigo-900 transition duration-300">
  {user.name}
</td>
<td className="px-6 py-3 text-emerald-700 font-medium hover:text-emerald-900 transition duration-300">
  {user.email}
</td>
<td className="px-6 py-3 text-purple-700 font-medium hover:text-purple-900 transition duration-300">
  {user.role}
</td>
<td className="px-6 py-3 text-orange-700 font-bold hover:text-orange-900 transition duration-300 text-center">
  {user?.borrowedBooks.length}
</td>
<td className="px-6 py-3 text-sky-700 hover:text-sky-900 transition duration-300 text-center">
  {formateDate(user.createdAt)}
</td>

                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-3xl mt-5 font-medium text-gray-500 text-center animate__animated animate__fadeIn">
            No registered user found in library
          </h3>
        )}
      </main>
    </>
  );
};

export default Users;
