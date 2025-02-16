import React from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { Card, CardHeader, CardContent, CardTitle } from "~/components/ui/card";

interface SelfPassProps {
  onClaim: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SelfPass({ onClaim }: SelfPassProps) {
  const claimSelfpass = api.pass.claimFacultyPass.useMutation({
    onSuccess: () => {
      toast.success("Thank you for claiming your pass!");
      onClaim(true);
    },
    onError: () => {
      toast.error("Oops! Something went wrong");
      onClaim(false);
    },
  });
  return (
    <div className="flex items-center justify-center py-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Claim Your Pass
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-center">
            Click the button below to claim your faculty pass.
          </p>
          <Button
            onClick={async () => {
              await claimSelfpass.mutateAsync();
            }}
          >
            Claim My Pass
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
