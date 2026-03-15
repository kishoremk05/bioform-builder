"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  limit,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Loader2, Save } from "lucide-react";

interface Biodata {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  skills: string;
  experience: string;
}

interface FieldErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  education?: string;
  skills?: string;
  experience?: string;
}

const BiodataForm = () => {
  const [formData, setFormData] = useState<Biodata>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    education: "",
    skills: "",
    experience: "",
  });

  const [prefillLoading, setPrefillLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authActionLoading, setAuthActionLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const fetchLatestBiodata = async (userId: string) => {
    setPrefillLoading(true);
    const path = "biodata";
    try {
      const q = query(
        collection(db, path),
        where("userId", "==", userId),
        limit(1),
      );
      const querySnapshot = await Promise.race([
        getDocs(q),
        new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error("Fetch timed out.")), 7000);
        }),
      ]);

      if (!querySnapshot.empty) {
        const latestDoc = querySnapshot.docs[0].data();

        setFormData({
          fullName: latestDoc.fullName || "",
          email: latestDoc.email || "",
          phone: latestDoc.phone || "",
          address: latestDoc.address || "",
          education: latestDoc.education || "",
          skills: latestDoc.skills || "",
          experience: latestDoc.experience || "",
        });
      }
    } catch (error) {
      const isTimeout =
        error instanceof Error && error.message.includes("Fetch timed out");
      setMessage({
        type: isTimeout ? "success" : "error",
        text: isTimeout
          ? "Previous biodata prefill took too long. You can continue filling the form."
          : "Could not prefill previous biodata. You can still fill and submit the form.",
      });
      if (!isTimeout) {
        try {
          handleFirestoreError(error, OperationType.GET, path);
        } catch {
          // Keep the form usable even if logs fail.
        }
      }
    } finally {
      setPrefillLoading(false);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setActiveUser(user);
      setAuthLoading(false);
      setMessage(null);
      if (user) {
        await fetchLatestBiodata(user.uid);
      }
    });

    return () => unsub();
  }, []);

  const validateForm = () => {
    const errors: FieldErrors = {};

    if (formData.fullName.trim().length < 2) {
      errors.fullName = "Full name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (formData.phone.trim() && formData.phone.trim().length < 7) {
      errors.phone = "Phone number should be at least 7 characters.";
    }

    if (formData.address.trim() && formData.address.trim().length < 3) {
      errors.address = "Address should be at least 3 characters.";
    }

    if (formData.education.trim() && formData.education.trim().length < 3) {
      errors.education = "Education should be at least 3 characters.";
    }

    if (formData.skills.trim() && formData.skills.trim().length < 2) {
      errors.skills = "Skills should be at least 2 characters.";
    }

    if (formData.experience.trim() && formData.experience.trim().length < 3) {
      errors.experience = "Experience should be at least 3 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeUser) {
      setMessage({ type: "error", text: "Please login before submitting." });
      return;
    }

    if (!validateForm()) {
      setMessage({ type: "error", text: "Please fix the highlighted fields." });
      return;
    }

    setSaving(true);
    setMessage(null);
    const path = "biodata";

    try {
      await addDoc(collection(db, path), {
        ...formData,
        userId: activeUser.uid,
        authEmail: activeUser.email ?? null,
        createdAt: serverTimestamp(),
      });
      setMessage({
        type: "success",
        text: "Biodata submitted and saved to Firestore successfully!",
      });
    } catch (error) {
      const errMessage =
        error instanceof Error ? error.message : "Failed to save biodata.";
      setMessage({ type: "error", text: errMessage });
      try {
        handleFirestoreError(error, OperationType.CREATE, path);
      } catch {
        // Intentionally swallow rethrow from error helper so the UI can keep showing the form.
      }
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "Please select a valid image file." });
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setMessage({ type: "error", text: "Photo must be 20MB or smaller." });
      return;
    }

    setPhotoName(file.name);
    setMessage(null);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      education: "",
      skills: "",
      experience: "",
    });
    setMessage(null);
    setPhotoName("");
    setFieldErrors({});
  };

  useEffect(() => {
    const handleExternalReset = () => {
      handleReset();
    };

    window.addEventListener("biodata:reset", handleExternalReset);
    return () => {
      window.removeEventListener("biodata:reset", handleExternalReset);
    };
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail.trim() || authPassword.trim().length < 6) {
      setAuthMessage(
        "Enter a valid email and a password with at least 6 characters.",
      );
      return;
    }

    setAuthActionLoading(true);
    setAuthMessage(null);

    try {
      if (authMode === "signup") {
        await createUserWithEmailAndPassword(
          auth,
          authEmail.trim(),
          authPassword,
        );
      } else {
        await signInWithEmailAndPassword(auth, authEmail.trim(), authPassword);
      }
      setAuthMessage(
        authMode === "signup"
          ? "Account created. You are now logged in."
          : "Login successful.",
      );
      setAuthPassword("");
    } catch (error) {
      setAuthMessage(
        error instanceof Error ? error.message : "Authentication failed.",
      );
    } finally {
      setAuthActionLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      education: "",
      skills: "",
      experience: "",
    });
    setMessage(null);
  };

  if (authLoading) {
    return (
      <div className="flex min-h-[220px] items-center justify-center rounded-3xl border border-orange-100 bg-white p-8">
        <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
      </div>
    );
  }

  if (!activeUser) {
    return (
      <div className="w-full rounded-3xl border border-orange-100 bg-white p-6 shadow-xl shadow-orange-100/60 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
          Account Access
        </p>
        <h3 className="mt-2 text-2xl font-extrabold text-gray-900">
          {authMode === "signup" ? "Create account" : "Login to continue"}
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Login or sign up with Firebase, then submit your biodata to the
          <span className="font-semibold"> biodata </span>
          collection.
        </p>

        <form onSubmit={handleAuthSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-xl border border-orange-200 bg-orange-50/40 px-4 py-3 outline-none transition focus:border-transparent focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="mt-1 w-full rounded-xl border border-orange-200 bg-orange-50/40 px-4 py-3 outline-none transition focus:border-transparent focus:ring-2 focus:ring-orange-400"
              required
              minLength={6}
            />
          </div>

          {authMessage ? (
            <p className="rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-800">
              {authMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={authActionLoading}
            className="w-full rounded-xl bg-orange-600 px-5 py-3 font-bold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {authActionLoading
              ? "Please wait..."
              : authMode === "signup"
                ? "Sign up"
                : "Login"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setAuthMode((prev) => (prev === "login" ? "signup" : "login"));
            setAuthMessage(null);
          }}
          className="mt-3 w-full rounded-xl border border-orange-200 px-5 py-3 text-sm font-semibold text-orange-700 hover:bg-orange-50"
        >
          {authMode === "login"
            ? "Need an account? Switch to Sign up"
            : "Already have an account? Switch to Login"}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 md:p-9 rounded-3xl shadow-xl shadow-orange-100/70 border border-orange-100">
      <div className="mb-8 border-b border-orange-100 pb-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-orange-600 uppercase mb-2">
          Marriage Biodata Form
        </p>
        <h2 className="text-3xl font-extrabold text-gray-900">
          Start creating your biodata
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Logged in as <span className="font-semibold">{activeUser.email}</span>
        </p>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 rounded-xl border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50"
        >
          Logout
        </button>
        {prefillLoading ? (
          <p className="mt-3 text-sm text-gray-500">Loading your biodata...</p>
        ) : null}
      </div>

      <label className="mb-6 block cursor-pointer rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50/50 p-6 text-center transition hover:bg-orange-50">
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
        />
        <p className="text-sm font-medium text-orange-700">
          Click here to add your photo
        </p>
        <p className="mt-1 text-xs text-orange-600">Up to 20MB in size</p>
        {photoName ? (
          <p className="mt-2 text-xs font-semibold text-orange-700">
            Selected: {photoName}
          </p>
        ) : null}
      </label>

      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-lg font-bold text-gray-800">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-orange-50/40 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
            />
            {fieldErrors.fullName && (
              <p className="text-sm text-red-600">{fieldErrors.fullName}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-orange-50/40 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
            />
            {fieldErrors.email && (
              <p className="text-sm text-red-600">{fieldErrors.email}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 890"
              className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-orange-50/40 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
            />
            {fieldErrors.phone && (
              <p className="text-sm text-red-600">{fieldErrors.phone}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Street, City"
              className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-orange-50/40 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
            />
            {fieldErrors.address && (
              <p className="text-sm text-red-600">{fieldErrors.address}</p>
            )}
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800">Education & Skills</h3>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Education
          </label>
          <textarea
            name="education"
            rows={3}
            value={formData.education}
            onChange={handleChange}
            placeholder="Bachelor of Science in Computer Science..."
            className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-orange-50/40 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all resize-none"
          />
          {fieldErrors.education && (
            <p className="text-sm text-red-600">{fieldErrors.education}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Skills</label>
          <textarea
            name="skills"
            rows={3}
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Next.js, Tailwind CSS, Firebase..."
            className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-orange-50/40 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all resize-none"
          />
          {fieldErrors.skills && (
            <p className="text-sm text-red-600">{fieldErrors.skills}</p>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-800">Work Details</h3>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Experience
          </label>
          <textarea
            name="experience"
            rows={4}
            value={formData.experience}
            onChange={handleChange}
            placeholder="Software Engineer at Tech Corp (2020 - Present)..."
            className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-orange-50/40 focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all resize-none"
          />
          {fieldErrors.experience && (
            <p className="text-sm text-red-600">{fieldErrors.experience}</p>
          )}
        </div>

        {message && (
          <div
            className={`p-4 rounded-xl text-sm font-medium ${
              message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-100"
                : "bg-red-50 text-red-700 border border-red-100"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-orange-200 text-orange-700 hover:bg-orange-50 font-semibold"
          >
            Reset Form
          </button>

          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3.5 rounded-xl hover:bg-orange-700 transition-all font-bold shadow-lg shadow-orange-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Submit
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BiodataForm;
