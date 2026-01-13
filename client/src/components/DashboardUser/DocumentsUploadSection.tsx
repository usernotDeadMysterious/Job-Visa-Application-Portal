import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UploadCloud,
  Loader2,
  Trash2,
  Eye,
  ExternalLink,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useDocuments } from "./hooks/useDocument";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const DOCUMENT_TEMPLATES = [
  { type: "CV", title: "CV", required: true },
  { type: "DEGREE", title: "Degree / Certificate", required: true },
  { type: "TRANSCRIPT", title: "Transcript / DMC", required: true },
  { type: "PASSPORT", title: "Passport", required: false },
];

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 border border-amber-200",
  VERIFIED: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  REJECTED: "bg-rose-100 text-rose-700 border border-rose-200",
};

export function DocumentsUploadSection() {
  const { documents, deletingId, uploadDocument, deleteDocument } =
    useDocuments();

  const [drafts, setDrafts] = useState<Record<string, File | null>>({});

  /* ================= Helpers ================= */

  const uploadedForType = (type: string) =>
    documents.find((d) => d.type === type);

  const handleDraft = (type: string, file: File | null) => {
    if (!file) return;
    setDrafts((prev) => ({ ...prev, [type]: file }));
  };

  const saveDraft = async (type: string) => {
    const file = drafts[type];
    if (!file) return;

    try {
      await uploadDocument({ file, type });
      toast.success(`${type} uploaded`);
      setDrafts((prev) => ({ ...prev, [type]: null }));
    } catch {
      toast.error("Upload failed");
    }
  };

  const saveAllRequired = async () => {
    const missing = DOCUMENT_TEMPLATES.filter(
      (t) => t.required && !uploadedForType(t.type)
    );

    if (missing.length > 0) {
      toast.error("Missing required documents", {
        description: missing.map((m) => m.title).join(", "),
      });
      return;
    }

    toast.success("All required documents uploaded");
  };

  /* ================= Render ================= */

  return (
    <Card className="rounded-2xl">
      <CardContent className="space-y-6 pt-6">
        {DOCUMENT_TEMPLATES.map((doc) => {
          const uploaded = uploadedForType(doc.type);
          const draft = drafts[doc.type];

          return (
            <div key={doc.type} className="space-y-2">
              <h3 className="font-medium">
                {doc.title}
                {doc.required && <span className="text-red-500 ml-1">*</span>}
              </h3>

              {/* Draft */}
              {draft && (
                <div className="flex justify-between items-center border rounded-lg px-3 py-2">
                  <span className="text-sm">{draft.name}</span>
                  <Button size="sm" onClick={() => saveDraft(doc.type)}>
                    Save
                  </Button>
                </div>
              )}

              {/* Uploaded */}
              {uploaded && (
                <div className="flex justify-between items-center border rounded-lg px-3 py-2 bg-muted/40">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {uploaded.originalName}
                    </span>
                    <span
                      className={`mt-1 w-fit rounded-md px-2 py-0.5 text-xs ${
                        statusStyles[uploaded.status]
                      }`}
                    >
                      {uploaded.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* 👁 View */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="w-full  text-slate-200 bg-amber-700/20 border-dashed rounded-4xl overflow-auto">
                        <DialogHeader className="flex flex-row justify-between items-center">
                          <DialogTitle>{uploaded.originalName}</DialogTitle>

                          <a
                            href={`${import.meta.env.VITE_API_BASE_URL}${
                              uploaded.filePath
                            }`}
                            target="_blank"
                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                          >
                            Open <ExternalLink className="h-4 w-4" />
                          </a>
                        </DialogHeader>

                        <iframe
                          src={`${import.meta.env.VITE_API_BASE_URL}${
                            uploaded.filePath
                          }`}
                          className="w-full h-[70vh] rounded-md border"
                        />

                        <div className="flex justify-center ">
                          <DialogClose className="flex items-center gap-1 border rounded-md px-2 py-1">
                            <X className="h-4 w-4" />
                            Close
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* 🗑 Delete */}
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={
                        uploaded.status === "VERIFIED" ||
                        deletingId === uploaded._id
                      }
                      onClick={() => deleteDocument(uploaded._id)}
                    >
                      {deletingId === uploaded._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2
                          className={`h-4 w-4 ${
                            uploaded.status === "VERIFIED"
                              ? "text-muted-foreground"
                              : "text-red-500"
                          }`}
                        />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Upload Box */}
              {!uploaded && !draft && (
                <label className="flex items-center gap-2 border border-dashed rounded-lg p-3 cursor-pointer hover:bg-muted/40">
                  <UploadCloud className="h-4 w-4" />
                  <span className="text-sm">Upload {doc.title}</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleDraft(doc.type, e.target.files?.[0] || null)
                    }
                  />
                </label>
              )}
            </div>
          );
        })}

        {/* Final Save */}
        <Button className="w-full" onClick={saveAllRequired}>
          Save Required Documents
        </Button>
      </CardContent>
    </Card>
  );
}
