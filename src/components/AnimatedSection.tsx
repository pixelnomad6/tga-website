import { motion, useInView, type TargetAndTransition } from 'framer-motion';
import { useRef, type ReactNode, type CSSProperties } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export default function AnimatedSection({
  children,
  className,
  style,
  delay = 0,
  direction = 'up',
}: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const offset = 32;
  const hidden: TargetAndTransition = { opacity: 0 };
  if (direction === 'up')    hidden.y =  offset;
  if (direction === 'down')  hidden.y = -offset;
  if (direction === 'left')  hidden.x =  offset;
  if (direction === 'right') hidden.x = -offset;

  const visible: TargetAndTransition = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={hidden}
      animate={inView ? visible : hidden}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
