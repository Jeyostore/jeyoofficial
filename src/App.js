import React, { useState, useEffect, useRef } from 'react';
// Impor untuk efek ketikan
import { TypeAnimation } from 'react-type-animation';
import { ShieldCheck, MapPin, Phone, Mail, Clock, ShoppingCart, ArrowRightCircle, CheckCircle, Instagram, Flame, Building, ShoppingBag, MessageSquare, PhoneCall, ChevronUp, HelpCircle, Star, ThumbsUp, Package, BadgePercent, MessageCircle as WhatsAppIcon } from 'lucide-react';

// ===================================================================================
// PERUBAHAN 1: MOCK_DATA DITINGKATKAN
// Menambahkan properti baru:
// - Produk: 'tag' untuk label seperti "Terlaris".
// - Testimoni: 'rating' untuk menampilkan bintang.
// ===================================================================================
const MOCK_DATA = {
  businessName: "Jeyo Store Official",
  hero: {
    title: "Selamat Datang di Jeyo Store",
    // Subtitle akan dianimasikan dengan efek ketikan
    animatedSubtitle: [
      "Temukan makanan ringan lezat...",
      2000,
      "Cemilan pilihan untuk setiap momen...",
      2000,
      "Dan produk berkualitas terbaik untuk Anda.",
      2000,
    ],
    cta: "Jelajahi Produk Kami",
    imageUrl: "https://images.pexels.com/photos/6077630/pexels-photo-6077630.jpeg",
    mobileImageUrl: "https://images.pexels.com/photos/3756877/pexels-photo-3756877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  advantages: {
    title: "Mengapa Memilih Jeyo Store?",
    items: [
      { icon: ThumbsUp, title: "Kualitas Terjamin", description: "Kami hanya menggunakan bahan-bahan pilihan untuk menghasilkan produk terbaik." },
      { icon: ShieldCheck, title: "100% Halal", description: "Semua produk kami dijamin halal dan diproses secara higienis." },
      { icon: BadgePercent, title: "Harga Terjangkau", description: "Nikmati camilan berkualitas tanpa menguras kantong." },
      { icon: Package, title: "Pengemasan Aman", description: "Produk dikemas dengan aman untuk menjaga kualitas hingga sampai ke tangan Anda." },
    ]
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
      { day: "Senin - Jumat", time: "08:00 - 15:00 WIB", isClosed: false },
      { day: "Sabtu - Minggu", time: "09:00 - 17:00 WIB", isClosed: false },
      { day: "Hari Libur Nasional", time: "Tutup", isClosed: true },
    ],
    note: "Pesanan di luar jam operasional akan diproses pada hari kerja berikutnya.",
  },
  pricing: {
    title: "Daftar Produk Unggulan",
    description: "Temukan berbagai pilihan makanan kami yang dirancang khusus untuk menemani setiap momen Anda. Harga transparan dan kualitas terdepan.",
    items: [
      { 
        id: 1, 
        name: "Mie Lidi", 
        description: "Mie lidi renyah dengan bumbu pedas manis yang bikin nagih.", 
        imageUrl: "https://resepmamiku.com/wp-content/uploads/2022/05/mie-lidi-pedas-a-k-a-lidi-lidian-pedas-dapoerliandra-850x1063.jpg", 
        features: ["Renyah", "Pedas Manis"], 
        tag: { text: "Terlaris!", color: "bg-orange-500" }, // Tag baru
        flavors: ["Original", "Pedas Manis", "Extra Pedas", "Balado"],
        sizes: [
          { name: "Kecil (50gr)", price: "Rp 5.000" },
          { name: "Sedang (100gr)", price: "Rp 10.000" },
          { name: "Besar (250gr)", price: "Rp 20.000" },
        ]
      },
      { 
        id: 2, 
        name: "Makaroni", 
        description: "Makaroni dengan bumbu gurih, cocok untuk teman camilan.", 
        imageUrl: "https://media.suara.com/pictures/970x544/2019/11/04/48703-makaroni-ngehe.jpg", 
        features: ["Gurih", "Mengenyangkan"],
        tag: { text: "Populer!", color: "bg-purple-600" }, // Tag baru
        flavors: ["Original", "Pedas", "Balado", "Keju"],
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
      { id: 1, quote: "Mie Lidi Jeyo Store paling enak! Pedasnya pas, bikin nagih terus. Selalu jadi pilihan pertama saya.", author: "Prayoga Akbar", city: "Bogor", avatar: "https://i.pravatar.cc/150?u=prayoga", rating: 5 },
      { id: 2, quote: "Makaroninya gurih banget, cocok buat teman ngopi sore. Anak-anak di rumah juga suka!", author: "Budi Santoso", city: "Jakarta", avatar: "https://i.pravatar.cc/150?u=budi", rating: 5 },
      { id: 3, quote: "Pengemasannya rapi dan higienis. Produknya selalu fresh. Pelayanan juga cepat dan ramah.", author: "M Taufik", city: "Bandung", avatar: "https://i.pravatar.cc/150?u=taufik", rating: 4 },
      { id: 4, quote: "Harga sangat terjangkau dengan kualitas premium. Mie Lidi Populer memang juara!", author: "Rudi Wijaya", city: "Yogyakarta", avatar: "https://i.pravatar.cc/150?u=rudi", rating: 5 },
    ]
  },
  faq: {
    title: "Pertanyaan yang Sering Diajukan (FAQ)",
    items: [
        { q: "Bagaimana cara memesan produk?", a: "Anda dapat memesan langsung melalui WhatsApp dengan menekan tombol 'Pesan Sekarang' pada produk yang Anda inginkan, atau melalui platform e-commerce kami seperti Shopee, Tokopedia, dan Lazada." },
        { q: "Apakah produk Jeyo Store halal?", a: "Ya, semua produk kami 100% halal dan dibuat dengan bahan-bahan yang terjamin kualitasnya." },
        { q: "Berapa lama proses pengiriman?", a: "Pesanan akan diproses pada jam operasional kami. Untuk estimasi waktu pengiriman tergantung pada layanan kurir dan lokasi Anda. Pesanan di wilayah Jabodetabek biasanya tiba dalam 1-3 hari kerja." },
        { q: "Apakah ada diskon untuk pembelian dalam jumlah banyak?", a: "Tentu! Kami menyediakan harga khusus untuk reseller atau pembelian dalam jumlah besar. Silakan hubungi kami melalui WhatsApp untuk informasi lebih lanjut." }
    ]
  },
  contact: {  
    title: "Hubungi Kami",
    address: "Jl. Nagrak, Bogas Valley Blok E No 1 Sukaraja, Kab.Bogor Jawa Barat, Indonesia",
    phone: "+62 896-9933-5843",
    email: "jeyoofficial.store@gmail.com",
    whatsappNumber: "6289699335843",
    instagramUsername: "jeyoofficial.store",
    instagramLink: "https://www.instagram.com/jeyoofficial.store",
    eCommerceLinks: [
      { name: "Shopee", url: "https://shopee.co.id/neyes", iconColor: "text-orange-500" },
      { name: "Tokopedia", url: "https://www.tokopedia.com/jeyoofficial", iconColor: "text-green-500" },
      { name: "Lazada", url: "https://www.lazada.co.id/shop/jeyo-store-official", iconColor: "text-blue-500" }
    ]
  },
  footer: {
    copyright: "Semua Hak Dilindungi.",
  }
};

