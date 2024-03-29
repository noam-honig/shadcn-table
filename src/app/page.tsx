import * as React from "react"
import type { SearchParams } from "@/types"

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { Shell } from "@/components/shell"

import { TasksTable } from "./_components/tasks-table"
import { TasksTableProvider } from "./_components/tasks-table-provider"
import { getTasks } from "./_lib/queries"
import { searchParamsSchema } from "./_lib/validations"

export interface IndexPageProps {
  searchParams: SearchParams
}

export default function IndexPage({ searchParams }: IndexPageProps) {
  const search = searchParamsSchema.parse(searchParams)

  const tasksPromise = getTasks(search)

  return (
    <Shell>
      <TasksTableProvider>
        <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={["8%", "60%", "12%", "12%", "8%"]}
            />
          }
        >
          {/**
           * The `TasksTable` component is used to render the `DataTable` component within it.
           * This is done because the table columns need to be memoized, and the `useDataTable` hook needs to be called in a client component.
           * By encapsulating the `DataTable` component within the `tasktableshell` component, we can ensure that the necessary logic and state management is handled correctly.
           */}
          <TasksTable tasksPromise={tasksPromise} />
        </React.Suspense>
      </TasksTableProvider>
    </Shell>
  )
}
