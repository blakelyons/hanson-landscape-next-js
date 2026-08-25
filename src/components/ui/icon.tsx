import { Icon as IconifyIcon, type IconProps as IconifyIconProps } from "@iconify/react";
import { DEFAULT_ICON_SET, ICON_SETS, type IconSet } from "@/lib/icon-config";

interface IconComponentProps extends Omit<IconifyIconProps, "icon"> {
  /** Which enabled icon set to pull from (see src/lib/icon-config.ts). Defaults to lucide. */
  set?: IconSet;
  /** Icon name within that set, e.g. "leaf", "phone", "arrow-right". */
  name: string;
}

export function Icon({ set = DEFAULT_ICON_SET, name, ...props }: IconComponentProps) {
  const prefix = ICON_SETS[set];
  return <IconifyIcon icon={`${prefix}:${name}`} {...props} />;
}
