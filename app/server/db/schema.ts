import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey(),
  userId: integer('user_id').notNull(), // GitHub Id
  title: text('title').notNull(),
  completed: integer('completed').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

//replace / with %2F

const userTable = sqliteTable('user', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  patientID: text('patientID').notNull(),
  name: text('username').notNull(),
  dob: text('dob').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  orderInfoTableId: integer('order_info_table_id').references(() => orderInfoTable.id),
});


const orderInfoTable = sqliteTable('order_info', {
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