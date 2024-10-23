import React from "react";

const SectionHeading = ({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) => {
  return (
    <div className={`flex  flex-col mb-10 ${className}`}>
      <h1 className="text-3xl font-semibold text-black">{title}</h1>
      {description && (
        <i className="text-md font-medium text-dark">{description}</i>
      )}
    </div>
  );
};

export default SectionHeading;
