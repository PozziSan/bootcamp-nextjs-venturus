import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import NavLink from '../components/NavLink';

describe('NavLink', () => {
  const navLinkData = {
    children: 'Link',
    href: '#',
  };

  it('renders link text', () => {
    render(<NavLink href={navLinkData.href}>{navLinkData.children}</NavLink>);

    expect(screen.getByRole('link')).toHaveTextContent(navLinkData.children);
  });

  it('has the right url', () => {
    render(<NavLink href={navLinkData.href}>{navLinkData.children}</NavLink>);

    const link: HTMLLinkElement = screen.getByRole('link');

    expect(link.href).toContain(navLinkData.href);
  });
});
