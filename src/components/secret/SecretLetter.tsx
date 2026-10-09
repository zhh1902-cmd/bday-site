import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

type LetterContent = {
  title: string;
  paragraphs: string[];
  signoff: string;
};

export function SecretLetter() {
  const [content, setContent] = useState<LetterContent | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let active = true;

    void fetch("/api/secret-letter/content", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("letter_unavailable");
        const result = await response.json() as { content?: LetterContent };
        if (!result.content || typeof result.content.title !== "string" || !Array.isArray(result.content.paragraphs) || typeof result.content.signoff !== "string") {
          throw new Error("letter_unavailable");
        }
        if (active) setContent(result.content);
      })
      .catch(() => {
        if (active) setHasError(true);
      });

    return () => { active = false; };
  }, []);

  return (
    <article className="relative max-h-[72vh] w-full max-w-2xl overflow-y-auto bg-[#f1dfc5] px-7 py-10 text-[#29151a] shadow-[0_30px_100px_rgba(0,0,0,0.6)] sm:rotate-[-1deg] sm:px-14 sm:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(0deg,transparent,transparent_31px,rgba(74,16,32,0.12)_32px)]" aria-hidden="true" />
      <div className="absolute right-7 top-7 flex h-11 w-11 items-center justify-center rounded-full border border-[#7b2038]/45 bg-[#7b2038]/15 text-[#7b2038] shadow-[0_4px_14px_rgba(74,16,32,0.18)]" aria-hidden="true"><Heart size={18} className="fill-current" /></div>
      <div className="relative">
        <div className="text-[0.62rem] uppercase tracking-[0.3em] text-[#7b2038]">Private letter</div>
        {content ? (
          <>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-6xl">{content.title}</h2>
            <div className="mt-8 space-y-6 font-display text-xl leading-[1.65] sm:text-2xl">
              {content.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
            <p className="mt-12 font-display text-2xl text-[#7b2038]">{content.signoff}</p>
          </>
        ) : (
          <p className="mt-8 font-display text-xl leading-[1.65] sm:text-2xl" role={hasError ? "alert" : "status"}>
            {hasError ? "This letter could not be opened. Please close it and try again." : "Opening your letter..."}
          </p>
        )}
      </div>
    </article>
  );
}