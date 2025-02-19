interface Props extends React.HTMLProps<HTMLSpanElement> {
  label: string;
  className?: string;
}

const Badge = (props: Props) => {
  const { label, className = '', ...rest } = props;
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs capitalize ${className}`}
      {...rest}
    >
      {label}
    </span>
  );
};

export default Badge;
