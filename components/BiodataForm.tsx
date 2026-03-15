"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  collection,
  addDoc,
  getDocs,
  query,
  limit,
  serverTimestamp,
  where,
  setDoc,
  doc,
  increment,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  db,
  handleFirestoreError,
  OperationType,
  storage,
} from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ImagePlus, Loader2, Save } from "lucide-react";

interface BiodataFormData {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  height: string;
  weight: string;
  maritalStatus: string;
  manglik: string;
  motherTongue: string;
  religion: string;
  caste: string;
  subCaste: string;
  gotra: string;
  rashi: string;
  nakshatra: string;
  education: string;
  occupation: string;
  company: string;
  workLocation: string;
  annualIncome: string;
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  siblings: string;
  familyType: string;
  familyStatus: string;
  contactNumber: string;
  alternateContact: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  hobbies: string;
  aboutMe: string;
  expectations: string;
}

type FieldErrors = Partial<Record<keyof BiodataFormData, string>>;

const initialFormData: BiodataFormData = {
  fullName: "",
  dateOfBirth: "",
  timeOfBirth: "",
  placeOfBirth: "",
  height: "",
  weight: "",
  maritalStatus: "",
  manglik: "",
  motherTongue: "",
  religion: "",
  caste: "",
  subCaste: "",
  gotra: "",
  rashi: "",
  nakshatra: "",
  education: "",
  occupation: "",
  company: "",
  workLocation: "",
  annualIncome: "",
  fatherName: "",
  fatherOccupation: "",
  motherName: "",
  motherOccupation: "",
  siblings: "",
  familyType: "",
  familyStatus: "",
  contactNumber: "",
  alternateContact: "",
  email: "",
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  hobbies: "",
  aboutMe: "",
  expectations: "",
};

const inputClassName =
  "w-full rounded-xl border border-orange-200 bg-orange-50/40 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-orange-400";

const SAVE_TIMEOUT_MS = 20000;

