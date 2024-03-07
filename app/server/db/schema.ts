import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm';
//replace / with %2F

export const userTable = sqliteTable('user', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  patientID: text('patientID').notNull(),
  name: text('username').notNull(),
  dob: text('dob').notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  orderInfoTableId: integer('order_info_table_id').references(() => orderInfoTable.id),
});


export const orderInfoTable = sqliteTable('order_info', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  testOrdered: text('test_ordered'),
  observationDateTime: text('observation_date_time'),
  orderStatus: text('order_status'),
});

export const results = sqliteTable('results', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  test: text('test'),
  value: text('value'),
  units: text('units'),
  referenceRange: text('reference_range'),
  resultStatus: text('result_status'),
  orderInfoId: integer('order_info_id').references(() => orderInfoTable.id),
});
export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;
export type InsertResults = typeof results.$inferInsert;
export type SelectResults = typeof results.$inferSelect;
export type InsertOrderInfo = typeof orderInfoTable.$inferInsert;
export type SelectOrderInfo = typeof orderInfoTable.$inferSelect