import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/jahon-bozori-hero.png";

const TELEGRAM_URL = "https://t.me/jahonbozori";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

function TelegramButton({ size = "lg", className = "" }: { size?: "lg" | "sm"; className?: string }) {
  const handleClick = () => {
    window.open(TELEGRAM_URL, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-gradient-gold font-bold rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 animate-pulse-glow ${
        size === "lg" ? "px-8 py-4 text-lg" : "px-6 py-3 text-base"
      } text-primary-foreground ${className}`}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.062 3.345-.479.329-.912.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.12.098.153.229.168.332.016.103.036.332.02.513z" />
      </svg>
      Telegramga o'tish
    </button>
  );
}

export default function JahonBozoriLanding() {
  useEffect(() => {
    const checkScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent >= 50 && !(window as any).__tracked50) {
        (window as any).__tracked50 = true;
      }
      if (scrollPercent >= 90 && !(window as any).__tracked90) {
        (window as any).__tracked90 = true;
      }
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Jahon Bozori masterplan ko'rinishi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight animate-fade-in-up">
            <span className="text-gradient-gold">Vodiyda yagona</span>
            <br />
            <span className="text-foreground">33 gektarlik</span>
            <br />
            <span className="text-gradient-gold">xalqaro bozor</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animate-delay-200">
            Bu oddiy bozor emas — bu <span className="text-foreground font-semibold">savdo oqimi markazi</span>
          </p>
          <div className="mt-10 animate-fade-in-up animate-delay-400">
            <TelegramButton />
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* MUAMMO + HOOK */}
      <section className="py-20 md:py-28 px-6">
        <Section className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-10">
            Hozir savdoda eng katta <span className="text-gradient-gold">muammo</span> nima?
          </h2>
          <div className="space-y-4 mb-10">
            {["Mijoz yo'q", "Oqim yo'q", "Joy noto'g'ri"].map((item, i) => (
              <div
                key={i}
                className="glass-card rounded-xl px-6 py-4 text-lg md:text-xl font-semibold text-foreground flex items-center gap-4"
              >
                <span className="text-destructive text-2xl">✕</span>
                {item}
              </div>
            ))}
          </div>
          <p className="text-xl md:text-2xl font-bold text-gradient-gold">
            Bu loyiha aynan shu muammoni hal qiladi ↓
          </p>
        </Section>
      </section>

      {/* LOYIHA KUCHI */}
      <section className="py-20 md:py-28 px-6 bg-card/50">
        <Section className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-14">
            <span className="text-gradient-gold">Jahon Bozori</span> kuchi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "📐", title: "33 gektar hudud", desc: "Markaziy Osiyodagi eng yirik loyihalardan biri" },
              { icon: "🌍", title: "Xalqaro savdo markazi", desc: "Import-eksport uchun strategik joy" },
              { icon: "🚛", title: "Kuchli logistika", desc: "Yetkazib berish tizimi ichiga qurilgan" },
              { icon: "👥", title: "Doimiy mijoz oqimi", desc: "Kunlik minglab xaridorlar oqimi" },
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <TelegramButton size="sm" />
          </div>
        </Section>
      </section>

      {/* VALUE */}
      <section className="py-20 md:py-28 px-6">
        <Section className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight">
            Bu yerda siz joy olmaysiz…
          </h2>
          <p className="mt-6 text-2xl md:text-4xl font-black text-gradient-gold">
            Siz savdo qiladigan tizimga kirasiz
          </p>
          <div className="mt-10 w-24 h-1 bg-gradient-gold mx-auto rounded-full" />
        </Section>
      </section>

      {/* DAMAS OFFER */}
      <section className="py-20 md:py-28 px-6 bg-card/50">
        <Section className="max-w-3xl mx-auto text-center">
          <div className="text-6xl md:text-8xl mb-6">🚐</div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            Har bir do'kon uchun <span className="text-gradient-gold">5 ta Damas</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Mahsulotingiz har doim harakatda bo'ladi
          </p>
          <div className="mt-10">
            <TelegramButton size="sm" />
          </div>
        </Section>
      </section>

      {/* FOMO */}
      <section className="py-20 md:py-28 px-6">
        <Section className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            Bunday imkoniyatlar <span className="text-gradient-gold">har kuni chiqmaydi</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Eng yaxshi joylar birinchi bo'lib band qilinadi
          </p>
          <div className="mt-8 glass-card rounded-2xl p-6 inline-block">
            <p className="text-2xl md:text-3xl font-black text-gradient-gold">⏳ Joylar cheklangan</p>
          </div>
        </Section>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-28 px-6 bg-card/50">
        <Section className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
            Barcha ma'lumotlar <span className="text-gradient-gold">Telegram kanalimizda</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Narxlar, joylar, shartlar — hammasi bir joyda
          </p>
          <TelegramButton />
        </Section>
      </section>

      {/* STICKY TELEGRAM BUTTON */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:bottom-8">
        <TelegramButton size="sm" className="shadow-2xl" />
      </div>

      <div className="h-24" />
    </div>
  );
}
