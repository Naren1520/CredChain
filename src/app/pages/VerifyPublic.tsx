import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Label,
  Badge,
} from "../components/UI";
import {
  Search,
  CheckCircle2,
  QrCode,
  Download,
  ExternalLink,
  ShieldAlert,
  X,
  Loader2,
  User,
  FileText,
  GraduationCap,
  Calendar,
  Award,
  Mail,
  Phone,
  CreditCard,
} from "lucide-react";
import { motion } from "motion/react";
import {
  DataManager,
  Certificate,
  StudentProfile,
} from "../utils/DataManager";
import { Html5QrcodeScanner } from "html5-qrcode";

const ScannerModal = ({
  onClose,
  onScan,
}: {
  onClose: () => void;
  onScan: (data: string) => void;
}) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false,
    );

    scanner.render(
      (decodedText) => {
        onScan(decodedText);
        scanner.clear();
      },
      (error) => {
        // ignore errors
      },
    );

    return () => {
      scanner
        .clear()
        .catch((error) =>
          console.error("Failed to clear scanner", error),
        );
    };
  }, [onScan]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden relative animate-in zoom-in-95">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-lg">Scan QR Code</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 bg-slate-50">
          <div
            id="reader"
            className="overflow-hidden rounded-lg border-2 border-slate-200"
          ></div>
          <p className="text-center text-sm text-slate-500 mt-4">
            Point your camera at the QR code on the certificate.
          </p>
        </div>
      </div>
    </div>
  );
};

type VerifyMode = "certificate" | "profile";

