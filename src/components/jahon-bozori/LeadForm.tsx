import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { User, Phone, MapPin, Loader2, CheckCircle2 } from "lucide-react";

const TELEGRAM_URL = "https://t.me/jahonbozorivodiy";
const API_URL = "https://backend.prohome.uz/api/v1/leeds/create-for-hengtai";

interface LeadFormProps {
  onSuccess?: () => void;
}

export default function LeadForm({ onSuccess }: LeadFormProps) {
  const [firstname, setFirstname] = useState("");
  const [phone, setPhone] = useState("+998");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
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
      onSuccess?.();
      toast({ title: "Arizangiz qabul qilindi!" });

      // Hidden 3s countdown then redirect
      setCountdown(3);
      let c = 3;
      const interval = setInterval(() => {
        c--;
        setCountdown(c);
        if (c <= 0) {
          clearInterval(interval);
          window.open(TELEGRAM_URL, "_blank");
        }
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
