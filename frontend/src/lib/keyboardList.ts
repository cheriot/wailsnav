import { goto } from '$app/navigation';

export function keyboardListOnKeyDown(
  activeIdx: number,
  items: { href: string }[],
  event: KeyboardEvent
): number {
  switch (event.code) {
    case 'KeyJ':
      event.preventDefault();
      return (activeIdx + 1) % items.length;
      break;
    case 'KeyK':
      event.preventDefault();
      if (activeIdx > 0 && items.length > 0) {
        return (activeIdx - 1) % items.length;
      } else {
        return items.length - 1;
      }
      break;
    case 'Enter':
      event.preventDefault();
      if (activeIdx > -1 && items.length > 0) {
        goto(items[activeIdx].href).catch((reason) =>
          console.log('keyboardList goto failure', reason, items[activeIdx].href)
        );
      }
      break;
  }
  return activeIdx;
}
