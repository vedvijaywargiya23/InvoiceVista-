import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import AuthLayout from "./auth-layout";
import {
  Building2,
  Mail,
  Lock,
  KeyRound,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Shield,
  User,
  Briefcase,
} from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "business", // Default to business
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
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

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Mock signup - replace with actual authentication
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem(
        "user",
        JSON.stringify({
          businessName: formData.businessName,
          email: formData.email,
          accountType: formData.accountType,
          isLoggedIn: true,
        }),
      );
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Start managing your invoices professionally"
    >
      <div className="mb-6 flex justify-between items-center">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to home
        </Link>
        <div className="flex items-center">
          <div className="bg-blue-600 text-white p-1.5 rounded-md mr-2">
            <FileText className="h-4 w-4" />
          </div>
          <span className="font-semibold text-blue-700">InvoiceVista</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-lg mb-8 border border-blue-200">
        <div className="flex flex-col sm:flex-row gap-6 justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 bg-blue-500 rounded-full p-1.5">
              <CheckCircle2 className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-800">
                Professional Invoices
              </h3>
              <p className="text-xs text-blue-600">Create branded invoices</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 bg-blue-500 rounded-full p-1.5">
              <CheckCircle2 className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-800">
                Client Management
              </h3>
              <p className="text-xs text-blue-600">
                Organize client information
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 bg-blue-500 rounded-full p-1.5">
              <CheckCircle2 className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-blue-800">
                Financial Insights
              </h3>
              <p className="text-xs text-blue-600">
                Track business performance
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSignup} className="space-y-5">
        <div className="space-y-2">
          <Label className="text-gray-700">Account Type</Label>
          <RadioGroup
            defaultValue={formData.accountType}
            className="flex space-x-4 pt-2"
            onValueChange={(value) => {
              setFormData({
                ...formData,
                accountType: value,
              });
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="freelancer" id="freelancer" />
              <Label
                htmlFor="freelancer"
                className="flex items-center gap-2 cursor-pointer"
              >
                <User className="h-4 w-4 text-blue-600" /> Freelancer
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="business" id="business" />
              <Label
                htmlFor="business"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Briefcase className="h-4 w-4 text-blue-600" /> Business
                Professional
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="businessName"
            className="text-gray-700 flex items-center gap-2"
          >
            <Building2 className="h-4 w-4" />{" "}
            {formData.accountType === "freelancer"
              ? "Your Name"
              : "Business Name"}
          </Label>
          <Input
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className={`h-11 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.businessName ? "border-red-500" : ""}`}
            required
          />
          {errors.businessName && (
            <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-gray-700 flex items-center gap-2"
          >
            <Mail className="h-4 w-4" /> Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`h-11 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? "border-red-500" : ""}`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-gray-700 flex items-center gap-2"
          >
            <Lock className="h-4 w-4" /> Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`h-11 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.password ? "border-red-500" : ""}`}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <Shield className="h-3 w-3 text-blue-500" />
            Password must be at least 6 characters long
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="text-gray-700 flex items-center gap-2"
          >
            <KeyRound className="h-4 w-4" /> Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`h-11 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.confirmPassword ? "border-red-500" : ""}`}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="flex items-start space-x-2 mt-4 bg-gray-50 p-3 rounded-md border border-gray-100">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms"
              className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${errors.terms ? "text-red-500" : "text-gray-700"}`}
            >
              I agree to the terms and conditions
            </label>
            {errors.terms && (
              <p className="text-red-500 text-xs">{errors.terms}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-medium mt-6 shadow-sm hover:shadow transition-all"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <p className="text-center text-sm text-gray-500">
          By creating an account, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
