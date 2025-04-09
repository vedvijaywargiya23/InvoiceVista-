import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, Save, User, Bell, Building, Briefcase } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Switch } from "../ui/switch";

export default function UserProfile() {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    company: "",
    address: "123 Business St, City, Country",
    avatar: "",
    accountType: "business",
    taxId: "",
    website: "",
    language: "English",
    bankDetails: {
      accountNumber: "",
      ifscCode: "",
      accountName: "",
      bankName: "",
      upiId: "",
    },
    notificationSettings: {
      emailNotifications: true,
      invoiceReminders: true,
      marketingEmails: false,
    },
  });

  // Load user data from localStorage if available
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData.businessName) {
          setProfileData((prev) => ({
            ...prev,
            name: parsedData.businessName,
            email: parsedData.email || prev.email,
            accountType: parsedData.accountType || "business",
          }));
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          avatar: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    // In a real app, this would clear auth state and redirect to login
    alert("Logging out...");
    window.location.href = "/login";
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to a database
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...profileData,
        businessName: profileData.name,
      }),
    );
    alert("Profile saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">User Profile</h2>
        <Button variant="destructive" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="business">Your Details</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={profileData.avatar} />
                  <AvatarFallback className="bg-blue-100 text-blue-800">
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <div className="w-full">
                  <Label htmlFor="avatar" className="block mb-2">
                    Upload Photo
                  </Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {profileData.accountType === "freelancer"
                        ? "Full Name"
                        : "Business Name"}
                    </Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountType">Account Type</Label>
                    <select
                      id="accountType"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={profileData.accountType}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          accountType: e.target.value,
                        })
                      }
                    >
                      <option value="freelancer">Freelancer</option>
                      <option value="business">Business</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t mt-4">
                  <h3 className="text-lg font-medium">Notification Settings</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="emailNotifications"
                        className="font-medium"
                      >
                        Email Notifications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive important account updates
                      </p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={
                        profileData.notificationSettings.emailNotifications
                      }
                      onCheckedChange={(checked) =>
                        setProfileData({
                          ...profileData,
                          notificationSettings: {
                            ...profileData.notificationSettings,
                            emailNotifications: checked,
                          },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="invoiceReminders" className="font-medium">
                        Invoice Reminders
                      </Label>
                      <p className="text-sm text-gray-500">
                        Get notified about upcoming and overdue invoices
                      </p>
                    </div>
                    <Switch
                      id="invoiceReminders"
                      checked={
                        profileData.notificationSettings.invoiceReminders
                      }
                      onCheckedChange={(checked) =>
                        setProfileData({
                          ...profileData,
                          notificationSettings: {
                            ...profileData.notificationSettings,
                            invoiceReminders: checked,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="business" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" /> Your Business Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        company: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                  <Input
                    id="taxId"
                    value={profileData.taxId}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        taxId: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={profileData.website}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        website: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  value={profileData.address}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      address: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-4 pt-4 border-t mt-4">
                <h3 className="text-lg font-medium">Payment Details</h3>
                <div className="space-y-4">
                  <h4 className="font-medium">Bank Account Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountName">Account Holder Name</Label>
                      <Input
                        id="accountName"
                        value={profileData.bankDetails.accountName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            bankDetails: {
                              ...profileData.bankDetails,
                              accountName: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        value={profileData.bankDetails.accountNumber}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            bankDetails: {
                              ...profileData.bankDetails,
                              accountNumber: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input
                        id="bankName"
                        value={profileData.bankDetails.bankName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            bankDetails: {
                              ...profileData.bankDetails,
                              bankName: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ifscCode">IFSC Code</Label>
                      <Input
                        id="ifscCode"
                        value={profileData.bankDetails.ifscCode}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            bankDetails: {
                              ...profileData.bankDetails,
                              ifscCode: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <h4 className="font-medium">UPI Details</h4>
                  <div className="space-y-2">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      value={profileData.bankDetails.upiId}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          bankDetails: {
                            ...profileData.bankDetails,
                            upiId: e.target.value,
                          },
                        })
                      }
                      placeholder="example@upi"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button
          onClick={handleSaveProfile}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>
    </div>
  );
}
