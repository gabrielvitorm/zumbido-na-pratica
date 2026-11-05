import type { LiveSession } from "@/lib/black-november";
import { getLiveSessionLabel } from "@/lib/black-november-presentation";

export interface LiveBonusProps {
  sessions: [LiveSession, LiveSession];
}

export function LiveBonus({ sessions }: LiveBonusProps) {
  return (
    <section className="bg-navy-dark px-4 py-14 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-gold-light">Bônus exclusivo Black</p>
        <h2 className="mt-3 text-center font-display text-3xl font-semibold text-white">2 Lives ao vivo de tira-dúvidas</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-slate-muted">
          Você assiste, aplica e leva suas dúvidas de caso direto pra mim, ao vivo, em dois encontros exclusivos para quem entrar na Black.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {sessions.map((session) => (
            <div
              key={session.label}
              data-live-session={session.label}
              className="rounded-xl border border-gold/40 bg-navy-card p-5 text-center"
            >
              <span className="inline-flex min-h-11 items-center justify-center rounded-full border border-gold/50 px-4 text-sm font-bold text-gold-light">
                <span aria-hidden="true" className="mr-2 h-2 w-2 rounded-full bg-urgent" />
                {session.label}
              </span>
              <p className="mt-4 text-sm text-slate-muted">{getLiveSessionLabel(session)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
