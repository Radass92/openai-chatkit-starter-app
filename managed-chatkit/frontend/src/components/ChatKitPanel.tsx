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
  });

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-8 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Analiza nieruchomości
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950">
            Oceniacz ofert mieszkań
          </h1>

          <p className="mt-3 max-w-2xl text-base text-slate-600">
            Wklej link do ogłoszenia albo treść oferty. Agent przygotuje raport
            z oceną, ryzykami, brakującymi informacjami i pytaniami do sprzedającego.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">
              Jak testować?
            </h2>

            <ol className="mt-4 space-y-3 text-sm text-slate-600">
              <li>
                <strong>1.</strong> Wklej link do oferty.
              </li>
              <li>
                <strong>2.</strong> Jeśli portal blokuje dostęp, wklej treść ogłoszenia.
              </li>
              <li>
                <strong>3.</strong> Agent przygotuje raport z punktacją i rekomendacją.
              </li>
            </ol>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">
                Obsługiwane źródła testowe:
              </p>
              <p className="mt-2">
                np. OLX, RynekPierwotny, Morizon, Adresowo albo ręcznie
                wklejona treść ogłoszenia.
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              Niektóre portale mogą blokować automatyczny odczyt. Wtedy agent
              poprosi o wklejenie treści ogłoszenia.
            </div>
          </aside>

          <section className="h-[80vh] min-h-[650px] rounded-3xl border border-slate-200 bg-white p-4 shadow-lg">
            <div className="h-full w-full">
              <ChatKit control={chatkit.control} className="h-full w-full" />
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
