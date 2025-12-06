// 'use client';

// import { useState } from 'react';

// // --- MOCK DATA USER (Giả lập DB) ---
// const INITIAL_USERS = [
//   { id: 'USR-001', name: 'Nguyễn Minh Tâm', email: 'tam@gmail.com', role: 'Host', joinedDate: '2023-10-15', status: 'Active' },
//   { id: 'USR-002', name: 'Phạm Hồng Phát', email: 'phat@gmail.com', role: 'Guest', joinedDate: '2024-01-20', status: 'Active' },
//   { id: 'USR-003', name: 'Cao Thanh Bằng', email: 'bang@gmail.com', role: 'Guest', joinedDate: '2024-02-10', status: 'Banned' },
//   { id: 'USR-004', name: 'Lương Tấn Tài', email: 'tai@gmail.com', role: 'Host', joinedDate: '2023-11-05', status: 'Active' },
//   { id: 'USR-005', name: 'Nguyễn Minh Quân', email: 'quan@gmail.com', role: 'Guest', joinedDate: '2024-03-01', status: 'Active' },
// ];

// export default function AdminDashboard() {
//   const [users, setUsers] = useState(INITIAL_USERS);
  
//   // State cho Filter/Search/Sort
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterRole, setFilterRole] = useState('All');
//   const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

//   // --- LOGIC 1: CALL PROCEDURE (SYSTEM MAINTENANCE) ---
//   const handleSyncData = () => {
//     if(confirm("Chạy thủ tục sp_SyncSystemData để đồng bộ lại toàn bộ dữ liệu?")) {
//       // Giả lập gọi SQL
//       alert("✅ CALL sp_SyncSystemData('ALL', @Msg);\n\n-> Result: Successfully synchronized data for: ALL");
//     }
//   };

//   // --- LOGIC 2: DELETE USER (CRUD - DELETE) ---
//   const handleDeleteUser = (id: string) => {
//     if(confirm(`Bạn có chắc muốn xóa User ${id}? Tất cả dữ liệu liên quan sẽ bị xóa (Cascade Delete).`)) {
//       setUsers(users.filter(u => u.id !== id));
//       alert(`✅ DELETE FROM user WHERE User_ID = '${id}';`);
//     }
//   };

//   // --- LOGIC 3: CREATE USER (CRUD - CREATE FROM LIST) ---
//   const handleAddUser = () => {
//     const name = prompt("Nhập tên User mới:");
//     if (name) {
//       const newUser = {
//         id: `USR-${Math.floor(Math.random()*1000)}`,
//         name: name,
//         email: `${name.toLowerCase().replace(' ', '')}@gmail.com`,
//         role: 'Guest',
//         joinedDate: new Date().toISOString().split('T')[0],
//         status: 'Active'
//       };
//       setUsers([newUser, ...users]);
//       alert("✅ INSERT INTO User (Name, Email...) VALUES (...)");
//     }
//   };

//   // --- LOGIC 4: FILTER & SORT (DATA RETRIEVAL) ---
//   const filteredUsers = users
//     .filter(user => {
//       // Lọc theo Role
//       if (filterRole !== 'All' && user.role !== filterRole) return false;
//       // Lọc theo Search (Tên hoặc Email)
//       const searchLower = searchTerm.toLowerCase();
//       return user.name.toLowerCase().includes(searchLower) || user.email.toLowerCase().includes(searchLower);
//     })
//     .sort((a, b) => {
//       // Sắp xếp theo ngày
//       return sortOrder === 'desc' 
//         ? new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime()
//         : new Date(a.joinedDate).getTime() - new Date(b.joinedDate).getTime();
//     });

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
//         <button 
//           onClick={handleSyncData}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold shadow-md transition flex items-center gap-2"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 animate-spin-slow">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
//           </svg>
//           SYNC SYSTEM DATA
//         </button>
//       </div>

//       {/* STATS CARDS */}
//       <div className="grid grid-cols-3 gap-6 mb-10">
//         <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
//           <div className="text-gray-500 font-medium">Total Users</div>
//           <div className="text-3xl font-bold text-gray-800">{users.length}</div>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
//           <div className="text-gray-500 font-medium">Total Listings</div>
//           <div className="text-3xl font-bold text-gray-800">124</div>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
//           <div className="text-gray-500 font-medium">Total Bookings</div>
//           <div className="text-3xl font-bold text-gray-800">1,052</div>
//         </div>
//       </div>

