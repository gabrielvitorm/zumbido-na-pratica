"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  name: z.string().min(2, "Digite seu nome completo"),
  whatsapp: z
    .string()
    .regex(/^\(\d{2}\)\s?\d{4,5}-?\d{4}$/, "Digite um WhatsApp válido, ex: (11) 91234-5678"),
  // Note: zod v3 used `errorMap` here; the installed zod (v4) ignores that option
  // silently and falls back to its default English message. `error` is the v4
  // equivalent for a static custom message, verified against the installed version.
  consent: z.literal(true, {
    error: "É preciso aceitar para continuar",
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export interface ContactFormScreenProps {
  onSubmit: (values: ContactFormValues) => void;
  onBack: () => void;
  isSubmitting: boolean;
  errorMessage?: string;
}

function formatWhatsapp(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function ContactFormScreen({ onSubmit, onBack, isSubmitting, errorMessage }: ContactFormScreenProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const whatsapp = watch("whatsapp") ?? "";

  return (
    <div className="flex min-h-[60vh] flex-col justify-center">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex items-center gap-1 self-start text-sm text-brand-text/60"
      >
        <ChevronLeft className="h-4 w-4" /> Voltar
      </button>
      <h2 className="mb-2 text-xl font-bold text-brand-primary sm:text-2xl">
        Só mais um passo pra ver seu resultado
      </h2>
      <p className="mb-6 text-brand-text/70">
        Quero te mandar o diagnóstico completo e, se fizer sentido, o convite pra uma aula ao vivo gratuita
        sobre o assunto.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Nome
          </label>
          <input
            id="name"
            type="text"
            className="w-full rounded-xl border border-brand-primary/20 px-4 py-3"
            {...register("name")}
          />
          {errors.name ? <p className="mt-1 text-sm text-brand-alert">{errors.name.message}</p> : null}
        </div>
        <div>
          <label htmlFor="whatsapp" className="mb-1 block text-sm font-medium">
            WhatsApp
          </label>
          <input
            id="whatsapp"
            type="tel"
            placeholder="(11) 91234-5678"
            className="w-full rounded-xl border border-brand-primary/20 px-4 py-3"
            value={whatsapp}
            {...register("whatsapp", {
              onChange: (event) => setValue("whatsapp", formatWhatsapp(event.target.value)),
            })}
          />
          {errors.whatsapp ? <p className="mt-1 text-sm text-brand-alert">{errors.whatsapp.message}</p> : null}
        </div>
        <div className="flex items-start gap-2">
          <input id="consent" type="checkbox" className="mt-1" {...register("consent")} />
          <label htmlFor="consent" className="text-sm text-brand-text/70">
            Concordo com o tratamento dos meus dados conforme a{" "}
            <a href="/privacidade" className="underline">
              Política de Privacidade
            </a>
            .
          </label>
        </div>
        {errors.consent ? <p className="text-sm text-brand-alert">{errors.consent.message}</p> : null}
        {errorMessage ? <p className="text-sm text-brand-alert">{errorMessage}</p> : null}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Enviando..." : "Ver meu resultado"}
        </Button>
        <p className="text-center text-xs text-brand-text/50">
          Seus dados estão seguros e não serão compartilhados.
        </p>
      </form>
    </div>
  );
}
