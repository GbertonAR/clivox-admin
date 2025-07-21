import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`rounded-2xl shadow-md bg-white p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }: CardProps) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

export const CardTitle = ({ children, className = "" }: CardProps) => {
  return (
    <h3 className={`text-lg font-semibold leading-tight text-gray-900 ${className}`}>
      {children}
    </h3>
  );
};

export const CardDescription = ({ children, className = "" }: CardProps) => {
  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  );
};

export const CardContent = ({ children, className = "" }: CardProps) => {
  return <div className={`mt-2 ${className}`}>{children}</div>;
};