//       {/* USER MANAGEMENT SECTION */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between gap-4">
//           <div>
//             <h2 className="text-xl font-bold text-gray-800">User Management</h2>
//             <p className="text-sm text-gray-500">View, search and manage system users.</p>
//           </div>
          
//           {/* ACTION BAR: CREATE NEW */}
//           <button 
//             onClick={handleAddUser}
//             className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2"
//           >
//             + Add New User
//           </button>
//         </div>

//         {/* TOOLBAR: FILTER & SEARCH */}
//         <div className="p-4 bg-gray-50 flex flex-wrap gap-4 items-center border-b border-gray-200">
          
//           {/* Search */}
//           <div className="relative">
//             <input 
//               type="text" 
//               placeholder="Search by name or email..." 
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:ring-2 focus:ring-indigo-500 outline-none"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>

//           {/* Filter Role */}
//           <select 
//             className="py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
//             value={filterRole}
//             onChange={(e) => setFilterRole(e.target.value)}
//           >
//             <option value="All">All Roles</option>
//             <option value="Host">Host</option>
//             <option value="Guest">Guest</option>
//           </select>

//           {/* Sort Date */}
//           <select 
//             className="py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
//           >
//             <option value="desc">Newest First</option>
//             <option value="asc">Oldest First</option>
//           </select>

//         </div>

//         {/* TABLE */}
//         <table className="w-full text-left">
//           <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
//             <tr>
//               <th className="p-4">User Info</th>
//               <th className="p-4">Role</th>
//               <th className="p-4">Status</th>
//               <th className="p-4">Joined Date</th>
//               <th className="p-4 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {filteredUsers.length === 0 ? (
//               <tr><td colSpan={5} className="p-8 text-center text-gray-500">No users found matching your filters.</td></tr>
//             ) : (
//               filteredUsers.map(user => (
//                 <tr key={user.id} className="hover:bg-gray-50">
//                   <td className="p-4">
//                     <div className="font-bold text-gray-900">{user.name}</div>
//                     <div className="text-xs text-gray-500">{user.email}</div>
//                     <div className="text-xs text-gray-400 font-mono mt-1">{user.id}</div>
//                   </td>
//                   <td className="p-4">
//                     <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'Host' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
//                       {user.role}
//                     </span>
//                   </td>
//                   <td className="p-4">
//                     <span className={`px-2 py-1 rounded text-xs font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                       {user.status}
//                     </span>
//                   </td>
//                   <td className="p-4 text-sm text-gray-600">
//                     {user.joinedDate}
//                   </td>
//                   <td className="p-4 text-right">
//                     <button 
//                       onClick={() => handleDeleteUser(user.id)}
//                       className="text-red-600 hover:bg-red-50 px-3 py-1 rounded font-bold text-sm transition"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { adminApi } from '@/app/service/api';

