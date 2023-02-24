export const BgOffsetWrapper = ({
  border,
  children,
  className = '',
  ...rest
}: JSX.IntrinsicElements['div'] & {
  border: 't' | 'y';
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    {...rest}
    className={`${className} ${
      border === 't' ? 'border-t' : 'border-y'
    } w-full border-primary-200 bg-primary-100 px-4 py-3 font-bold leading-6 dark:border-primary-700 dark:bg-primary-800 dark:text-white`}
  >
    {children}
  </div>
);
