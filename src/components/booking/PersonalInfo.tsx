
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Phone, Mail } from 'lucide-react';
import { BookingData } from '@/pages/BookNow';

interface PersonalInfoProps {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  onNext: () => void;
}

const PersonalInfo = ({ bookingData, updateBookingData }: PersonalInfoProps) => {
  const [formData, setFormData] = useState({
    fullName: bookingData.personalInfo?.fullName || '',
    phone: bookingData.personalInfo?.phone || '',
    email: bookingData.personalInfo?.email || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Update booking data
    updateBookingData({
      personalInfo: {
        ...bookingData.personalInfo,
        [field]: value,
      } as any
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const handleBlur = (field: string, value: string) => {
    let error = '';
    
    switch (field) {
      case 'fullName':
        if (!value.trim()) error = 'Full name is required';
        else if (value.trim().length < 2) error = 'Please enter your full name';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required';
        else if (!validateEmail(value)) error = 'Please enter a valid email address';
        break;
      case 'phone':
        if (!value.trim()) error = 'Phone number is required';
        else if (!validatePhone(value)) error = 'Please enter a valid phone number';
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-salon-grey/20 dark:border-salon-pink/20">
        <CardHeader>
          <CardTitle className="flex items-center text-salon-dark dark:text-white">
            <User className="h-5 w-5 mr-2 text-salon-pink" />
            Your Information
          </CardTitle>
          <p className="text-salon-dark/70 dark:text-white/70 text-sm">
            We'll use this information to confirm your appointment and send you updates.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-salon-dark dark:text-white font-medium">
              Full Name *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-salon-pink" />
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                onBlur={(e) => handleBlur('fullName', e.target.value)}
                className={`pl-10 border-salon-grey/30 dark:border-salon-pink/30 focus:border-salon-pink ${
                  errors.fullName ? 'border-red-500' : ''
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-salon-dark dark:text-white font-medium">
              Phone Number *
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-salon-pink" />
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onBlur={(e) => handleBlur('phone', e.target.value)}
                className={`pl-10 border-salon-grey/30 dark:border-salon-pink/30 focus:border-salon-pink ${
                  errors.phone ? 'border-red-500' : ''
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-salon-dark dark:text-white font-medium">
              Email Address *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-salon-pink" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={(e) => handleBlur('email', e.target.value)}
                className={`pl-10 border-salon-grey/30 dark:border-salon-pink/30 focus:border-salon-pink ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Privacy Notice */}
          <Card className="bg-salon-grey/5 dark:bg-salon-pink/5 border-salon-grey/20 dark:border-salon-pink/20">
            <CardContent className="p-4">
              <p className="text-salon-dark/70 dark:text-white/70 text-sm">
                <strong>Privacy Notice:</strong> Your information is securely stored and only used for appointment management and communication. We never share your data with third parties.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfo;
