import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { X, User, Phone, MapPin, Loader2, CheckCircle2, Gift } from "lucide-react";

const API_URL = "https://backend.prohome.uz/api/v1/leeds/create-for-hengtai";
const TELEGRAM_URL = "https://t.me/jahonbozorivodiy";

export default function ExitIntentModal() {
  const [show, setShow] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [phone, setPhone] = useState("+998");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (dismissed) return;

    // Desktop: mouseleave from top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) {
        setShow(true);
      }
    };

    // Mobile: back button / visibility change
    const handleVisibility = () => {
      if (document.visibilityState === "hidden" && !dismissed) {
        setShow(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [dismissed]);

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
        setShow(false);
        setDismissed(true);
      }, 2000);
    } catch {
      toast({ title: "Xatolik yuz berdi", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setDismissed(true);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in-up" style={{ animationDuration: "0.3s" }}>
      <div className="relative w-full max-w-md glass-card rounded-2xl p-6 md:p-8 border border-primary/20 glow-gold">
        <button onClick={handleClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-4" />
            <p className="text-xl font-bold text-foreground mb-2">Rahmat! Arizangiz qabul qilindi</p>
            <p className="text-muted-foreground">Telegram kanalga yo'naltirilmoqdasiz...</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <Gift className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-black text-foreground mb-2">
                Ketishdan oldin joyni band qiling
              </h3>
              <p className="text-muted-foreground">
                Raqamingizni qoldiring. Savdo menejeri eng mos blok bo'yicha tez orada bog'lanadi.
              </p>
              <p className="text-primary font-semibold mt-2">Mahsus chegirmaga ega bo'ling</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Ismingiz"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  required
                />
              </div>
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
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-secondary text-foreground border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  required
                />
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
          </>
        )}
      </div>
    </div>
  );
}
