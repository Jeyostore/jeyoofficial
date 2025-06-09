import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, MapPin, Phone, Mail, MessageCircle, Clock, ShoppingCart, ArrowRightCircle, CheckCircle, Tag, Instagram, Candy, CircleDot, Flame, Building, ShoppingBag, MessageSquare, PhoneCall, Info } from 'lucide-react'; // Import new icons

// Data Mockup untuk konten landing page
const MOCK_DATA = {
  businessName: "Jeyo Store Official",
  hero: {
    title: "Selamat Datang di Jeyo Store",
    subtitle: "Temukan makanan ringan lezat, cemilan pilihan, dan produk berkualitas terbaik khusus untuk Anda.",
    cta: "Jelajahi Produk Kami",
    imageUrl: "https://cdn.pixabay.com/photo/2021/02/25/12/03/courier-6048941_1280.png", // Placeholder image for hero section
  },
  about: {
    title: "Tentang Kami",
    description1: "Selamat datang di Jeyo Store – Toko Makanan Rumahan Terpercaya!\nJeyo Store adalah toko makanan rumahan yang menghadirkan berbagai pilihan makanan berkualitas, lezat, dan aman untuk dikonsumsi. Kami hadir untuk memenuhi kebutuhan Anda akan makanan camilan kekinian.",
    description2Intro: "Kami percaya bahwa makanan bukan hanya soal rasa, tapi juga soal kualitas, kesehatan, dan kepercayaan. Oleh karena itu, Jeyo Store selalu berkomitmen untuk:",
    commitments: [
      "Menyediakan produk makanan yang berkualitas, higienis, dan Halal dikonsumsi",
      "Menawarkan varian rasa",
      "Menjamin pengemasan yang aman dan higienis",
      "Memberikan harga termurah dan promo menarik secara berkala",
      "Menyediakan layanan pelanggan yang ramah dan responsif"
    ],
    closingStatement: "Baik Anda mencari cemilan sehat, makanan siap saji, atau produk-produk kekinian, Jeyo Store siap menjadi solusi teman makan praktis dan terpercaya.\nKami terus berinovasi agar bisa menghadirkan lebih banyak pilihan lezat untuk cemilan kekinian. Terima kasih telah mempercayakan kebutuhan makanan cemilan Anda kepada Jeyo Store!"
  },
  serviceHours: {
    title: "Jam Operasional Kami",
    schedule: [
      { day: "Senin - Jumat", time: "08:00 - 15:00 WIB" },
      { day: "Sabtu - Minggu", time: "09:00 - 17:00 WIB" },
      { day: "Hari Libur Nasional", time: "Tutup", isClosed: true },
    ],
    note: "Pesanan di luar jam operasional akan diproses pada hari kerja berikutnya.",
  },
  pricing: {
    title: "Daftar Produk Unggulan",
    description: "Temukan berbagai pilihan makanan kami yang dirancang khusus untuk menemani setiap momen Anda. Harga transparan dan kualitas terdepan.",
    items: [
      { id: 1, name: "Mie Lidi", description: "Mie lidi renyah dengan bumbu pedas manis yang bikin nagih.", imageUrl: "https://resepmamiku.com/wp-content/uploads/2022/05/mie-lidi-pedas-a-k-a-lidi-lidian-pedas-dapoerliandra-850x1063.jpg", features: ["Renyah", "Pedas Manis", "Populer"], flavors: ["Original", "Pedas Manis", "Extra Pedas", "Balado"],
        sizes: [
          { name: "Kecil (50gr)", price: "Rp 5.000" },
          { name: "Sedang (100gr)", price: "Rp 10.000" },
          { name: "Besar (250gr)", price: "Rp 20.000" },
        ]
      },
      { id: 2, name: "Makaroni", description: "Makaroni dengan bumbu gurih, cocok untuk teman camilan.", imageUrl: "https://media.suara.com/pictures/970x544/2019/11/04/48703-makaroni-ngehe.jpg", features: ["Gurih", "Mengenyangkan"], flavors: ["Original", "Pedas", "Balado", "Keju"],
        sizes: [
          { name: "Kecil (34gr)", price: "Rp 4.000" },
          { name: "Sedang (104gr)", price: "Rp 7.000" },
          { name: "Besar (250gr)", price: "Rp 18.000" },
        ]
      },
    ],
  },
  testimonials: {
    title: "Apa Kata Pelanggan Kami?",
    description: "Dengarkan pengalaman nyata dari pelanggan setia Jeyo Store yang telah menikmati produk-produk berkualitas kami.",
    reviews: [
      { id: 1, quote: "Mie Lidi Jeyo Store paling enak! Pedasnya pas, bikin nagih terus. Selalu jadi pilihan pertama saya.", author: "Prayoga Akbar", city: "Bogor" },
      { id: 2, quote: "Makaroninya gurih banget, cocok buat teman ngopi sore. Anak-anak di rumah juga suka!", author: "Budi Santoso", city: "Jakarta" },
      { id: 3, quote: "Pengemasannya rapi dan higienis. Produknya selalu fresh. Pelayanan juga cepat dan ramah.", author: "M Taufik", city: "Bandung" },
      { id: 4, quote: "Harga sangat terjangkau dengan kualitas premium. Mie Lidi Populer memang juara!", author: "Rudi Wijaya", city: "Yogyakarta" },
    ]
  },
  contact: {  
    title: "Hubungi Kami",
    address: "Jl. Nagrak, Bogas Valley Blok E No 1 Sukaraja, Kab.Bogor Jawa Barat, Indonesia",
    phone: "+62 896-9933-5843",
    email: "jeyoofficial.store@gmail.com",
    whatsappNumber: "6289699335843", // Nomor WhatsApp tanpa tanda +
    instagramUsername: "jeyoofficial.store",
    instagramLink: "https://www.instagram.com/jeyoofficial.store",
    eCommerceLinks: [
      { name: "Shopee", url: "https://shopee.co.id/neyes" },
      { name: "Tokopedia", url: "https://www.tokopedia.com/jeyoofficial" },
      { name: "Lazada", url: "https://www.lazada.co.id/shop/jeyo-store-official" }
    ]
  },
  footer: {
    copyright: "Semua Hak Dilindungi.",
  }
};

