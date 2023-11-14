// https://router.vuejs.org/api/interfaces/routeroptions.html
export default {
    routes: (_routes) => {
        const { ssrContext } = useNuxtApp()
        const subdomain = useSubdomain()
        if (ssrContext?.event.context.subdomain) subdomain.value = ssrContext?.event.context.subdomain

        if (subdomain.value) {
            const userRoute = _routes.filter((i) => i.path.includes("/organization/:id"))
            const userRouteMapped = userRoute.map((i) => ({
                ...i,
                path: i.path === "/organization/:id" ? i.path.replace("/organization/:id", "/") : i.path.replace("/organization/:id/", "/"),
            }))

            return userRouteMapped
        }
    },
}
