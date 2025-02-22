"use client";

import type { ExtraPass, User } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "~/components/ui/checkbox";

import SortingHeader from "~/components/tanstack/sortingHeader";
import { dependantNum2ID, facultyNum2ID } from "~/lib/utils";

export const FacultyColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => {
      return <SortingHeader<User> column={column} headerName={"ID"} />;
    },
    cell: ({ cell }) => <div>{facultyNum2ID(cell.row.original.id)}</div>,
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
  },
];

export const DependantColumns: ColumnDef<ExtraPass>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => {
      return <SortingHeader<ExtraPass> column={column} headerName={"ID"} />;
    },
    cell: ({ cell }) => <div>{dependantNum2ID(cell.row.original.id)}</div>,
  },
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "age",
    accessorKey: "age",
    header: "Age",
  },
];
