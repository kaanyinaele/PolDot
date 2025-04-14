interface PolkadotIconProps {
  className?: string;
}

const PolkadotIcon = ({ className = "h-8 w-auto" }: PolkadotIconProps) => {
  return (
    <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="#E6007A" />
      <circle cx="16" cy="8" r="2" fill="white" />
      <circle cx="16" cy="24" r="2" fill="white" />
      <circle cx="8" cy="16" r="2" fill="white" />
      <circle cx="24" cy="16" r="2" fill="white" />
      <circle cx="10.3431" cy="10.3431" r="2" fill="white" />
      <circle cx="21.6569" cy="21.6569" r="2" fill="white" />
      <circle cx="10.3431" cy="21.6569" r="2" fill="white" />
      <circle cx="21.6569" cy="10.3431" r="2" fill="white" />
    </svg>
  );
};

export default PolkadotIcon;
