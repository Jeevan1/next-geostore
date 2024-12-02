export const PrimaryButton = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button onClick={onClick} className={`primary-btn ${className}`}>
      {children}
    </button>
  );
};

export const SecondaryButton = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`secondary-btn ${className}`}
    >
      {children}
    </button>
  );
};
