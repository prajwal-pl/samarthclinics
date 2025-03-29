import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarIcon, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const Appointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [issue, setIssue] = useState("");
  const [isSlotAvailable, setIsSlotAvailable] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  useEffect(() => {
    // Fetch doctors list from API
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/api/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    // Check slot availability when doctor, date and time are selected
    if (selectedDoctor && selectedDate && selectedTime) {
      checkSlotAvailability();
    }
  }, [selectedDoctor, selectedDate, selectedTime]);

  const checkSlotAvailability = async () => {
    try {
      const response = await axios.post("/api/bookings/availability", {
        doctorId: selectedDoctor,
        date: format(selectedDate as Date, "yyyy-MM-dd"),
        time: selectedTime,
      });

      setIsSlotAvailable(response.data.message === "Slot is available");
    } catch (error) {
      console.error("Error checking availability:", error);
      setIsSlotAvailable(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSlotAvailable) {
      setErrorMessage(
        "Selected slot is not available. Please choose another time."
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/bookings", {
        doctor: selectedDoctor,
        date: format(selectedDate as Date, "yyyy-MM-dd"),
        time: selectedTime,
        patientName: name,
        patientEmail: email,
        patientPhone: phone,
        issue: issue,
      });

      setSuccessMessage("Appointment booked successfully!");
      // Reset form
      setSelectedDoctor("");
      setSelectedDate(undefined);
      setSelectedTime("");
      setName("");
      setEmail("");
      setPhone("");
      setIssue("");
    } catch (error) {
      console.error("Error booking appointment:", error);
      setErrorMessage("Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-auto mx-auto py-8 px-4 ">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Book Your Physiotherapy Appointment
      </h1>

      {successMessage && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {errorMessage && (
        <Alert className="mb-4 bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Error</AlertTitle>
          <AlertDescription className="text-red-700">
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
          <CardDescription>
            Fill in the details to book your appointment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="doctor">Select Doctor</Label>
                  <Select
                    value={selectedDoctor}
                    onValueChange={setSelectedDoctor}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* {doctors.map((doctor: any) => (
                        <SelectItem key={doctor._id} value={doctor._id}>
                          {doctor.name} - {doctor.specialization}
                        </SelectItem>
                      ))} */}
                      Name - Specialization
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate
                          ? format(selectedDate, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                          date.getDay() === 0 ||
                          date.getDay() === 6
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Select Time</Label>
                  <Select
                    value={selectedTime}
                    onValueChange={setSelectedTime}
                    disabled={!selectedDate}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot">
                        {selectedTime ? (
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            {selectedTime}
                          </div>
                        ) : (
                          "Select time slot"
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedDoctor &&
                    selectedDate &&
                    selectedTime &&
                    !isSlotAvailable && (
                      <p className="text-red-500 text-sm mt-1">
                        This slot is already booked. Please select another time.
                      </p>
                    )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="issue">Describe Your Issue</Label>
                  <Textarea
                    id="issue"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="Briefly describe your condition or reason for the appointment"
                    rows={3}
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={
                isSubmitting ||
                !isSlotAvailable ||
                !selectedDoctor ||
                !selectedDate ||
                !selectedTime
              }
            >
              {isSubmitting ? "Booking..." : "Book Appointment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Appointment;
