
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const StyleGallery = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Styles' },
    { id: 'cuts', name: 'Cuts' },
    { id: 'colors', name: 'Colors' },
    { id: 'updos', name: 'Updos' },
    { id: 'curls', name: 'Curls' },
    { id: 'braids', name: 'Braids' },
  ];

  const styles = [
    {
      id: 1,
      title: 'Platinum Pixie',
      category: 'cuts',
      image: 'https://i0.wp.com/therighthairstyles.com/wp-content/uploads/2013/11/2-neat-scalp-braids-for-natural-hair.jpg?w=500&ssl=1',
      description: 'Bold and edgy short cut with platinum highlights'
    },
    {
      id: 2,
      title: 'Rose Gold Waves',
      category: 'colors',
      image: 'https://www.papaganlar.net/fashion-lifestyle-trends/wp-content/uploads/2023/12/2020-12-31-19.39.01-2476423779292432488_5529110470.jpg',
      description: 'Soft waves with rose gold color melting'
    },
    {
      id: 3,
      title: 'Romantic Updo',
      category: 'updos',
      image: 'https://www.thrivenaija.com/wp-content/uploads/2020/03/Mya-Monique.jpg',
      description: 'Elegant updo perfect for special occasions'
    },
    {
      id: 4,
      title: 'Beach Curls',
      category: 'curls',
      image: 'https://www.nairaland.com/attachments/16677012_5_jpegddf9c9a45551e218c4018d5c53e9f6bb',
      description: 'Effortless beach waves with natural texture'
    },
    {
      id: 5,
      title: 'Dutch Crown Braid',
      category: 'braids',
      image: 'https://hips.hearstapps.com/hmg-prod/images/jourdan-dunn-wears-a-black-pleated-shoulder-off-cut-out-news-photo-1677599099.jpg?crop=0.88889xw:1xh;center,top&resize=1200:*',
      description: 'Intricate braided crown with modern twist'
    },
    {
      id: 6,
      title: 'Balayage Bob',
      category: 'colors',
      image: 'https://i.redd.it/cute-braid-hairstyles-for-kiddies-v0-xpedwgkaukec1.png?width=1024&format=png&auto=webp&s=c2cbcccda853a9e242a2613b6a40b560d8a015db',
      description: 'Chic bob with hand-painted balayage highlights'
    },
  ];

  const filteredStyles = activeFilter === 'all' 
    ? styles 
    : styles.filter(style => style.category === activeFilter);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-white to-salon-grey/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl dark:text-black font-bold text-salon-dark mb-6">
            Style Gallery
          </h2>
          <p className="text-xl dark:text-gray-600 text-salon-dark/70 max-w-2xl mx-auto">
            Discover our portfolio of stunning transformations and find inspiration for your next look
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 font-medium transition-all duration-300 hover-lift ${
                activeFilter === filter.id
                  ? 'bg-salon-pink text-salon-dark'
                  : 'border-salon-grey hover:bg-salon-grey/20 text-salon-dark'
              }`}
            >
              {filter.name}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStyles.map((style, index) => (
            <Card
              key={style.id}
              className="group overflow-hidden border-0 shadow-lg hover-lift animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={style.image}
                  alt={style.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-salon-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <h3 className="text-xl text-black font-bold mb-2">{style.title}</h3>
                  <p className="text-sm text-black">{style.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <Button
            size="lg"
            className="bg-salon-pink hover:bg-salon-pink/90 dark:text-black text-salon-dark font-semibold px-8 py-4 hover-lift"
            onClick={() => navigate('/portfolio')}
          >
            View Complete Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StyleGallery;
