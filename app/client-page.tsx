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

    const handleMouseMove = (e: MouseEvent) => {
      if (heroTitleRef.current) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 90;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 90;
        heroTitleRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

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

  const isDefault = data.page.useDefaultTheme !== false; 
  const customBg = data.page.bgColor || "#020112";
  const customGlow1 = data.page.glowColor1 || "#0028a3";
  const customGlow2 = data.page.glowColor2 || "#6d79c2";
  
  const customFont = data.page.fontSelection || "Helvetica Neue";

  const dynamicMainStyle = {
    ...(isDefault ? {} : { "--bg-base": customBg }),
    fontFamily: customFont === "Helvetica Neue" ? "'Helvetica Neue', Arial, sans-serif" : `'${customFont}', sans-serif`
  } as React.CSSProperties;

  const dynamicGlow1 = isDefault ? undefined : { "--glow-color": customGlow1 } as React.CSSProperties;
  const dynamicGlow2 = isDefault ? undefined : { "--glow-color": customGlow2 } as React.CSSProperties;

  return (
    <main style={dynamicMainStyle}>
      {customFont !== 'Helvetica Neue' && (
          <link href={`https://fonts.googleapis.com/css2?family=${customFont.replace(' ', '+')}:wght@400;600;800&display=swap`} rel="stylesheet" />
      )}

      <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js" />

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
              <p className="hero-sub" id="hero_sub" data-tina-field={tinaField(data.page, "heroSub")}>
                {data.page.heroSub}
              </p>
          </section>

          <section id="about" className="section">
              <h2 className="section-title reveal">About Crossfield</h2>
              <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                  <div className="bento-card reveal" style={{ gridColumn: '1 / -1', padding: '60px' }}>
                      <p style={{ fontSize: '1.8rem', color: 'white', lineHeight: 1.4, maxWidth: '100%' }}>Sustainable growth requires structure, clarity, and aligned systems.</p>
                      <br/>
                      <p id="about_text" style={{ fontSize: '1.2rem', maxWidth: '100%' }} data-tina-field={tinaField(data.page, "aboutText")}>
                        {data.page.aboutText}
                      </p>
                  </div>
              </div>
          </section>

          <section id="ecosystem" className="section">
              <h2 className="section-title reveal">The Growth Ecosystem</h2>
              <div className="bento-grid">
                  <div className="bento-card image-card reveal" id="eco-img-box" style={{ transitionDelay: '0.1s' }}>
                      <img id="eco_img" src={data.page.ecoImg} alt="Growth Ecosystem" data-tina-field={tinaField(data.page, "ecoImg")} />
                  </div>
                  <div className="bento-card reveal" id="eco-card-1" style={{ transitionDelay: '0.2s' }}>
                      <h3 data-tina-field={tinaField(data.page, "ecoTitle1")}>{data.page.ecoTitle1}</h3>
                      <p data-tina-field={tinaField(data.page, "ecoText1")}>{data.page.ecoText1}</p>
                  </div>
                  <div className="bento-card reveal" id="eco-card-2" style={{ transitionDelay: '0.3s' }}>
                      <h3 data-tina-field={tinaField(data.page, "ecoTitle2")}>{data.page.ecoTitle2}</h3>
                      <p data-tina-field={tinaField(data.page, "ecoText2")}>{data.page.ecoText2}</p>
                  </div>
                  <div className="bento-card reveal" id="eco-network" style={{ transitionDelay: '0.4s' }}>
                      <h3 data-tina-field={tinaField(data.page, "ecoTitle3")}>{data.page.ecoTitle3}</h3>
                      <p data-tina-field={tinaField(data.page, "ecoText3")}>{data.page.ecoText3}</p>
                  </div>
              </div>
          </section>

          <section id="stages" className="section">
              <h2 className="section-title reveal">Growth Stages</h2>
              <div className="bento-grid">
                  <div className="bento-card image-card reveal" id="stages-img-box" style={{ transitionDelay: '0.1s' }}>
                      <img src={data.page.stagesImg} alt="Growth Stages Diagram" data-tina-field={tinaField(data.page, "stagesImg")} />
                  </div>
                  <div className="bento-card reveal" id="stages-card-1" style={{ transitionDelay: '0.2s' }}>
                      <h3 data-tina-field={tinaField(data.page, "stagesTitle1")}>{data.page.stagesTitle1}</h3>
                      <p data-tina-field={tinaField(data.page, "stagesText1")}>{data.page.stagesText1}</p>
                  </div>
                  <div className="bento-card reveal" id="stages-card-2" style={{ transitionDelay: '0.3s' }}>
                      <h3 data-tina-field={tinaField(data.page, "stagesTitle2")}>{data.page.stagesTitle2}</h3>
                      <p data-tina-field={tinaField(data.page, "stagesText2")}>{data.page.stagesText2}</p>
                  </div>
                  <div className="bento-card reveal" id="stages-card-3" style={{ transitionDelay: '0.4s' }}>
                      <h3 data-tina-field={tinaField(data.page, "stagesTitle3")}>{data.page.stagesTitle3}</h3>
                      <p data-tina-field={tinaField(data.page, "stagesText3")}>{data.page.stagesText3}</p>
                  </div>
              </div>
          </section>
      </div>

      <footer id="contact" className="reveal">
          <h2 data-tina-field={tinaField(data.page, "footerTitle")}>{data.page.footerTitle}</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.1rem' }} data-tina-field={tinaField(data.page, "footerSub")}>
            {data.page.footerSub}
          </p>
          <a href={`https://wa.me/${data.page.contactPhone}`} className="cta-btn" target="_blank" rel="noreferrer" data-tina-field={tinaField(data.page, "contactPhone")}>
            Direct Line
          </a>
      </footer>
    </main>
  );
}