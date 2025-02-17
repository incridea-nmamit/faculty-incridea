import { Scanner } from "@yudiel/react-qr-scanner";
import { api } from "~/trpc/react";

export default function Volunteer() {
  const markAttendance = api.volunteer.markAttended.useMutation();

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
