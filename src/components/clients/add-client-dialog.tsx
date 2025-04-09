import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PlusCircle, Building2, Mail, Phone, MapPin } from "lucide-react";

interface Client {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address: string;
  gstNumber?: string;
}

interface AddClientDialogProps {
  onClientAdded: (client: Client) => void;
  trigger?: React.ReactNode;
}

export default function AddClientDialog({
  onClientAdded,
  trigger,
}: AddClientDialogProps) {
  const [open, setOpen] = useState(false);
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gstNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setClientData({
      ...clientData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!clientData.name.trim()) {
      newErrors.name = "Client name is required";
    }

    if (!clientData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(clientData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!clientData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Create a new client with a random ID
    const newClient: Client = {
      id: Math.floor(Math.random() * 10000),
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
      address: clientData.address,
      gstNumber: clientData.gstNumber,
    };

    // Get existing clients from localStorage or initialize empty array
    const existingClients = JSON.parse(localStorage.getItem("clients") || "[]");

    // Add new client
    existingClients.push(newClient);

    // Save to localStorage
    localStorage.setItem("clients", JSON.stringify(existingClients));

    // Call the callback with the new client
    onClientAdded(newClient);

    // Reset form and close dialog
    setClientData({
      name: "",
      email: "",
      phone: "",
      address: "",
      gstNumber: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Client
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Enter the client details below to add them to your client list.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-gray-700 flex items-center gap-2"
            >
              <Building2 className="h-4 w-4" /> Client Name
            </Label>
            <Input
              id="name"
              name="name"
              value={clientData.name}
              onChange={handleChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-gray-700 flex items-center gap-2"
            >
              <Mail className="h-4 w-4" /> Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={clientData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-gray-700 flex items-center gap-2"
            >
              <Phone className="h-4 w-4" /> Phone Number (Optional)
            </Label>
            <Input
              id="phone"
              name="phone"
              value={clientData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="text-gray-700 flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" /> Address
            </Label>
            <Textarea
              id="address"
              name="address"
              value={clientData.address}
              onChange={handleChange}
              className={errors.address ? "border-red-500" : ""}
              rows={3}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="gstNumber"
              className="text-gray-700 flex items-center gap-2"
            >
              <Building2 className="h-4 w-4" /> GST Number (Optional)
            </Label>
            <Input
              id="gstNumber"
              name="gstNumber"
              value={clientData.gstNumber}
              onChange={handleChange}
            />
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Client</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
