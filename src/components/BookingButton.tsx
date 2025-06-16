
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface BookingButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  source?: string;
}

const BookingButton: React.FC<BookingButtonProps> = ({ 
  children, 
  variant = 'default',
  size = 'lg',
  className = '',
  source
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/book-now');
    
    // Analytics tracking (optional)
    console.log('Booking CTA clicked from:', source || 'unknown');
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={`hover-lift ${className}`}
    >
      {children}
    </Button>
  );
};

export default BookingButton;
