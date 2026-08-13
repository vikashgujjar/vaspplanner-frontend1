import React from 'react';

/**
 * Normalizes backend validation error response into a key-value object { fieldName: errorMessage }
 */
export function parseServerErrors(result) {
  if (!result) return { fieldErrors: {}, summaryMessage: null };

  const fieldErrors = {};
  let summaryMessage = result.message || null;

  if (result.errors && typeof result.errors === 'object') {
    Object.keys(result.errors).forEach((key) => {
      const val = result.errors[key];
      if (Array.isArray(val)) {
        fieldErrors[key] = val[0];
      } else if (typeof val === 'string') {
        fieldErrors[key] = val;
      }
    });
  }

  return {
    fieldErrors,
    summaryMessage
  };
}

/**
 * Component to display inline field-level validation errors
 */
export function FieldError({ error, className = "" }) {
  if (!error) return null;
  const message = Array.isArray(error) ? error[0] : error;
  if (!message) return null;

  return (
    <p className={`text-xs text-red-500 font-medium mt-1.5 ml-1 animate-in fade-in slide-in-from-top-1 duration-200 flex items-center gap-1 ${className}`}>
      <span>⚠️</span>
      <span>{message}</span>
    </p>
  );
}
