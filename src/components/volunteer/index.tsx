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
  const day = api.volunteer.getDay.useQuery().data;

  return (
    <div>
      <Scanner
        onScan={(result) => {
          if (result) {
            markAttendance.mutate({
              day: day?.day ?? "DAY1",
              passId: result[0]?.rawValue ?? "",
            });
          }
        }}
      />
    </div>
  );
}