const BiodataForm = () => {
  const [formData, setFormData] = useState<BiodataFormData>(initialFormData);

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
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const revokeBlobUrl = useCallback((url: string | null) => {
    if (url && url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
  }, []);

  const fetchLatestBiodata = useCallback(
    async (userId: string) => {
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
            fullName: String(latestDoc.fullName ?? ""),
            dateOfBirth: String(latestDoc.dateOfBirth ?? ""),
            timeOfBirth: String(latestDoc.timeOfBirth ?? ""),
            placeOfBirth: String(latestDoc.placeOfBirth ?? ""),
            height: String(latestDoc.height ?? ""),
            weight: String(latestDoc.weight ?? ""),
            maritalStatus: String(latestDoc.maritalStatus ?? ""),
            manglik: String(latestDoc.manglik ?? ""),
            motherTongue: String(latestDoc.motherTongue ?? ""),
            religion: String(latestDoc.religion ?? ""),
            caste: String(latestDoc.caste ?? ""),
            subCaste: String(latestDoc.subCaste ?? ""),
            gotra: String(latestDoc.gotra ?? ""),
            rashi: String(latestDoc.rashi ?? ""),
            nakshatra: String(latestDoc.nakshatra ?? ""),
            education: String(latestDoc.education ?? ""),
            occupation: String(latestDoc.occupation ?? ""),
            company: String(latestDoc.company ?? ""),
            workLocation: String(latestDoc.workLocation ?? ""),
            annualIncome: String(latestDoc.annualIncome ?? ""),
            fatherName: String(latestDoc.fatherName ?? ""),
            fatherOccupation: String(latestDoc.fatherOccupation ?? ""),
            motherName: String(latestDoc.motherName ?? ""),
            motherOccupation: String(latestDoc.motherOccupation ?? ""),
            siblings: String(latestDoc.siblings ?? ""),
            familyType: String(latestDoc.familyType ?? ""),
            familyStatus: String(latestDoc.familyStatus ?? ""),
            contactNumber: String(
              latestDoc.contactNumber ?? latestDoc.phone ?? "",
            ),
            alternateContact: String(latestDoc.alternateContact ?? ""),
            email: String(latestDoc.email ?? activeUser?.email ?? ""),
            address: String(latestDoc.address ?? ""),
            city: String(latestDoc.city ?? ""),
            state: String(latestDoc.state ?? ""),
            country: String(latestDoc.country ?? ""),
            pincode: String(latestDoc.pincode ?? ""),
            hobbies: String(latestDoc.hobbies ?? latestDoc.skills ?? ""),
            aboutMe: String(latestDoc.aboutMe ?? ""),
            expectations: String(
              latestDoc.expectations ?? latestDoc.experience ?? "",
            ),
          });

          setPhotoName(String(latestDoc.photoName ?? ""));
          setSelectedPhotoFile(null);
          setPhotoPreviewUrl((current) => {
            revokeBlobUrl(current);
            return typeof latestDoc.photoUrl === "string"
              ? latestDoc.photoUrl
              : null;
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
    },
    [activeUser?.email, revokeBlobUrl],
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setActiveUser(user);
      setAuthLoading(false);
      setMessage(null);
      if (user) {
        setFormData((prev) => ({
          ...prev,
          email: prev.email || user.email || "",
        }));
        await fetchLatestBiodata(user.uid);
      }
    });

    return () => unsub();
  }, [fetchLatestBiodata]);

  const validateForm = () => {
    const errors: FieldErrors = {};

    if (formData.fullName.trim().length < 2) {
      errors.fullName = "Full name must be at least 2 characters.";
    }

    if (!formData.dateOfBirth.trim()) {
      errors.dateOfBirth = "Date of birth is required.";
    }

    if (!formData.placeOfBirth.trim()) {
      errors.placeOfBirth = "Place of birth is required.";
    }

    if (!formData.contactNumber.trim()) {
      errors.contactNumber = "Contact number is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (
      formData.contactNumber.trim() &&
      formData.contactNumber.trim().length < 7
    ) {
      errors.contactNumber = "Contact number should be at least 7 characters.";
    }

    if (
      formData.alternateContact.trim() &&
      formData.alternateContact.trim().length < 7
    ) {
      errors.alternateContact =
        "Alternate contact should be at least 7 characters.";
    }

    if (formData.address.trim() && formData.address.trim().length < 3) {
      errors.address = "Address should be at least 3 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof BiodataFormData;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    setFieldErrors((prev) => ({ ...prev, [fieldName]: undefined }));
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

    const withTimeout = async <T,>(
      promise: Promise<T>,
      label: string,
    ): Promise<T> => {
      return Promise.race([
        promise,
        new Promise<never>((_, reject) => {
          setTimeout(
            () => reject(new Error(`${label} timed out. Please try again.`)),
            SAVE_TIMEOUT_MS,
          );
        }),
      ]);
    };

    try {
      const existingPhotoUrl =
        photoPreviewUrl && !photoPreviewUrl.startsWith("blob:")
          ? photoPreviewUrl
          : null;

      let uploadedPhotoUrl: string | null = existingPhotoUrl;
      let uploadedPhotoPath: string | null = null;
      let photoUploadWarning: string | null = null;

      if (selectedPhotoFile) {
        try {
          const safeFileName = selectedPhotoFile.name.replace(
            /[^a-zA-Z0-9._-]/g,
            "_",
          );
          const photoPath = `biodata-photos/${activeUser.uid}/${Date.now()}-${safeFileName}`;
          const photoRef = ref(storage, photoPath);
          await withTimeout(
            uploadBytes(photoRef, selectedPhotoFile),
            "Photo upload",
          );
          uploadedPhotoUrl = await withTimeout(
            getDownloadURL(photoRef),
            "Photo URL fetch",
          );
          uploadedPhotoPath = photoPath;
        } catch (uploadError) {
          photoUploadWarning =
            uploadError instanceof Error
              ? uploadError.message
              : "Photo upload failed.";
          uploadedPhotoUrl = existingPhotoUrl;
          uploadedPhotoPath = null;
          console.warn("Photo upload skipped:", uploadError);
        }
      }

      const primaryPayload = {
        ...formData,
        photoName: photoName || null,
        photoUrl: uploadedPhotoUrl,
        photoPath: uploadedPhotoPath,
        userId: activeUser.uid,
        authEmail: activeUser.email ?? null,
        createdAt: serverTimestamp(),
      };

      await withTimeout(
        addDoc(collection(db, path), primaryPayload),
        "Biodata save",
      );

      if (uploadedPhotoUrl) {
        setPhotoPreviewUrl((current) => {
          revokeBlobUrl(current);
          return uploadedPhotoUrl;
        });
      } else if (photoUploadWarning) {
        setPhotoPreviewUrl((current) => {
          revokeBlobUrl(current);
          return null;
        });
        setPhotoName("");
      }

      setSelectedPhotoFile(null);

      // Counter update is non-critical; do not block biodata save if stats rules are not deployed.
      try {
        await withTimeout(
          setDoc(
            doc(db, "stats", "biodata"),
            {
              createdTodayCount: increment(1),
              updatedAt: serverTimestamp(),
            },
            { merge: true },
          ),
          "Stats update",
        );
      } catch (statsError) {
        console.warn("Stats counter update skipped:", statsError);
      }

      setMessage({
        type: "success",
        text: photoUploadWarning
          ? "Biodata saved successfully, but photo upload failed. You can submit a photo later."
          : "Biodata submitted and saved to Firestore successfully!",
      });
    } catch (error) {
      const errCode =
        typeof error === "object" && error !== null && "code" in error
          ? String((error as { code: unknown }).code)
          : "";
      const errMessage =
        errCode === "permission-denied"
          ? "Permission denied while saving full biodata. Please update Firestore rules for the active database and try again."
          : error instanceof Error
            ? error.message
            : "Failed to save biodata.";
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

    const nextPreviewUrl = URL.createObjectURL(file);
    setSelectedPhotoFile(file);
    setPhotoPreviewUrl((current) => {
      revokeBlobUrl(current);
      return nextPreviewUrl;
    });
    setPhotoName(file.name);
    setMessage(null);
  };

  const handleReset = useCallback(() => {
    setFormData({
      ...initialFormData,
      email: activeUser?.email || "",
    });
    setMessage(null);
    setSelectedPhotoFile(null);
    setPhotoPreviewUrl((current) => {
      revokeBlobUrl(current);
      return null;
    });
    setPhotoName("");
    setFieldErrors({});
  }, [activeUser?.email, revokeBlobUrl]);

  useEffect(() => {
    const handleExternalReset = () => {
      handleReset();
    };

    window.addEventListener("biodata:reset", handleExternalReset);
    return () => {
      window.removeEventListener("biodata:reset", handleExternalReset);
    };
  }, [handleReset]);

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
    setFormData(initialFormData);
    setMessage(null);
    setSelectedPhotoFile(null);
    setPhotoPreviewUrl((current) => {
      revokeBlobUrl(current);
      return null;
    });
    setPhotoName("");
  };

  useEffect(() => {
    return () => {
      revokeBlobUrl(photoPreviewUrl);
    };
  }, [photoPreviewUrl, revokeBlobUrl]);

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
    <div className="w-full rounded-3xl border border-orange-100 bg-white p-6 shadow-xl shadow-orange-100/70 md:p-9">
      <div className="mb-8 border-b border-orange-100 pb-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-orange-600 uppercase mb-2">
          Marriage Biodata Form
        </p>
        <h2 className="text-3xl font-extrabold text-gray-900">
          Personal Details
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

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-lg font-bold text-gray-800">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                placeholder="Enter full name"
                className={inputClassName}
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
                placeholder="Enter email"
                className={inputClassName}
              />
              {fieldErrors.email && (
                <p className="text-sm text-red-600">{fieldErrors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Date Of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                placeholder="DD/MM/YYYY"
                className={inputClassName}
              />
              {fieldErrors.dateOfBirth && (
                <p className="text-sm text-red-600">
                  {fieldErrors.dateOfBirth}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Time Of Birth
              </label>
              <input
                type="text"
                name="timeOfBirth"
                value={formData.timeOfBirth}
                onChange={handleChange}
                placeholder="07:20 PM"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Place Of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleChange}
                placeholder="Enter place of birth"
                className={inputClassName}
              />
              {fieldErrors.placeOfBirth && (
                <p className="text-sm text-red-600">
                  {fieldErrors.placeOfBirth}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Mother Tongue
              </label>
              <input
                type="text"
                name="motherTongue"
                value={formData.motherTongue}
                onChange={handleChange}
                placeholder="Hindi"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Height
              </label>
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="5 feet 9 inches"
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Weight
              </label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="70 kg"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Marital Status
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className={inputClassName}
              >
                <option value="">Select status</option>
                <option value="Never Married">Never Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Manglik
              </label>
              <select
                name="manglik"
                value={formData.manglik}
                onChange={handleChange}
                className={inputClassName}
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Partially">Partially</option>
              </select>
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800">
            Religious And Community Details
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Religion
              </label>
              <input
                type="text"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
                placeholder="Hindu"
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Caste
              </label>
              <input
                type="text"
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                placeholder="Brahmin"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Sub Caste
              </label>
              <input
                type="text"
                name="subCaste"
                value={formData.subCaste}
                onChange={handleChange}
                placeholder="Enter sub caste"
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Gotra
              </label>
              <input
                type="text"
                name="gotra"
                value={formData.gotra}
                onChange={handleChange}
                placeholder="Enter gotra"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Rashi
              </label>
              <input
                type="text"
                name="rashi"
                value={formData.rashi}
                onChange={handleChange}
                placeholder="Enter rashi"
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Nakshatra
              </label>
              <input
                type="text"
                name="nakshatra"
                value={formData.nakshatra}
                onChange={handleChange}
                placeholder="Enter nakshatra"
                className={inputClassName}
              />
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800">
            Education And Professional Details
          </h3>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Education
            </label>
            <textarea
              name="education"
              rows={3}
              value={formData.education}
              onChange={handleChange}
              placeholder="Enter education details"
              className="w-full resize-none rounded-xl border border-orange-200 bg-orange-50/40 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Occupation
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Software Engineer"
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company name"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Work Location
              </label>
              <input
                type="text"
                name="workLocation"
                value={formData.workLocation}
                onChange={handleChange}
                placeholder="City or region"
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Annual Income
              </label>
              <input
                type="text"
                name="annualIncome"
                value={formData.annualIncome}
                onChange={handleChange}
                placeholder="INR 8 LPA"
                className={inputClassName}
              />
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800">Family Details</h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Father&apos;s Name
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Enter father's name"
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Father&apos;s Occupation
              </label>
              <input
                type="text"
                name="fatherOccupation"
                value={formData.fatherOccupation}
                onChange={handleChange}
                placeholder="Enter father's occupation"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Mother&apos;s Name
              </label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                placeholder="Enter mother's name"
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Mother&apos;s Occupation
              </label>
              <input
                type="text"
                name="motherOccupation"
                value={formData.motherOccupation}
                onChange={handleChange}
                placeholder="Enter mother's occupation"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Siblings
              </label>
              <input
                type="text"
                name="siblings"
                value={formData.siblings}
                onChange={handleChange}
                placeholder="1 Brother, 1 Sister"
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Family Type
              </label>
              <select
                name="familyType"
                value={formData.familyType}
                onChange={handleChange}
                className={inputClassName}
              >
                <option value="">Select type</option>
                <option value="Nuclear">Nuclear</option>
                <option value="Joint">Joint</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Family Status
            </label>
            <select
              name="familyStatus"
              value={formData.familyStatus}
              onChange={handleChange}
              className={inputClassName}
            >
              <option value="">Select status</option>
              <option value="Middle Class">Middle Class</option>
              <option value="Upper Middle Class">Upper Middle Class</option>
              <option value="Affluent">Affluent</option>
            </select>
          </div>

          <h3 className="text-lg font-bold text-gray-800">Contact Details</h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={inputClassName}
              />
              {fieldErrors.contactNumber && (
                <p className="text-sm text-red-600">
                  {fieldErrors.contactNumber}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Alternate Contact
              </label>
              <input
                type="tel"
                name="alternateContact"
                value={formData.alternateContact}
                onChange={handleChange}
                placeholder="+91 90000 11111"
                className={inputClassName}
              />
              {fieldErrors.alternateContact && (
                <p className="text-sm text-red-600">
                  {fieldErrors.alternateContact}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address"
              className="w-full resize-none rounded-xl border border-orange-200 bg-orange-50/40 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-orange-400"
            />
            {fieldErrors.address && (
              <p className="text-sm text-red-600">{fieldErrors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className={inputClassName}
              />
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-800">
            About And Partner Preferences
          </h3>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Hobbies
            </label>
            <textarea
              name="hobbies"
              rows={3}
              value={formData.hobbies}
              onChange={handleChange}
              placeholder="Reading, travel, music"
              className="w-full resize-none rounded-xl border border-orange-200 bg-orange-50/40 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              About Me
            </label>
            <textarea
              name="aboutMe"
              rows={4}
              value={formData.aboutMe}
              onChange={handleChange}
              placeholder="Write a short introduction"
              className="w-full resize-none rounded-xl border border-orange-200 bg-orange-50/40 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Partner Expectations
            </label>
            <textarea
              name="expectations"
              rows={4}
              value={formData.expectations}
              onChange={handleChange}
              placeholder="Share preferred qualities and expectations"
              className="w-full resize-none rounded-xl border border-orange-200 bg-orange-50/40 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {message && (
            <div
              className={`rounded-xl p-4 text-sm font-medium ${
                message.type === "success"
                  ? "border border-green-100 bg-green-50 text-green-700"
                  : "border border-red-100 bg-red-50 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleReset}
              className="w-full rounded-xl border border-orange-200 px-6 py-3 font-semibold text-orange-700 hover:bg-orange-50 sm:w-auto"
            >
              Reset Form
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-orange-200 transition-all hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Submit
                </>
              )}
            </button>
          </div>
        </form>

        <aside className="lg:sticky lg:top-6 lg:h-fit lg:self-start lg:pl-2">
          <div className="rounded-3xl border border-[#e2e1e8] bg-[#f1f3f9] p-4">
            <label className="block cursor-pointer rounded-2xl border border-[#d5d9e5] bg-[#e7ebf4] px-4 py-6 text-center transition hover:bg-[#dfe5f0]">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />

              <div className="relative mx-auto flex h-52 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#d8dde9]">
                {photoPreviewUrl ? (
                  <Image
                    src={photoPreviewUrl}
                    alt="Selected profile preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <div className="text-center text-[#5f7191]">
                    <ImagePlus className="mx-auto h-14 w-14" />
                    <p className="mt-4 text-lg font-medium">
                      Click here to add your photo
                    </p>
                    <p className="mt-1 text-sm">(Up to 20MB in size)</p>
                  </div>
                )}
              </div>

              {photoName ? (
                <p className="mt-3 text-xs font-semibold text-[#5f7191]">
                  Selected: {photoName}
                </p>
              ) : null}
            </label>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BiodataForm;
