<template>
  <div
    class="min-h-screen bg-gray-900 transition-colors duration-300 text-gray-900 dark:text-gray-100 cursor-default">
    <!-- Overlay for mobile sidebar -->
    <div v-if="isSidebarOpen" class="fixed inset-0 z-20 bg-black/50 lg:hidden" @click="isSidebarOpen = false"></div>

    <!-- Sidebar -->
    <aside :class="[
      'fixed top-0 bottom-0 z-30 w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 lg:translate-x-0',
      $i18n.locale === 'ar'
        ? (isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0') + ' right-0'
        : (isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0') + ' left-0'
    ]">
      <div class="flex items-center justify-center h-16 border-b border-gray-100 dark:border-gray-700">
        <h1 class="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Nuxt Dashboard
        </h1>
      </div>

      <nav class="p-4 space-y-1 overflow-y-auto">
        <NuxtLink to="/"
          class="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
          active-class="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium">
          <!-- Dashboard Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-colors" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          {{ $t('dashboard', 'Dashboard') }}
        </NuxtLink>

        <NuxtLink to="/users"
          class="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
          active-class="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium">
          <!-- Users Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-colors" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          {{ $t('users', 'Users') }}
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main Content Wrapper -->
    <div :class="[
      'transition-all duration-300 min-h-screen flex flex-col',
      $i18n.locale === 'ar' ? 'lg:mr-64' : 'lg:ml-64'
    ]">
      <!-- Header -->
      <header
        class="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
        <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <!-- Left Side: Mobile Menu Button & Search (Optional) -->
          <div class="flex items-center gap-4">
            <button @click="isSidebarOpen = !isSidebarOpen"
              class="p-2 text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <!-- Right Side: Controls -->
          <div class="flex items-center gap-3 sm:gap-4">
            <!-- Language Switcher -->
            <div class="relative group">
              <button
                class="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                <span class="font-medium text-sm">{{ locale === 'ar' ? 'عربي' : 'English' }}</span>
              </button>
              <!-- Dropdown -->
              <div
                class="absolute right-0 mt-2 w-32 bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                <a href="#" v-for="l in availableLocales" :key="l.code" @click.prevent.stop="setLocale(l.code)"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 first:rounded-t-lg last:rounded-b-lg"
                  :class="{ 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400': locale === l.code }">
                  {{ l.name }}
                </a>
              </div>
            </div>

            <!-- Theme Toggle -->
            <button @click="toggleTheme"
              class="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              :title="$colorMode.preference === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
              <!-- Sun Icon -->
              <svg v-if="$colorMode.value === 'dark'" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <!-- Moon Icon -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            <!-- User Profile Dropdown Placeholder -->
            <div class="items-center hidden gap-3 sm:flex pl-3 border-l border-gray-200 dark:border-gray-700">
              <div class="flex flex-col text-right rtl:text-left">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-200">Admin User</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">admin@example.com</span>
              </div>
              <div class="relative w-10 h-10 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
                <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd">
                  </path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8">
        <slot />
      </main>

      <!-- Footer -->
      <footer class="mt-auto px-6 py-4 bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <p class="text-center text-sm text-gray-500 dark:text-gray-400">
          © {{ new Date().getFullYear() }} Nuxt Dashboard. All rights reserved.
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n();
const colorMode = useColorMode();
const isSidebarOpen = ref(false);

const availableLocales = computed(() => locales.value);

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

const route = useRoute();

// Close sidebar on route change (mobile)
watch(() => route.path, () => {
  isSidebarOpen.value = false;
});

// Set direction based on locale
watchEffect(() => {
  if (process.client) {
    const dir = locale.value === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', locale.value);
  }
});
</script>

<style>
/* Transition for theme switching */
body {
  @apply transition-colors duration-300;
}
</style>