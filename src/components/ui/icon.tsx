import { addIcon, Icon as IconifyIcon, type IconProps as IconifyIconProps } from "@iconify/react";
import { generatedIcons } from "@/components/ui/icons.generated";

for (const [name, data] of Object.entries(generatedIcons)) {
    addIcon(name, data);
}

/**
 * Thin wrapper around @iconify/react's <Icon /> using Iconify's own
 * "prefix:name" convention (as shown on https://icon-sets.iconify.design),
 * e.g. <Icon icon="lucide:leaf" /> or <Icon icon="line-md:account" />.
 *
 * Icon data is pre-registered from icons.generated.ts (see
 * scripts/generate-icons.mjs) instead of being fetched from Iconify's API at
 * runtime — that fetch was arriving after first paint and popping the icon
 * in late, shifting layout. Run `npm run generate:icons` after adding a new
 * icon="prefix:name" usage anywhere in the codebase.
 */
export function Icon(props: IconifyIconProps) {
    return <IconifyIcon {...props} />;
}
