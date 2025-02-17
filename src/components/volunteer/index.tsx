import { Scanner } from "@yudiel/react-qr-scanner";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export default function Volunteer() {
  const markAttendance = api.volunteer.markAttended.useMutation({
    onSuccess: () => {
      toast.success("Aand");
    },
    onError: () => {
      toast.error("Enchina saavu mareya");
    },
  });

  return (
    <div>
      <Scanner
        onScan={(result) => {
          if (result) {
            markAttendance.mutate({
              day: "1",
              passId: result[0]?.rawValue ?? "",
            });
          }
        }}
      />
    </div>
  );
}
