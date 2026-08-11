import { Play } from "lucide-react";

export interface VideoEmbedProps {
  src?: string;
  thumbnailAlt: string;
  label?: string;
  /** Opt-in override for the placeholder's background/text color, e.g. for on-ink sections. Defaults to the light-page treatment so existing consumers (Hero, Virada) are unaffected. */
  placeholderClassName?: string;
}

export function VideoEmbed({ src, thumbnailAlt, label, placeholderClassName }: VideoEmbedProps) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={thumbnailAlt}
        className={`flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl ${placeholderClassName ?? "bg-brand-primary/10 text-brand-primary"}`}
      >
        <Play className="h-10 w-10" />
        <span className="text-sm font-medium">{label ?? "Vídeo em breve"}</span>
      </div>
    );
  }

  return (
    <video
      controls
      preload="metadata"
      aria-label={thumbnailAlt}
      className="aspect-video w-full rounded-xl bg-black"
    >
      <source src={src} />
    </video>
  );
}
