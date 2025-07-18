export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth()

  // Daftar halaman yang boleh diakses tanpa login
  const publicPages = ['/login', '/register']

  // Jika belum login dan menuju halaman selain public
  if (status.value === 'unauthenticated' && !publicPages.includes(to.path)) {
    return navigateTo('/login')
  }
})
