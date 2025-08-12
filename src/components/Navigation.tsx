
import { useState } from 'react';
import { Menu, X, Scissors, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookingButton from '@/components/BookingButton';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Braid Studio', href: '/braid-studio' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black-950/95 dark:bg-salon-dark/95 backdrop-blur-sm border-b border-salon-grey/20 dark:border-salon-pink/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-salon-pink p-2 rounded-full">
              <Scissors className="h-6 w-6 text-salon-dark" />
            </div>
            <span
                className="text-2xl font-boldb text-black dark:text-black"
                style={{
                  WebkitTextStroke: '0.2px pink',

                }}
            >
              Remi Braids
          </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.href.startsWith('/#') ? (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-salon-dark dark:text-white hover:text-salon-pink dark:hover:text-salon-pink transition-colors duration-300 font-medium"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-salon-dark dark:text-white hover:text-salon-pink dark:hover:text-salon-pink transition-colors duration-300 font-medium"
                >
                  {item.name}
                </Link>
              )
            ))}
            
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-salon-dark dark:text-white hover:text-salon-pink dark:hover:text-salon-pink"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            
            <BookingButton 
              className="bg-salon-pink hover:bg-salon-pink/90 text-salon-dark font-semibold px-6"
              source="navigation-desktop"
            >
              Book Now
            </BookingButton>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-salon-dark dark:text-white hover:text-salon-pink dark:hover:text-salon-pink"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-salon-dark dark:text-white hover:text-salon-pink dark:hover:text-salon-pink transition-colors duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-transparent dark:bg-black border-t border-salon-grey/20 dark:border-salon-pink/20">
              {navItems.map((item) => (
                item.href.startsWith('/#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-gray-600 dark:text-white hover:text-salon-pink dark:hover:text-salon-pink transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-salon-dark dark:text-white hover:text-salon-pink dark:hover:text-salon-pink transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <div className="px-3 pt-2">
                <BookingButton 
                  className="w-full bg-salon-pink hover:bg-salon-pink/90 text-salon-dark font-semibold"
                  source="navigation-mobile"
                >
                  Book Now
                </BookingButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
