import { Section } from "./ScrollReveal";
import { Play } from "lucide-react";

// Add Instagram reel embed URLs here
const reels: (string | null)[] = [
  null, null, null, null, null, null,
];

export default function ReelsSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-card/50">
      <Section className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-14">
          <span className="text-gradient-gold">Reels</span> va videolar
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {reels.map((url, i) =>
            url ? (
              <div key={i} className="aspect-[9/16] rounded-2xl overflow-hidden glass-card">
                <iframe
                  src={url}
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                  title={`Reel ${i + 1}`}
                />
              </div>
            ) : (
              <div
                key={i}
                className="aspect-[9/16] rounded-2xl glass-card flex flex-col items-center justify-center gap-2 text-muted-foreground"
              >
                <Play className="w-10 h-10" />
                <span className="text-sm">Video qo'shiladi</span>
              </div>
            )
          )}
        </div>
      </Section>
    </section>
  );
}
