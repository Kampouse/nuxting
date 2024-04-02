import { CfProperties, Request, ExecutionContext, D1Database } from '@cloudflare/workers-types';

declare module 'h3' {
    interface H3EventContext {
        cf: CfProperties,
        cloudflare: {
            request: Request,
            env: {
                DB: D1Database,
            }
            context: ExecutionContext,
        };
    }
}