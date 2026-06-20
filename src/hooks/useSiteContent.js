import { useEffect, useState } from 'react';
import { getStoredContent } from '../data/siteContent.js';

export default function useSiteContent() {
  const [content, setContent] = useState(getStoredContent);

  useEffect(() => {
    const update = () => setContent(getStoredContent());
    window.addEventListener('builtbyamos-content-updated', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('builtbyamos-content-updated', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  return content;
}
