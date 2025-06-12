import React, { useState, useEffect, useRef } from 'react';
// ReactDOM tidak digunakan, jadi impornya dihapus untuk menjaga kebersihan kode.
import { ShieldCheck, MapPin, Phone, Mail, Clock, ShoppingCart, ArrowRightCircle, CheckCircle, Instagram, Flame, Building, ShoppingBag, MessageSquare, PhoneCall, ChevronUp, HelpCircle, Star, ThumbsUp, Package, BadgePercent, MessageCircle as WhatsAppIcon } from 'lucide-react';

// Data Mockup untuk konten landing page
// URL gambar hero diperbarui dengan gambar yang lebih relevan dengan produk makanan ringan.
const MOCK_DATA = {
  businessName: "Jeyo Store Official",
  hero: {
    title: "Selamat Datang di Jeyo Store",
    subtitle: "Temukan makanan ringan lezat, cemilan pilihan, dan produk berkualitas terbaik khusus untuk Anda.",
    cta: "Jelajahi Produk Kami",
    imageUrl: "https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Gambar baru yang lebih relevan
    mobileImageUrl: "https://pin.it/580zpDKa2", // Gambar mobile baru
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
      { id: 1, quote: "Mie Lidi Jeyo Store paling enak! Pedasnya pas, bikin nagih terus. Selalu jadi pilihan pertama saya.", author: "Prayoga Akbar", city: "Bogor", avatar: "https://i.pravatar.cc/150?u=prayoga" },
      { id: 2, quote: "Makaroninya gurih banget, cocok buat teman ngopi sore. Anak-anak di rumah juga suka!", author: "Budi Santoso", city: "Jakarta", avatar: "https://i.pravatar.cc/150?u=budi" },
      { id: 3, quote: "Pengemasannya rapi dan higienis. Produknya selalu fresh. Pelayanan juga cepat dan ramah.", author: "M Taufik", city: "Bandung", avatar: "https://i.pravatar.cc/150?u=taufik" },
      { id: 4, quote: "Harga sangat terjangkau dengan kualitas premium. Mie Lidi Populer memang juara!", author: "Rudi Wijaya", city: "Yogyakarta", avatar: "https://i.pravatar.cc/150?u=rudi" },
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
          observer.unobserve(entry.target); // Hentikan observasi setelah terlihat
        }
      },
      { threshold } // Persentase bagian yang terlihat untuk memicu
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); // Bersihkan observer saat komponen di-unmount
      }
    };
  }, [ref, threshold]);

  return isVisible;
};

// Komponen Navigasi
const Navbar = ({ businessName, navLinks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  // Ikon yang sesuai untuk setiap tautan navigasi
  const linkIcons = {
    'Keunggulan': Star,
    'Tentang Kami': Building,
    'Daftar Produk': ShoppingBag,
    'Testimoni': MessageSquare,
    'FAQ': HelpCircle,
    'Kontak': PhoneCall,
    'Jam Operasional': Clock,
  };

  // Efek untuk menandai tautan navigasi aktif berdasarkan posisi scroll
  useEffect(() => {
    const handleScroll = () => {
      let currentSectionId = '';
      const offset = window.innerHeight * 0.4; // Menentukan offset untuk aktivasi tautan
      // Iterasi dari belakang untuk akurasi yang lebih baik saat scroll ke atas
      [...navLinks].reverse().forEach(link => { 
        const section = document.getElementById(link.href.substring(1));
        if (section && section.offsetTop <= window.scrollY + offset) {
          if (!currentSectionId) currentSectionId = link.href.substring(1);
        }
      });
      // Set tautan aktif atau biarkan kosong jika di bagian atas halaman
      setActiveLink(currentSectionId || (window.scrollY < 200 ? '' : activeLink));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks, activeLink]);


  // Fungsi untuk menangani klik tautan navigasi
  const handleNavClick = (href) => {
    setIsOpen(false); // Tutup menu mobile setelah klik
    const element = document.getElementById(href.substring(1));
    if (element) {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 70; // Dapatkan tinggi navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight - 20, // Offset agar tidak tertutup navbar
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg fixed w-full top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Bisnis */}
          <div className="flex items-center">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-xl md:text-2xl font-extrabold flex items-center group"
            >
              <Flame className="w-8 h-8 mr-2 text-blue-500" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">{businessName}</span>
            </a>
          </div>
          {/* Tautan Navigasi Desktop */}
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
                    {/* Indikator aktif/hover di bawah teks */}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-indigo-600 transform transition-all duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                  </a>
                );
              })}
            </div>
          </div>
          {/* Tombol Hamburger Mobile */}
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
      {/* Menu Mobile */}
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

