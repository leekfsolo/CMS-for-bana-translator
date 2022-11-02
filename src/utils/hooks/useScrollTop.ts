import {MutableRefObject, useEffect, useState} from 'react';

export default function useScrollTop(iref: MutableRefObject<any>) {
  let target = iref.current ? iref.current : document.body;
  const [scrollTop, setScrollTop] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(target.scrollTop);
    };

    target.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => target.removeEventListener('scroll', handleScroll);
  }, [target]);

  return scrollTop;
}