export const VerifyPublic = () => {
  const [mode, setMode] = useState<VerifyMode>("certificate");
  const [query, setQuery] = useState("");
  const [certificateResult, setCertificateResult] =
    useState<Certificate | null>(null);
  const [profileResult, setProfileResult] =
    useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query) return;

    setLoading(true);
    setCertificateResult(null);
    setProfileResult(null);
    setError(false);

      try {
      if (mode === "certificate") {
        const res = await fetch(`${(import.meta.env.VITE_API_URL as string) || 'http://localhost:4000'}/verify/certificate/${encodeURIComponent(query)}`);
        if (!res.ok) { setError(true); return; }
        const json = await res.json();
        setCertificateResult(json.certificate);
      } else {
        // Student profile still uses DataManager demo data for now
        const data = await DataManager.getStudentProfile(query);
        if (data) {
          setProfileResult(data);
        } else {
          setError(true);
        }
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const onScanSuccess = async (decodedText: string) => {
    setQuery(decodedText);
    setShowScanner(false);
    // Auto verify
    setLoading(true);
    setCertificateResult(null);
    setProfileResult(null);
    setError(false);
    try {
      const data = await DataManager.getById(decodedText);
      if (data) {
        setCertificateResult(data);
        setLoading(false);
        return;
      }
    } catch (e) {
      // ignore
    }

    // Also try backend verify by token
    try {
      const res = await fetch(`${(import.meta.env.VITE_API_URL as string) || 'http://localhost:4000'}/verify/certificate/${encodeURIComponent(decodedText)}`);
      if (res.ok) {
        const json = await res.json();
        setCertificateResult(json.certificate);
      } else {
        setError(true);
      }
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setQuery("");
    setCertificateResult(null);
    setProfileResult(null);
    setError(false);
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      {showScanner && (
        <ScannerModal
          onClose={() => setShowScanner(false)}
          onScan={onScanSuccess}
        />
      )}

      <div className="bg-[#0B1B3A] py-16 px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Verify Academic Records
        </h1>
        <p className="opacity-80 max-w-2xl mx-auto">
          Instantly validate the authenticity of certificates or
          view complete student education profiles to prevent
          forgery.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <Card className="shadow-xl border-none">
          <CardContent className="p-8">
            {/* Tab Switcher */}
            <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => {
                  setMode("certificate");
                  resetSearch();
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                  mode === "certificate"
                    ? "bg-white shadow-sm text-[#0B1B3A]"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileText className="inline-block w-4 h-4 mr-2" />
                Verify Certificate
              </button>
              <button
                onClick={() => {
                  setMode("profile");
                  resetSearch();
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                  mode === "profile"
                    ? "bg-white shadow-sm text-[#0B1B3A]"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <User className="inline-block w-4 h-4 mr-2" />
                View Student Profile
              </button>
            </div>

            <form
              onSubmit={handleVerify}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex-1 relative">
                <Label htmlFor="verify-id" className="sr-only">
                  {mode === "certificate"
                    ? "Certificate ID"
                    : "Student Education ID"}
                </Label>
                <Input
                  id="verify-id"
                  placeholder={
                    mode === "certificate"
                      ? "Enter Certificate ID (e.g. CERT-2023...)"
                      : "Enter Student Education ID (e.g. 9827 1234 5678)"
                  }
                  className="h-12 text-lg pr-12"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button
                    type="button"
                    onClick={resetSearch}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-12 px-8 text-lg"
                isLoading={loading}
              >
                {mode === "certificate"
                  ? "Verify Record"
                  : "View Profile"}
              </Button>
            </form>

            {mode === "certificate" && (
              <div className="mt-6 flex items-center justify-center">
                <button
                  onClick={() => setShowScanner(true)}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full transition-colors"
                >
                  <QrCode size={18} />
                  <span>Scan QR Code</span>
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Result Section */}
        <div className="mt-12 mb-20">
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-[#0B1B3A] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-slate-500">
                Searching National Repository...
              </p>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-100 rounded-xl p-6 flex gap-4 items-start shadow-sm"
            >
              <ShieldAlert className="text-red-600 h-6 w-6 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-red-900">
                  Record Not Found
                </h3>
                <p className="text-sm text-red-800 mt-1">
                  The ID provided does not match any record in
                  our database. Please check the ID and try
                  again, or contact the issuing institution.
                </p>
              </div>
            </motion.div>
          )}

          {/* Certificate Result */}
          {certificateResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="bg-[#1A9B50] px-6 py-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={24} />
                  <span className="font-bold text-lg">
                    Valid & Verified Record
                  </span>
                </div>
                <span className="text-xs uppercase tracking-wider bg-white/20 px-2 py-1 rounded">
                  Source: National Database
                </span>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                      Student Name
                    </p>
                    <p className="text-xl font-bold text-[#0B1B3A]">
                      {certificateResult.studentName}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      DOB:{" "}
                      {certificateResult.dob
                        ? `**-**-${certificateResult.dob.split("-")[2]}`
                        : "****"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                      Institution
                    </p>
                    <p className="text-lg font-medium text-slate-900">
                      {certificateResult.institution}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                      Certificate
                    </p>
                    <p className="text-lg font-medium text-slate-900">
                      {certificateResult.courseName}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                      Issue Date
                    </p>
                    <p className="text-lg font-medium text-slate-900">
                      {certificateResult.issueDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                      Certificate ID
                    </p>
                    <p className="font-mono text-slate-700 bg-slate-100 px-2 py-1 rounded w-fit text-sm sm:text-base break-all">
                      {certificateResult.id}
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col gap-3">
                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" />{" "}
                      Download Verification Report
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />{" "}
                      View Full Transcript (Request Access)
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 text-xs text-slate-500 text-center">
                This verification report is digitally signed by
                CredChain and is legally valid under IT Act
                2000.
              </div>
            </motion.div>
          )}

          {/* Student Profile Result */}
          {profileResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#0B1B3A] to-[#0d2349] px-8 py-6 flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
                    <User size={32} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {profileResult.name}
                    </h2>
                    <p className="text-sm text-white/70 mt-1">
                      Complete Education Profile
                    </p>
                  </div>
                </div>
                <Badge className="bg-[#1A9B50] text-white px-3 py-1 border-0">
                  <CheckCircle2 size={14} className="mr-1" />
                  Verified
                </Badge>
              </div>

              {/* Personal Details */}
              <div className="p-8 bg-slate-50 border-b border-slate-200">
                <h3 className="text-lg font-bold text-[#0B1B3A] mb-4 flex items-center gap-2">
                  <CreditCard size={20} />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                      Student Education ID
                    </p>
                    <p className="font-mono text-slate-900 font-semibold">
                      {profileResult.seid}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                      Date of Birth
                    </p>
                    <p className="text-slate-900">
                      {profileResult.dob}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                      Aadhaar (Masked)
                    </p>
                    <p className="font-mono text-slate-900">
                      {profileResult.aadhaar}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                      Email
                    </p>
                    <p className="text-slate-900 text-sm flex items-center gap-1">
                      <Mail size={14} />
                      {profileResult.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                      Phone
                    </p>
                    <p className="text-slate-900 text-sm flex items-center gap-1">
                      <Phone size={14} />
                      {profileResult.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
                      Total Certificates
                    </p>
                    <p className="text-slate-900 font-bold text-xl text-[#FF7A00]">
                      {profileResult.totalCertificates}
                    </p>
                  </div>
                </div>
              </div>

              {/* Education Timeline */}
              <div className="p-8">
                <h3 className="text-lg font-bold text-[#0B1B3A] mb-6 flex items-center gap-2">
                  <GraduationCap size={20} />
                  Complete Education Timeline
                </h3>

                <div className="space-y-4">
                  {profileResult.certificates.map(
                    (cert, index) => (
                      <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative bg-white border-2 border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                      >
                        {/* Timeline connector */}
                        {index <
                          profileResult.certificates.length -
                            1 && (
                          <div className="absolute left-8 top-full w-0.5 h-4 bg-slate-200"></div>
                        )}

                        <div className="flex gap-6 items-start">
                          {/* Year Badge */}
                          <div className="flex-shrink-0">
                            <div className="bg-[#0B1B3A] text-white rounded-lg px-4 py-2 text-center min-w-[80px]">
                              <Calendar
                                size={16}
                                className="mx-auto mb-1"
                              />
                              <p className="font-bold text-lg">
                                {cert.year}
                              </p>
                            </div>
                          </div>

                          {/* Certificate Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <h4 className="font-bold text-lg text-[#0B1B3A]">
                                  {cert.courseName}
                                </h4>
                                <p className="text-slate-600 text-sm mt-1">
                                  {cert.institution}
                                </p>
                              </div>
                              <Badge
                                className={`shrink-0 ${
                                  cert.status === "Verified"
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : cert.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                      : "bg-red-100 text-red-800 border-red-200"
                                }`}
                              >
                                {cert.status}
                              </Badge>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-slate-600 mt-3">
                              <div className="flex items-center gap-1">
                                <FileText size={14} />
                                <span>Type: {cert.type}</span>
                              </div>
                              {cert.grade && (
                                <div className="flex items-center gap-1">
                                  <Award size={14} />
                                  <span>
                                    Grade:{" "}
                                    <span className="font-semibold text-[#FF7A00]">
                                      {cert.grade}
                                    </span>
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                <span>
                                  Issued: {cert.issueDate}
                                </span>
                              </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-slate-100">
                              <p className="text-xs text-slate-500 font-mono">
                                Certificate ID: {cert.id}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ),
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="p-8 bg-slate-50 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1 h-12">
                    <Download className="mr-2 h-5 w-5" />
                    Download Complete Profile (PDF)
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 h-12"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Share Verification Link
                  </Button>
                </div>
                <p className="text-xs text-slate-500 text-center mt-4">
                  This profile is digitally verified and
                  tamper-proof. All certificates are
                  blockchain-secured.
                </p>
              </div>

              <div className="bg-[#0B1B3A] px-6 py-4 text-xs text-white/70 text-center">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2
                    size={14}
                    className="text-[#1A9B50]"
                  />
                  Verified by CredChain • Legally valid under
                  IT Act 2000 • Last verified:{" "}
                  {new Date().toLocaleDateString("en-IN")}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};