export function classNames(
  ...classes: Array<string | boolean | false | undefined | null>
): string {
  return classes.filter(Boolean).join(" ");
}
