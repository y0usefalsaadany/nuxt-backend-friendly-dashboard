<template>
  <div>
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <div>
        <h2 class="text-2xl font-bold text-white">{{ t('manage_users') }}</h2>
        <p class="text-sm text-gray-400 mt-1">{{ t('manage_users_desc') }}</p>
      </div>
      <button
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        {{ t('add_user') }}
      </button>
    </div>

    <!-- Controls Section (Search) -->
    <div
      class="bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-700 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div class="relative w-full sm:w-72">
        <span class="absolute inset-y-0 start-0 flex items-center ps-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input v-model="searchQuery" type="text" :placeholder="t('search_placeholder')"
          class="w-full ps-10 pe-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400 outline-none transition-all" />
      </div>

      <!-- Filter placeholder (optional future expansion) -->
      <div class="flex gap-2">
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-start">
          <!-- Table Head -->
          <thead class="bg-gray-700/50 border-b border-gray-700">
            <tr>
              <th class="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-start">
                {{ t('name') }}</th>
              <th class="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-start">
                {{ t('email') }}</th>
              <th class="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-start">
                {{ t('role') }}</th>
              <th class="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-start">
                {{ t('status') }}</th>
              <th class="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-end">
                {{ t('actions') }}</th>
            </tr>
          </thead>
          <!-- Table Body -->
          <tbody class="divide-y divide-gray-700">
            <tr v-for="user in paginatedUsers" :key="user.id"
              class="group hover:bg-gray-700/50 transition-colors duration-150">
              <!-- Name -->
              <td class="p-4 text-start">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center text-indigo-400 font-bold text-sm">
                    {{ getInitials(user.name) }}
                  </div>
                  <div>
                    <div class="font-medium text-white group-hover:text-indigo-400 transition-colors">
                      {{ user.name }}</div>
                    <div class="text-xs text-gray-400 sm:hidden">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <!-- Email -->
              <td class="p-4 text-sm text-gray-300 text-start">{{ user.email }}</td>
              <!-- Role -->
              <td class="p-4 text-sm text-gray-300 text-start">
                {{ t(`role_${user.role.toLowerCase()}`) }}
              </td>
              <!-- Status -->
              <td class="p-4 text-start">
                <span :class="[
                  'px-2.5 py-1 rounded-full text-xs font-medium border',
                  user.status === 'Active'
                    ? 'bg-green-900/20 text-green-400 border-green-900/30'
                    : 'bg-gray-700 text-gray-400 border-gray-600'
                ]">
                  {{ t(user.status.toLowerCase()) }}
                </span>
              </td>
              <!-- Actions -->
              <td class="p-4 text-end">
                <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button class="p-1.5 text-blue-400 hover:bg-blue-900/30 rounded transition-colors" :title="t('edit')">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button class="p-1.5 text-red-400 hover:bg-red-900/30 rounded transition-colors" :title="t('delete')">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <!-- Empty State -->
            <tr v-if="paginatedUsers.length === 0">
              <td colspan="5" class="p-8 text-center text-gray-400">
                <div class="flex flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-gray-600" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p>{{ t('no_users_found', { query: searchQuery }) }}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div v-if="totalPages > 1"
        class="border-t border-gray-700 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span class="text-sm text-gray-400">
          {{ t('showing_results', {
            start: (currentPage - 1) * itemsPerPage + 1, end: Math.min(currentPage *
              itemsPerPage, filteredUsers.length), total: filteredUsers.length
          }) }}
        </span>
        <div class="flex gap-2">
          <button @click="prevPage" :disabled="currentPage === 1"
            class="px-3 py-1 rounded-md border border-gray-600 text-sm font-medium text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            {{ t('previous') }}
          </button>
          <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="[
            'px-3 py-1 rounded-md text-sm font-medium transition-colors',
            currentPage === page
              ? 'bg-indigo-600 text-white border border-indigo-600'
              : 'border border-gray-600 text-gray-300 hover:bg-gray-700'
          ]">
            {{ page }}
          </button>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-3 py-1 rounded-md border border-gray-600 text-sm font-medium text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            {{ t('next') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();

// Mock Data Generation
const generateMockUsers = (count) => {
  const users = [];
  const statusOptions = ['Active', 'Inactive'];
  const roleOptions = ['Admin', 'Editor', 'User', 'Viewer'];

  for (let i = 1; i <= count; i++) {
    users.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      role: roleOptions[Math.floor(Math.random() * roleOptions.length)],
      status: statusOptions[Math.floor(Math.random() * statusOptions.length)]
    });
  }
  return users;
};

const users = ref([
  { id: 0, name: 'Ahmed Ali', email: 'ahmed@example.com', role: 'Admin', status: 'Active' },
  ...generateMockUsers(24) // 25 total users
]);

// Search Logic
const searchQuery = ref('');

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  const lowerQuery = searchQuery.value.toLowerCase();
  return users.value.filter(user =>
    user.name.toLowerCase().includes(lowerQuery) ||
    user.email.toLowerCase().includes(lowerQuery)
  );
});

// Pagination Logic
const currentPage = ref(1);
const itemsPerPage = 8;

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage));

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredUsers.value.slice(start, end);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// Reset pagination when search changes
watch(searchQuery, () => {
  currentPage.value = 1;
});

// Helper for Initials
const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};
</script>