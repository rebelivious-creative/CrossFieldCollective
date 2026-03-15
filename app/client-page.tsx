"use client";
import { useEffect } from "react";
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

  useEffect(() => {
    // 1. Scroll Reveal Animation
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);
    
    // Slight delay to ensure dynamic blocks are rendered before observing
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => { observer.observe(el); });
    }, 100);

    // 2. 3D Mouse Movement
    const handleMouseMove = (e: MouseEvent) => {
      const heroTitle = document.getElementById('hero_title');
      if (heroTitle) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 90;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 90;
        heroTitle.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 3. Smooth Scrolling & Real Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
            const targetId = this.getAttribute('href');
            
            // If it is a scroll link (starts with /#), do the smooth scroll
            if (targetId && targetId.startsWith('/#')) {
                e.preventDefault();
                // Remove the / to find the ID on the page
                const id = targetId.replace('/', '');
                document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
            }
            // Otherwise, let it act like a normal link and load the new page!
        });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [data.page.blocks]); // Re-run effects if blocks change

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
              {/* This automatically pulls the links she creates in TinaCMS */}
              {data.page.navLinks?.map((link: any, index: number) => (
                <a key={index} href={link.url}>{link.label}</a>
              ))}
          </nav>
      </header>

      <div className="site-container">
        {/* RENDERS ALL BLOCKS EXCEPT THE FOOTER */}
        {data.page.blocks?.map((block: any, index: number) => {
          if (block.__typename === "PageBlocksFooter") return null;

          switch (block.__typename) {
            case "PageBlocksHero":
              return (
                <section key={index} className="hero reveal">
                    {/* @ts-ignore */}
                    <model-viewer 
                        src="assets/3d-logo.glb" 
                        auto-rotate="true" camera-controls="true" disable-zoom="true" exposure="0.8"
                        style={{ width: '100%', height: '350px', backgroundColor: 'transparent', outline: 'none', marginBottom: '20px' }}>
                    </model-viewer>
                    <h1 id="hero_title" style={{ display: 'inline-block', transition: 'transform 0.1s ease-out', whiteSpace: 'pre-wrap' }} data-tina-field={tinaField(block, "heroTitle")}>
                        {block.heroTitle}
                    </h1>
                    <p className="hero-sub" id="hero_sub" data-tina-field={tinaField(block, "heroSub")}>
                        {block.heroSub}
                    </p>
                </section>
              );
            case "PageBlocksAbout":
              return (
                <section key={index} id="about" className="section">
                    <h2 className="section-title reveal">About Crossfield</h2>
                    <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        <div className="bento-card reveal" style={{ gridColumn: '1 / -1', padding: '60px' }}>
                            <p style={{ fontSize: '1.8rem', color: 'white', lineHeight: 1.4, maxWidth: '100%' }}>Sustainable growth requires structure, clarity, and aligned systems.</p>
                            <br/>
                            <p id="about_text" style={{ fontSize: '1.2rem', maxWidth: '100%' }} data-tina-field={tinaField(block, "aboutText")}>
                                {block.aboutText}
                            </p>
                        </div>
                    </div>
                </section>
              );
            case "PageBlocksEcosystem":
              return (
                <section key={index} id="ecosystem" className="section">
                    <h2 className="section-title reveal">The Growth Ecosystem</h2>
                    <div className="bento-grid">
                        <div className="bento-card image-card reveal" id="eco-img-box" style={{ transitionDelay: '0.1s' }}>
                            <img id="eco_img" src={block.ecoImg} alt="Growth Ecosystem" data-tina-field={tinaField(block, "ecoImg")} />
                        </div>
                        <div className="bento-card reveal" id="eco-card-1" style={{ transitionDelay: '0.2s' }}>
                            <h3 data-tina-field={tinaField(block, "ecoTitle1")}>{block.ecoTitle1}</h3>
                            <p data-tina-field={tinaField(block, "ecoText1")}>{block.ecoText1}</p>
                        </div>
                        <div className="bento-card reveal" id="eco-card-2" style={{ transitionDelay: '0.3s' }}>
                            <h3 data-tina-field={tinaField(block, "ecoTitle2")}>{block.ecoTitle2}</h3>
                            <p data-tina-field={tinaField(block, "ecoText2")}>{block.ecoText2}</p>
                        </div>
                        <div className="bento-card reveal" id="eco-network" style={{ transitionDelay: '0.4s' }}>
                            <h3 data-tina-field={tinaField(block, "ecoTitle3")}>{block.ecoTitle3}</h3>
                            <p data-tina-field={tinaField(block, "ecoText3")}>{block.ecoText3}</p>
                        </div>
                    </div>
                </section>
              );
            case "PageBlocksStages":
              return (
                <section key={index} id="stages" className="section">
                    <h2 className="section-title reveal">Growth Stages</h2>
                    <div className="bento-grid">
                        <div className="bento-card image-card reveal" id="stages-img-box" style={{ transitionDelay: '0.1s' }}>
                            <img src={block.stagesImg} alt="Growth Stages Diagram" data-tina-field={tinaField(block, "stagesImg")} />
                        </div>
                        <div className="bento-card reveal" id="stages-card-1" style={{ transitionDelay: '0.2s' }}>
                            <h3 data-tina-field={tinaField(block, "stagesTitle1")}>{block.stagesTitle1}</h3>
                            <p data-tina-field={tinaField(block, "stagesText1")}>{block.stagesText1}</p>
                        </div>
                        <div className="bento-card reveal" id="stages-card-2" style={{ transitionDelay: '0.3s' }}>
                            <h3 data-tina-field={tinaField(block, "stagesTitle2")}>{block.stagesTitle2}</h3>
                            <p data-tina-field={tinaField(block, "stagesText2")}>{block.stagesText2}</p>
                        </div>
                        <div className="bento-card reveal" id="stages-card-3" style={{ transitionDelay: '0.4s' }}>
                            <h3 data-tina-field={tinaField(block, "stagesTitle3")}>{block.stagesTitle3}</h3>
                            <p data-tina-field={tinaField(block, "stagesText3")}>{block.stagesText3}</p>
                        </div>
                    </div>
                </section>
              );
            default:
              return null;
          }
        })}
      </div>

      {/* RENDERS ONLY THE FOOTER OUTSIDE THE CONTAINER */}
      {data.page.blocks?.map((block: any, index: number) => {
        if (block.__typename === "PageBlocksFooter") {
          return (
            <footer key={index} id="contact" className="reveal">
                <h2 data-tina-field={tinaField(block, "footerTitle")}>{block.footerTitle}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.1rem' }} data-tina-field={tinaField(block, "footerSub")}>
                    {block.footerSub}
                </p>
                <a href={`https://wa.me/${block.contactPhone}`} className="cta-btn" target="_blank" rel="noreferrer" data-tina-field={tinaField(block, "contactPhone")}>
                    Direct Line
                </a>
            </footer>
          );
        }
        return null;
      })}
    </main>
  );
}