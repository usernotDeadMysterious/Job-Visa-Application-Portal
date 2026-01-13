import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Eye,
  Loader2,
  Trash2,
} from "lucide-react";
import { useVisaApp } from "./hooks/useVisa";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useDocuments } from "./hooks/useDocument";

/* ================= Status styles ================= */

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 border border-amber-200",
  VERIFIED: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  REJECTED: "bg-rose-100 text-rose-700 border border-rose-200",
};

/* ================= Component ================= */

export function Visa() {
  const { application, loading, submitVisaApplication } = useVisaApp();
  const { documents, deletingId, deleteDocument } = useDocuments();

  /* ================= Form state ================= */

  const [passportNumber, setPassportNumber] = useState("");
  const [passportCountry, setPassportCountry] = useState("");
  const [passportExpiry, setPassportExpiry] = useState("");
  const [purpose, setPurpose] = useState("");
  const [travelHistory, setTravelHistory] = useState("");

  /* ================= Submit ================= */

  const submitVisa = async () => {
    await submitVisaApplication({
      passportDetails: {
        number: passportNumber,
        country: passportCountry,
        expiryDate: passportExpiry,
      },
      purposeOfVisit: purpose,
      travelHistory,
    });
  };

  /* ================= Render ================= */

  return (
    <>
      {/* Showw Already applied Visa Applications here 
      {application && (
        <Card className="mb-6 border border-slate-700">
          <CardContent className="pt-4">
            <h3 className="text-sm font-semibold uppercase text-slate-400 mb-3">
              Recent Visa Application
            </h3>

            <div className="text-sm space-y-1">
              <p>
                <span className="text-slate-400">Passport:</span>{" "}
                {application.passportDetails.number}
              </p>
              <p>
                <span className="text-slate-400">Purpose:</span>{" "}
                {application.purposeOfVisit}
              </p>
              <p>
                <span className="text-slate-400">Status:</span>{" "}
                <span className="font-medium">{application.status}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      )} */}

      <Card className="rounded-2xl">
        <CardContent className="space-y-8 pt-6">
          {/* ================= Visa Details ================= */}
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-slate-400 uppercase mb-4">
              Visa Application Details
            </h3>
            {/* Visa Application Form  */}
            <div className="space-y-4">
              <input
                placeholder="Passport Number"
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
                className="w-full rounded-lg border border-white/80 bg-white/20 px-3 py-2 text-sm text-white"
              />

              <input
                placeholder="Issuing Country"
                value={passportCountry}
                onChange={(e) => setPassportCountry(e.target.value)}
                className="w-full rounded-lg border border-white/80 bg-white/20 px-3 py-2 text-sm text-white"
              />

              <input
                type="date"
                value={passportExpiry}
                onChange={(e) => setPassportExpiry(e.target.value)}
                className="w-full rounded-lg border border-white/80 bg-white/20 px-3 py-2 text-sm text-white"
              />

              <textarea
                placeholder="Travel History"
                value={travelHistory}
                onChange={(e) => setTravelHistory(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-white/80 bg-white/20 px-3 py-2 text-sm text-white"
              />

              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full rounded-lg border border-white/80 bg-white/20 px-3 py-2 text-sm text-white"
              >
                <option className="text-black" value="">
                  Select purpose
                </option>
                <option className="text-black">Tourism</option>
                <option className="text-black">Education</option>
                <option className="text-black">Work</option>
                <option className="text-black">Business</option>
                <option className="text-black">Medical</option>
              </select>
            </div>
          </div>
          {/* ================= Actions ================= */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={loading}
              onClick={submitVisa}
              className="bg-linear-to-br from-indigo-500/80 via-white/50 to-pink-500/80 text-amber-50"
            >
              {loading ? "Submitting..." : "Submit Visa Application"}
            </Button>
          </div>
          {/* ================= Documents ================= */}

          <div className="space-y-2">
            <h3 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
              Attached Documents
            </h3>
            {documents ? (
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc._id}
                    className="flex justify-between items-center border border-slate-800 rounded-lg px-3 py-2 bg-muted/40"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {doc.originalName}
                      </span>
                      <span
                        className={`mt-1 w-fit rounded-md px-2 py-0.5 text-xs ${
                          statusStyles[doc.status]
                        }`}
                      >
                        {doc.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* View */}
                      <a
                        href={`${import.meta.env.VITE_API_BASE_URL}${
                          doc.filePath
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 none text-sm flex items-center gap-1 w-min border hover:bg-blue-300 rounded-4xl px-2"
                      >
                        {" "}
                        <Eye className="h-4 w-4" />
                      </a>

                      {/* Delete */}
                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={
                          doc.status === "VERIFIED" || deletingId === doc._id
                        }
                        onClick={() => deleteDocument(doc._id)}
                      >
                        {deletingId === doc._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4 text-red-500" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div> You havn't uploaded any documents yet.</div>
            )}
          </div>

          <div className="flex flex-row w-full items-center justify-around">
            <Link
              to="/user-dashboard?overview="
              className="text-sm text-indigo-400 items-center gap-1 border p-2 rounded-lg hover:bg-indigo-300/20 m-3 right-32 top-90"
            >
              <ArrowBigLeft className="w-4 h-3 inline" />
              View Profile
            </Link>
            <Link
              to="/new-home"
              className="text-sm text-indigo-400 items-center gap-1 border p-2 rounded-lg hover:bg-indigo-300/20 m-3  right-8 top-90"
            >
              Apply For Job Instead
              <ArrowBigRight className="w-4 h-3 inline" />
            </Link>
          </div>
        </CardContent>
      </Card>

      <ToastContainer />
    </>
  );
}
