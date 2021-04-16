import { cloneElement, ReactElement, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
}

export function ActiveLink({ children, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter();

  const isActive = useMemo(() => {
    return asPath === rest.href || asPath === rest.as;
  }, [asPath, rest?.href, rest?.as]);

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.50',
      })}
    </Link>
  );
}
