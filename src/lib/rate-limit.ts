/**
 * Best-effort in-memory limiter (per process; resets on restart/reload). Enough to blunt
 * casual spam; Turnstile does the real bot filtering. Each form route makes its own so
 * their buckets stay separate. Returns a function: true when `key` is over the limit.
 */
export function createRateLimiter({ windowMs, max }: { windowMs: number; max: number }) {
    const hits = new Map<string, number[]>();

    return function isRateLimited(key: string): boolean {
        const now = Date.now();
        const recent = (hits.get(key) ?? []).filter((time) => now - time < windowMs);
        recent.push(now);
        hits.set(key, recent);
        return recent.length > max;
    };
}
