import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface Props {
  value: string; // e.g. "$12M+" or "98%"
  duration?: number;
}

function parseValue(raw: string): { prefix: string; num: number; suffix: string } {
  const match = raw.match(/^([^0-9]*)([0-9,]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return { prefix: '', num: 0, suffix: raw };
  return {
    prefix: match[1],
    num:    parseFloat(match[2].replace(/,/g, '')),
    suffix: match[3],
  };
}

export default function AnimatedCounter({ value, duration = 1800 }: Props) {
  const { prefix, num, suffix } = parseValue(value);
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current || num === 0) return;
    started.current = true;

    const start    = performance.now();
    const isDecimal = !Number.isInteger(num);

    function tick(now: number) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = eased * num;
      setDisplay(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(num);
    }

    requestAnimationFrame(tick);
  }, [inView, num, duration]);

  const formatted = Number.isInteger(num)
    ? display.toLocaleString()
    : display.toFixed(1);

  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}
