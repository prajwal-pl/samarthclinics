import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const SharedPrescriptions = () => {
  const { id } = useParams<{ id: string }>();
  const [prescription, setPrescription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  console.log(id); // This will log the id from the URL

  const fetchPrescriptions = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/prescription/share/${id}`
      );
      const data = res.data;
      console.log(data);
      setPrescription(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!prescription) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Prescription Not Found
          </h2>
          <p className="text-gray-700">
            The prescription you're looking for is not available or may have
            expired.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Prescription Header */}
          <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <svg
                className="h-8 w-8 text-white mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h1 className="text-2xl font-bold text-white">
                Medical Prescription
              </h1>
            </div>
            <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              ID: {prescription.shareableId}
            </span>
          </div>

          {/* Doctor and Patient Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-700 flex items-center">
                  <svg
                    className="h-5 w-5 text-blue-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Doctor Information
                </h2>
                <div className="mt-2 pl-7">
                  <p className="text-gray-600">
                    <span className="font-medium">ID:</span>{" "}
                    {prescription.doctor?._id || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span>{" "}
                    {prescription.doctor?.email || "N/A"}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-700 flex items-center">
                  <svg
                    className="h-5 w-5 text-blue-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Patient Information
                </h2>
                <div className="mt-2 pl-7">
                  <p className="text-gray-600">
                    <span className="font-medium">Name:</span>{" "}
                    {prescription.patient?.full_name || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">ID:</span>{" "}
                    {prescription.patient?._id || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dates and Payment Info */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Date Issued
                </h3>
                <p className="mt-1 text-gray-900">
                  {formatDate(prescription.dateIssued)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Expiry Date
                </h3>
                <p className="mt-1 text-gray-900">
                  {formatDate(prescription.expiryDate)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Payment Status
                </h3>
                <span
                  className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    prescription.paymentStatus === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {prescription.paymentStatus?.toUpperCase() || "N/A"}
                </span>
                <p className="mt-1 text-gray-900">
                  <span className="font-medium">Amount:</span> ₹
                  {prescription.paymentAmount?.toFixed(2) || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Prescription Content */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <svg
                className="h-5 w-5 text-blue-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Prescription Details
            </h2>

            <div className="bg-white rounded-md p-4 border border-gray-300 mb-6">
              <div className="flex items-start">
                <span className="text-gray-500 text-2xl mr-2">Rx</span>
                <p className="whitespace-pre-line text-gray-800">
                  {prescription.prescriptionText}
                </p>
              </div>
            </div>

            {prescription.notes && (
              <div className="mt-4">
                <h3 className="font-medium text-gray-700 mb-2">
                  Additional Notes:
                </h3>
                <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100">
                  <p className="text-gray-800">{prescription.notes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col items-end">
              <p className="text-sm text-gray-500">
                Generated on {formatDate(prescription.createdAt)}
              </p>
              <div className="mt-4 border-t-2 border-gray-300 pt-2 w-48">
                <p className="text-center text-gray-500 text-sm">
                  Doctor's Signature
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Print Button */}
        <div className="mt-6 text-center">
          <Button onClick={() => window.print()} className="w-full">
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print Prescription
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SharedPrescriptions;
