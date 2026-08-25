/**
 * Enabled Iconify icon sets, keyed by a short local alias.
 *
 * Icons resolve through Iconify's runtime API (@iconify/react's <Icon />),
 * so adding a new set is a one-line addition here — no local package
 * install, no rebuild required. Browse sets/prefixes at
 * https://icon-sets.iconify.design.
 *
 * Usage: <Icon name="leaf" />            -> lucide:leaf (default set)
 *        <Icon set="simpleIcons" name="facebook" /> -> simple-icons:facebook
 */
export const ICON_SETS = {
  lucide: "lucide",
  // simpleIcons: "simple-icons", // example: uncomment to enable brand/social logos
} as const;

export type IconSet = keyof typeof ICON_SETS;

export const DEFAULT_ICON_SET: IconSet = "lucide";
