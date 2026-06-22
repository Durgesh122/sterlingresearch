import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileSignature, BadgeCheck, ShieldCheck } from 'lucide-react';
import RevealOnScroll from '../components/common/RevealOnScroll';

const EsignConsent = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    fatherName: '',
    clientId: '',
    registeredEmail: '',
    dob: '',
    panNumber: '',
    currentAddress: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const todayIso = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'panNumber' ? value.toUpperCase() : value;
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    const nameRegex = /^[A-Za-z ]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!nameRegex.test(formData.clientName.trim())) {
      nextErrors.clientName = 'Please enter a valid client name (min 3 letters).';
    }
    if (!nameRegex.test(formData.fatherName.trim())) {
      nextErrors.fatherName = "Please enter a valid father's name (min 3 letters).";
    }
    if (formData.clientId.trim().length < 4) {
      nextErrors.clientId = 'Client ID must be at least 4 characters.';
    }
    if (!emailRegex.test(formData.registeredEmail.trim())) {
      nextErrors.registeredEmail = 'Please enter a valid registered email ID.';
    }
    if (!formData.dob) {
      nextErrors.dob = 'Please select date of birth.';
    } else if (formData.dob > todayIso) {
      nextErrors.dob = 'Date of birth cannot be a future date.';
    }
    if (!panRegex.test(formData.panNumber.trim())) {
      nextErrors.panNumber = 'PAN must be in format ABCDE1234F.';
    }
    if (formData.currentAddress.trim().length < 10) {
      nextErrors.currentAddress = 'Please enter complete current address (min 10 characters).';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setSubmitted(true);
  };

  const inputClass = (fieldName) =>
    `w-full px-4 py-3 rounded-lg border ${
      errors[fieldName] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
    } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8f1038]/30`;

  return (
    <div className="compliance-theme min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8">
        <RevealOnScroll>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Acceptance Form</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Please review and accept the service terms before onboarding. This helps us maintain a transparent and SEBI-compliant advisory process.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FileSignature className="text-[#8f1038]" /> Client Acceptance Form
            </h2>

            {submitted && (
              <div className="mb-5 rounded-lg border border-green-300 bg-green-50 text-green-800 px-4 py-3 text-sm">
                Acceptance form submitted successfully. Our team will contact you on your registered details.
              </div>
            )}

            <form className="space-y-6" noValidate onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="clientName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Client Name</label>
                  <input
                    id="clientName"
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    className={inputClass('clientName')}
                    placeholder="Enter client name"
                  />
                  {errors.clientName && <p className="mt-1 text-xs text-red-600">{errors.clientName}</p>}
                </div>

                <div>
                  <label htmlFor="fatherName" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Father's Name</label>
                  <input
                    id="fatherName"
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    className={inputClass('fatherName')}
                    placeholder="Enter father's name"
                  />
                  {errors.fatherName && <p className="mt-1 text-xs text-red-600">{errors.fatherName}</p>}
                </div>

                <div>
                  <label htmlFor="clientId" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Client ID</label>
                  <input
                    id="clientId"
                    type="text"
                    name="clientId"
                    value={formData.clientId}
                    onChange={handleChange}
                    className={inputClass('clientId')}
                    placeholder="Enter client ID"
                  />
                  {errors.clientId && <p className="mt-1 text-xs text-red-600">{errors.clientId}</p>}
                </div>

                <div>
                  <label htmlFor="registeredEmail" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Registered Email ID</label>
                  <input
                    id="registeredEmail"
                    type="email"
                    name="registeredEmail"
                    value={formData.registeredEmail}
                    onChange={handleChange}
                    className={inputClass('registeredEmail')}
                    placeholder="Enter registered email"
                  />
                  {errors.registeredEmail && <p className="mt-1 text-xs text-red-600">{errors.registeredEmail}</p>}
                </div>

                <div>
                  <label htmlFor="dob" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Date Of Birth (As per PAN)</label>
                  <input
                    id="dob"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    max={todayIso}
                    onChange={handleChange}
                    className={inputClass('dob')}
                  />
                  {errors.dob && <p className="mt-1 text-xs text-red-600">{errors.dob}</p>}
                </div>

                <div>
                  <label htmlFor="panNumber" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">PAN Card Number</label>
                  <input
                    id="panNumber"
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    maxLength={10}
                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                    className={`${inputClass('panNumber')} uppercase`}
                    placeholder="ABCDE1234F"
                  />
                  {errors.panNumber && <p className="mt-1 text-xs text-red-600">{errors.panNumber}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="currentAddress" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Current Full Address</label>
                <textarea
                  id="currentAddress"
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleChange}
                  rows={4}
                  className={inputClass('currentAddress')}
                  placeholder="Enter complete current address"
                />
                {errors.currentAddress && <p className="mt-1 text-xs text-red-600">{errors.currentAddress}</p>}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#1e5631] text-white font-semibold hover:bg-[#184628] transition-colors"
              >
                Submit Acceptance Form
              </button>
            </form>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
                <p className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                  <BadgeCheck className="w-4 h-4 text-[#8f1038]" /> Compliance Ready
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Client consent and onboarding aligned with compliance-first workflow.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
                <p className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                  <ShieldCheck className="w-4 h-4 text-[#8f1038]" /> Data Privacy
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Shared information is handled under our privacy and record-keeping policy.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/disclosure"
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-[#8f1038] text-[#8f1038] hover:bg-[#8f1038] hover:text-white transition-colors"
              >
                Review Compliance Docs
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default EsignConsent;
