import { Icon as IconifyIcon, type IconProps as IconifyIconProps } from "@iconify/react";

/**
 * Thin wrapper around @iconify/react's <Icon /> using Iconify's own
 * "prefix:name" convention (as shown on https://icon-sets.iconify.design),
 * e.g. <Icon icon="lucide:leaf" /> or <Icon icon="line-md:account" />.
 */
export function Icon(props: IconifyIconProps) {
    return <IconifyIcon {...props} />;
}
