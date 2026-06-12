const ChevronDownIcon = ({ size = 14, ...otherProps }) => (
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
    <path d="M19 9l-7 7-7-7" />
  </svg>
);

export default ChevronDownIcon;