// Komponen Pembungkus Bagian dengan efek animasi
const SectionWrapper = ({ children, id, className = '' }) => {
    const sectionRef = useRef(null);
    const isVisible = useSectionVisibility(sectionRef);

    return (
        <section id={id} ref={sectionRef} className={`py-12 sm:py-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}>
            {children}
        </section>
    );
};

// Komponen Hero Section
const HeroSection = ({ hero }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState(hero.imageUrl);

  useEffect(() => {
    const handleScrollAndResize = () => {
      setScrollPosition(window.scrollY);
      if (window.innerWidth < 768 && hero.mobileImageUrl) {
        setCurrentImageUrl(hero.mobileImageUrl);
      } else {
        setCurrentImageUrl(hero.imageUrl);
      }
    };

    window.addEventListener('scroll', handleScrollAndResize);
    window.addEventListener('resize', handleScrollAndResize);
    handleScrollAndResize();
    return () => {
      window.removeEventListener('scroll', handleScrollAndResize);
      window.removeEventListener('resize', handleScrollAndResize);
    };
  }, [hero.imageUrl, hero.mobileImageUrl]);

  return (
    <section  
      id="hero"  
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed relative pt-20 overflow-hidden"
      style={{ backgroundImage: `linear-gradient(rgba(74,85,162,0.6), rgba(106,117,201,0.4)), url(${currentImageUrl})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-transparent"></div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight animate-hero-fade-in-down"
          style={{ transform: `translateY(${scrollPosition * 0.3}px)` }}
        >
          {hero.title}
        </h1>
        <p
          className="text-base sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto animate-hero-fade-in-up animation-delay-300"
          style={{ transform: `translateY(${scrollPosition * 0.2}px)` }}
        >
          {hero.subtitle}
        </p>
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
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 sm:py-4 sm:px-10 rounded-lg text-lg shadow-xl transform hover:scale-105 transition-all duration-300 animate-hero-fade-in-up animation-delay-600 inline-flex items-center group"
          style={{ transform: `translateY(${scrollPosition * 0.1}px)` }}
        >
          {hero.cta}
          <ArrowRightCircle className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};

// Bagian Keunggulan (Advantages Section)
const AdvantagesSection = ({ advantages }) => (
    <SectionWrapper id="keunggulan" className="bg-white bg-dots-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">{advantages.title}</h2>
                <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
            </div>
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
        </div>
    </SectionWrapper>
);


// Bagian Tentang Kami (About Section)
const AboutSection = ({ about }) => (
    <SectionWrapper id="tentang-kami" className="bg-slate-50 bg-lines-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">{about.title}</h2>
                <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
            </div>
            <div className="max-w-3xl mx-auto text-gray-700 text-base md:text-lg leading-relaxed">
                <p className="mb-6 whitespace-pre-line text-center md:text-left">{about.description1}</p>
                <p className="mb-4 whitespace-pre-line text-center md:text-left">{about.description2Intro}</p>
                <ul className="mb-6 space-y-3 pl-0">
                {about.commitments.map((commitment, index) => (
                    <li key={index} className="flex items-start animated-item" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span>{commitment}</span>
                    </li>
                ))}
                </ul>
                <p className="whitespace-pre-line text-center md:text-left">{about.closingStatement}</p>
            </div>
        </div>
    </SectionWrapper>
);

// Komponen Jam Operasional
const ServiceHoursSection = ({ serviceHours }) => (
  <SectionWrapper id="jam-operasional" className="bg-white bg-dots-pattern">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">{serviceHours.title}</h2>
        <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
      </div>
      <div className="max-w-2xl mx-auto bg-slate-50 rounded-xl shadow-lg overflow-hidden p-8 animated-item">
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
    </div>
  </SectionWrapper>
);

// Komponen Kartu Produk
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
            <svg className="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        {/* ALT TEXT DIPERBARUI: Teks alternatif yang lebih deskriptif untuk aksesibilitas */}
        <img  
            src={item.imageUrl}  
            alt={`Gambar produk ${item.name} dari Jeyo Store`}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${isImageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
            onLoad={() => setIsImageLoaded(true)}
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src="https://placehold.co/600x400/FFCDD2/B71C1C?text=Gagal+Muat&font=inter"; }}
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-opacity duration-300"></div>
        {item.features && item.features.includes("Populer") && (
            <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                Populer!
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
                <span key={idx} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full flex items-center">
                  {flavor}
                </span>
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
              {item.sizes.map((size, idx) => (
                <option key={idx} value={size.name}>
                  {size.name}
                </option>
              ))}
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

// Bagian Daftar Produk (Product Section)
const ProductSection = ({ pricing, contactInfo }) => (
    <SectionWrapper id="daftar-produk" className="bg-slate-50 bg-dots-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">{pricing.title}</h2>
                <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">{pricing.description}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 sm:gap-10 justify-center max-w-4xl mx-auto">
                {pricing.items.map((item, index) => (
                    <PriceCard key={item.id} item={item} contactInfo={contactInfo} index={index} />
                ))}
            </div>
        </div>
    </SectionWrapper>
);

// Bagian Testimoni
const TestimonialSection = ({ testimonials }) => (
    <SectionWrapper id="testimoni" className="bg-white bg-lines-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">{testimonials.title}</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">{testimonials.description}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
            {testimonials.reviews.map((review, index) => (
                <div
                    key={review.id}
                    className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300 animated-item"
                    style={{ animationDelay: `${index * 0.15}s` }}
                >
                    <p className="text-base md:text-lg italic mb-4 flex-grow">"{review.quote}"</p>
                    <div className="font-semibold text-indigo-700 mt-auto">{review.author}</div>
                    <div className="text-sm text-gray-500">{review.city}</div>
                </div>
            ))}
            </div>
        </div>
    </SectionWrapper>
);


// Komponen FAQ Item
const FaqItem = ({ item, index }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            className="border-b animated-item"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-5 px-6 focus:outline-none"
            >
                <span className="text-base md:text-lg font-medium text-gray-800">{item.q}</span>
                <ChevronUp className={`w-5 h-5 text-indigo-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <p className="text-gray-600 pb-5 px-6">{item.a}</p>
            </div>
        </div>
    );
};

// Bagian FAQ
const FaqSection = ({ faq }) => (
    <SectionWrapper id="faq" className="bg-slate-50 bg-dots-pattern">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">{faq.title}</h2>
                <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
            </div>
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                {faq.items.map((item, index) => (
                    <FaqItem key={index} item={item} index={index} />
                ))}
            </div>
        </div>
    </SectionWrapper>
);


// Bagian Kontak
const ContactSection = ({ contact }) => (
    <SectionWrapper id="kontak">
        <div className="bg-gradient-to-br from-indigo-700 to-purple-800 text-white py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-4xl font-bold mb-4">{contact.title}</h2>
                    <div className="w-24 h-1 bg-indigo-400 mx-auto rounded-full"></div>
                </div>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-x-8 gap-y-12 items-center">
                    <div
                        className="space-y-6 text-center md:text-left animated-item-right"
                        style={{ animationDelay: `0s` }}
                    >
                        {/* Alamat, Telepon, Email, Instagram */}
                         <div className="flex items-center justify-center md:justify-start">
                             <MapPin className="w-6 h-6 mr-3 text-indigo-200 flex-shrink-0" />
                             <p className="text-indigo-100">{contact.address}</p>
                         </div>
                         <div className="flex items-center justify-center md:justify-start">
                             <Phone className="w-6 h-6 mr-3 text-indigo-200 flex-shrink-0" />
                             <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-indigo-100 hover:text-white transition-colors hover:underline">{contact.phone}</a>
                         </div>
                         <div className="flex items-center justify-center md:justify-start">
                             <Mail className="w-6 h-6 mr-3 text-indigo-200 flex-shrink-0" />
                             <a href={`mailto:${contact.email}`} className="text-indigo-100 hover:text-white transition-colors hover:underline">{contact.email}</a>
                         </div>
                         <div className="flex items-center justify-center md:justify-start">
                              <Instagram className="w-6 h-6 mr-3 text-indigo-200 flex-shrink-0" />
                              <a href={contact.instagramLink} target="_blank" rel="noopener noreferrer" className="text-indigo-100 hover:text-white transition-colors hover:underline">@{contact.instagramUsername}</a>
                         </div>
                    </div>
                    {/* Tombol Chat WhatsApp */}
                    <div
                        className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl text-center animated-item"
                        style={{ animationDelay: `0.15s` }}
                    >
                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">Ada Pertanyaan?</h3>
                        <p className="text-indigo-200 mb-6">Hubungi kami langsung di WhatsApp!</p>
                        <a
                            href={`https://wa.me/${contact.whatsappNumber}?text=Halo%20Jeyo%20Store,%20saya%20tertarik%20dengan%20produk%20Anda.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 text-lg"
                        >
                            Chat di WhatsApp
                        </a>
                    </div>
                </div>
                {/* Tautan E-commerce */}
                {contact.eCommerceLinks && contact.eCommerceLinks.length > 0 && (
                    <div className="mt-16 text-center">
                      <h3 className="text-xl md:text-2xl font-semibold mb-6 text-white animated-item" style={{ animationDelay: `0.3s` }}>Temukan Kami di E-commerce!</h3>
                      <div className="flex flex-wrap justify-center gap-6">
                        {contact.eCommerceLinks.map((platform, index) => (
                          <a
                            key={platform.name}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-4 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 text-white transition-colors transform hover:scale-105 animated-item"
                            style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                          >
                            <ShoppingCart className={`w-8 h-8 mr-3 text-white`} /> 
                            <span className="font-medium text-base md:text-lg">{platform.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                )}
            </div>
        </div>
    </SectionWrapper>
);

// Footer
const Footer = ({ businessName, copyright }) => (
  <footer className="bg-gray-800 text-gray-400 py-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p>&copy; {new Date().getFullYear()} {businessName}. {copyright}</p>
      <p className="text-sm mt-2">Didesain dengan <span className="text-red-500">&hearts;</span> oleh Jeyo Store.</p>
    </div>
  </footer>
);

// FITUR BARU: Tombol Aksi Mengambang (Scroll to Top & WhatsApp)
const FloatingButtons = ({ whatsappNumber }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Tampilkan tombol setelah scroll melewati 400px
    const toggleVisibility = () => {
        if (window.pageYOffset > 400) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll ke atas halaman
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Halo%20Jeyo%20Store,%20saya%20ingin%20bertanya%20tentang%20produk%20Anda.`;

    return (
        <div className={`fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
             {/* Tombol WhatsApp */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transform hover:scale-110 transition-all duration-200 animate-pulse-effect"
              aria-label="Chat di WhatsApp"
            >
                <WhatsAppIcon className="h-6 w-6" />
            </a>
            {/* Tombol Scroll ke Atas */}
            <button
                onClick={scrollToTop}
                className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transform hover:scale-110 transition-all duration-200"
                aria-label="Kembali ke atas"
            >
                <ChevronUp className="h-6 w-6" />
            </button>
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

  // Mengaktifkan smooth scroll untuk seluruh halaman
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Memasukkan keyframes CSS untuk animasi ke dalam DOM
  useEffect(() => {
    const styleId = 'custom-animations-style';
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    // Keyframes animasi dan kelas Tailwind kustom
    styleElement.textContent = `
      @keyframes heroFadeInDown { 0% { opacity: 0; transform: translateY(-30px) scale(0.95); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
      @keyframes heroFadeInUp { 0% { opacity: 0; transform: translateY(30px) scale(0.95); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
      
      .animate-hero-fade-in-down { animation: heroFadeInDown 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; opacity: 0; }
      .animate-hero-fade-in-up { animation: heroFadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; opacity: 0; }

      @keyframes slideInUpStaggered { 0% { opacity: 0; transform: translateY(50px); } 100% { opacity: 1; transform: translateY(0); } }
      @keyframes slideInRightStaggered { 0% { opacity: 0; transform: translateX(-50px); } 100% { opacity: 1; transform: translateX(0); } }
      
      .animation-delay-300 { animation-delay: 0.3s; }
      .animation-delay-600 { animation-delay: 0.6s; }

      .animated-item {
        opacity: 0;
        animation: slideInUpStaggered 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }
      .animated-item-right {
        opacity: 0;
        animation: slideInRightStaggered 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }
      @keyframes pulseEffect { 0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); } 50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); } }
      .animate-pulse-effect {
        animation: pulseEffect 2s infinite ease-in-out;
      }
      .bg-dots-pattern {
        background-image: radial-gradient(#d1d5db 1px, transparent 1px);
        background-size: 20px 20px;
        background-position: 0 0;
      }
      .bg-lines-pattern {
        background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
        background-size: 20px 20px;
        background-position: 0 0;
      }
    `;
    
    return () => {
      const el = document.getElementById(styleId);
      if (el) el.remove();
    };
  }, []);


  return (
    <div
      className="font-inter antialiased text-gray-800 min-h-screen bg-gray-50"
    >
      <Navbar businessName={businessName} navLinks={navLinks} />
      <main> {/* Dihilangkan padding-top karena hero section sudah memiliki padding-top implisit */}
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
      {/* Tombol Mengambang ditambahkan di sini */}
      <FloatingButtons whatsappNumber={contact.whatsappNumber} />
    </div>
  );
};

export default App;
