import { consola } from 'consola'
import { useStorage } from '#imports'
import fs from 'fs'
export default defineNitroPlugin(async () => {
  if (!import.meta.dev) return


  onHubReady(async () => {
     //get current directory
//read all the file in the directory of the migrations
//get the migration files
   const migrationsStorage = useStorage(  process.cwd() + "/server/database/migrations" )
   let migrationFiles = await migrationsStorage.getKeys()
    const database = hubDatabase()

    // Make sure to create the _hub_migrations table if it doesn't exist
    await database.prepare('CREATE TABLE IF NOT EXISTS _hub_migrations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, created_at INTEGER NOT NULL)').run()

    // Get applied migrations from database
    const hubMigrations = await database.prepare('SELECT * FROM _hub_migrations').all()
    const appliedMigrations = (hubMigrations.results || []).map((row) => row.name)
    const missingMigrations = migrationFiles.filter(file => !appliedMigrations.includes(file))
    if (!missingMigrations.length) {
      consola.success('Database up-to-date and ready')
      return
    }

    // Apply missing migrations
    const appliedMigrationsStmts = []
    for (const file of missingMigrations) {
      consola.info(`Applying database migrations from ${file}...`)
      const migration = (await migrationsStorage.getItem<string>(file)) || ''
      const statements = migration.split('--> statement-breakpoint')
      for (let stmt of statements) {
        await database.prepare(stmt.trim()).run()
      }
      appliedMigrationsStmts.push(database.prepare('INSERT INTO _hub_migrations (name, created_at) VALUES (?, ?)').bind(file, Date.now()))
    }
    await database.batch(appliedMigrationsStmts)
    consola.success('Database migrations done')
  })
})

