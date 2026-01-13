import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function useDocuments() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

 
  /* ================= Fetch Documents ================= */
  useEffect(() => {
    api
      .get("/api/documents")
      .then((res) => setDocuments(res.data))
      .finally(() => setLoading(false));
      
  }, []);
  

  /* ================= Upload Document ================= */
  const uploadDocument = async ({
    file,
    type,
  }: {
    file: File;
    type: string;
  }) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const res = await api.post("/api/documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // append newly uploaded document
      setDocuments((prev) => [...prev, res.data]);
    } finally {
      setUploading(false);
    }
  };

  /* ================= Delete Document ================= */
  const deleteDocument = async (id: string) => {
    try {
      setDeletingId(id);

      await api.delete(`/api/documents/${id}`);

      setDocuments((prev) =>
        prev.filter((doc) => doc._id !== id)
      );
    } finally {
      setDeletingId(null);
    }
  };

  return {
    documents,
    loading,
    uploading,
    deletingId,
    uploadDocument,
    deleteDocument,
  };
}
