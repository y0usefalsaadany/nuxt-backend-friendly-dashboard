<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Manage Users</h2>
      <button class="bg-green-600 text-white px-4 py-2 rounded-md">+ Add User</button>
    </div>

    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <table class="w-full text-left">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="p-4">Name</th>
            <th class="p-4">Email</th>
            <th class="p-4">Status</th>
            <th class="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b hover:bg-gray-50 transition">
            <td class="p-4">Ahmed Ali</td>
            <td class="p-4">ahmed@example.com</td>
            <td class="p-4"><span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Active</span></td>
            <td class="p-4">
              <button class="text-blue-600 mr-3">Edit</button>
              <button class="text-red-600">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>