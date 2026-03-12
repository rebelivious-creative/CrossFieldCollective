"use client";
import { useEffect, useRef } from "react";
import Script from "next/script";
import { useTina, tinaField } from "tinacms/dist/react";

declare global {
  // biome-ignore lint/style/noNamespace: Required to declare custom 3D web components
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": any;
    }
  }
}

export default function ClientPage(props: any) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const heroTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Scroll Reveal
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);
    document.querySelectorAll('.reveal').forEach((el) => { observer.observe(el); });

    // Gyro Effect
    const handleMouseMove = (e: MouseEvent) => {
      if (heroTitleRef.current) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 90;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 90;
        heroTitleRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Smooth Scroll
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId) {
              document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // --- THE COLOR THEME LOGIC ---
  const isDefault = data.page.useDefaultTheme !== false; 
  const customBg = data.page.bgColor || "#020112";
  const customGlow1 = data.page.glowColor1 || "#0028a3";
  const customGlow2 = data.page.glowColor2 || "#6d79c2";

  const dynamicMainStyle = isDefault ? {} : { "--bg-base": customBg } as React.CSSProperties;
  const dynamicGlow1 = isDefault ? undefined : { "--glow-color": customGlow1 } as React.CSSProperties;
  const dynamicGlow2 = isDefault ? undefined : { "--glow-color": customGlow2 } as React.CSSProperties;

  return (
    <main style={dynamicMainStyle}>
      <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js" />

      {/* Dynamic Animated Pillars */}
      <div className="pillar-bg">
          <div className="pillar p1" style={dynamicGlow1}></div>
          <div className="pillar p2" style={dynamicGlow2}></div>
          <div className="pillar p3" style={dynamicGlow1}></div>
          <div className="pillar p4" style={dynamicGlow2}></div>
          <div className="pillar p5" style={dynamicGlow1}></div>
          <div className="pillar p6" style={dynamicGlow2}></div>
          <div className="pillar p7" style={dynamicGlow1}></div>
          <div className="pillar p8" style={dynamicGlow2}></div>
      </div>

      <header>
          <div className="logo">Crossfield Collective</div>
          <nav>
              <a href="#about">About</a>
              <a href="#ecosystem">Ecosystem</a>
              <a href="#stages">Stages</a>
              <a href="#contact">Contact</a>
          </nav>
      </header>

      <div className="site-container">
          <section className="hero reveal">
              {/* @ts-ignore */}
              <model-viewer 
                  src="assets/3d-logo.glb" 
                  auto-rotate="true" 
                  camera-controls="true" 
                  disable-zoom="true" 
                  exposure="0.8"
                  style={{ width: '100%', height: '350px', backgroundColor: 'transparent', outline: 'none', marginBottom: '20px' }}>
              </model-viewer>

              <h1 
                ref={heroTitleRef} 
                id="hero_title" 
                style={{ display: 'inline-block', transition: 'transform 0.1s ease-out', whiteSpace: 'pre-wrap' }}
                data-tina-field={tinaField(data.page, "heroTitle")}
              >
                {data.page.heroTitle}
              </h1>
              <p 
                className="hero-sub" 
                id="hero_sub"
                data-tina-field={tinaField(data.page, "heroSub")}
              >
                {data.page.heroSub}
              </p>
          </section>

          <section id="about" className="section">
              <h2 className="section-title reveal">About Crossfield</h2>
              <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                  <div className="bento-card reveal" style={{ gridColumn: '1 / -1', padding: '60px' }}>
                      <p style={{ fontSize: '1.8rem', color: 'white', lineHeight: 1.4, maxWidth: '100%' }}>Sustainable growth requires structure, clarity, and aligned systems.</p>
                      <br/>
                      <p 
                        id="about_text" 
                        style={{ fontSize: '1.2rem', maxWidth: '100%' }}
                        data-tina-field={tinaField(data.page, "aboutText")}
                      >
                        {data.page.aboutText}
                      </p>
                  </div>
              </div>
          </section>

          <section id="ecosystem" className="section">
              <h2 className="section-title reveal">The Growth Ecosystem</h2>
              <div className="bento-grid">
                  <div className="bento-card image-card reveal" id="eco-img-box" style={{ transitionDelay: '0.1s' }}>
                      <img id="eco_img" src="assets/ecosystem.jpg" alt="Growth Ecosystem" />
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
                      <img src="assets/stages.jpg" alt="Growth Stages Diagram" />
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
    </main>
  );
}