// Hook kustom untuk deteksi visibilitas bagian
const useSectionVisibility = (ref, threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold]);

  return isVisible;
};

// Komponen Navigasi (tidak ada perubahan signifikan)
const Navbar = ({ businessName, navLinks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const linkIcons = {
    'Keunggulan': Star,
    'Tentang Kami': Building,
    'Daftar Produk': ShoppingBag,
    'Testimoni': MessageSquare,
    'FAQ': HelpCircle,
    'Kontak': PhoneCall,
    'Jam Operasional': Clock,
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentSectionId = '';
      const offset = window.innerHeight * 0.4;
      [...navLinks].reverse().forEach(link => { 
        const section = document.getElementById(link.href.substring(1));
        if (section && section.offsetTop <= window.scrollY + offset) {
          if (!currentSectionId) currentSectionId = link.href.substring(1);
        }
      });
      setActiveLink(currentSectionId || (window.scrollY < 200 ? '' : activeLink));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks, activeLink]);

  const handleNavClick = (href) => {
    setIsOpen(false);
    const element = document.getElementById(href.substring(1));
    if (element) {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight - 20,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg fixed w-full top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xl md:text-2xl font-extrabold flex items-center group"
            >
              <Flame className="w-8 h-8 mr-2 text-orange-500" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">{businessName}</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const IconComponent = linkIcons[link.name];
                const isActive = activeLink === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href);}}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center group relative ${
                      isActive
                        ? 'text-indigo-700'
                        : 'text-gray-600 hover:text-indigo-700'
                    }`}
                  >
                    {IconComponent && <IconComponent className={`w-4 h-4 mr-2 transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-500 group-hover:text-indigo-600'}`} />}
                    {link.name}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-indigo-600 transform transition-all duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                  </a>
                );
              })}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none p-2 rounded-md"
              aria-label="Buka menu"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const IconComponent = linkIcons[link.name];
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href);}}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 flex items-center ${
                    activeLink === link.href.substring(1)
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 hover:bg-indigo-100'
                  }`}
                >
                  {IconComponent && <IconComponent className="w-5 h-5 mr-3" />}
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

// Pembungkus bagian dengan judul yang diperbarui
const SectionWrapper = ({ children, id, className = '', title }) => {
    const sectionRef = useRef(null);
    const isVisible = useSectionVisibility(sectionRef);

    return (
        <section id={id} ref={sectionRef} className={`py-16 sm:py-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              {title && (
                 <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-600 mb-4">{title}</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-yellow-400 mx-auto rounded-full"></div>
                </div>
              )}
              {children}
            </div>
        </section>
    );
};