export default function AdminDashboard() {
  // State Data
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ totalUsers: 0, totalListings: 0, totalBookings: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // State Search/Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');
  const [sortOrder, setSortOrder] = useState<'DESC' | 'ASC'>('DESC');

  // State Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // State Modal Create User
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'GUEST' });

  // 1. FETCH DATA (Mỗi khi filter thay đổi)
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, usersRes] = await Promise.all([
        adminApi.getStats(),
        adminApi.getUsers({ search: searchTerm, role: filterRole, sortOrder })
      ]);
      setStats(statsRes);
      setUsers(usersRes);
      setCurrentPage(1); // Reset về trang 1 khi lọc
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search để không gọi API liên tục
  useEffect(() => {
    const timer = setTimeout(() => fetchData(), 500);
    return () => clearTimeout(timer);
  }, [searchTerm, filterRole, sortOrder]);

  // 2. LOGIC PAGINATION (Cắt mảng users)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // 3. ACTION HANDLERS
  const handleDeleteUser = async (id: string) => {
    if(confirm(`Xóa user ${id}? Hành động này không thể hoàn tác!`)) {
      try {
        await adminApi.deleteUser(id);
        fetchData();
        alert("Đã xóa thành công!");
      } catch (e) {
        alert("Lỗi khi xóa user");
      }
    }
  };

  const handleSyncData = async () => {
    if(confirm("Đồng bộ lại toàn bộ dữ liệu hệ thống?")) {
      try {
        const res = await adminApi.syncData();
        alert(res.message);
        fetchData();
      } catch (e) {
        alert("Lỗi sync");
      }
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await adminApi.createUser(newUser as any);
      alert(`✅ Tạo thành công!\nID: ${res.user.id}\nPass mặc định: ${res.user.defaultPassword}`);
      setShowModal(false);
      setNewUser({ name: '', email: '', role: 'GUEST' });
      fetchData();
    } catch (err: any) {
      alert("Lỗi tạo user: " + err.message);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5; 

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages.map((page, index) => (
      <button
        key={index}
        onClick={() => typeof page === 'number' && setCurrentPage(page)}
        disabled={page === '...'}
        className={`px-3 py-1 border rounded text-sm min-w-[32px] transition
          ${page === currentPage ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white hover:bg-gray-100 text-gray-700'}
          ${page === '...' ? 'border-none bg-transparent cursor-default' : ''}
        `}
      >
        {page}
      </button>
    ));
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <button onClick={handleSyncData} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold shadow-md transition flex items-center gap-2">
          SYNC DATA
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <div className="text-gray-500 font-medium">Total Users</div>
          <div className="text-3xl font-bold text-gray-800">{stats.totalUsers}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <div className="text-gray-500 font-medium">Total Listings</div>
          <div className="text-3xl font-bold text-gray-800">{stats.totalListings}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <div className="text-gray-500 font-medium">Total Bookings</div>
          <div className="text-3xl font-bold text-gray-800">{stats.totalBookings}</div>
        </div>
      </div>

      {/* USER MANAGEMENT */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-800">User Management</h2>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold text-sm"
          >
            + Add New User
          </button>
        </div>

        {/* TOOLBAR */}
        <div className="p-4 bg-gray-50 flex flex-wrap gap-4 items-center border-b border-gray-200">
          <input 
            type="text" 
            placeholder="Search name/email..." 
            className="px-4 py-2 border rounded-lg w-64 focus:ring-2 outline-none"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select 
            className="px-4 py-2 border rounded-lg bg-white"
            value={filterRole}
            onChange={e => setFilterRole(e.target.value)}
          >
            <option value="ALL">All Roles</option>
            <option value="HOST">Host Only</option>
            <option value="GUEST">Guest Only</option>
          </select>
          <select 
            className="px-4 py-2 border rounded-lg bg-white"
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value as any)}
          >
            <option value="DESC">Newest First</option>
            <option value="ASC">Oldest First</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
              <tr>
                <th className="p-4">User Info</th>
                <th className="p-4">Role</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={4} className="p-8 text-center">Loading data...</td></tr>
              ) : currentUsers.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">No users found.</td></tr>
              ) : (
                currentUsers.map((user: any) => (
                  <tr key={user.User_ID} className="hover:bg-gray-50 transition">
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{user.Name}</div>
                      <div className="text-xs text-gray-500">{user.Email}</div>
                      <div className="text-xs text-gray-400 font-mono mt-1">{user.User_ID}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${user.Role === 'Host' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                        {user.Role}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(user.Joined_Date).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link 
                        href={`/admin/users/${user.User_ID}`}
                        className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded font-bold text-sm"
                      >
                        Detail
                      </Link>
                      <button 
                        onClick={() => handleDeleteUser(user.User_ID)}
                        className="text-red-600 hover:bg-red-50 px-3 py-1 rounded font-bold text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        {/* PAGINATION CONTROLS */}
<div className="p-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 bg-gray-50 gap-4">
   
   <span className="text-sm text-gray-600">
      Showing <strong>{indexOfFirstItem + 1}</strong> to <strong>{Math.min(indexOfLastItem, users.length)}</strong> of <strong>{users.length}</strong> users
   </span>

   <div className="flex gap-1 items-center">
      {/* Nút Prev */}
      <button 
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 text-sm font-medium"
      >
        Previous
      </button>

      {/* Logic hiển thị số trang thông minh (Smart Pagination) */}
      {renderPagination()}

      {/* Nút Next */}
      <button 
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 text-sm font-medium"
      >
        Next
      </button>
   </div>
</div>
    </div>

      {/* MODAL CREATE USER */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl w-96 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Create New User</h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Name</label>
                <input required type="text" className="w-full border p-2 rounded" 
                  value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Email</label>
                <input required type="email" className="w-full border p-2 rounded" 
                  value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Role</label>
                <select className="w-full border p-2 rounded" 
                  value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}>
                  <option value="GUEST">Guest</option>
                  <option value="HOST">Host</option>
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 border rounded">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-green-600 text-white rounded font-bold">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}