<template>
  <div class="min-h-screen bg-gray-50 flex">
    <aside class="w-64 bg-slate-900 text-white hidden md:block">
      <div class="p-6 text-2xl font-bold">Admin Panel</div>
      <nav class="mt-6">
        <NuxtLink to="/" class="block py-3 px-6 hover:bg-slate-800">Dashboard</NuxtLink>
        <NuxtLink to="/users" class="block py-3 px-6 hover:bg-slate-800">Users (CRUD)</NuxtLink>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col">
      <header class="h-16 bg-white shadow-sm flex items-center px-8 justify-between">
        <h1 class="text-xl font-semibold text-gray-700">Welcome Back</h1>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">Logout</button>
      </header>
      
      <main class="p-8">
        <slot />
      </main>
    </div>
  </div>
</template>