// Hook kustom untuk deteksi visibilitas bagian dengan Intersection Observer
const useSectionVisibility = (threshold = 0.3) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
            setIsVisible(false); // Reset visibility when element is out of view
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

// --- Komponen Navigasi ---
const Navbar = ({ businessName, navLinks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  // Map link names to Lucide icons
  const linkIcons = {
    'Tentang Kami': Building,
    'Jam Layanan': Clock,
    'Daftar Produk': ShoppingBag,
    'Testimoni': MessageSquare,
    'Kontak': PhoneCall,
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentSectionId = '';
      // Loop through sections from bottom to top to find the most visible one
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const link = navLinks[i];
        const section = document.getElementById(link.href.substring(1));
        if (section) {
          // Calculate section's top position relative to the viewport
          const sectionTop = section.offsetTop - (window.innerHeight * 0.3); // Adjust offset for better detection
          const sectionBottom = sectionTop + section.offsetHeight;
          
          // Check if the current scroll position is within this section
          if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSectionId = link.href.substring(1);
            break; // Found the active section, no need to check further
          }
        }
      }
      setActiveLink(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount to set initial active link
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);


  const handleNavClick = (href) => {
    setIsOpen(false); // Close mobile menu on link click
    const element = document.getElementById(href.substring(1));
    if (element) {
      // Calculate scroll position to account for fixed navbar height
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight - 10, // Add a little extra offset
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg fixed w-full top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            {/* Business name with blue text, Flame icon, and pulse animation */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xl md:text-2xl font-extrabold flex items-center justify-center py-2 px-3 rounded-md
                          text-blue-800 /* Blue text */
                          hover:text-blue-900 transition-colors duration-300 transform hover:scale-110 shadow-lg"
            >
              <Flame className="w-7 h-7 mr-2 text-red-500 animate-pulse" /> {/* Flame icon, red color, pulse animation */}
              {businessName}
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => {
                const IconComponent = linkIcons[link.name]; // Get the icon component based on link name
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href);}}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center ${ // Added flex and items-center for icon alignment
                      activeLink === link.href.substring(1)
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                    }`}
                  >
                    {activeLink === link.href.substring(1) && ( // Conditionally render active dot icon
                      <CircleDot className="w-4 h-4 mr-1 text-amber-300" /> // Small amber dot icon
                    )}
                    {IconComponent && ( // Render the specific icon for the link
                      <IconComponent className={`w-4 h-4 mr-1 ${activeLink === link.href.substring(1) ? 'text-white' : 'text-gray-600'}`} />
                    )}
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 p-2 rounded-md"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const IconComponent = linkIcons[link.name]; // Get the icon component
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href);}}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 flex items-center ${ // Added flex and items-center for icon alignment
                    activeLink === link.href.substring(1)
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                  }`}
                >
                  {IconComponent && ( // Render the specific icon for the link
                    <IconComponent className={`w-5 h-5 mr-2 ${activeLink === link.href.substring(1) ? 'text-white' : 'text-gray-700'}`} />
                  )}
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Komponen Bagian Hero ---
const HeroSection = ({ hero }) => (
  <section  
    id="hero"  
    className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed relative pt-20"
    style={{ backgroundImage: `linear-gradient(rgba(74,85,162,0.6), rgba(106,117,201,0.4)), url(${hero.imageUrl})` }} // Overlay with gradient
  >
    <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-transparent"></div>
    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight animate-fade-in-down">
        {hero.title}
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
        {hero.subtitle}
      </p>
      <a
        href="#daftar-produk"  
        onClick={(e) => {
          e.preventDefault();
          const productSection = document.getElementById('daftar-produk');  
          if (productSection) {
            // Adjust scroll position for fixed navbar
            const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
            const elementPosition = productSection.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: elementPosition - navbarHeight - 10,
              behavior: 'smooth'
            });
          }
        }}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 sm:py-4 sm:px-10 rounded-lg text-lg shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-600 inline-flex items-center group"
      >
        {hero.cta}
        <ArrowRightCircle className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  </section>
);