// ===================================================================================
// PERUBAHAN 2: HERO SECTION DENGAN EFEK KETIKAN
// Mengganti subtitle statis dengan komponen TypeAnimation.
// ===================================================================================
const HeroSection = ({ hero }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const currentImageUrl = isMobile && hero.mobileImageUrl ? hero.mobileImageUrl : hero.imageUrl;

  return (
    <section  
      id="hero"  
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed relative pt-20 overflow-hidden"
      style={{ backgroundImage: `linear-gradient(rgba(26,32,44,0.7), rgba(49,57,75,0.6)), url(${currentImageUrl})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight animate-hero-fade-in-down"
        >
          {hero.title}
        </h1>
        <div className="text-base sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto h-16 sm:h-auto">
          <TypeAnimation
            sequence={hero.animatedSubtitle}
            wrapper="p"
            speed={50}
            className="animate-hero-fade-in-up animation-delay-300"
            repeat={Infinity}
          />
        </div>
        <a
          href="#daftar-produk"  
          onClick={(e) => {
            e.preventDefault();
            const productSection = document.getElementById('daftar-produk');  
            if (productSection) {
              const navbarHeight = document.querySelector('nav')?.offsetHeight || 70;
              const elementPosition = productSection.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({
                top: elementPosition - navbarHeight - 20,
                behavior: 'smooth'
              });
            }
          }}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 px-8 sm:py-4 sm:px-10 rounded-lg text-lg shadow-xl transform hover:scale-105 transition-all duration-300 animate-hero-fade-in-up animation-delay-600 inline-flex items-center group"
        >
          {hero.cta}
          <ArrowRightCircle className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};

// Bagian Keunggulan
const AdvantagesSection = ({ advantages }) => (
    <SectionWrapper id="keunggulan" className="bg-slate-50" title={advantages.title}>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.items.map((item, index) => (
                <div
                    key={index}
                    className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animated-item"
                    style={{ animationDelay: `${index * 0.15}s` }}
                >
                    <div className="inline-block p-4 bg-indigo-100 rounded-full mb-4">
                        <item.icon className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
            ))}
        </div>
    </SectionWrapper>
);

// Bagian Tentang Kami
const AboutSection = ({ about }) => (
    <SectionWrapper id="tentang-kami" className="bg-white" title={about.title}>
        <div className="max-w-3xl mx-auto text-gray-700 text-base md:text-lg leading-relaxed">
            <p className="mb-6 whitespace-pre-line text-center">{about.description1}</p>
            <p className="mb-4 whitespace-pre-line text-center">{about.description2Intro}</p>
            <ul className="mb-6 space-y-3 pl-0">
            {about.commitments.map((commitment, index) => (
                <li key={index} className="flex items-start animated-item" style={{ animationDelay: `${index * 0.1}s` }}>
                <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span>{commitment}</span>
                </li>
            ))}
            </ul>
            <p className="whitespace-pre-line text-center">{about.closingStatement}</p>
        </div>
    </SectionWrapper>
);

// Komponen Jam Operasional
const ServiceHoursSection = ({ serviceHours }) => (
  <SectionWrapper id="jam-operasional" className="bg-slate-50" title={serviceHours.title}>
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8 animated-item">
      <ul className="space-y-4">
        {serviceHours.schedule.map((entry, index) => (
          <li key={index} className={`flex justify-between items-center text-base md:text-lg animated-item-right ${entry.isClosed ? 'text-red-600 font-semibold' : 'text-gray-700'}`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
            <span className="flex items-center">
              <Clock className="w-6 h-6 mr-3 text-indigo-500" />
              {entry.day}
            </span>
            <span>{entry.time}</span>
          </li>
        ))}
      </ul>
      {serviceHours.note && (
        <p className="text-sm text-gray-500 mt-6 text-center italic animated-item" style={{ animationDelay: `${0.1 + serviceHours.schedule.length * 0.1}s` }}>{serviceHours.note}</p>
      )}
    </div>
  </SectionWrapper>
);

// ===================================================================================
// PERUBAHAN 3: KARTU PRODUK DENGAN TAG BARU & EFEK HOVER
// Menampilkan tag (mis. "Terlaris") dengan warna kustom.
// Menambahkan filter brightness saat gambar di-hover.
// ===================================================================================
const PriceCard = ({ item, contactInfo, index }) => {
  const [selectedSize, setSelectedSize] = useState(item.sizes ? item.sizes[0] : null);

  useEffect(() => {
    if (item.sizes && item.sizes.length > 0) {
      setSelectedSize(item.sizes[0]);
    }
  }, [item]);

  const handleOrderClick = () => {
    let message = `Halo Jeyo Store, saya tertarik untuk memesan produk: ${item.name}`;
    if (selectedSize) {
      message += ` (${selectedSize.name} - ${selectedSize.price})`;
    } else if (item.price) {
      message += ` (Harga: ${item.price})`;
    }
    window.open(`https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animated-item"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="relative h-56 group">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse rounded-t-xl">
            <ShoppingCart className="h-10 w-10 text-gray-400" />
          </div>
        )}
        <img  
            src={item.imageUrl}  
            alt={`Gambar produk ${item.name} dari Jeyo Store`}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:filter group-hover:brightness-110 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsImageLoaded(true)}
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src="https://placehold.co/600x400/FFCDD2/B71C1C?text=Gagal+Muat&font=inter"; }}
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-opacity duration-300"></div>
        {item.tag && (
            <div className={`absolute top-0 right-0 ${item.tag.color} text-white text-xs font-semibold px-3 py-1 rounded-bl-lg`}>
                {item.tag.text}
            </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow min-h-[60px]">{item.description}</p>  

        {item.flavors && item.flavors.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-purple-600 mb-2">Varian Rasa:</p>
            <div className="flex flex-wrap gap-2">
              {item.flavors.map((flavor, idx) => (
                <span key={idx} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">{flavor}</span>
              ))}
            </div>
          </div>
        )}

        {item.sizes && item.sizes.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-orange-600 mb-2">Pilih Ukuran:</p>
            <select
              value={selectedSize ? selectedSize.name : ''}
              onChange={(e) => setSelectedSize(item.sizes.find(s => s.name === e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {item.sizes.map((size, idx) => (<option key={idx} value={size.name}>{size.name}</option>))}
            </select>
          </div>
        )}

        <p className="text-2xl font-bold text-indigo-700 mb-6 mt-auto pt-4">
          {selectedSize ? selectedSize.price : item.price}
        </p>
        <button
          onClick={handleOrderClick}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors duration-300 inline-flex items-center justify-center group"
        >
          Pesan Sekarang <ShoppingCart className="ml-2 h-5 w-5 transform group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// Bagian Daftar Produk
const ProductSection = ({ pricing, contactInfo }) => (
    <SectionWrapper id="daftar-produk" className="bg-white" title={pricing.title}>
        <p className="text-center mt-[-3rem] mb-12 max-w-2xl mx-auto text-lg text-gray-600">{pricing.description}</p>
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 justify-center max-w-4xl mx-auto">
            {pricing.items.map((item, index) => (
                <PriceCard key={item.id} item={item} contactInfo={contactInfo} index={index} />
            ))}
        </div>
    </SectionWrapper>
);

// Komponen baru untuk rating bintang
const StarRating = ({ rating }) => (
  <div className="flex justify-center items-center">
    {[...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill={index < rating ? 'currentColor' : 'none'}
      />
    ))}
  </div>
);

// ===================================================================================
// PERUBAHAN 4: BAGIAN TESTIMONI DENGAN RATING BINTANG
// Mengintegrasikan komponen StarRating ke dalam kartu testimoni.
// ===================================================================================
const TestimonialSection = ({ testimonials }) => (
    <SectionWrapper id="testimoni" className="bg-slate-50" title={testimonials.title}>
        <p className="text-center mt-[-3rem] mb-12 max-w-2xl mx-auto text-lg text-gray-600">{testimonials.description}</p>
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
        {testimonials.reviews.map((review, index) => (
            <div
                key={review.id}
                className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300 animated-item"
                style={{ animationDelay: `${index * 0.15}s` }}
            >
                <StarRating rating={review.rating} />
                <p className="text-base md:text-lg italic my-4 flex-grow">"{review.quote}"</p>
                <div className="font-semibold text-indigo-700 mt-auto">{review.author}</div>
                <div className="text-sm text-gray-500">{review.city}</div>
            </div>
        ))}
        </div>
    </SectionWrapper>
);

// Komponen FAQ (tidak ada perubahan signifikan)
const FaqItem = ({ item, index }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b animated-item" style={{ animationDelay: `${index * 0.1}s` }}>
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left py-5 px-6 focus:outline-none">
                <span className="text-base md:text-lg font-medium text-gray-800">{item.q}</span>
                <ChevronUp className={`w-5 h-5 text-indigo-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <p className="text-gray-600 pb-5 px-6">{item.a}</p>
            </div>
        </div>
    );
};
const FaqSection = ({ faq }) => (
    <SectionWrapper id="faq" className="bg-white" title={faq.title}>
        <div className="max-w-3xl mx-auto bg-slate-50 rounded-xl shadow-lg overflow-hidden">
            {faq.items.map((item, index) => (<FaqItem key={index} item={item} index={index} />))}
        </div>
    </SectionWrapper>
);

// Bagian Kontak (tidak ada perubahan signifikan)
const ContactSection = ({ contact }) => (
    <section id="kontak">
        <div className="bg-gradient-to-br from-indigo-700 to-purple-800 text-white py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Hubungi Kami</h2>
                    <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
                </div>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-x-8 gap-y-12 items-center">
                    <div className="space-y-6 text-center md:text-left animated-item-right">
                         <div className="flex items-center justify-center md:justify-start"><MapPin className="w-6 h-6 mr-3 text-indigo-200 flex-shrink-0" /><p className="text-indigo-100">{contact.address}</p></div>
                         <div className="flex items-center justify-center md:justify-start"><Phone className="w-6 h-6 mr-3 text-indigo-200 flex-shrink-0" /><a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-indigo-100 hover:text-white transition-colors hover:underline">{contact.phone}</a></div>
                         <div className="flex items-center justify-center md:justify-start"><Mail className="w-6 h-6 mr-3 text-indigo-200 flex-shrink-0" /><a href={`mailto:${contact.email}`} className="text-indigo-100 hover:text-white transition-colors hover:underline">{contact.email}</a></div>
                         <div className="flex items-center justify-center md:justify-start"><Instagram className="w-6 h-6 mr-3 text-indigo-200 flex-shrink-0" /><a href={contact.instagramLink} target="_blank" rel="noopener noreferrer" className="text-indigo-100 hover:text-white transition-colors hover:underline">@{contact.instagramUsername}</a></div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl text-center animated-item">
                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">Ada Pertanyaan?</h3>
                        <p className="text-indigo-200 mb-6">Hubungi kami langsung di WhatsApp!</p>
                        <a href={`https://wa.me/${contact.whatsappNumber}?text=Halo%20Jeyo%20Store,%20saya%20tertarik%20dengan%20produk%20Anda.`} target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 text-lg">Chat di WhatsApp</a>
                    </div>
                </div>
                {contact.eCommerceLinks && contact.eCommerceLinks.length > 0 && (
                    <div className="mt-16 text-center">
                      <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white animated-item" style={{ animationDelay: `0.3s` }}>Temukan Kami di E-commerce!</h3>
                      <div className="flex flex-wrap justify-center gap-6">
                        {contact.eCommerceLinks.map((platform, index) => (
                          <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-white/20 rounded-lg shadow-md hover:bg-white/30 text-white transition-colors transform hover:scale-105 animated-item" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                            <ShoppingCart className={`w-8 h-8 mr-3`} /> 
                            <span className="font-medium text-base md:text-lg">{platform.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                )}
            </div>
        </div>
    </section>
);

// Footer (tidak ada perubahan signifikan)
const Footer = ({ businessName, copyright }) => (
  <footer className="bg-gray-800 text-gray-400 py-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p>&copy; {new Date().getFullYear()} {businessName}. {copyright}</p>
      <p className="text-sm mt-2">Didesain dengan <span className="text-red-500">&hearts;</span> oleh Jeyo Store.</p>
    </div>
  </footer>
);

// ===================================================================================
// PERUBAHAN 5: TOMBOL MENGAMBANG DENGAN LABEL HOVER
// Menambahkan label teks yang muncul saat tombol di-hover.
// ===================================================================================
const FloatingButtons = ({ whatsappNumber }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 400) setIsVisible(true);
        else setIsVisible(false);
    };

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Halo%20Jeyo%20Store,%20saya%20ingin%20bertanya%20tentang%20produk%20Anda.`;

    return (
        <div className={`fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="group relative flex items-center">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none transform hover:scale-110 transition-all duration-200"
                  aria-label="Chat di WhatsApp"
                >
                    <WhatsAppIcon className="h-6 w-6" />
                </a>
                <span className="absolute right-full mr-4 px-2 py-1 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Chat WhatsApp
                </span>
            </div>
            <div className="group relative flex items-center">
                <button
                    onClick={scrollToTop}
                    className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none transform hover:scale-110 transition-all duration-200"
                    aria-label="Kembali ke atas"
                >
                    <ChevronUp className="h-6 w-6" />
                </button>
                <span className="absolute right-full mr-4 px-2 py-1 bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Ke Atas
                </span>
            </div>
        </div>
    );
};

// Komponen Utama Aplikasi
const App = () => {
  const { businessName, hero, about, advantages, serviceHours, pricing, testimonials, faq, contact, footer } = MOCK_DATA;
  const navLinks = [
    { name: 'Keunggulan', href: '#keunggulan' },
    { name: 'Tentang Kami', href: '#tentang-kami' },
    { name: 'Jam Operasional', href: '#jam-operasional' },
    { name: 'Daftar Produk', href: '#daftar-produk' },
    { name: 'Testimoni', href: '#testimoni' },
    { name: 'FAQ', href: '#faq'},
    { name: 'Kontak', href: '#kontak' },
  ];

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  useEffect(() => {
    const styleId = 'custom-animations-style';
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = `
      @keyframes heroFadeInDown { 0% { opacity: 0; transform: translateY(-30px); } 100% { opacity: 1; transform: translateY(0); } }
      @keyframes heroFadeInUp { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
      .animate-hero-fade-in-down { animation: heroFadeInDown 1s ease-out forwards; }
      .animate-hero-fade-in-up { animation: heroFadeInUp 1s ease-out forwards; }
      
      @keyframes slideInUpStaggered { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
      @keyframes slideInRightStaggered { 0% { opacity: 0; transform: translateX(-40px); } 100% { opacity: 1; transform: translateX(0); } }
      .animation-delay-300 { animation-delay: 0.3s; }
      .animation-delay-600 { animation-delay: 0.6s; }
      .animated-item { animation: slideInUpStaggered 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; opacity: 0; }
      .animated-item-right { animation: slideInRightStaggered 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; opacity: 0; }
    `;
    
    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, []);


  return (
    <div className="font-inter antialiased text-gray-800 min-h-screen bg-slate-50">
      {/* PENGINGAT SEO: Pastikan untuk menambahkan tag <title> dan <meta name="description"> di file index.html Anda untuk hasil pencarian yang lebih baik! */}
      <Navbar businessName={businessName} navLinks={navLinks} />
      <main>
        <HeroSection hero={hero} />
        <AdvantagesSection advantages={advantages} />
        <AboutSection about={about} />
        <ServiceHoursSection serviceHours={serviceHours} />
        <ProductSection pricing={pricing} contactInfo={contact} />
        <TestimonialSection testimonials={testimonials} />
        <FaqSection faq={faq} />
        <ContactSection contact={contact} />
      </main>
      <Footer businessName={businessName} copyright={footer.copyright} />
      <FloatingButtons whatsappNumber={contact.whatsappNumber} />
    </div>
  );
};

export default App;
