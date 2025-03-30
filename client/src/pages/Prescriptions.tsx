import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { CalendarIcon, CopyIcon, ShareIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "../components/ui/calendar";
import { cn } from "../lib/utils";
import { useSession, useUser } from "@clerk/clerk-react";
import { fetchAppointmentId } from "@/lib/handler";

interface Patient {
  _id: string;
  full_name: string;
  email: string;
  appointmentCount: number;
}

interface Prescription {
  _id: string;
  prescriptionText: string;
  patient: {
    _id: string;
    full_name: string;
    email: string;
  };
  dateIssued: string;
  notes: string;
  expiryDate: string | null;
  paymentStatus: "pending" | "paid";
  paymentAmount: number | null;
  shareableUrl?: string;
}

const Prescriptions = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const [prescriptionText, setPrescriptionText] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [shareableUrl, setShareableUrl] = useState<string>("");

  const { session } = useSession();
  const { user, isLoaded } = useUser();
  const userId = session?.user.id || user?.id;

  console.log(userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [patientsRes, prescriptionsRes] = await Promise.all([
          await axios.get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/prescription/${userId}/patients-with-appointments`
          ),
          await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/prescription/${userId}`
          ),
        ]);

        setPatients(patientsRes.data);
        setPrescriptions(prescriptionsRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast("Error", {
          description: "Failed to load data. Please try again.",
        });
        setLoading(false);
      }
    };
    isLoaded && fetchData();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPatient || !prescriptionText) {
      toast("Validation Error", {
        description: "Please select a patient and enter prescription text.",
      });
      return;
    }

    const appointmentId = fetchAppointmentId(userId!, selectedPatient);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/prescription/create/${userId}`,
        {
          patientId: selectedPatient,
          prescriptionText,
          notes,
          paymentAmount: paymentAmount ? parseFloat(paymentAmount) : null,
          expiryDate: expiryDate ? expiryDate.toISOString() : null,
          appointment: appointmentId || null,
        }
      );

      toast("Success", {
        description: "Prescription created successfully!",
      });

      // Reset form
      setSelectedPatient("");
      setPrescriptionText("");
      setNotes("");
      setPaymentAmount("");
      setExpiryDate(undefined);

      // Set the shareable URL
      setShareableUrl(window.location.origin + response.data.shareableUrl);

      // Refresh prescriptions list
      const updatedPrescriptions = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/prescription/${userId}`
      );
      setPrescriptions(updatedPrescriptions.data);
    } catch (error) {
      console.error("Error creating prescription:", error);
      toast("Error", {
        description: "Failed to create prescription. Please try again.",
      });
    }
  };

  const copyShareableLink = () => {
    if (shareableUrl) {
      navigator.clipboard.writeText(shareableUrl);
      toast("Link Copied", {
        description: "Shareable link copied to clipboard!",
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Prescription Management</h1>

      <Tabs defaultValue="create">
        <TabsList className="mb-4">
          <TabsTrigger value="create">Create Prescription</TabsTrigger>
          <TabsTrigger value="view">View Prescriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Prescription Builder</CardTitle>
            </CardHeader>
            <CardContent>
              {shareableUrl && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                  <h3 className="font-semibold text-green-700 mb-2">
                    Prescription Created Successfully!
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-green-600 truncate flex-1">
                      {shareableUrl}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyShareableLink}
                    >
                      <CopyIcon className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(shareableUrl, "_blank")}
                    >
                      <ShareIcon className="h-4 w-4 mr-1" />
                      Open
                    </Button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patient">Patient</Label>
                  <Select
                    value={selectedPatient}
                    onValueChange={setSelectedPatient}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.length > 0 ? (
                        patients.map((patient) => (
                          <SelectItem key={patient._id} value={patient._id}>
                            {patient.full_name} ({patient.email})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          {loading
                            ? "Loading patients..."
                            : "No patients with appointments"}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prescription">Prescription</Label>
                  <Textarea
                    id="prescription"
                    value={prescriptionText}
                    onChange={(e) => setPrescriptionText(e.target.value)}
                    placeholder="Enter detailed prescription instructions..."
                    className="min-h-[150px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Optional notes about the prescription..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payment">Payment Amount</Label>
                    <Input
                      id="payment"
                      type="number"
                      step="0.01"
                      min="0"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="Enter amount"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !expiryDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {expiryDate
                            ? format(expiryDate, "PPP")
                            : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={expiryDate}
                          onSelect={setExpiryDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-full md:w-auto">
                    Create Prescription
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="view">
          <Card>
            <CardHeader>
              <CardTitle>Your Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-4">Loading prescriptions...</p>
              ) : prescriptions.length === 0 ? (
                <p className="text-center py-4">No prescriptions found</p>
              ) : (
                <div className="space-y-4">
                  {prescriptions.map((prescription) => (
                    <Card key={prescription._id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                          <h3 className="font-semibold">
                            Patient: {prescription.patient.full_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Issued:{" "}
                            {new Date(
                              prescription.dateIssued
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <p className="font-medium mb-1">Prescription:</p>
                          <p className="whitespace-pre-line">
                            {prescription.prescriptionText}
                          </p>
                        </div>
                        {prescription.notes && (
                          <div className="mt-2">
                            <p className="font-medium mb-1">Notes:</p>
                            <p className="text-sm">{prescription.notes}</p>
                          </div>
                        )}
                        <div className="flex justify-between items-center mt-3 border-t pt-3">
                          <div>
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                prescription.paymentStatus === "paid"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {prescription.paymentStatus === "paid"
                                ? "Paid"
                                : "Payment Pending"}
                            </span>
                            {prescription.paymentAmount && (
                              <span className="ml-2 text-sm">
                                Amount: ${prescription.paymentAmount}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <p className="text-sm text-green-600 truncate flex-1">
                            {shareableUrl}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={copyShareableLink}
                          >
                            <CopyIcon className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(shareableUrl, "_blank")}
                          >
                            <ShareIcon className="h-4 w-4 mr-1" />
                            Open
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Prescriptions;