// --- Komponen Bagian Tentang Kami ---
const AboutSection = ({ about }) => {
    // Use custom hook for section visibility
    const [sectionRef, isVisible] = useSectionVisibility(); 
    return (
        <section id="tentang-kami" ref={sectionRef} className={`py-16 sm:py-24 bg-slate-50 transition-all duration-1000 ${isVisible ? 'opacity-100 animate-slide-in-left' : 'opacity-0 translate-x-[-50px]'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{about.title}</h2>
                    <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
                </div>
                <div className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed">
                    <p className="mb-6 whitespace-pre-line text-center md:text-left">{about.description1}</p>
                    <p className="mb-4 whitespace-pre-line text-center md:text-left">{about.description2Intro}</p>
                    <ul className="mb-6 space-y-3 pl-0 md:pl-5">
                    {about.commitments.map((commitment, index) => (
                        <li key={index} className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>{commitment}</span>
                        </li>
                    ))}
                    </ul>
                    <p className="whitespace-pre-line text-center md:text-left">{about.closingStatement}</p>
                </div>
            </div>
        </section>
    );
};

// --- Komponen Bagian Jam Layanan ---
const ServiceHoursSection = ({ serviceHours }) => {
    // Use custom hook for section visibility
    const [sectionRef, isVisible] = useSectionVisibility(); 
    return (
        <section id="jam-layanan" ref={sectionRef} className={`py-16 sm:py-24 bg-white transition-all duration-1000 ${isVisible ? 'opacity-100 animate-slide-in-right' : 'opacity-0 translate-x-[50px]'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{serviceHours.title}</h2>
                    <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
                </div>
                <div className="max-w-2xl mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 p-8 sm:p-10 rounded-xl shadow-2xl text-white">
                    <div className="flex items-center justify-center mb-6">
                        {/* Changed Clock icon color to amber-200 */}
                        <Clock className="w-12 h-12 text-amber-200 mr-4"/>
                        <p className="text-lg text-indigo-100">Kami siap melayani Anda pada jam berikut:</p>
                    </div>
                    <div className="space-y-4">
                    {serviceHours.schedule.map((item, index) => (
                        <div
                        key={index}
                        className={`flex justify-between items-center p-4 rounded-lg transition-all duration-300 ${
                            item.isClosed ? 'bg-red-400/80' : 'bg-white/20 hover:bg-white/30'
                        }`}
                        >
                        <span className="font-semibold text-lg">{item.day}</span>
                        <span className={`font-medium text-lg ${item.isClosed ? 'text-red-50' : 'text-indigo-50'}`}>
                            {item.time}
                        </span>
                        </div>
                    ))}
                    </div>
                    <p className="text-sm text-indigo-200 mt-8 text-center">{serviceHours.note}</p>
                </div>
            </div>
        </section>
    );
};

// --- Komponen Kartu Produk ---
const PriceCard = ({ item, contactInfo }) => {
  // State to manage the selected size for a product
  const [selectedSize, setSelectedSize] = useState(item.sizes ? item.sizes[0] : null);

  // Set initial selected size when component mounts or item changes
  useEffect(() => {
    if (item.sizes && item.sizes.length > 0) {
      setSelectedSize(item.sizes[0]);
    }
  }, [item]);

  // Handle click on "Pesan Sekarang" button
  const handleOrderClick = () => {
    let message = `Halo Jeyo Store, saya tertarik untuk memesan produk: ${item.name}`;
    if (selectedSize) {
      message += ` (${selectedSize.name} - ${selectedSize.price})`;
    } else {
      // Fallback if no sizes are defined but a price might be
      message += ` (Harga: ${item.price})`;
    }
    // Open WhatsApp chat with pre-filled message
    window.open(`https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] transform group">
      <div className="relative h-56">
        <img  
            src={item.imageUrl}  
            alt={`[Gambar ${item.name}]`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/FFCDD2/B71C1C?text=Gagal+Muat&font=inter"; }} // Fallback image on error
        />
        {/* Overlay for hover effect on image */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-opacity duration-300"></div>
        {/* "Populer!" tag for popular items, changed background to amber-500 */}
        {item.features && item.features.includes("Populer") && (
            <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                Populer!
            </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{item.name}</h3>
        {/* min-h to prevent layout shifts when description length varies */}
        <p className="text-gray-600 text-sm mb-4 flex-grow min-h-[60px]">{item.description}</p>  

        {/* Displaying features if available */}
        {item.features && item.features.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-indigo-600 mb-1">Keunggulan:</p>
            <div className="flex flex-wrap gap-2">
              {item.features.map((feature, idx) => (
                <span key={idx} className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full flex items-center hover:bg-opacity-80 transform hover:scale-105 transition-all duration-200">
                  <Tag className="w-3 h-3 mr-1" />
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Displaying flavors if available */}
        {item.flavors && item.flavors.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-purple-600 mb-1">Varian Rasa:</p>
            <div className="flex flex-wrap gap-2">
              {item.flavors.map((flavor, idx) => (
                <span key={idx} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full flex items-center hover:bg-opacity-80 transform hover:scale-105 transition-all duration-200">
                  {flavor}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Displaying sizes and selection */}
        {item.sizes && item.sizes.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-orange-600 mb-1">Pilih Ukuran:</p>
            <select
              value={selectedSize ? selectedSize.name : ''}
              onChange={(e) => setSelectedSize(item.sizes.find(s => s.name === e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {item.sizes.map((size, idx) => (
                <option key={idx} value={size.name}>
                  {size.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Display the selected price, changed text color to amber-600 */}
        <p className="text-3xl font-bold text-amber-600 mb-6">
          {selectedSize ? selectedSize.price : item.price}
        </p>
        <button
          onClick={handleOrderClick}
          className="mt-auto w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors duration-300 inline-flex items-center justify-center group"
        >
          Pesan Sekarang <ShoppingCart className="ml-2 h-5 w-5 transform group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// --- Komponen Daftar Produk ---
const ProductSection = ({ pricing, contactInfo }) => {
  // Use custom hook for section visibility
  const [sectionRef, isVisible] = useSectionVisibility(); 
  return (
    <section id="daftar-produk" ref={sectionRef} className={`py-16 sm:py-24 bg-slate-50 transition-all duration-1000 ${isVisible ? 'opacity-100 animate-slide-in-left' : 'opacity-0 translate-x-[-50px]'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{pricing.title}</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">{pricing.description}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-10 justify-center">
          {pricing.items.map((item) => (
            <PriceCard key={item.id} item={item} contactInfo={contactInfo} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Komponen Testimoni ---
const TestimonialSection = ({ testimonials }) => {
  // Use custom hook for section visibility
  const [sectionRef, isVisible] = useSectionVisibility(); 
  return (
    <section id="testimoni" ref={sectionRef} className={`py-16 sm:py-24 bg-white transition-all duration-1000 ${isVisible ? 'opacity-100 animate-slide-in-right' : 'opacity-0 translate-x-[50px]'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{testimonials.title}</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">{testimonials.description}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 sm:gap-10">
          {testimonials.reviews.map((review) => (
            <div key={review.id} className="bg-indigo-50 rounded-xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center">
              <p className="text-gray-700 text-lg italic mb-4">"{review.quote}"</p>
              <div className="font-semibold text-indigo-700">{review.author}</div>
              <div className="text-sm text-gray-500">{review.city}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Komponen Kontak ---
const ContactSection = ({ contact }) => {
    // Use custom hook for section visibility
    const [sectionRef, isVisible] = useSectionVisibility(); 
    return (
        <section id="kontak" ref={sectionRef} className={`py-16 sm:py-24 bg-gradient-to-br from-indigo-700 to-purple-800 text-white transition-all duration-1000 ${isVisible ? 'opacity-100 animate-slide-in-right' : 'opacity-0 translate-x-[50px]'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">{contact.title}</h2>
                    <div className="w-24 h-1 bg-indigo-400 mx-auto rounded-full"></div>
                </div>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-x-8 gap-y-12 items-start">
                    <div className="space-y-6 text-center md:text-left">
                    <div>
                        {/* Changed MapPin icon color to amber-400 */}
                        <h3 className="text-xl font-semibold mb-2 flex items-center justify-center md:justify-start"><MapPin className="w-6 h-6 mr-2 text-amber-400" /> Alamat Kami:</h3>
                        <p className="text-indigo-100">{contact.address}</p>
                    </div>
                    <div>
                        {/* Changed Phone icon color to amber-400 */}
                        <h3 className="text-xl font-semibold mb-2 flex items-center justify-center md:justify-start"><Phone className="w-6 h-6 mr-2 text-amber-400" /> Telepon:</h3>
                        <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-indigo-100 hover:text-white transition-colors hover:underline">{contact.phone}</a>
                    </div>
                    <div>
                        {/* Changed Mail icon color to amber-400 */}
                        <h3 className="text-xl font-semibold mb-2 flex items-center justify-center md:justify-start"><Mail className="w-6 h-6 mr-2 text-amber-400" /> Email:</h3>
                        <a href={`mailto:${contact.email}`} className="text-indigo-100 hover:text-white transition-colors hover:underline">{contact.email}</a>
                    </div>
                    {/* Instagram Contact */}
                    {contact.instagramLink && contact.instagramUsername && (
                        <div>
                        {/* Changed Instagram icon color to amber-400 */}
                        <h3 className="text-xl font-semibold mb-2 flex items-center justify-center md:justify-start"><Instagram className="w-6 h-6 mr-2 text-amber-400" /> Instagram:</h3>
                        <a  
                            href={contact.instagramLink}  
                            target="_blank"  
                            rel="noopener noreferrer"  
                            className="text-indigo-100 hover:text-white transition-colors hover:underline"
                        >
                            @{contact.instagramUsername}
                        </a>
                        </div>
                    )}
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl text-center">
                        <h3 className="text-2xl font-semibold mb-6 text-white">Terhubung Langsung via WhatsApp!</h3>
                        {/* Changed MessageCircle icon color to amber-400 */}
                        <MessageCircle className="w-16 h-16 text-amber-400 mx-auto mb-6"/>
                        <a
                            href={`https://wa.me/${contact.whatsappNumber}?text=Halo%20Jeyo%20Store,%20saya%20tertarik%20dengan%20produk%20Anda.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            // Changed button background to amber-600
                            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 text-lg"
                        >
                            Chat di WhatsApp
                        </a>
                        <p className="text-xs text-indigo-200 mt-4">Klik untuk memulai percakapan.</p>
                    </div>
                </div>
                {/* E-commerce Links */}
                {contact.eCommerceLinks && contact.eCommerceLinks.length > 0 && (
                    <div className="mt-12 text-center">
                      <h3 className="text-2xl font-semibold mb-6 text-white">Temukan Kami di E-commerce!</h3>
                      <div className="flex flex-wrap justify-center gap-6">
                        {contact.eCommerceLinks.map((platform, index) => (
                          <a
                            key={index}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center p-4 bg-white/10 rounded-lg shadow-md hover:bg-white/20 transition-colors transform hover:scale-105"
                          >
                            {/* Changed ShoppingCart icon color to amber-300 */}
                            <ShoppingCart className="w-10 h-10 text-amber-300 mb-2" />
                            <span className="text-white font-medium text-lg">{platform.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                )}
            </div>
        </section>
    );
};

// --- Komponen Footer ---
const Footer = ({ businessName, copyright }) => (
  <footer className="bg-gray-800 text-gray-400 py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p>&copy; {new Date().getFullYear()} {businessName}. {copyright}</p>
      <p className="text-sm mt-2">Didesain oleh cinta <span className="text-red-500">&hearts;</span> kita.</p>
    </div>
  </footer>
);

// --- Komponen Utama Aplikasi ---
const App = () => {
  const { businessName, hero, about, serviceHours, pricing, testimonials, contact, footer } = MOCK_DATA;
  const navLinks = [
    { name: 'Tentang Kami', href: '#tentang-kami' },
    { name: 'Jam Layanan', href: '#jam-layanan' },
    { name: 'Daftar Produk', href: '#daftar-produk' },
    { name: 'Testimoni', href: '#testimoni' },
    { name: 'Kontak', href: '#kontak' },
  ];

  // Enable smooth scrolling for the entire document
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'; // Revert on unmount
    };
  }, []);

  // Inject custom CSS for animations
  useEffect(() => {
    const styleId = 'custom-animations-style';
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    // Define keyframe animations and utility classes
    styleElement.textContent = `
      @keyframes fadeInDown { 0% { opacity: 0; transform: translateY(-20px); } 100% { opacity: 1; transform: translateY(0); } }
      @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
      /* Slide-in animations only for medium screens and up */
      @media (min-width: 768px) {
        @keyframes slideInLeft { 0% { opacity: 0; transform: translateX(-50px); } 100% { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { 0% { opacity: 0; transform: translateX(50px); } 100% { opacity: 1; transform: translateX(0); } }
        .animate-slide-in-left { animation: slideInLeft 0.8s ease-out forwards; will-change: transform, opacity; }
        .animate-slide-in-right { animation: slideInRight 0.8s ease-out forwards; will-change: transform, opacity; }
      }

      .animate-fade-in-down { animation: fadeInDown 0.6s ease-out forwards; opacity: 0; }
      .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
      
      .animation-delay-300 { animation-delay: 0.3s; }
      .animation-delay-600 { animation-delay: 0.6s; }

      /* Custom CSS for pulse animation on icon */
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .animate-pulse {
        animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
    `;
    
    return () => {
      if (styleElement) {
        styleElement.remove(); // Clean up style tag on component unmount
      }
    };
  }, []);


  return (
    // Mengubah latar belakang menjadi gradasi dari warna terang ke gelap
    <div
      className="font-inter antialiased text-gray-800 min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: 'linear-gradient(to bottom, #f8fafc, #e0e7ff)' }}
    >
      {/* Komponen Navbar untuk navigasi */}
      <Navbar businessName={businessName} navLinks={navLinks} />
      <main>
        {/* Bagian Hero dengan konten dinamis */}
        <HeroSection hero={hero} />
        {/* Bagian Tentang Kami */}
        <AboutSection about={about} />
        {/* Bagian Jam Layanan */}
        <ServiceHoursSection serviceHours={serviceHours} />
        {/* Bagian daftar produk */}
        <ProductSection pricing={pricing} contactInfo={contact} />
        {/* Bagian Testimoni */}
        <TestimonialSection testimonials={testimonials} />
        {/* Bagian Kontak Kami */}
        <ContactSection contact={contact} />
      </main>
      {/* Komponen Footer */}
      <Footer businessName={businessName} copyright={footer.copyright} />
    </div>
  );
};

export default App;
