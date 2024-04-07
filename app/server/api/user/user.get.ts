export default defineEventHandler((event) => {
    const user = event.context.user
    if (!user) {
        throw createError({
            statusCode: 403,
            statusMessage: "Unauthorized",
        })
    }
    console.log(user)
    return user
})