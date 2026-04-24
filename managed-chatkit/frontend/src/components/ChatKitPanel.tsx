import { useMemo } from "react";
import { ChatKit, useChatKit } from "@openai/chatkit-react";
import { createClientSecretFetcher, workflowId } from "../lib/chatkitSession";

export function ChatKitPanel() {
  const getClientSecret = useMemo(
    () => createClientSecretFetcher(workflowId, "/_/backend/api/create-session"),
    []
  );

  const chatkit = useChatKit({
    api: { getClientSecret },
    theme: {
      colorScheme: "light",
      color: {
        accent: {
          primary: "#2563eb",
          level: 2,
        },
      },
      radius: "round",
      density: "normal",
      typography: {
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      },
    },
    startScreen: {
      greeting: "Oceniacz ofert nieruchomości",
      prompts: [
        {
          name: "Oceń ofertę z linku",
          prompt: "Oceń tę ofertę nieruchomości: ",
          icon: "search",
        },
        {
          name: "Analiza z treści ogłoszenia",
          prompt:
            "Oceń ofertę na podstawie tej treści ogłoszenia: cena, metraż, lokalizacja, opis...",
          icon: "write",
        },
      ],
    },
    composer: {
      placeholder:
        "Wklej link do Otodom, OLX, RynekPierwotny albo treść ogłoszenia...",
      attachments: {
        uploadStrategy: { type: "hosted" },
        maxCount: 5,
        maxSize: 20 * 1024 * 1024,
        accept: {
          "image/*": [".png", ".jpg", ".jpeg", ".webp"],
          "application/pdf": [".pdf"],
        },
      },
    },
    header: {
      enabled: true,
    },
  });

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
                AI analiza nieruchomości
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Oceniacz ofert mieszkań
              </h1>
              <p className="mt-3 max-w-2xl text-base text-slate-600">
                Wklej link do ogłoszenia albo treść oferty. Agent odczyta dane,
                sprawdzi braki, oceni ryzyka i przygotuje raport punktowy.
              </p>
            </div>

            <div className="rounded-2xl bg-blue-50 px-4 py-3 text-sm text-blue-800">
              <strong>PoC dla klienta</strong>
              <br />
              Ocena 0–100, plusy, minusy, pytania i czerwone flagi.
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Jak testować?
            </h2>

            <ol className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                <strong className="text-slate-900">1.</strong> Wklej link do
                oferty.
              </li>
              <li>
                <strong className="text-slate-900">2.</strong> Jeśli portal
                blokuje dostęp, wklej treść ogłoszenia.
              </li>
              <li>
                <strong className="text-slate-900">3.</strong> Agent przygotuje
                raport z punktacją i rekomendacją.
              </li>
            </ol>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">
                Obsługiwane źródła testowe:
              </p>
              <p className="mt-2">
                Otodom, OLX, RynekPierwotny, Morizon, Adresowo lub ręcznie
                wklejona treść ogłoszenia.
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              Niektóre portale mogą blokować automatyczny odczyt. Wtedy agent
              poprosi o wklejenie treści ogłoszenia.
            </div>
          </aside>

          <div className="h-[78vh] overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-lg">
            <ChatKit control={chatkit.control} className="h-full w-full" />
          </div>
        </section>
      </div>
    </main>
  );
}
