import { Lucia } from "lucia"
import { D1Adapter, BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite"
import { GitHub } from "arctic"
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3"
export function initializeLucia(adapter: D1Adapter | BetterSqlite3Adapter) {




    return new Lucia(adapter, {
        sessionCookie: {
            attributes: {
                secure: !import.meta.dev,
            },
        },
        getUserAttributes: (attributes) => {
            return {
                username: attributes.username,
                name: attributes.name,
            }
        },
    })
}

export const github = new GitHub(
    process.env.GITHUB_CLIENT_ID!,
    process.env.GITHUB_CLIENT_SECRET!
)

declare module "lucia" {
    interface Register {
        Lucia: ReturnType<typeof initializeLucia>
        DatabaseUserAttributes: DatabaseUserAttributes
    }
}

interface DatabaseUserAttributes {
    name: string
    username: string
}