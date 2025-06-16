import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Heart, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState('');
  const [isFromBooking, setIsFromBooking] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const { toast } = useToast();

  // Your salon's WhatsApp number (replace with your actual number)
  const SALON_WHATSAPP_NUMBER = '+2348023291202';

  useEffect(() => {
    // Check if user came from a booking CTA
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('booking') === 'true') {
      setIsFromBooking(true);
    }
  }, []);

  const moods = [
    { id: 'glow-up', name: 'Ready for a Glow Up!', icon: Heart, color: 'bg-salon-pink' },
    { id: 'maintenance', name: 'Just Maintenance', icon: Clock, color: 'bg-salon-grey' },
    { id: 'dramatic', name: 'Something Dramatic!', icon: Zap, color: 'bg-gradient-to-r from-salon-pink to-salon-grey' },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Beauty Boulevard', 'Luxury District, LX 12345'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+2348023291202', 'Available 9AM - 8PM'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@luxehair.com', 'Response within 24hrs'],
    },
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const sendWhatsAppMessage = () => {
    const moodText = moods.find(m => m.id === mood)?.name || mood;
    const message = `Hi! I'm interested in your hair services.

*My Details:*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Hair Mood: ${moodText}

*Message:*
${formData.message || 'Looking forward to hearing from you!'}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SALON_WHATSAPP_NUMBER.replace('+', '')}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { mood, ...formData });
    
    // Send WhatsApp message
    sendWhatsAppMessage();
    
    // Show success toast
    toast({
      title: "Message Sent!",
      description: "WhatsApp has been opened with your message. Complete the sending process in WhatsApp.",
    });

    // Optional: Reset form after submission
    setTimeout(() => {
      setStep(1);
      setMood('');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    }, 2000);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-salon-pink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          {isFromBooking && (
            <div className="mb-4">
              <span className="bg-salon-pink text-salon-dark px-4 py-2 rounded-full text-sm font-semibold">
                Ready to Book? 
              </span>
            </div>
          )}
          <h2 className="text-5xl font-bold text-salon-dark dark:text-black mb-6">
            {isFromBooking ? 'Start Your Hair Story Today' : 'Let\'s Connect'}
          </h2>
          <p className="text-xl text-salon-dark/70 max-w-2xl dark:text-gray-600 mx-auto">
            {isFromBooking 
              ? 'Your perfect hairstyle awaits. Let\'s make your hair dreams come true'
              : 'Ready to transform your look? We\'re here to make your hair dreams come true'
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Interactive Contact Form */}
          <div className="animate-slide-up">
            <Card className="p-8 border-0 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="animate-fade-in">
                    <h3 className="text-2xl font-bold text-salon-dark mb-6">
                      What's your hair mood today?
                    </h3>
                    <div className="space-y-4">
                      {moods.map((moodOption) => (
                        <Button
                          key={moodOption.id}
                          type="button"
                          variant={mood === moodOption.id ? "default" : "outline"}
                          onClick={() => setMood(moodOption.id)}
                          className={`w-full p-6 h-auto flex items-center justify-start space-x-4 hover-lift ${
                            mood === moodOption.id
                              ? 'bg-salon-pink text-salon-dark'
                              : 'border-salon-grey hover:bg-salon-grey/20 text-salon-dark'
                          }`}
                        >
                          <div className={`p-3 rounded-full ${moodOption.color}`}>
                            <moodOption.icon className="h-6 w-6 text-white" />
                          </div>
                          <span className="text-lg font-medium">{moodOption.name}</span>
                        </Button>
                      ))}
                    </div>
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!mood}
                      className="w-full mt-6 bg-salon-pink hover:bg-salon-pink/90 text-salon-dark font-semibold"
                    >
                      Next Step
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="animate-fade-in space-y-4">
                    <h3 className="text-2xl font-bold text-salon-dark mb-6">
                      Tell us about yourself
                    </h3>
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border-salon-grey focus:border-salon-pink"
                    />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border-salon-grey focus:border-salon-pink"
                    />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="border-salon-grey focus:border-salon-pink"
                    />
                    <div className="flex space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1 border-salon-grey hover:bg-salon-grey/20 text-salon-dark"
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNext}
                        disabled={!formData.name || !formData.email}
                        className="flex-1 bg-salon-pink hover:bg-salon-pink/90 text-salon-dark font-semibold"
                      >
                        Next Step
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="animate-fade-in space-y-4">
                    <h3 className="text-2xl font-bold text-salon-dark mb-6">
                      Any special requests?
                    </h3>
                    <Textarea
                      placeholder="Tell us about your hair goals, inspiration, or any questions you have..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="border-salon-grey focus:border-salon-pink min-h-[120px]"
                    />
                    <div className="flex space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(2)}
                        className="flex-1 border-salon-grey hover:bg-salon-grey/20 text-salon-dark"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-salon-pink hover:bg-salon-pink/90 text-salon-dark font-semibold hover-lift"
                      >
                        Send via WhatsApp
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 animate-scale-in">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg hover-lift">
                <div className="flex items-start space-x-4">
                  <div className="bg-salon-pink p-3 rounded-full">
                    <info.icon className="h-6 w-6 text-salon-dark" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-salon-dark mb-2">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-salon-dark/70">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </Card>
            ))}

            {/* Hours */}
            <Card className="hover-lift space-y-8 animate-scale-in p-6 border-0 shadow-lg dark:bg-gray-830 ">
              <h3 className="text-xl font-semibold text-salon-dark mb-4">
                Studio Hours
              </h3>
              <div className="space-y-2 text-salon-dark/70">
                <div className="flex justify-between">
                  <span>Monday - Wednesday</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Thursday - Friday</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>10:00 AM - 5:00 PM</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
