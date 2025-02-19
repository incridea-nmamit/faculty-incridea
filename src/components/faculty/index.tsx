"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import SelfPass from "./selfPass";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import QRCode from "react-qr-code";
import { dependantNum2ID, facultyNum2ID } from "~/lib/utils";
import { api } from "~/trpc/react";
import ClaimExtraPass from "./claimExtraPass";
import { Badge } from "~/components/ui/badge";

export default function Faculty() {
  const { data: session } = useSession();
  const [claimed, setClaimed] = useState(session?.user.passClaimed ?? false);
  const facultyID = facultyNum2ID(parseInt(session?.user.id ?? "0", 10));
  const { data: extraPasses, refetch: refetchExtraPasses } =
    api.pass.getExtraPasses.useQuery();

  const attended = "bg-green-500/50 text-green-500 border-green-500";
  const notAttended = "bg-red-500/50 text-red-500 border-red-500";

  if (!claimed) {
    return <SelfPass onClaim={setClaimed} />;
  }

  return (
    <div className="flex w-full items-center justify-center gap-4 py-24">
      <div className="flex flex-wrap justify-center gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex w-full flex-col items-center justify-center gap-2 text-center text-2xl">
              <span>My Pass</span>
              <div className="flex items-center gap-2">
                <Badge
                  className={
                    session?.user.attendedDay1 ? attended : notAttended
                  }
                >
                  Day 1
                </Badge>
                <Badge
                  className={
                    session?.user.attendedDay2 ? attended : notAttended
                  }
                >
                  Day 2
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-4">
            <QRCode
              value={facultyID}
              height={100}
              width={100}
              className="self-center rounded-xl"
            />
            <p className="text-center text-2xl font-bold">{facultyID}</p>
          </CardContent>
        </Card>

        {(extraPasses ?? []).length > 0 &&
          (extraPasses ?? []).map((pass) => (
            <Card key={pass.id}>
              <CardHeader>
                <CardTitle className="flex w-full flex-col items-center justify-center gap-2 text-center text-2xl">
                  <span>{pass.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={pass.attendedDay1 ? attended : notAttended}
                    >
                      Day 1
                    </Badge>
                    <Badge
                      className={pass.attendedDay2 ? attended : notAttended}
                    >
                      Day 2
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <QRCode
                  value={dependantNum2ID(pass.id)}
                  height={100}
                  width={100}
                  className="rounded-xl"
                />
                <p className="text-center text-2xl font-bold">
                  {dependantNum2ID(pass.id)}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="fixed bottom-0 flex w-full flex-col items-center justify-center gap-4 rounded-t-xl">
        <div className="flex w-full items-center justify-center gap-4 rounded-t-2xl bg-palate_3 p-4 text-palate_2">
          <p className="text-white  ">
            You have{" "}
            <span className="text-gray-200 underline">
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
