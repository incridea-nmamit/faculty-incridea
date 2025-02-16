import React from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

interface SelfPassProps {
  onClaim: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SelfPass({ onClaim }: SelfPassProps) {
  const claimSelfpass = api.pass.claimFacultyPass.useMutation({
    onSuccess: () => {
      toast.success("Thankyou for claiming your pass!");
      onClaim(true);
    },
    onError: () => {
      toast.error("Oops! Something went wrong");
      onClaim(false);
    },
  });
  return (
    <>
      <div>
        <Button
          onClick={async () => {
            await claimSelfpass.mutateAsync();
          }}
        >
          Claim My pass
        </Button>
      </div>
    </>
  );
}
