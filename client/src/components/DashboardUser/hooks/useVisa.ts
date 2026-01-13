import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { handleError, handleSuccess } from "@/utils/utils";

/* ================= Types ================= */

export type DocumentItem = {
  _id: string;
  originalName: string;
  filePath: string;
  status: "PENDING" | "VERIFIED" | "REJECTED";
};

export type VisaApplication = {
  _id: string;
  passportDetails: {
    number: string;
    country: string;
    expiryDate: string;
  };
  purposeOfVisit: string;
  travelHistory?: string;
  supportingDocumentIds: DocumentItem[];
  status: string;
};

/* ================= Hook ================= */

export function useVisaApp() {
  const [application, setApplication] = useState<VisaApplication | null>(null);
  const [loading, setLoading] = useState(false);
const [applications, setApplications] = useState<any[]>([]);
  /* ================= Fetch visa application ================= */

  const fetchVisaApplication = async () => {
    try {
      const res = await api.get("api/visa/my-applications");
      if (res.data?.data?.length > 0) {
        setApplications(res.data.data);
        setApplication(res.data.data[0]);

        // console.log (res.data)
         // latest application
      }
    } catch (error) {
      // console.error("Fetch visa error:", error);
      handleError("An error occured while Fetching visa")
    }
  };

  /* ================= Submit visa ================= */

  const submitVisaApplication = async (payload: {
    passportDetails: {
      number: string;
      country: string;
      expiryDate: string;
    };
    purposeOfVisit: string;
    travelHistory?: string;
  }) => {
    setLoading(true);
    
    try {
      const res = await api.post("api/visa/apply", {
        ...payload,
        supportingDocumentIds: application?.supportingDocumentIds.map(
          (d) => d._id
        ),
      });
      setApplication(res?.data.data);
    } 
    catch (error:any) {
      handleError(error.response?.data.message);
      throw error
      
    } finally {
      setLoading(false);
    }
  };


  /* ================= Effects ================= */

  useEffect(() => {
    fetchVisaApplication();
  }, []);



//   Showing Applied Visa Applications  

  return {
    application,
    loading,
    fetchVisaApplication,
    submitVisaApplication,
    applications,
  };
}
