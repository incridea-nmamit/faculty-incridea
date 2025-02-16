"use client";

import React, { useState, type FunctionComponent } from "react";

import { DataTable } from "~/components/ui/data-table";
import PaginationControls from "~/components/utils/pagination/controls";

import { FacultyColumns } from "./columns";
import { api } from "~/trpc/react";

const FacultyTable: FunctionComponent = () => {
  const { data, fetchNextPage, isFetchingPreviousPage, isFetchingNextPage } =
    api.admin.getAllUsers.useInfiniteQuery(
      { take: 50 },
      { getNextPageParam: (lastPage) => lastPage.nextCursor },
    );

  const [pageNo, setPageNo] = useState<number>(0);

  const handleFetchNextPage = async () => {
    await fetchNextPage();
    setPageNo((prev) => prev + 1);
  };

  const handleFetchPreviousPage = () => {
    setPageNo((prev) => prev - 1);
  };

  const currPage = data?.pages[pageNo]?.users;
  const nextCursor = data?.pages[pageNo]?.nextCursor;

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={FacultyColumns}
        data={currPage ?? []}
        filterColumnId="id"
        filterPlaceHolder="Enter ID"
        manualPagination
        paginationChild={
          <PaginationControls
            currPageNo={pageNo}
            handleFetchPreviousPage={handleFetchPreviousPage}
            handleFetchNextPage={handleFetchNextPage}
            disableNextButton={!nextCursor}
            disablePreviousButton={pageNo <= 0}
            isFetchingPreviousPage={isFetchingPreviousPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        }
      />
    </div>
  );
};

export default FacultyTable;
