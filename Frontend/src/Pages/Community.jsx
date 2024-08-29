import React from 'react';

function CommunityForum() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">Periode</h2>
          <select className="mt-2 p-2 w-full border rounded">
            <option>2022/2023 Ganjil</option>
          </select>
        </div>
        <div className="p-4">
          <input
            type="text"
            placeholder="Cari judul forum"
            className="w-full p-2 border rounded mb-4"
          />
          <ul className="space-y-2">
            {/* Add Forum Sections Here */}
            <li>
              <div className="font-semibold">IFB001 Basis Data</div>
            </li>
            <li>
              <div className="font-semibold">IFB012 Pemrograman Berorientasi Objek</div>
              <ul className="ml-4 space-y-1">
                <li className="flex justify-between">
                  <span>Forum 1</span>
                  <span className="text-red-500">12</span>
                </li>
                <li>Forum 2</li>
                <li>Forum 3</li>
              </ul>
            </li>
            {/* Add More Sections Here */}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Forum Header */}
        <header className="bg-white p-4 border-b">
          <h1 className="text-xl font-bold">Forum 1</h1>
          <p>IFB012 Pemrograman Berorientasi Objek</p>
          <div className="text-sm text-gray-500">
            <span>12 Des 2023 - 09:00 WIB</span> to <span>20 Des 2023 - 09:00 WIB</span>
          </div>
          <div className="mt-2 p-2 bg-yellow-100 text-yellow-700 text-sm rounded">
            Sebagai syarat kehadiran, Anda diwajibkan menuliskan komentar sebanyak 3 kali sebelum forum berakhir
          </div>
        </header>

        {/* Comments Section */}
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Comment */}
          <div className="mb-4">
            <div className="flex items-start space-x-4">
              <div>
                <span className="font-semibold text-blue-500">Rini Nirmala, M.Klin</span>
                <p className="mt-1">Ini kok gini gimana ???</p>
              </div>
            </div>
            <div className="ml-6 mt-2 space-y-1 text-sm text-gray-600">
              <p>hayo dibenerin dulu, jangan buru" dikumpulkan 😁</p>
            </div>
          </div>

          {/* Add More Comments Here */}
        </div>

        {/* Comment Input */}
        <div className="p-4 border-t bg-white">
          <input
            type="text"
            placeholder="Tulis komentar..."
            className="w-full p-2 border rounded"
          />
        </div>
      </main>
    </div>
  );
}

export default CommunityForum;
