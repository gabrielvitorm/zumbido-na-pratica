export function shouldShowMobileCta(pastHero: boolean, reachedOffer: boolean): boolean {
  return pastHero && !reachedOffer;
}
