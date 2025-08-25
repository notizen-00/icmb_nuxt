export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth()

  const publicPages = ['/login', '/register']

  if (status.value === 'unauthenticated' && !publicPages.includes(to.path)) {
    return navigateTo('/login')
  }

})
