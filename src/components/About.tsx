import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Users, Calendar, Sparkles } from 'lucide-react';
import {useNavigate} from "react-router-dom";
// import mamaPic from '../../public/images/mamasPicture.jpg'
import beginningPic from '../../public/images/ChatGPT Image Aug 12, 2025, 02_46_53 PM.png';
import celebrityRecognitionPic from '../../public/images/ChatGPT Image Aug 12, 2025, 03_31_59 PM.png';
import culturalInnovation from '../../public/images/ChatGPT Image Aug 12, 2025 at 04_03_18 PM.png';
import industryLeaders from '../../public/images/ChatGPT Image Aug 12, 2025 at 05_03_18 PM.png';



const About = () => {
  const navigate = useNavigate();
  const achievements = [
    {
      icon: Calendar,
      number: "20+",
      label: "Years of Excellence",
      description: "Two decades of perfecting our craft"
    },
    {
      icon: Users,
      number: "500+",
      label: "Customers Satisfied",
      description: "Trusted by the best"
    },
    {
      icon: Star,
      number: "98%",
      label: "Client Satisfaction",
      description: "Always delivering on time"
    },
    {
      icon: Sparkles,
      number: "1000+",
      label: "Cultural Styles",
      description: "Celebrating heritage through braids"
    }
  ];

  const storyMilestones = [
    {
      year: "2004",
      title: "The Beginning",
      description: "Started with a passion for celebrating natural hair and cultural expression through traditional braiding techniques.",
      image: beginningPic
    },
    {
      year: "2010",
      title: "Celebrity Recognition",
      description: "First major breakthrough with A-list celebrities discovering our unique approach to cultural braid artistry.",
      image: celebrityRecognitionPic
    },
    {
      year: "2015",
      title: "Cultural Innovation",
      description: "Pioneered fusion techniques that blend traditional African braiding with contemporary styles, honoring heritage while embracing modernity.",
      image: culturalInnovation
    },
    {
      year: "2024",
      title: "Industry Leaders",
      description: "Today, we're recognized as the premier destination for authentic cultural expression through braiding artistry.",
      image: industryLeaders
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-salon-grey/10 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl font-bold text-salon-dark dark:text-white mb-6">
            Our Story
          </h2>
          <p className="text-2xl text-salon-dark/70 dark:text-white/70 max-w-4xl mx-auto leading-relaxed">
            For over two decades, we've been weaving stories of heritage, identity, and beauty into every braid we create
          </p>
        </div>

        {/* Main Story Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20 animate-slide-up">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-salon-dark dark:text-white">
              Celebrating Heritage Through Artistry
            </h3>
            <p className="text-lg text-salon-dark/80 dark:text-white/80 leading-relaxed">
              Our journey began in 2004 with a simple yet powerful vision: to create a space where cultural expression through braiding could flourish. What started as a small salon has evolved into a renowned destination trusted by A-list celebrities and everyday clients alike.
            </p>
            <p className="text-lg text-salon-dark/80 dark:text-white/80 leading-relaxed">
              With over 20 years of experience, we've mastered the art of working with all hair types and textures. Our expertise isn't just technical—it's deeply rooted in understanding the cultural significance of every braid we create.
            </p>
            <p className="text-lg text-salon-dark/80 dark:text-white/80 leading-relaxed">
              Every style we craft tells a story, honors a tradition, and celebrates the unique identity of our clients. From intricate traditional patterns to contemporary fusion styles, we infuse cultural expression into every creation.
            </p>
          </div>
          <div className="relative">
            {/*<img*/}
            {/*  src={mamaPic}*/}
            {/*  alt="Master braider working on intricate cultural braiding patterns"*/}
            {/*  className="w-full h-full object-cover rounded-lg shadow-2xl hover-lift"*/}
            {/*  loading="lazy"*/}
            {/*/>*/}
          </div>
        </div>

        {/* Featured Image Section - Right after main story */}
        <div className="mb-20 animate-fade-in">
          <div className="relative max-w-4xl mx-auto">
            <img
              src="https://images.unsplash.com/photo-1522338016679-53b5813bb2f6?w=1200&h=600&fit=crop&auto=format"
              alt="Beautiful showcase of diverse braiding styles and cultural heritage"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h4 className="text-2xl font-bold mb-2">Artistry in Every Strand</h4>
              <p className="text-lg opacity-90">Where tradition meets innovation</p>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 animate-scale-in">
          {achievements.map((achievement, index) => (
              <Card
                  key={index}
              className="p-6 text-center hover-lift border-0 shadow-lg bg-white dark:text-gray-600"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <achievement.icon className="h-12 w-12 text-yellow-500 dark:text-yellow-500 mx-auto mb-4" />
              <h4 className="text-3xl font-bold dark:text-gray-600 text-salon-dark mb-2">
                {achievement.number}
              </h4>
              <p className="font-semibold dark:text-gray-600 text-salon-dark mb-2">
                {achievement.label}
              </p>
              <p className="text-sm text-salon-dark/70 dark:text-gray-600">
                {achievement.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <h3 className="text-4xl font-bold text-center text-salon-dark dark:text-white mb-16">
            Our Journey Through Time
          </h3>
          <div className="space-y-16">
            {storyMilestones.map((milestone, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center animate-fade-in ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-4">
                    <span className="bg-salon-pink text-salon-dark px-4 py-2 rounded-full font-bold text-lg">
                      {milestone.year}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-salon-dark dark:text-white mb-4">
                    {milestone.title}
                  </h4>
                  <p className="text-lg text-salon-dark/80 dark:text-white/80 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <img
                    src={milestone.image}
                    alt={milestone.title}
                    className="rounded-lg shadow-xl hover-lift w-full h-80 object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Expression Section */}
        <div className="bg-gradient-to-r from-salon-pink/20 to-salon-grey/20 rounded-2xl p-12 mb-20 animate-fade-in">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-salon-dark dark:text-white mb-6">
              More Than Hair - Cultural Expression
            </h3>
            <p className="text-xl text-salon-dark/80 dark:text-white/80 leading-relaxed mb-8">
              Every braid we create is a celebration of heritage, identity, and artistic expression. We understand that hair is deeply personal and culturally significant. Our master braiders don't just style hair—they honor traditions, tell stories, and help our clients connect with their roots while expressing their unique identity.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="text-xl font-bold text-salon-dark dark:text-white mb-3">Heritage</h4>
                <p className="text-salon-dark/70 dark:text-white/70">
                  Honoring traditional techniques passed down through generations
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-salon-dark dark:text-white mb-3">Identity</h4>
                <p className="text-salon-dark/70 dark:text-white/70">
                  Helping clients express their unique cultural story through style
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-salon-dark dark:text-white mb-3">Innovation</h4>
                <p className="text-salon-dark/70 dark:text-white/70">
                  Blending traditional artistry with contemporary fashion
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in">
          <h3 className="text-3xl font-bold text-salon-dark dark:text-white mb-6">
            Ready to Experience Our Artistry?
          </h3>
          <p className="text-xl text-salon-dark/70 dark:text-white/70 mb-8 max-w-2xl mx-auto">
            Join the countless celebrities and clients who trust us with their most important moments. 
            Let us help you express your unique story through the art of braiding.
          </p>
          <Button
            size="lg"
            className="bg-salon-pink hover:bg-salon-pink/90 text-salon-dark font-semibold px-8 py-4 hover-lift"
            onClick={() => navigate('/braid-studio')}
          >
            Book Your Appointment Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;
