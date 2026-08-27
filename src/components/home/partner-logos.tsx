const PLACEHOLDER_COUNT = 5;

export function PartnerLogos({ className = "flex items-center gap-4" }: { className?: string }) {
  return (
    <div className={className}>
      {Array.from({ length: PLACEHOLDER_COUNT }).map((_, index) => (
        <div key={index} className="relative h-16 w-[110px] shrink-0 rounded-md bg-[#f2f2f2]">
          <p className="absolute left-[11px] top-6 whitespace-nowrap font-sans text-xs font-medium text-[#ccc]">
            PARTNER LOGO
          </p>
        </div>
      ))}
    </div>
  );
}
