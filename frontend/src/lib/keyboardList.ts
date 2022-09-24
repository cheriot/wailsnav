import { goto } from '$app/navigation';

// 1. Update activeIdx
// 2. Scroll the activated element into view
// 3. return activeIdx
export function keyboardListOnKeyDown(
  currentIdx: number,
  items: { href: string }[],
  event: KeyboardEvent
): number {
  let activeIdx = currentIdx;

  switch (event.code) {
    case 'KeyJ':
      event.preventDefault();
      activeIdx = (currentIdx + 1) % items.length;
      break;
    case 'KeyK':
      event.preventDefault();
      if (currentIdx > 0 && items.length > 0) {
        activeIdx = (currentIdx - 1) % items.length;
      } else {
        activeIdx = items.length - 1;
      }
      break;
    case 'Enter':
      event.preventDefault();
      if (currentIdx > -1 && items.length > 0) {
        goto(items[currentIdx].href).catch((reason) =>
          console.log('keyboardList goto failure', reason, items[currentIdx].href)
        );
      }
      break;
  }

  if (currentIdx != activeIdx) {
    // Scroll to the active item.
    let activeItem = items[activeIdx];
    let activeElement = document.querySelector(`[href='${activeItem.href}']`);
    if (activeElement) {
      activeElement.scrollIntoView(false);
    } else {
      console.log('unable to find active element for index', activeIdx, activeItem);
    }
  }

  return activeIdx;
}
