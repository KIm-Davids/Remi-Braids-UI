
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Filter, X, Share2, Heart, Play, Pause, ArrowLeft, ArrowRight, Clock, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';
import BookingButton from '@/components/BookingButton';
import shadeAdu1 from '../../../images/1000168366.jpg';
import shadeAdu2 from '../../../images/1000338929[1].jpg';
import shadeAdu3 from '../../../images/1000168360.jpg';
import shadeAdu4 from '../../../images/1000313916[1].jpg';
import braids1 from '../../../images/02-box-braids.jpg';
import childBraid from '../../../images/Employee_Upskilling_baerho.jpg';
import wigWoman from '../../../images/3fc3f7561b0c19fcb28f9bd301e7bc23.jpg';
import sideView from '../../../images/20240830_153543.jpg';
import curlyBraids from '../../../images/20250426_150235.jpg';
import pinkGele from '../../../images/834e4296b6f9265d0ffd47f49fe9bfaf.jpg';
import pinkNails from '../../../images/a3fe14505a5352b7dd43ec68334a683b.jpg';
import mummysHair from '../../../images/MummysHair.jpg';
import wigDummy from '../../../images/20240914_093602.jpg';
import instaShot from '../../../images/InstagramHairShot.jpg';
import braidsWig from '../../../images/braidsWig.jpg';
import nails from '../../../images/nails.jpg';
import onlineImage from '../../../images/onlineImage.jpg';
import dropDownHair from '../../../images/dropDownHair.jpg';
import braidsBackVIew from '../../../images/hairBraids.jpg';
import braidsWithBeads from '../../../images/braidsWithBeads.jpg';
import karensHair from '../../../images/karensHair.jpg';
import longHair from '../../../images/longHair.jpg';
import beautifulNails from '../../../images/beautifulNails.jpg';
import braidedHair from '../../../images/braidedHair.jpg';



interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  type: 'image' | 'video';
  thumbnail: string;
  fullMedia: string[];
  description: string;
  detailedDescription: string;
  suitableFor: string;
  duration?: string;
  difficulty?: string;
  price?: string;
  testimonial?: {
    text: string;
    author: string;
  };
}

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const hoverVideoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const filters = [
    { id: 'all', name: 'All Styles', count: 24 },
    { id: 'shadeAdu', name: 'Shade Adu', count: 4 },
    // { id: 'makeUp', name: 'make-up', count: 6 },
    { id: 'gele', name: 'Gele', count: 1 },
    { id: 'wigs', name: 'Wigs', count: 3 },
    { id: 'braids', name: 'Braids', count: 13 },
    { id: 'nails', name: 'Nails', count: 3 },
  ];

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: 'Goddess Box Braids',
      category: 'shadeAdu',
      type: 'image',
      thumbnail: shadeAdu2,
      fullMedia: [
        shadeAdu2,
        shadeAdu2
      ],
      description: 'Protective goddess braids with added length and volume',
      detailedDescription: 'These stunning goddess box braids combine the protective benefits of traditional braiding with luxurious length and volume. Hand-crafted with premium synthetic hair extensions, they offer a regal look perfect for any occasion.',
      suitableFor: 'Perfect for natural hair protection and elegant occasions',
      duration: '4-6 hours',
      difficulty: 'Advanced',
      price: '$180-220',
      testimonial: {
        text: 'These braids are absolutely stunning! They lasted for weeks and I received so many compliments.',
        author: 'Sarah M.'
      }
    },
    {
      id: 2,
      title: 'Pixie Cut Transformation',
      category: 'wigs',
      type: 'image',
      thumbnail: wigWoman,
      fullMedia: [
        wigWoman,
        wigWoman
      ],
      description: 'Bold pixie cut with modern styling and texture',
      detailedDescription: 'A dramatic transformation featuring a precision pixie cut with layered texture and contemporary styling. This cut emphasizes facial features while maintaining a chic, effortless look.',
      suitableFor: 'Ideal for confident women who love low-maintenance styles',
      duration: '1-2 hours',
      difficulty: 'Intermediate',
      price: '$80-120',
      testimonial: {
        text: 'I was nervous about cutting my hair this short, but the result is incredible! So freeing and stylish.',
        author: 'Jessica L.'
      }
    },
    {
      id: 3,
      title: 'Rose Gold Balayage',
      category: 'shadeAdu',
      type: 'image',
      thumbnail: shadeAdu1,
      fullMedia: [
        shadeAdu1,
        shadeAdu1
      ],
      description: 'Hand-painted rose gold highlights with seamless blending',
      detailedDescription: 'Artfully hand-painted balayage technique creating natural-looking rose gold highlights that complement your natural hair color with seamless blending and dimensional color.',
      suitableFor: 'Best for medium to dark hair wanting a subtle color change',
      duration: '3-4 hours',
      difficulty: 'Advanced',
      price: '$200-280',
      testimonial: {
        text: 'The color is exactly what I dreamed of! So natural looking yet so beautiful.',
        author: 'Maria R.'
      }
    },
    {
      id: 4,
      title: 'Feed-In Cornrows',
      category: 'braids',
      type: 'image',
      thumbnail: childBraid,
      fullMedia: [
        childBraid,
        childBraid
      ],
      description: 'Intricate feed-in cornrows with geometric patterns',
      detailedDescription: 'Precision feed-in cornrows featuring intricate geometric patterns that gradually add hair for a natural, seamless look. Perfect protective style for active lifestyles.',
      suitableFor: 'Perfect for active lifestyles and long-lasting protective styling',
      duration: '3-5 hours',
      difficulty: 'Advanced',
      price: '$120-160'
    },
    {
      id: 5,
      title: 'Bridal Updo Elegance',
      category: 'braids',
      type: 'image',
      thumbnail: curlyBraids,
      fullMedia: [
        curlyBraids,
        curlyBraids
      ],
      description: 'Romantic bridal updo with soft curls and delicate details',
      detailedDescription: 'An ethereal bridal updo combining soft romantic curls with intricate braided details and delicate pearl accessories. Designed to complement your wedding dress and last throughout your special day.',
      suitableFor: 'Designed for weddings and formal events',
      duration: '2-3 hours',
      difficulty: 'Advanced',
      price: '$150-200',
      testimonial: {
        text: 'My wedding hair was absolutely perfect! It stayed beautiful all day and night.',
        author: 'Emma K.'
      }
    },
    {
      id: 6,
      title: 'Luxury Lace Front Wig',
      category: 'braids',
      type: 'image',
      thumbnail: sideView,
      fullMedia: [
        sideView,
        sideView,
      ],
      description: 'Natural-looking lace front wig with body wave texture',
      detailedDescription: 'Premium human hair lace front wig featuring natural body wave texture with baby hairs and realistic hairline. Professionally installed and styled for a completely natural appearance.',
      suitableFor: 'Perfect for versatility and hair protection',
      duration: '1-2 hours',
      difficulty: 'Intermediate',
      price: '$300-500'
    },
    {
      id: 7,
      title: 'Butterfly Locs',
      category: 'nails',
      type: 'image',
      thumbnail: pinkNails,
      fullMedia: [
        pinkNails,
        pinkNails
      ],
      description: 'Trendy butterfly locs with bohemian flair',
      detailedDescription: 'Modern butterfly locs technique creating textured, bohemian-inspired protective style with natural-looking loops and curly ends for a carefree, artistic appearance.',
      suitableFor: 'Great for those wanting a trendy, low-maintenance protective style',
      duration: '6-8 hours',
      difficulty: 'Advanced',
      price: '$250-320'
    },
    {
      id: 8,
      title: 'Copper Ombré',
      category: 'shadeAdu',
      type: 'image',
      thumbnail: shadeAdu4,
      fullMedia: [
        shadeAdu4,
        shadeAdu4
      ],
      description: 'Rich copper ombré with dimensional color',
      detailedDescription: 'Striking copper ombré technique transitioning from dark roots to vibrant copper ends with multi-dimensional color placement for depth and movement.',
      suitableFor: 'Perfect for those wanting a bold, warm color transformation',
      duration: '4-5 hours',
      difficulty: 'Advanced',
      price: '$220-300'
    },
    {
      id: 9,
      title: 'Twist Out Perfection',
      category: 'nails',
      type: 'image',
      thumbnail: beautifulNails,
      fullMedia: [
        beautifulNails,
        beautifulNails
      ],
      description: 'Perfect twist out with defined curls and volume',
      detailedDescription: 'Expertly crafted twist out technique using premium styling products to achieve perfectly defined curls with maximum volume and lasting hold.',
      suitableFor: 'Ideal for natural hair textures seeking defined curls',
      duration: '1.5-2 hours',
      difficulty: 'Intermediate',
      price: '$60-90'
    },
    {
      id: 10,
      title: 'Knotless Box Braids',
      category: 'wigs',
      type: 'image',
      thumbnail: wigDummy,
      fullMedia: [
        wigDummy,
        wigDummy
      ],
      description: 'Knotless box braids for comfortable wear',
      detailedDescription: 'Innovative knotless braiding technique that starts with your natural hair and gradually adds extension hair, reducing tension and creating a more comfortable, natural-looking protective style.',
      suitableFor: 'Perfect for sensitive scalps and long-term wear',
      duration: '5-7 hours',
      difficulty: 'Advanced',
      price: '$200-280'
    },
    {
      id: 11,
      title: 'Vintage Victory Rolls',
      category: 'braids',
      type: 'image',
      thumbnail: mummysHair,
      fullMedia: [
        mummysHair,
        mummysHair
      ],
      description: 'Classic vintage victory rolls with modern twist',
      detailedDescription: 'Timeless vintage-inspired victory rolls updated with modern techniques and contemporary styling for a sophisticated retro look perfect for themed events.',
      suitableFor: 'Great for vintage-themed events and photography',
      duration: '2-3 hours',
      difficulty: 'Advanced',
      price: '$120-160'
    },
    {
      id: 12,
      title: 'Passion Twist',
      category: 'gele',
      type: 'image',
      thumbnail: pinkGele,
      fullMedia: [
        pinkGele,
        pinkGele
      ],
      description: 'Soft passion twists with bohemian texture',
      detailedDescription: 'Gentle passion twist technique using soft, curly hair extensions to create a romantic, bohemian-inspired protective style with natural movement and texture.',
      suitableFor: 'Excellent for a romantic, feminine protective style',
      duration: '4-6 hours',
      difficulty: 'Intermediate',
      price: '$150-200'
    },
    {
      id: 13,
      title: 'Platinum Blonde Transformation',
      category: 'shadeAdu',
      type: 'image',
      thumbnail: shadeAdu3,
      fullMedia: [
        shadeAdu3,
        shadeAdu3
      ],
      description: 'Dramatic platinum blonde full head transformation',
      detailedDescription: 'Complete platinum blonde transformation using professional lightening techniques and toning for an ice-cold platinum finish with maximum vibrancy.',
      suitableFor: 'For those ready for a dramatic, high-maintenance color change',
      duration: '6-8 hours',
      difficulty: 'Expert',
      price: '$350-450'
    },
    {
      id: 14,
      title: 'Silk Press Perfection',
      category: 'braids',
      type: 'image',
      thumbnail: braids1,
      fullMedia: [
        braids1,
        braids1
      ],
      description: 'Flawless silk press with mirror-like shine',
      detailedDescription: 'Professional silk press technique using heat protectants and precise temperature control to achieve perfectly straight, silky hair with incredible shine and movement.',
      suitableFor: 'Perfect for special occasions or trying a straight look',
      duration: '2-3 hours',
      difficulty: 'Intermediate',
      price: '$80-120'
    },
    {
      id: 15,
      title: 'Curly Lace Front Install',
      category: 'braids',
      type: 'image',
      thumbnail: instaShot,
      fullMedia: [
        instaShot,
        instaShot
      ],
      description: 'Curly lace front wig with natural hairline',
      detailedDescription: 'Premium curly lace front wig installation featuring meticulous hairline creation, baby hair styling, and professional blending for an undetectable finish.',
      suitableFor: 'Great for adding volume and length while protecting natural hair',
      duration: '2-3 hours',
      difficulty: 'Advanced',
      price: '$200-300'
    },
    {
      id: 16,
      title: 'Sisterlocks Installation',
      category: 'wigs',
      type: 'image',
      thumbnail: braidsWig,
      fullMedia: [
        braidsWig,
        braidsWig
      ],
      description: 'Precision Sisterlocks for natural hair journey',
      detailedDescription: 'Professional Sisterlocks installation using certified techniques to create micro-sized locs that offer versatility and natural hair growth in a locked style.',
      suitableFor: 'Perfect for beginning a natural loc journey with versatility',
      duration: '8-12 hours',
      difficulty: 'Expert',
      price: '$400-600'
    },
    {
      id: 17,
      title: 'Halo Braid Crown',
      category: 'braids',
      type: 'image',
      thumbnail: braidedHair,
      fullMedia: [
        braidedHair,
        braidedHair
      ],
      description: 'Ethereal halo braid with floral accents',
      detailedDescription: 'Romantic halo braid that encircles the head like a crown, adorned with delicate floral accents and soft tendrils for an angelic, ethereal appearance.',
      suitableFor: 'Perfect for bohemian weddings and outdoor ceremonies',
      duration: '2-3 hours',
      difficulty: 'Advanced',
      price: '$130-180'
    },
    {
      id: 18,
      title: 'Chunky Highlights',
      category: 'braids',
      type: 'image',
      thumbnail: karensHair,
      fullMedia: [
        karensHair,
        karensHair
      ],
      description: 'Bold chunky highlights with contrast',
      detailedDescription: 'Statement chunky highlights using foiling technique to create bold, contrasting sections that add dimension and drama to your natural hair color.',
      suitableFor: 'Great for those wanting a bold, edgy color statement',
      duration: '3-4 hours',
      difficulty: 'Intermediate',
      price: '$160-220'
    },
    {
      id: 19,
      title: 'Dutch Braid Combo',
      category: 'nails',
      type: 'image',
      thumbnail: nails,
      fullMedia: [
        nails,
        nails
      ],
      description: 'Dutch braids combined with loose waves',
      detailedDescription: 'Creative combination of Dutch braids on the sides flowing into loose, romantic waves, creating a style that\'s both structured and free-flowing.',
      suitableFor: 'Perfect for festivals, dates, or casual elegant events',
      duration: '1-2 hours',
      difficulty: 'Intermediate',
      price: '$70-100'
    },
    {
      id: 20,
      title: 'Bob Cut Precision',
      category: 'braids',
      type: 'image',
      thumbnail: onlineImage,
      fullMedia: [
        onlineImage,
        onlineImage
      ],
      description: 'Sharp precision bob with clean lines',
      detailedDescription: 'Precision-cut bob featuring razor-sharp lines and perfect symmetry, styled with subtle layers for movement while maintaining the classic bob silhouette.',
      suitableFor: 'Ideal for professional settings and polished looks',
      duration: '1-1.5 hours',
      difficulty: 'Intermediate',
      price: '$70-100'
    },
    {
      id: 21,
      title: 'Closure Sew-In',
      category: 'braids',
      type: 'image',
      thumbnail: longHair,
      fullMedia: [
        longHair,
        longHair
      ],
      description: 'Natural closure sew-in with baby hairs',
      detailedDescription: 'Professional closure sew-in installation featuring hand-tied baby hairs and expert blending for a completely natural hairline and parting area.',
      suitableFor: 'Excellent for length and volume while protecting natural hair',
      duration: '3-4 hours',
      difficulty: 'Advanced',
      price: '$180-250'
    },
    {
      id: 22,
      title: 'Faux Locs Style',
      category: 'braids',
      type: 'image',
      thumbnail: braidsWithBeads,
      fullMedia: [
        braidsWithBeads,
        braidsWithBeads
      ],
      description: 'Temporary faux locs with realistic texture',
      detailedDescription: 'Realistic faux locs installation using wrapping technique to create the appearance of mature locs without the long-term commitment, perfect for experimenting with the loc look.',
      suitableFor: 'Great for trying the loc look without permanent commitment',
      duration: '6-8 hours',
      difficulty: 'Advanced',
      price: '$200-280'
    },
    {
      id: 23,
      title: 'Boho Wedding Style',
      category: 'braids',
      type: 'image',
      thumbnail: dropDownHair,
      fullMedia: [
        dropDownHair,
        dropDownHair
      ],
      description: 'Relaxed boho bridal style with natural texture',
      detailedDescription: 'Effortlessly romantic boho bridal style featuring loose braids, natural texture, and organic placement with subtle floral elements for an outdoor wedding aesthetic.',
      suitableFor: 'Perfect for outdoor and bohemian-themed weddings',
      duration: '2-3 hours',
      difficulty: 'Intermediate',
      price: '$120-170'
    },
    {
      id: 24,
      title: 'Color Melting Technique',
      category: 'braids',
      type: 'image',
      thumbnail: braidsBackVIew,
      fullMedia: [
        braidsBackVIew,
        braidsBackVIew
      ],
      description: 'Seamless color melting with multiple tones',
      detailedDescription: 'Advanced color melting technique blending multiple complementary tones seamlessly from roots to ends, creating a lived-in, natural color gradient with dimensional depth.',
      suitableFor: 'Ideal for those wanting subtle, natural-looking color changes',
      duration: '4-6 hours',
      difficulty: 'Expert',
      price: '$280-380'
    }
  ];

  const filteredItems = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  const handleVideoHover = (itemId: number, isHovering: boolean) => {
    const video = videoRefs.current[itemId];
    if (video) {
      if (isHovering) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  const handleHoverVideoPlay = (itemId: number, isHovering: boolean) => {
    const video = hoverVideoRefs.current[itemId];
    if (video) {
      if (isHovering) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  const shareStyle = (item: PortfolioItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`Check out this amazing hairstyle: ${item.title} - ${window.location.href}`);
    }
  };

  const nextMedia = () => {
    if (selectedItem && currentMediaIndex < selectedItem.fullMedia.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    }
  };

  const prevMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  useEffect(() => {
    setCurrentMediaIndex(0);
  }, [selectedItem]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-salon-grey/10 to-salon-pink/20 dark:from-salon-dark dark:via-salon-dark dark:to-salon-dark">
      <Navigation />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-salon-dark dark:text-white mb-6">
              Complete Portfolio
            </h1>
            <p className="text-xl text-salon-dark/70 dark:text-white/70 max-w-2xl mx-auto">
              Explore our complete collection of stunning hair transformations and artistic creations
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 font-medium transition-all duration-300 hover-lift flex items-center gap-2 ${
                  activeFilter === filter.id
                    ? 'bg-salon-pink text-salon-dark'
                    : 'border-salon-grey hover:bg-salon-grey/20 text-salon-dark dark:text-white dark:border-salon-pink/30'
                }`}
              >
                <Filter className="h-4 w-4" />
                {filter.name}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {filter.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredItems.map((item, index) => (
              <HoverCard key={item.id} openDelay={200} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <Card
                    className="group break-inside-avoid overflow-hidden border-0 shadow-lg hover-lift animate-scale-in cursor-pointer relative"
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => setSelectedItem(item)}
                    onMouseEnter={() => {
                      setHoveredItem(item.id);
                      if (item.type === 'video') {
                        handleVideoHover(item.id, true);
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredItem(null);
                      if (item.type === 'video') {
                        handleVideoHover(item.id, false);
                      }
                    }}
                  >
                    <div className="relative overflow-hidden">
                      {item.type === 'video' ? (
                        <div className="relative">
                          <video
                            ref={(el) => { videoRefs.current[item.id] = el; }}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            muted
                            loop
                            playsInline
                            poster={item.thumbnail}
                          >
                            <source src={item.thumbnail} type="video/mp4" />
                          </video>
                          <div className="absolute top-4 right-4 bg-black/50 rounded-full p-2">
                            <Play className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      ) : (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 group-hover:saturate-110"
                          style={{
                            filter: 'brightness(1) saturate(1)',
                            transition: 'filter 0.3s ease, transform 0.3s ease'
                          }}
                        />
                      )}

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold">{item.title}</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white hover:text-salon-pink p-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                shareStyle(item);
                              }}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm opacity-90 mb-2">{item.description}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-salon-pink/20 text-salon-pink border-salon-pink text-xs">
                              {item.category}
                            </Badge>
                            {item.difficulty && (
                              <Badge variant="outline" className="text-xs border-white/30 text-white">
                                {item.difficulty}
                              </Badge>
                            )}
                          </div>
                          {item.price && (
                            <p className="text-xs font-semibold opacity-90">{item.price}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </HoverCardTrigger>

                <HoverCardContent
                  className="w-80 p-0 border-0 shadow-2xl"
                  side="top"
                  align="center"
                  sideOffset={5}
                  alignOffset={0}
                >
                  <div className="relative">
                    {/* Media Preview */}
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      {item.type === 'video' ? (
                        <video
                          ref={(el) => { hoverVideoRefs.current[item.id] = el; }}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                          autoPlay
                          poster={item.thumbnail}
                          onMouseEnter={() => handleHoverVideoPlay(item.id, true)}
                          onMouseLeave={() => handleHoverVideoPlay(item.id, false)}
                        >
                          <source src={item.thumbnail} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* Media Type Indicator */}
                      <div className="absolute top-3 right-3">
                        {item.type === 'video' ? (
                          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <Play className="h-3 w-3" />
                            VIDEO
                          </div>
                        ) : (
                          <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            IMAGE
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 bg-white dark:bg-gray-900">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-lg text-salon-dark dark:text-white">{item.title}</h3>
                        <Badge className="bg-salon-pink/20 text-salon-pink border-salon-pink text-xs">
                          {item.category}
                        </Badge>
                      </div>

                      <p className="text-sm text-salon-dark/70 dark:text-white/70 mb-3 line-clamp-2">
                        {item.detailedDescription}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {item.duration && (
                          <div className="flex items-center gap-2 text-xs">
                            <Clock className="h-3 w-3 text-salon-pink" />
                            <span className="text-salon-dark/70 dark:text-white/70">{item.duration}</span>
                          </div>
                        )}
                        {item.price && (
                          <div className="flex items-center gap-2 text-xs">
                            <Star className="h-3 w-3 text-salon-pink" />
                            <span className="text-salon-dark/70 dark:text-white/70">{item.price}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-salon-pink hover:bg-salon-pink/90 text-salon-dark text-xs"
                          onClick={() => setSelectedItem(item)}
                        >
                          View Details
                        </Button>
                        <BookingButton
                          className="flex-1 bg-salon-grey hover:bg-salon-grey/90 text-salon-dark text-xs"
                          source="portfolio-hover"
                        >
                          Book Now
                        </BookingButton>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>

          {/* Load More / CTA */}
          <div className="text-center mt-16 animate-fade-in">
            <div className="mb-6">
              <p className="text-salon-dark/70 dark:text-white/70 mb-4">
                Inspired by what you see? Book your transformation today!
              </p>
              <BookingButton
                className="bg-salon-pink hover:bg-salon-pink/90 text-salon-dark font-semibold px-8 py-4 mr-4"
                source="portfolio-page"
              >
                Book Your Style
              </BookingButton>
              <Button
                variant="outline"
                size="lg"
                className="border-salon-grey hover:bg-salon-grey/20 text-salon-dark dark:text-white font-semibold px-8 py-4 hover-lift dark:border-salon-pink/30"
              >
                Load More Styles
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl w-full h-[80vh] overflow-hidden p-0">
          {selectedItem && (
            <>
              <DialogHeader className="p-6 pb-0">
                <DialogTitle className="text-2xl font-bold text-salon-dark dark:text-white flex items-center justify-between">
                  {selectedItem.title}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedItem(null)}
                    className="text-salon-dark dark:text-white hover:text-salon-pink"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col md:flex-row h-full">
                {/* Media Section */}
                <div className="md:w-2/3 relative">
                  <div className="relative h-full">
                    <img
                      src={selectedItem.fullMedia[currentMediaIndex]}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                    />

                    {selectedItem.fullMedia.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                          onClick={prevMedia}
                          disabled={currentMediaIndex === 0}
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                          onClick={nextMedia}
                          disabled={currentMediaIndex === selectedItem.fullMedia.length - 1}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>

                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                          {selectedItem.fullMedia.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                index === currentMediaIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Details Section */}
                <div className="md:w-1/3 p-6 bg-white dark:bg-gray-900 overflow-y-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-salon-pink/20 text-salon-pink border-salon-pink">
                      {selectedItem.category}
                    </Badge>
                    {selectedItem.difficulty && (
                      <Badge variant="outline" className="border-salon-grey text-salon-dark dark:text-white dark:border-salon-pink/30">
                        {selectedItem.difficulty}
                      </Badge>
                    )}
                  </div>

                  <p className="text-salon-dark/70 dark:text-white/70 mb-4">
                    {selectedItem.detailedDescription}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-salon-dark dark:text-white mb-2">Perfect For:</h4>
                    <p className="text-sm text-salon-dark/70 dark:text-white/70">
                      {selectedItem.suitableFor}
                    </p>
                  </div>

                  {/* Service Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {selectedItem.duration && (
                      <div>
                        <h5 className="font-medium text-salon-dark dark:text-white text-sm mb-1">Duration</h5>
                        <p className="text-sm text-salon-dark/70 dark:text-white/70">{selectedItem.duration}</p>
                      </div>
                    )}
                    {selectedItem.price && (
                      <div>
                        <h5 className="font-medium text-salon-dark dark:text-white text-sm mb-1">Price Range</h5>
                        <p className="text-sm text-salon-dark/70 dark:text-white/70">{selectedItem.price}</p>
                      </div>
                    )}
                  </div>

                  {selectedItem.testimonial && (
                    <div className="mb-6 p-4 bg-salon-grey/20 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-semibold text-salon-dark dark:text-white mb-2">Client Review:</h4>
                      <p className="text-sm italic text-salon-dark/70 dark:text-white/70 mb-2">
                        "{selectedItem.testimonial.text}"
                      </p>
                      <p className="text-xs font-medium text-salon-pink">
                        - {selectedItem.testimonial.author}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <BookingButton
                      className="w-full bg-salon-pink hover:bg-salon-pink/90 text-salon-dark font-semibold"
                      source="portfolio-modal"
                    >
                      Book This Style
                    </BookingButton>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-salon-grey hover:bg-salon-grey/20 text-salon-dark dark:text-white font-semibold dark:border-salon-pink/30"
                      onClick={() => shareStyle(selectedItem)}
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Style
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Portfolio;
