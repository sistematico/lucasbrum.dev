import Link from "next/link";

export function Button({ 
  children,
  href = "#", 
  icon = "",
  afterIcon = "", 
  className = "", 
  props
}: { 
  children: React.ReactNode; 
  href?: string; 
  icon?: React.ReactNode; 
  afterIcon?: React.ReactNode;
  className?: string; 
  props?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}) {
  return (
    <Link
      className={`
        inline-flex rounded-sm items-center gap-2 px-4 py-2 shadow-sm
        border border-black/40 border-black/30 
        text-black dark:text-white
        hover:bg-transparent hover:text-black/70 dark:hover:text-white/70
        focus:ring-3 focus:outline-hidden
        transition-all duration-200 
        ${className}
      `}
      href={href}
      {...props}
    >
      {icon}
      <span className="text-sm font-medium">{children}</span>
      {afterIcon}
    </Link>
  );
}