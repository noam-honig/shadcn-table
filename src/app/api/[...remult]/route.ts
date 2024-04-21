import { createPostgresDataProvider } from "remult/postgres"
import { remultNextApp } from "remult/remult-next"

import { Task } from "../../../db/task"

const api = remultNextApp({
  entities: [Task],
  admin: true,
  dataProvider: createPostgresDataProvider(),
})

export const { POST, PUT, DELETE, GET } = api
