import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { useVisaApp } from "./hooks/useVisa";

const AppliedVisa = () => {
  const { applications } = useVisaApp();
  return (
    <>
      {/* ================= Applied Visa Applications ================= */}
      {applications?.length > 0 ? (
        <Card className="rounded-2xl mb-6">
          <CardContent className="pt-4 space-y-3">
            <h3 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
              Applied Visa Applications
            </h3>

            {applications.map((app) => (
              <div
                key={app._id}
                className="flex justify-between items-center border border-slate-800 rounded-lg px-4 py-3 bg-muted/40"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {app.passportDetails.country} • {app.purposeOfVisit}
                  </p>
                  <p className="text-xs text-slate-400">
                    Passport: {app.passportDetails.number}
                  </p>
                </div>

                <span className="text-xs px-2 py-1 rounded-md border">
                  {app.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <div className="pt-2 flex w-full items-center justify-center ">
          <Link
            to="/user-dashboard?visa="
            className="text-sm text-indigo-600 hover:underline"
          >
            Apply for Visa
          </Link>
        </div>
      )}
    </>
  );
};

export default AppliedVisa;
