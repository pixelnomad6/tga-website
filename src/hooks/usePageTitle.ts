import { useEffect } from 'react';

const SITE = 'Trust Guard Adjusters';

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : SITE;
    return () => { document.title = SITE; };
  }, [title]);
}
