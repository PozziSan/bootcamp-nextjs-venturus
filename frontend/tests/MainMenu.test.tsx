import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import MainMenu from '../components/MainMenu';

describe('MainMenu', () => {
    it('create MainMenu component', () => {
      render(<MainMenu />);
      
      expect(screen.getByText('Next Blog')).toBeTruthy();
      expect(screen.getByText('Home')).toBeTruthy();
      expect(screen.getByText('Add Post')).toBeTruthy();
    });
  });