"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import SelfPass from "./selfPass";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import QRCode from "react-qr-code";
import { dependantNum2ID, facultyNum2ID } from "~/lib/utils";
import { api } from "~/trpc/react";
import ClaimExtraPass from "./claimExtraPass";

export default function Faculty() {
  const { data: session } = useSession();
  const [claimed, setClaimed] = useState(session?.user.passClaimed ?? false);
  const facultyID = facultyNum2ID(parseInt(session?.user.id ?? "0", 10));
  const { data: extraPasses, refetch: refetchExtraPasses } =
    api.pass.getExtraPasses.useQuery();

  if (!claimed) {
    return <SelfPass onClaim={setClaimed} />;
  }

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="mx-auto flex gap-6">
        <Card className="items-stretch bg-white">
          <CardHeader>
            <CardTitle className="text-center text-2xl">My Pass</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <QRCode
              value={facultyID}
              height={150}
              width={150}
              className="rounded-xl"
            />
            <p className="text-center text-2xl font-bold">{facultyID}</p>
          </CardContent>
        </Card>

        <div className="flex gap-6">
          {(extraPasses ?? []).length > 0 &&
            (extraPasses ?? []).map((pass) => (
              <Card key={pass.id} className="w-full">
                <CardHeader>
                  <CardTitle className="text-center text-2xl font-bold">
                    {pass.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <QRCode
                    value={dependantNum2ID(pass.id)}
                    height={150}
                    width={150}
                    className="rounded-xl"
                  />
                  <p className="text-center text-2xl font-bold">
                    {dependantNum2ID(pass.id)}
                  </p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      <div className="absolute bottom-0 flex w-full flex-col items-center justify-center gap-4 rounded-t-xl">
        <div className="flex w-full items-center justify-center gap-4 rounded-t-2xl bg-palate_3 p-4 text-palate_2">
          <p className="text-palate_2">
            You have{" "}
            <span className="text-red-500 underline">
              {2 - (extraPasses?.length ?? 0)}
            </span>{" "}
            free passes to be claimed.
          </p>
          {2 - (extraPasses?.length ?? 0) > 0 && (
            <ClaimExtraPass passesRefetch={refetchExtraPasses} />
          )}
        </div>
      </div>
    </div>
  );
}
