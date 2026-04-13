"use client";

import { useState } from "react";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  accepted: boolean;
}

interface FieldErrors {
  firstname?: string;
  lastname?: string;
  email?: string;
  accepted?: string;
}

export default function NewsletterComponent() {
  const [formData, setFormData] = useState<FormData>({ firstname: "", lastname: "", email: "", accepted: false });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validate(data: FormData): FieldErrors {
    const errs: FieldErrors = {};
    if (!data.firstname.trim()) errs.firstname = "Förnamn är obligatoriskt.";
    if (!data.lastname.trim()) errs.lastname = "Efternamn är obligatoriskt.";
    if (!data.email.trim()) {
      errs.email = "E-postadress är obligatorisk.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = "Ange en giltig e-postadress.";
    }
    if (!data.accepted) errs.accepted = "Du måste acceptera villkoren.";
    return errs;
  }

  async function handleSubmit() {
    setSuccessMessage("");
    const clientErrors = validate(formData);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.status === 200) {
        setSuccessMessage(json.message);
        setFormData({ firstname: "", lastname: "", email: "", accepted: false });
      } else if (res.status === 403) {
        setErrors(json.errors || {});
      }
    } catch {
      setErrors({ email: "Något gick fel. Försök igen." });
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  const inputClass = (error?: string) =>
    `w-full bg-gray-100 px-4 py-3 text-sm font-semibold tracking-widest text-gray-800 placeholder-gray-800 outline-none ${error ? "ring-1 ring-red-400" : ""}`;

  return (
    <div className="py-16 px-4 bg-white md:bg-gray-100">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-10">
          <p className="text-2xl font-bold text-gray-800">Nyhetsbrev</p>
          <p className="text-2xl font-bold text-gray-800">Få 10% På Ditt Första Köp</p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch">
          <div className="w-full md:w-1/2">
            <img src="/berg.jpg" alt="Natur" className="w-full h-full object-cover" />
          </div>

          <div className="w-full md:w-1/2 bg-white px-0 md:px-8 py-8 flex flex-col justify-center gap-6">
            <div>
              <input type="text" name="firstname" placeholder="FÖRNAMN" value={formData.firstname} onChange={handleChange} className={inputClass(errors.firstname)} />
              {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
            </div>
            <div>
              <input type="text" name="lastname" placeholder="EFTERNAMN" value={formData.lastname} onChange={handleChange} className={inputClass(errors.lastname)} />
              {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
            </div>
            <div>
              <input type="email" name="email" placeholder="E-POSTADRESS" value={formData.email} onChange={handleChange} className={inputClass(errors.email)} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
          <div className="flex flex-col gap-1 w-full md:w-auto">
            <label className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
              <div className="relative shrink-0">
                <input
                  type="checkbox"
                  checked={formData.accepted}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, accepted: e.target.checked }));
                    if (errors.accepted) setErrors((prev) => ({ ...prev, accepted: undefined }));
                  }}
                  style={{ borderRadius: 0 }}
                  className="appearance-none w-6 h-6 border-2 border-gray-400 bg-white checked:bg-white checked:border-gray-800 cursor-pointer transition-transform duration-300 hover:scale-125 active:scale-125"
                />
                {formData.accepted && (
                  <svg className="absolute inset-0 m-auto w-5 h-5 pointer-events-none text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              Jag accepterar hantering av personuppgifter.
            </label>
            {errors.accepted && <p className="text-red-500 text-xs ml-9">{errors.accepted}</p>}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full md:w-auto bg-orange-500 text-white border-2 border-orange-500 hover:bg-white hover:text-gray-800 hover:border-gray-800 hover:scale-105 active:scale-95 font-semibold px-14 py-3 tracking-widest uppercase text-sm transition-all duration-200 disabled:opacity-60"
          >
            {isLoading ? "Skickar..." : "Sign Up"}
          </button>
        </div>

        {successMessage && (
          <p className="text-green-600 text-sm font-medium text-center mt-4">{successMessage}</p>
        )}

      </div>
    </div>
  );
}