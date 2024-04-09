import { verifyRequestOrigin } from "lucia"
import { initializeLucia } from "../utils/auth"
import type { User, Session } from "lucia"
import { loadNuxtModuleInstance } from "nuxt/kit"
import { BetterSqlite3Adapter, D1Adapter } from "@lucia-auth/adapter-sqlite"
import { _db } from "../db/drizzle"
import { drizzle } from "drizzle-orm/better-sqlite3"

let lucia: ReturnType<typeof initializeLucia>

export default defineEventHandler(async (event) => {
    // CSRF protection
    if (!isMethod(event, "GET")) {
        const originHeader = getHeader(event, "Origin") ?? null
        const hostHeader = getHeader(event, "Host") ?? null
        if (
            !originHeader ||
            !hostHeader ||
            !verifyRequestOrigin(originHeader, [hostHeader])
        ) {
            return sendNoContent(event, 403)
        }
    }

    // Initialize auth (Lucia)
    if (event.context) {
        if (!lucia && event.context?.cloudflare?.env) {

            const adapter = new D1Adapter(event.context?.cloudflare?.env?.DB, {
                user: "user",
                session: "session",
            })




            lucia = initializeLucia(adapter)
        }
        else if (!lucia) {
            const adpter = new BetterSqlite3Adapter(_db, {
                user: "user",
                session: "session",
            })

            lucia = initializeLucia(adpter)



        }


        event.context.lucia = lucia
        // Set session and user
        const sessionId = getCookie(event, lucia.sessionCookieName) ?? null
        if (!sessionId) {
            event.context.session = null
            event.context.user = null
            return
        }

        const { session, user } = await lucia.validateSession(sessionId)
        if (session && session.fresh) {
            await lucia.deleteExpiredSessions()
            appendResponseHeader(
                event,
                "Set-Cookie",
                lucia.createSessionCookie(session.id).serialize()
            )
        }
        if (!session) {
            await lucia.deleteExpiredSessions()
            appendResponseHeader(
                event,
                "Set-Cookie",
                lucia.createBlankSessionCookie().serialize()
            )
        }
        event.context.session = session
        event.context.user = user
    }
})

declare module "h3" {
    interface H3EventContext {
        user: User | null
        session: Session | null
        lucia: ReturnType<typeof initializeLucia>
    }
}