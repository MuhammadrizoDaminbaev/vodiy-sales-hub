import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/jahon-bozori-hero.png";
import {
  MapPin,
  Globe,
  Truck,
  Users,
  XCircle,
  ArrowDown,
  Send,
  Timer,
  Car,
  Trophy,
  ChevronDown,
  Loader2,
  CheckCircle2,
  User,
  Phone,
} from "lucide-react";

const TELEGRAM_URL = "https://t.me/jahonbozorivodiy";
const API_URL = "https://backend.prohome.uz/api/v1/leeds/create-for-hengtai";

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

function scrollToForm() {
  const el = document.getElementById("lead-form");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function TelegramButton({ size = "lg", className = "" }: { size?: "lg" | "sm"; className?: string }) {
  return (
    <button
      onClick={() => window.open(TELEGRAM_URL, "_blank")}
      className={`bg-gradient-gold font-bold rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 animate-pulse-glow ${
        size === "lg" ? "px-8 py-4 text-lg" : "px-6 py-3 text-base"
      } text-primary-foreground ${className}`}
    >
      <Send className="w-5 h-5" />
      Telegramga o'tish
    </button>
  );
}

function BandQilishButton({ size = "lg", className = "" }: { size?: "lg" | "sm"; className?: string }) {
  return (
    <button
      onClick={scrollToForm}
      className={`bg-gradient-gold font-bold rounded-full flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 animate-pulse-glow ${
        size === "lg" ? "px-8 py-4 text-lg" : "px-6 py-3 text-base"
      } text-primary-foreground ${className}`}
    >
      <MapPin className="w-5 h-5" />
      Joy band qilish
    </button>
  );
}

function LeadForm() {
  const [firstname, setFirstname] = useState("");
  const [phone, setPhone] = useState("+998");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstname.trim() || phone.length < 13) {
      toast({ title: "Iltimos, barcha maydonlarni to'ldiring", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname: firstname.trim(), phone }),
      });
      if (!res.ok) throw new Error("API error");
      setSubmitted(true);
      toast({ title: "Arizangiz qabul qilindi!" });
      setTimeout(() => {
        window.open(TELEGRAM_URL, "_blank");
      }, 1000);
    } catch {
      toast({ title: "Xatolik yuz berdi, qaytadan urinib ko'ring", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-4" />
        <p className="text-xl font-bold text-foreground mb-2">Rahmat! Arizangiz qabul qilindi</p>
        <p className="text-muted-foreground">Telegram kanalga yo'naltirilmoqdasiz...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 md:p-8 space-y-5">
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">Ismingiz</label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Ismingizni kiriting"
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-lg"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">Telefon raqam</label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              const val = e.target.value;
              if (val.startsWith("+998") && val.length <= 13) setPhone(val.replace(/[^\d+]/g, ""));
            }}
            placeholder="+998901234567"
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-lg"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-gold text-primary-foreground font-bold text-lg py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 animate-pulse-glow flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Yuborilmoqda...
          </>
        ) : (
          <>
            <MapPin className="w-5 h-5" />
            Joy band qilish
          </>
        )}
      </button>
    </form>
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
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-400">
            <BandQilishButton />
            <TelegramButton />
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
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
                <XCircle className="w-6 h-6 text-destructive shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 text-xl md:text-2xl font-bold text-gradient-gold">
            Bu loyiha aynan shu muammoni hal qiladi
            <ArrowDown className="w-6 h-6 text-primary" />
          </div>
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
              { icon: MapPin, title: "33 gektar hudud", desc: "Markaziy Osiyodagi eng yirik loyihalardan biri" },
              { icon: Globe, title: "Xalqaro savdo markazi", desc: "Import-eksport uchun strategik joy" },
              { icon: Truck, title: "Kuchli logistika", desc: "Yetkazib berish tizimi ichiga qurilgan" },
              { icon: Users, title: "Doimiy mijoz oqimi", desc: "Kunlik minglab xaridorlar oqimi" },
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-colors">
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <BandQilishButton size="sm" />
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
          <div className="flex items-center justify-center gap-3 mb-6">
            <Car className="w-14 h-14 md:w-20 md:h-20 text-primary" />
            <Trophy className="w-10 h-10 md:w-14 md:h-14 text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            <span className="text-gradient-gold">5 ta Damas</span>dan bittasini yutib oling
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Joy band qiling va Damas yutib olish imkoniyatiga ega bo'ling
          </p>
          <div className="mt-10">
            <BandQilishButton size="sm" />
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
          <div className="mt-8 glass-card rounded-2xl p-6 inline-flex items-center gap-3">
            <Timer className="w-8 h-8 text-primary" />
            <p className="text-2xl md:text-3xl font-black text-gradient-gold">Joylar cheklangan</p>
          </div>
        </Section>
      </section>

      {/* JOY BAND QILISH FORM */}
      <section id="lead-form" className="py-20 md:py-28 px-6 bg-card/50">
        <Section className="max-w-xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-center text-foreground mb-4">
            <span className="text-gradient-gold">Joy band qiling</span>
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            Ismingiz va raqamingizni qoldiring — biz siz bilan bog'lanamiz
          </p>
          <LeadForm />
        </Section>
      </section>

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

      {/* STICKY BUTTON */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:bottom-8">
        <BandQilishButton size="sm" className="shadow-2xl" />
      </div>

      <div className="h-24" />
    </div>
  );
}
