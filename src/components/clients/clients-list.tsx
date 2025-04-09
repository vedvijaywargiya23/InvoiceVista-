import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Edit, Trash2, Eye, PlusCircle, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface Client {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  status: string;
  address?: string;
}

export default function ClientsList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isEditClientOpen, setIsEditClientOpen] = useState(false);
  const [isViewClientOpen, setIsViewClientOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentClient, setCurrentClient] = useState<Client>({
    id: 0,
    name: "",
    contact: "",
    email: "",
    phone: "",
    status: "Active",
    address: "",
  });

  // Load clients from localStorage on component mount
  useEffect(() => {
    const loadClients = () => {
      const savedClients = localStorage.getItem("clients");
      if (savedClients) {
        try {
          setClients(JSON.parse(savedClients));
        } catch (e) {
          console.error("Error parsing clients from localStorage", e);
        }
      }
    };

    // Load clients initially
    loadClients();

    // Set up event listener for invoice updates which might add new clients
    const handleInvoiceUpdate = () => {
      loadClients();
    };

    window.addEventListener("invoiceUpdated", handleInvoiceUpdate);
    window.addEventListener("clientsUpdated", loadClients);

    // Clean up event listener
    return () => {
      window.removeEventListener("invoiceUpdated", handleInvoiceUpdate);
      window.removeEventListener("clientsUpdated", loadClients);
    };
  }, []);

  // Save clients to localStorage whenever they change
  useEffect(() => {
    if (clients.length > 0) {
      localStorage.setItem("clients", JSON.stringify(clients));
      window.dispatchEvent(new CustomEvent("clientsUpdated"));
    }
  }, [clients]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentClient({ ...currentClient, [name]: value });
  };

  const handleAddClient = () => {
    // Validate client name is not empty
    if (!currentClient.name.trim()) {
      alert("Client name cannot be empty");
      return;
    }

    // Get the latest clients from localStorage first
    const savedClients = JSON.parse(localStorage.getItem("clients") || "[]");

    // Check if client already exists
    const existingClient = savedClients.find(
      (c) => c.name.toLowerCase() === currentClient.name.toLowerCase(),
    );

    if (existingClient) {
      alert("A client with this name already exists");
      return;
    }

    const newClient = {
      ...currentClient,
      id: Date.now(),
    };

    const updatedClients = [...savedClients, newClient];
    setClients(updatedClients);
    localStorage.setItem("clients", JSON.stringify(updatedClients));
    window.dispatchEvent(new CustomEvent("clientsUpdated"));

    setCurrentClient({
      id: 0,
      name: "",
      contact: "",
      email: "",
      phone: "",
      status: "Active",
      address: "",
    });
    setIsAddClientOpen(false);
  };

  const handleEditClient = () => {
    // Get the latest clients from localStorage first
    const savedClients = JSON.parse(localStorage.getItem("clients") || "[]");

    const updatedClients = savedClients.map((client) =>
      client.id === currentClient.id ? currentClient : client,
    );

    setClients(updatedClients);
    localStorage.setItem("clients", JSON.stringify(updatedClients));
    window.dispatchEvent(new CustomEvent("clientsUpdated"));

    setIsEditClientOpen(false);
  };

  const handleDeleteClient = (id: number) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      // Get the latest clients from localStorage first
      const savedClients = JSON.parse(localStorage.getItem("clients") || "[]");

      const updatedClients = savedClients.filter((client) => client.id !== id);
      setClients(updatedClients);
      localStorage.setItem("clients", JSON.stringify(updatedClients));
      window.dispatchEvent(new CustomEvent("clientsUpdated"));
    }
  };

  const openEditDialog = (client: Client) => {
    setCurrentClient(client);
    setIsEditClientOpen(true);
  };

  const openViewDialog = (client: Client) => {
    setCurrentClient(client);
    setIsViewClientOpen(true);
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsAddClientOpen(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      {clients.length === 0 ? (
        <div className="bg-white rounded-md border p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No clients yet</h3>
          <p className="text-muted-foreground mb-4">
            Add your first client to get started with invoicing.
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsAddClientOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Your First Client
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.contact}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${client.status === "Active" ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-800"}`}
                    >
                      {client.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openViewDialog(client)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(client)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClient(client.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add Client Dialog */}
      <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>
              Enter the details of your new client.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Company Name
              </Label>
              <Input
                id="name"
                name="name"
                value={currentClient.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact" className="text-right">
                Contact Person
              </Label>
              <Input
                id="contact"
                name="contact"
                value={currentClient.contact}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={currentClient.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={currentClient.phone}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                value={currentClient.address}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddClientOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleAddClient}>
              Add Client
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Client Dialog */}
      <Dialog open={isEditClientOpen} onOpenChange={setIsEditClientOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
            <DialogDescription>
              Update the details of your client.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Company Name
              </Label>
              <Input
                id="edit-name"
                name="name"
                value={currentClient.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-contact" className="text-right">
                Contact Person
              </Label>
              <Input
                id="edit-contact"
                name="contact"
                value={currentClient.contact}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={currentClient.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-phone" className="text-right">
                Phone
              </Label>
              <Input
                id="edit-phone"
                name="phone"
                value={currentClient.phone}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-address" className="text-right">
                Address
              </Label>
              <Input
                id="edit-address"
                name="address"
                value={currentClient.address}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                Status
              </Label>
              <select
                id="edit-status"
                name="status"
                value={currentClient.status}
                onChange={(e) =>
                  setCurrentClient({
                    ...currentClient,
                    status: e.target.value,
                  })
                }
                className="col-span-3 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditClientOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleEditClient}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Client Dialog */}
      <Dialog open={isViewClientOpen} onOpenChange={setIsViewClientOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Client Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Company Name:</div>
              <div className="col-span-2">{currentClient.name}</div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Contact Person:</div>
              <div className="col-span-2">{currentClient.contact}</div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Email:</div>
              <div className="col-span-2">{currentClient.email}</div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Phone:</div>
              <div className="col-span-2">{currentClient.phone}</div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Address:</div>
              <div className="col-span-2">{currentClient.address}</div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="font-medium">Status:</div>
              <div className="col-span-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${currentClient.status === "Active" ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-800"}`}
                >
                  {currentClient.status}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => setIsViewClientOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
