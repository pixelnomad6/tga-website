import { motion } from 'framer-motion';
import type { ReactNode, CSSProperties } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  to?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  style?: CSSProperties;
}

const styles: Record<Variant, string> = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  ghost:     'btn-ghost',
  outline:   'btn-outline',
};

const sizes: Record<Size, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  type = 'button',
  onClick,
  disabled,
  fullWidth,
  className = '',
  style,
}: ButtonProps) {
  const cls = `btn ${styles[variant]} ${sizes[size]} ${fullWidth ? 'btn-full' : ''} ${className}`.trim();

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap:   { scale: 0.98 },
    transition: { duration: 0.15 },
  };

  if (to) {
    return (
      <motion.div {...motionProps} style={{ display: fullWidth ? 'block' : 'inline-block', ...style }}>
        <Link to={to} className={cls}>{children}</Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a {...motionProps} href={href} className={cls} style={style} target="_blank" rel="noopener noreferrer">
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls}
      style={style}
    >
      {children}
    </motion.button>
  );
}
