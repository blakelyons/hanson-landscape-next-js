// Whether the home page's header slide-down + hero entrance animation
// should play. True only until it's marked played — this module stays
// loaded (and this closure alive) across client-side App Router
// navigations, so revisiting "/" via nav sees false and just shows the
// final state instantly. A hard refresh re-evaluates the module and resets
// it to true.
//
// Split into a pure read (peekHomeIntroFlag) and a separate mutation
// (markHomeIntroPlayed) so the read can safely happen during render — call
// the mutation from a useEffect instead, where React's Strict Mode dev
// double-invoke is harmless since setting the flag true twice is a no-op.
let hasPlayedHomeIntro = false;

export function peekHomeIntroFlag(): boolean {
    return !hasPlayedHomeIntro;
}

export function markHomeIntroPlayed(): void {
    hasPlayedHomeIntro = true;
}
