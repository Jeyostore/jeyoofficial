import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM untuk createPortal
import { ShieldCheck, MapPin, Phone, Mail, MessageCircle, Clock, ShoppingCart, ArrowRightCircle, CheckCircle, Tag, Instagram, Flame, Building, ShoppingBag, MessageSquare, PhoneCall, ChevronUp, HelpCircle, Star, ThumbsUp, Package, BadgePercent } from 'lucide-react'; // Mengimpor Flame

// Data Mockup untuk konten landing page
const MOCK_DATA = {
  businessName: "Jeyo Store Official",
  hero: {
    title: "Selamat Datang di Jeyo Store",
    subtitle: "Temukan makanan ringan lezat, cemilan pilihan, dan produk berkualitas terbaik khusus untuk Anda.",
    cta: "Jelajahi Produk Kami",
    imageUrl: "https://cdn.pixabay.com/photo/2021/02/25/12/03/courier-6048941_1280.png",
    mobileImageUrl: "https://c.pxhere.com/images/9c/73/a911e14204790a3a2f44a5ffba95-1639133.jpg!d", // Gambar baru yang valid untuk mobile
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current); // Bersihkan observer saat komponen di-unmount
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
    'Jam Operasional': Clock, // Menambahkan ikon untuk Jam Operasional
  };

  // Efek untuk menandai tautan navigasi aktif berdasarkan posisi scroll
  useEffect(() => {
    const handleScroll = () => {
        let currentSectionId = '';
        const offset = window.innerHeight * 0.4; // Menentukan offset untuk aktivasi tautan
        [...navLinks].reverse().forEach(link => { // Memulai dari bawah untuk akurasi yang lebih baik
            const section = document.getElementById(link.href.substring(1));
            if (section && section.offsetTop <= window.scrollY + offset) {
                if (!currentSectionId) currentSectionId = link.href.substring(1);
            }
        });
        // Set tautan aktif atau biarkan kosong jika di bagian atas halaman
        setActiveLink(currentSectionId || (window.scrollY < 200 ? '' : activeLink));
    };

    window.addEventListener('scroll', handleScroll, { passive: true }); // Menggunakan passive listener untuk performa
    handleScroll(); // Panggil saat mount untuk set posisi awal
    return () => window.removeEventListener('scroll', handleScroll); // Bersihkan listener
  }, [navLinks]);


  // Fungsi untuk menangani klik tautan navigasi
  const handleNavClick = (href) => {
    setIsOpen(false); // Tutup menu mobile setelah klik
    const element = document.getElementById(href.substring(1));
    if (element) {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 70; // Dapatkan tinggi navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight - 20, // Offset untuk scroll agar tidak tertutup navbar
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
              <Flame className="w-8 h-8 mr-2 text-blue-500" /> {/* Mengubah ikon menjadi Flame dan warnanya */}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">{businessName}</span> {/* Menyesuaikan gradien warna */}
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
                        ? 'text-indigo-700' // Slightly deeper indigo for active state
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
const SectionWrapper = ({ children, id, className = '' }) => { // Tambahkan className prop
    const sectionRef = useRef(null);
    const isVisible = useSectionVisibility(sectionRef); // Menggunakan hook untuk deteksi visibilitas

    return (
        <section id={id} ref={sectionRef} className={`py-16 sm:py-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}> {/* Tambahkan className */}
            {children}
        </section>
    );
};

// Komponen Hero Section
const HeroSection = ({ hero }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState(hero.imageUrl); // State untuk menyimpan URL gambar saat ini

  // Efek untuk melacak posisi scroll dan menyesuaikan gambar hero
  useEffect(() => {
    const handleScrollAndResize = () => {
      setScrollPosition(window.scrollY);
      // Sesuaikan gambar berdasarkan lebar layar
      if (window.innerWidth < 768 && hero.mobileImageUrl) { // Misalnya, di bawah 768px (ukuran md di Tailwind)
        setCurrentImageUrl(hero.mobileImageUrl);
      } else {
        setCurrentImageUrl(hero.imageUrl);
      }
    };

    window.addEventListener('scroll', handleScrollAndResize);
    window.addEventListener('resize', handleScrollAndResize); // Tambahkan event listener untuk resize
    handleScrollAndResize(); // Panggil saat mount untuk set posisi awal dan gambar awal
    return () => {
      window.removeEventListener('scroll', handleScrollAndResize);
      window.removeEventListener('resize', handleScrollAndResize); // Bersihkan listener
    };
  }, [hero.imageUrl, hero.mobileImageUrl]); // Dependensi ditambahkan agar efek terpicu jika URL gambar berubah

  return (
    <section  
      id="hero"  
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed relative pt-20 overflow-hidden" // overflow-hidden untuk mencegah scrollbar saat parallax
      style={{ backgroundImage: `linear-gradient(rgba(74,85,162,0.6), rgba(106,117,201,0.4)), url(${currentImageUrl})` }} // Gunakan currentImageUrl
    >
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-transparent"></div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
        {/* Judul Hero dengan animasi pembukaan dan parallax */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight animate-hero-fade-in-down"
          style={{ transform: `translateY(${scrollPosition * 0.3}px)` }} // Efek parallax
        >
          {hero.title}
        </h1>
        {/* Subtitle Hero dengan animasi pembukaan dan parallax */}
        <p
          className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto animate-hero-fade-in-up animation-delay-300"
          style={{ transform: `translateY(${scrollPosition * 0.2}px)` }} // Efek parallax
        >
          {hero.subtitle}
        </p>
        {/* Tombol CTA Hero dengan animasi pembukaan dan parallax */}
        <a
          href="#daftar-produk"  
          onClick={(e) => {
            e.preventDefault();
            const productSection = document.getElementById('daftar-produk');  
            if (productSection) {
              const navbarHeight = document.querySelector('nav')?.offsetHeight || 70;
              const elementPosition = productSection.getBoundingClientRect().top + window.scrollY;
              window.scrollTo({
                top: elementPosition - navbarHeight - 20, // Offset untuk scroll agar tidak tertutup navbar
                behavior: 'smooth'
              });
            }
          }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 sm:py-4 sm:px-10 rounded-lg text-lg shadow-xl transform hover:scale-105 transition-all duration-300 animate-hero-fade-in-up animation-delay-600 inline-flex items-center group"
          style={{ transform: `translateY(${scrollPosition * 0.1}px)` }} // Efek parallax
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
    <SectionWrapper id="keunggulan" className="bg-white bg-dots-pattern"> {/* Tambahkan kelas pattern */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{advantages.title}</h2>
                <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {advantages.items.map((item, index) => (
                    <div
                        key={index}
                        className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animated-item"
                        style={{ animationDelay: `${index * 0.15}s` }} // Staggered delay
                    >
                        <div className="inline-block p-4 bg-indigo-100 rounded-full mb-4">
                            <item.icon className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </SectionWrapper>
);


// Bagian Tentang Kami (About Section)
const AboutSection = ({ about }) => (
    <SectionWrapper id="tentang-kami" className="bg-slate-50 bg-lines-pattern"> {/* Tambahkan kelas pattern */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{about.title}</h2>
                <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
            </div>
            <div className="max-w-3xl mx-auto text-gray-700 text-lg leading-relaxed">
                <p className="mb-6 whitespace-pre-line text-center md:text-left">{about.description1}</p>
                <p className="mb-4 whitespace-pre-line text-center md:text-left">{about.description2Intro}</p>
                <ul className="mb-6 space-y-3 pl-0"> {/* pl-0 untuk menghilangkan padding default list */}
                {about.commitments.map((commitment, index) => (
                    <li key={index} className="flex items-start animated-item" style={{ animationDelay: `${index * 0.1}s` }}> {/* Apply staggered animation */}
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
  <SectionWrapper id="jam-operasional" className="bg-white bg-dots-pattern"> {/* Tambahkan kelas pattern */}
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{serviceHours.title}</h2>
        <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
      </div>
      <div className="max-w-2xl mx-auto bg-slate-50 rounded-xl shadow-lg overflow-hidden p-8 animated-item"> {/* Apply animation to the main box */}
        <ul className="space-y-4">
          {serviceHours.schedule.map((entry, index) => (
            <li key={index} className={`flex justify-between items-center text-lg animated-item-right ${entry.isClosed ? 'text-red-600 font-semibold' : 'text-gray-700'}`}
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}> {/* Staggered delay for each schedule item */}
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
const PriceCard = ({ item, contactInfo, index }) => { // Menerima index
  const [selectedSize, setSelectedSize] = useState(item.sizes ? item.sizes[0] : null);

  // Set ukuran pertama sebagai default saat komponen dimuat
  useEffect(() => {
    if (item.sizes && item.sizes.length > 0) {
      setSelectedSize(item.sizes[0]);
    }
  }, [item]); // Terpicu ulang jika item berubah

  // Fungsi untuk menangani tombol "Pesan Sekarang"
  const handleOrderClick = () => {
    let message = `Halo Jeyo Store, saya tertarik untuk memesan produk: ${item.name}`;
    if (selectedSize) {
      message += ` (${selectedSize.name} - ${selectedSize.price})`;
    } else if (item.price) { // Jika tidak ada ukuran, gunakan harga langsung
      message += ` (Harga: ${item.price})`;
    }
    // Buka WhatsApp dengan pesan yang sudah diformat
    window.open(`https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animated-item"
      style={{ animationDelay: `${index * 0.15}s` }} // Staggered delay
    >
      <div className="relative h-56">
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse rounded-t-xl">
            {/* Spinner sederhana */}
            <svg className="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        {/* Gambar Produk */}
        <img  
            src={item.imageUrl}  
            alt={`[Gambar ${item.name}]`}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${isImageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
            onLoad={() => setIsImageLoaded(true)} // Set isImageLoaded true setelah gambar berhasil dimuat
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/FFCDD2/B71C1C?text=Gagal+Muat&font=inter"; }} // Fallback gambar
        />
        {/* Overlay untuk efek hover */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-opacity duration-300"></div>
        {/* Label "Populer!" jika ada di fitur */}
        {item.features && item.features.includes("Populer") && (
            <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg"> {/* Changed color */}
                Populer!
            </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{item.name}</h3>
        {/* min-h-[60px] untuk menjaga tinggi deskripsi agar konsisten */}
        <p className="text-gray-600 text-sm mb-4 flex-grow min-h-[60px]">{item.description}</p>  

        {/* Varian Rasa (jika ada) */}
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

        {/* Pilihan Ukuran (jika ada) */}
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

        {/* Harga Produk */}
        <p className="text-3xl font-bold text-indigo-700 mb-6 mt-auto pt-4"> {/* Changed color */}
          {selectedSize ? selectedSize.price : item.price}
        </p>
        {/* Tombol Pesan Sekarang */}
        <button
          onClick={handleOrderClick}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors duration-300 inline-flex items-center justify-center group"
        >
          Pesanan Sekarang <ShoppingCart className="ml-2 h-5 w-5 transform group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </div>
  );
};

// Bagian Daftar Produk (Product Section)
const ProductSection = ({ pricing, contactInfo }) => (
    <SectionWrapper id="daftar-produk" className="bg-slate-50 bg-dots-pattern"> {/* Tambahkan kelas pattern */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{pricing.title}</h2>
                <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">{pricing.description}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 sm:gap-10 justify-center max-w-4xl mx-auto">
                {pricing.items.map((item, index) => ( // Meneruskan index ke PriceCard
                    <PriceCard key={item.id} item={item} contactInfo={contactInfo} index={index} />
                ))}
            </div>
        </div>
    </SectionWrapper>
);

// Bagian Testimoni
const TestimonialSection = ({ testimonials }) => (
    <SectionWrapper id="testimoni" className="bg-white bg-lines-pattern"> {/* Tambahkan kelas pattern */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{testimonials.title}</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full"></div>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">{testimonials.description}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
            {testimonials.reviews.map((review, index) => ( // Meneruskan index
                <div
                    key={review.id}
                    className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300 animated-item"
                    style={{ animationDelay: `${index * 0.15}s` }} // Staggered delay
                >
                    {/* Gambar avatar dihapus dari sini */}
                    <p className="text-gray-600 text-lg italic mb-4 flex-grow">"{review.quote}"</p>
                    <div className="font-semibold text-indigo-700 mt-auto">{review.author}</div>
                    <div className="text-sm text-gray-500">{review.city}</div>
                </div>
            ))}
            </div>
        </div>
    </SectionWrapper>
);


// Komponen FAQ Item
const FaqItem = ({ item, index }) => { // Menerima index
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            className="border-b animated-item" // Apply to the wrapper
            style={{ animationDelay: `${index * 0.1}s` }} // Staggered delay
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-5 px-6 focus:outline-none"
            >
                <span className="text-lg font-medium text-gray-800">{item.q}</span>
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
    <SectionWrapper id="faq" className="bg-slate-50 bg-dots-pattern"> {/* Tambahkan kelas pattern */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{faq.title}</h2>
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
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">{contact.title}</h2>
                    <div className="w-24 h-1 bg-indigo-400 mx-auto rounded-full"></div>
                </div>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-x-8 gap-y-12 items-center">
                    <div
                        className="space-y-6 text-center md:text-left animated-item-right" // Animasi slide dari kanan
                        style={{ animationDelay: `0s` }}
                    >
                        {/* Alamat */}
                        <div className="flex items-center justify-center md:justify-start">
                            <MapPin className="w-6 h-6 mr-3 text-indigo-200 flex-shrink-0" /> {/* Changed color */}
                            <p className="text-indigo-100">{contact.address}</p>
                        </div>
                        {/* Telepon */}
                        <div className="flex items-center justify-center md:justify-start">
                            <Phone className="w-6 h-6 mr-3 text-indigo-200 flex-shrink-0" /> {/* Changed color */}
                            <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="text-indigo-100 hover:text-white transition-colors hover:underline">{contact.phone}</a>
                        </div>
                        {/* Email */}
                        <div className="flex items-center justify-center md:justify-start">
                            <Mail className="w-6 h-6 mr-3 text-indigo-200 flex-shrink-0" /> {/* Changed color */}
                            <a href={`mailto:${contact.email}`} className="text-indigo-100 hover:text-white transition-colors hover:underline">{contact.email}</a>
                        </div>
                        {/* Instagram */}
                        <div className="flex items-center justify-center md:justify-start">
                             <Instagram className="w-6 h-6 mr-3 text-indigo-200 flex-shrink-0" /> {/* Changed color */}
                             <a href={contact.instagramLink} target="_blank" rel="noopener noreferrer" className="text-indigo-100 hover:text-white transition-colors hover:underline">@{contact.instagramUsername}</a>
                        </div>
                    </div>
                    {/* Formulir/Tombol Chat WhatsApp */}
                    <div
                        className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl text-center animated-item" // Animasi slide dari bawah
                        style={{ animationDelay: `0.15s` }} // Slight delay for the second column
                    >
                        <h3 className="text-2xl font-semibold mb-4 text-white">Ada Pertanyaan?</h3>
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
                {/* Tautan E-commerce (jika ada) */}
                {contact.eCommerceLinks && contact.eCommerceLinks.length > 0 && (
                    <div className="mt-16 text-center">
                      <h3 className="text-2xl font-semibold mb-6 text-white animated-item" style={{ animationDelay: `0.3s` }}>Temukan Kami di E-commerce!</h3>
                      <div className="flex flex-wrap justify-center gap-6">
                        {contact.eCommerceLinks.map((platform, index) => ( // Meneruskan index
                          <a
                            key={platform.name}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-4 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 text-white transition-colors transform hover:scale-105 animated-item" // Diubah menjadi full biru
                            style={{ animationDelay: `${0.4 + index * 0.1}s` }} // Staggered delay for eCommerce links
                          >
                            {/* Ikon sekarang akan menjadi putih agar kontras dengan latar belakang biru */}
                            <ShoppingCart className={`w-8 h-8 mr-3 text-white`} /> 
                            <span className="font-medium text-lg">{platform.name}</span>
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

// Tombol Mengambang (Floating Buttons)
const FloatingButtons = ({ contact }) => {
    const [isVisible, setIsVisible] = useState(true); // Default: always visible for testing
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const toggleVisibilityAndProgress = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            const progress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;

            // setIsVisible(currentScroll > 300); // Re-enable this after debugging
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', toggleVisibilityAndProgress);
        toggleVisibilityAndProgress();
        return () => window.removeEventListener('scroll', toggleVisibilityAndProgress);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Ukuran tombol 48x48px (w-12 h-12)
    const size = 48;
    const strokeWidth = 4;
    const radius = (size / 2) - (strokeWidth / 2);
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

    return ReactDOM.createPortal( // Menggunakan createPortal untuk memastikan posisi fixed bekerja
        <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-center gap-3">
             {/* Tombol WhatsApp (ukuran diperkecil, ikon diperkecil) */}
             <a
                href={`https://wa.me/${contact.whatsappNumber}?text=Halo%20Jeyo%20Store`}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110 flex items-center justify-center w-12 h-12 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} // Animasi masuk/keluar
                aria-label="Chat di WhatsApp"
             >
                <MessageCircle className="w-6 h-6" /> {/* Ukuran ikon 24x24px */}
            </a>
            {/* Tombol Scroll ke Atas yang disederhanakan dan selalu terlihat untuk debugging */}
            <button
                onClick={scrollToTop}
                className="bg-blue-600 text-white rounded-full shadow-lg transition-all duration-300 relative flex items-center justify-center w-12 h-12" // Ukuran 48x48px, warna biru
                aria-label="Kembali ke atas"
            >
                <ChevronUp className="w-6 h-6" /> {/* Ikon 24x24px */}
            </button>
        </div>,
        document.body // Render portal ke body dokumen
    );
};


// Komponen Utama Aplikasi
const App = () => {
  // Destrukturisasi data dari MOCK_DATA
  const { businessName, hero, about, advantages, serviceHours, pricing, testimonials, faq, contact, footer } = MOCK_DATA;
  // Tautan navigasi untuk Navbar
  const navLinks = [
    { name: 'Keunggulan', href: '#keunggulan' },
    { name: 'Tentang Kami', href: '#tentang-kami' },
    { name: 'Jam Operasional', href: '#jam-operasional' }, // Menambahkan Jam Operasional
    { name: 'Daftar Produk', href: '#daftar-produk' },
    { name: 'Testimoni', href: '#testimoni' },
    { name: 'FAQ', href: '#faq'},
    { name: 'Kontak', href: '#kontak' },
  ];

  // Mengaktifkan smooth scroll untuk seluruh halaman
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'; // Mengembalikan ke default saat unmount
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
      @keyframes heroFadeInDown {
        0% { opacity: 0; transform: translateY(-30px) scale(0.95); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes heroFadeInUp {
        0% { opacity: 0; transform: translateY(30px) scale(0.95); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      
      .animate-hero-fade-in-down { animation: heroFadeInDown 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; opacity: 0; }
      .animate-hero-fade-in-up { animation: heroFadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; opacity: 0; }

      @keyframes slideInUpStaggered { 0% { opacity: 0; transform: translateY(50px); } 100% { opacity: 1; transform: translateY(0); } }
      @keyframes slideInRightStaggered { 0% { opacity: 0; transform: translateX(-50px); } 100% { opacity: 1; transform: translateX(0); } }
      
      .animate-fade-in-down { animation: fadeInDown 0.6s ease-out forwards; opacity: 0; }
      .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
      .animation-delay-300 { animation-delay: 0.3s; }
      .animation-delay-600 { animation-delay: 0.6s; }
      @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
      .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }

      .animated-item {
        opacity: 0; /* Start invisible */
        animation: slideInUpStaggered 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }
      .animated-item-right {
        opacity: 0;
        animation: slideInRightStaggered 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }
      /* New keyframe for pulse effect for floating buttons */
      @keyframes pulseEffect {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      .animate-pulse-effect {
        animation: pulseEffect 2s infinite ease-in-out;
      }
      /* Subtle background patterns */
      .bg-dots-pattern {
        background-image: radial-gradient(#d1d5db 1px, transparent 1px); /* darker grey dots */
        background-size: 20px 20px; /* larger spacing */
        background-position: 0 0;
      }
      .bg-lines-pattern {
        background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px); /* darker grey lines */
        background-size: 20px 20px; /* larger spacing */
        background-position: 0 0;
      }
    `;
    
    return () => {
      if (styleElement) styleElement.remove(); // Bersihkan elemen style saat unmount
    };
  }, []);


  return (
    <div
      className="font-inter antialiased text-gray-800 min-h-screen bg-gray-50"
    >
      {/* Navbar */}
      <Navbar businessName={businessName} navLinks={navLinks} />
      <main className="pt-20"> {/* Padding top untuk menghindari konten tertutup navbar */}
        {/* Bagian Hero */}
        <HeroSection hero={hero} />
        {/* Bagian Keunggulan */}
        <AdvantagesSection advantages={advantages} />
        {/* Bagian Tentang Kami */}
        <AboutSection about={about} />
        {/* Bagian Jam Operasional */}
        <ServiceHoursSection serviceHours={serviceHours} />
        {/* Bagian Daftar Produk */}
        <ProductSection pricing={pricing} contactInfo={contact} />
        {/* Bagian Testimoni */}
        <TestimonialSection testimonials={testimonials} />
        {/* Bagian FAQ */}
        <FaqSection faq={faq} />
        {/* Bagian Kontak */}
        <ContactSection contact={contact} />
      </main>
      {/* Footer */}
      <Footer businessName={businessName} copyright={footer.copyright} />
      {/* Tombol Mengambang (WhatsApp dan Scroll ke Atas) */}
      <FloatingButtons contact={contact} />
    </div>
  );
};

export default App;
