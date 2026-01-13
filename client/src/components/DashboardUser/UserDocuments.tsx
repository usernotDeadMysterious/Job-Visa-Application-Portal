import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UploadCloud,
  Loader2,
  Trash2,
  Eye,
  Plus,
  ArrowBigRight,
  ArrowBigLeft,
} from "lucide-react";
import { useState } from "react";

import { useDocuments } from "./hooks/useDocument";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "@/utils/utils";

const DOCUMENT_TYPES = [
  "Profile Image",
  "CV",
  "DEGREE",
  "TRANSCRIPT",
  "PASSPORT",
  "Invitation Letter",
  "VISA_SUPPORTING",
  "JOB_SUPPORTING",
  "COVER_LETTER",
  "OTHER",
];

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 border border-amber-200",
  VERIFIED: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  REJECTED: "bg-rose-100 text-rose-700 border border-rose-200",
};

type UploadDraft = {
  id: string;
  file: File | null;
  type: string;
  description: string;
};

export default function UserDocuments() {
  const { documents, uploading, deletingId, uploadDocument, deleteDocument } =
    useDocuments();

  const [drafts, setDrafts] = useState<UploadDraft[]>([
    {
      id: crypto.randomUUID(),
      file: null,
      type: "CV",
      description: "",
    },
  ]);

  /* ================= Helpers ================= */

  const addDraft = () => {
    setDrafts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        file: null,
        type: "OTHER",
        description: "",
      },
    ]);
  };

  const updateDraft = (id: string, changes: Partial<UploadDraft>) => {
    setDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...changes } : d))
    );
  };

  const saveDraft = async (draft: UploadDraft) => {
    if (!draft.file) return;

    try {
      await uploadDocument({
        file: draft.file,
        type:
          draft.type === "OTHER" ? draft.description || "OTHER" : draft.type,
      });

      handleSuccess("Document uploaded");

      setDrafts((prev) => prev.filter((d) => d.id !== draft.id));
    } catch {
      handleError("Upload failed");
    }
  };

  /* ================= Render ================= */

  return (
    <>
      <Card className="rounded-2xl">
        <CardContent className="space-y-6 pt-6">
          {/* Upload drafts */}
          {drafts.map((draft) => (
            <div
              key={draft.id}
              className="space-y-2 rounded-lg p-3 border border-white/20 bg-muted/20 backdrop-blur"
            >
              {/* Type */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <select
                  className="border border-white/10 rounded-md p-1 bg-slate-900 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm "
                  value={draft.type}
                  onChange={(e) =>
                    updateDraft(draft.id, { type: e.target.value })
                  }
                >
                  {DOCUMENT_TYPES.map((t) => (
                    <option
                      className="bg-slate-900 text-slate-100"
                      key={t}
                      value={t}
                    >
                      {t}
                    </option>
                  ))}
                </select>

                {/* Description */}
                <input
                  type="text"
                  placeholder="write document name or description here ..."
                  className="border border-slate-600 rounded-md p-1 bg-slate-800 text-sm "
                  value={draft.description}
                  onChange={(e) =>
                    updateDraft(draft.id, {
                      description: e.target.value,
                    })
                  }
                />

                {/* File */}
                <label className="flex items-center gap-2 border border-dashed rounded-md p-2 cursor-pointer ">
                  <UploadCloud className="h-3.5 w-3.5" />
                  <span className="text-xs ">
                    {draft.file ? draft.file.name : "Choose file"}
                  </span>
                  <input
                    type="file"
                    className="hidden  "
                    onChange={(e) =>
                      updateDraft(draft.id, {
                        file: e.target.files?.[0] || null,
                      })
                    }
                  />
                </label>
              </div>

              <div className="flex justify-end">
                <Button
                  size="sm"
                  disabled={uploading}
                  onClick={() => saveDraft(draft)}
                >
                  {uploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </div>
          ))}

          {/* Add another upload */}
          <Button
            className="w-full flex items-center gap-2 border border-slate-600 rounded-4xl bg-slate-900"
            onClick={addDraft}
          >
            <Plus className="h-4 w-4" />
            Upload another document
          </Button>

          {/* Uploaded documents list */}
          <h3 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
            Uploaded Documents
          </h3>
          {documents.length > 0 ? (
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
            <div className="text-xs flex items-center justify-center w-full">
              No Documents Uploaded yet
            </div>
          )}
        </CardContent>

        {/* Navigation Buttons  */}
        <div className="min-w-full grid grid-cols-3 gap-2 items-center justify-end">
          <Link
            to="/user-dashboard?education="
            className="text-sm text-slate-200 m-1  border p-2 rounded-lg hover:bg-indigo-300/20 flex items-center justify-center"
          >
            <ArrowBigLeft className="w-4 h-4 inline" />
            Previous
          </Link>
          <Link
            to="/user-dashboard?visa="
            className="text-sm xs:text-xs text-slate-200 m-1 gap-1 border p-2 rounded-lg hover:bg-indigo-300/20  flex items-center justify-center"
          >
            <ArrowBigRight className="w-4 h-4 inline" />
            Apply For Visa
          </Link>
          <Link
            to="/new-home"
            className="text-sm xs:text-xs text-slate-200 m-1 gap-1 border p-2 rounded-lg hover:bg-indigo-300/20  flex items-center justify-center"
          >
            Apply For Job
            <ArrowBigRight className="w-4 h-4 inline" />
          </Link>
          {/* <Link
            to="/user-dashboard?documents="
            className="text-sm text-slate-200  gap-1 border px-4 py-2 rounded-lg hover:bg-indigo-300/20 mr-4 mb-2 flex items-center justify-center    "
          >
            <ArrowBigRight className="w-4 h-4 inline" />
            Next
          </Link> */}
        </div>
      </Card>
      <ToastContainer />
    </>
  );
}
