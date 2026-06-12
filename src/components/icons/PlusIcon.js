const PlusIcon = ({ size = 16, ...otherProps }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...otherProps}
  >
    <path d="M12 4v16m8-8H4" />
  </svg>
);

export default PlusIcon;
