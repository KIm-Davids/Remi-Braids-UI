
import { useNavigate, useLocation } from 'react-router-dom';

export const useBookingNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToBooking = (source?: string) => {
    // Check if we're already on a page with a contact section
    const hasContactSection = document.getElementById('contact');
    
    if (hasContactSection && location.pathname === '/') {
      // Smooth scroll to contact section on the same page
      hasContactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Navigate to home page with contact focus
      navigate('/?booking=true#contact');
      
      // After navigation, scroll to contact
      setTimeout(() => {
        const contactElement = document.getElementById('contact');
        if (contactElement) {
          contactElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }

    // Analytics tracking (optional)
    console.log('Booking CTA clicked from:', source || 'unknown');
  };

  return { navigateToBooking };
};
