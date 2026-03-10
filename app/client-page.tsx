"use client";
import React, { useEffect, useState, useRef } from 'react';
import Script from 'next/script';
import { useTina } from 'tinacms/dist/react';

declare global {
  // biome-ignore lint/style/noNamespace: Needed for custom 3D web components
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

export default function ClientPage(props: any) {
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLHeadingElement>(null);
  
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      // Changed 'let' to 'const' to satisfy the strict Biome linter
      const xAxis = (window.innerWidth / 2 - e.pageX) / 90;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 90;
      heroRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'en,ms,zh-CN,ta',
              layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');
          }
        `}
      </Script>
      <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js" />

      {loading && (
        <div id="loader" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'var(--bg-base)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'opacity 0.5s ease' }}>
          <div className="spinner"></div>
        </div>
      )}

      <div className="pillar-bg">
        <div className="pillar p1"></div><div className="pillar p2"></div><div className="pillar p3"></div><div className="pillar p4"></div>
        <div className="pillar p5"></div><div className="pillar p6"></div><div className="pillar p7"></div><div className="pillar p8"></div>
      </div>

      <header>
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="/assets/favicon.png" alt="Logo" style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
          Crossfield Collective
        </div>
        <nav>
          <a href="#about" onClick={(e) => smoothScroll(e, 'about')}>About</a>
          <a href="#ecosystem" onClick={(e) => smoothScroll(e, 'ecosystem')}>Ecosystem</a>
          <a href="#stages" onClick={(e) => smoothScroll(e, 'stages')}>Stages</a>
          <a href="#contact" onClick={(e) => smoothScroll(e, 'contact')}>Contact</a>
          <div id="google_translate_element"></div>
        </nav>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', paddingTop: '80px' }}>
        
        <section className="hero reveal">
          <model-viewer src="/assets/3d-logo.glb" auto-rotate camera-controls disable-zoom exposure="0.8" style={{ width: '100%', height: '350px', backgroundColor: 'transparent', outline: 'none', marginBottom: '20px' }}></model-viewer>
          <h1 ref={heroRef} data-tina-field={data.page._tina_metadata?.heroTitle} style={{ whiteSpace: 'pre-line', transition: 'transform 0.1s ease-out' }}>
            {data.page.heroTitle}
          </h1>
          <p className="hero-sub" data-tina-field={data.page._tina_metadata?.heroSub}>
            {data.page.heroSub}
          </p>
        </section>

        <section id="about" className="section">
          <h2 className="section-title reveal">About Crossfield</h2>
          <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className="bento-card reveal" style={{ gridColumn: '1 / -1', padding: '60px' }}>
              <p style={{ fontSize: '1.8rem', color: 'white', lineHeight: '1.4', maxWidth: '100%' }}>
                Sustainable growth requires structure, clarity, and aligned systems.
              </p>
              <p data-tina-field={data.page._tina_metadata?.aboutText} style={{ fontSize: '1.2rem', maxWidth: '100%', marginTop: '20px' }}>
                {data.page.aboutText}
              </p>
            </div>
          </div>
        </section>

        <section id="ecosystem" className="section">
          <h2 className="section-title reveal">The Growth Ecosystem</h2>
          <div className="bento-grid">
            <div className="bento-card image-card reveal" id="eco-img-box" style={{ transitionDelay: '0.1s' }}>
              <img src="/assets/ecosystem.jpg" alt="Growth Ecosystem" />
            </div>
            <div className="bento-card reveal" id="eco-card-1" style={{ transitionDelay: '0.2s' }}>
              <h3>Brand Architecture</h3>
              <p>We refine positioning, narrative, and market clarity so growth is aligned and differentiated.</p>
            </div>
            <div className="bento-card reveal" id="eco-card-2" style={{ transitionDelay: '0.3s' }}>
              <h3>Automation Design</h3>
              <p>We integrate smart automation to reduce manual strain and increase efficiency.</p>
            </div>
            <div className="bento-card reveal" id="eco-network" style={{ transitionDelay: '0.4s' }}>
              <h3>Strategic Network</h3>
              <p>We connect SMEs to the right ecosystem, including cross-border partnerships, SME collaborations, and industry introductions.</p>
            </div>
          </div>
        </section>

        <section id="stages" className="section">
          <h2 className="section-title reveal">Growth Stages</h2>
          <div className="bento-grid">
            <div className="bento-card image-card reveal" id="stages-img-box" style={{ transitionDelay: '0.1s' }}>
              <img src="/assets/stages.jpg" alt="Growth Stages Diagram" />
            </div>
            <div className="bento-card reveal" id="stages-card-1" style={{ transitionDelay: '0.2s' }}>
              <h3>Foundation</h3>
              <p>For early revenue SMEs establishing structure. Outcome: A structured business foundation ready for scale.</p>
            </div>
            <div className="bento-card reveal" id="stages-card-2" style={{ transitionDelay: '0.3s' }}>
              <h3>Structure</h3>
              <p>For SMEs experiencing growth strain. Outcome: Aligned operations and reduced founder dependency.</p>
            </div>
            <div className="bento-card reveal" id="stages-card-3" style={{ transitionDelay: '0.4s' }}>
              <h3>Expansion</h3>
              <p>For SMEs entering regional or new market growth. Outcome: Sustainable, structured expansion.</p>
            </div>
          </div>
        </section>

      </div>

      <footer id="contact" className="reveal">
        <h2>Ready to build your growth infrastructure?</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.1rem' }}>All engagements begin with a Growth Diagnostic Session.</p>
        <a href="https://wa.me/60123456789" className="cta-btn" target="_blank" rel="noreferrer">Direct Line</a>
      </footer>
    </>
  );
}