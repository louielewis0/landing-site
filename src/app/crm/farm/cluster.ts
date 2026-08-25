/**
 * Route clustering for the expired-farm map. Groups targets that sit
 * within RADIUS_MI of each other into batches you can card in one trip,
 * then orders each batch nearest-neighbor so it reads like a walking
 * route. Biggest batches first (best bang per trip). Pure functions,
 * no deps.
 */

export type FarmTarget = {
  id: string;
  address: string;
  lat: number;
  lng: number;
  carded: boolean;
  carded_at: string | null;
  notes: string | null;
  created_at: string;
};

export type Cluster = { targets: FarmTarget[]; centerLat: number; centerLng: number };

const RADIUS_MI = 0.75;
const R_EARTH_MI = 3958.8;

function toRad(d: number) {
  return (d * Math.PI) / 180;
}

/** Miles between two lat/lng points (haversine). */
export function milesBetween(a: FarmTarget, b: FarmTarget): number {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return R_EARTH_MI * 2 * Math.asin(Math.sqrt(s));
}

/** Order a batch nearest-neighbor starting from the northwest-most point. */
function orderRoute(pts: FarmTarget[]): FarmTarget[] {
  if (pts.length <= 2) return pts;
  const remaining = [...pts];
  // Start top-left-ish (max lat, then min lng) for a natural sweep.
  remaining.sort((a, b) => b.lat - a.lat || a.lng - b.lng);
  const route: FarmTarget[] = [remaining.shift()!];
  while (remaining.length) {
    const last = route[route.length - 1];
    let bi = 0;
    let bd = Infinity;
    remaining.forEach((p, i) => {
      const d = milesBetween(last, p);
      if (d < bd) {
        bd = d;
        bi = i;
      }
    });
    route.push(remaining.splice(bi, 1)[0]);
  }
  return route;
}

/**
 * Greedy radius clustering. Grows a cluster from an unassigned seed by
 * pulling in every point within RADIUS_MI of ANY point already in it
 * (single-linkage), so a chain of nearby homes stays one route.
 */
export function clusterTargets(targets: FarmTarget[]): Cluster[] {
  const pending = targets.filter((t) => Number.isFinite(t.lat) && Number.isFinite(t.lng));
  const used = new Set<string>();
  const clusters: Cluster[] = [];

  for (const seed of pending) {
    if (used.has(seed.id)) continue;
    const group: FarmTarget[] = [seed];
    used.add(seed.id);
    // Expand until no new neighbor is found.
    let grew = true;
    while (grew) {
      grew = false;
      for (const cand of pending) {
        if (used.has(cand.id)) continue;
        if (group.some((g) => milesBetween(g, cand) <= RADIUS_MI)) {
          group.push(cand);
          used.add(cand.id);
          grew = true;
        }
      }
    }
    const ordered = orderRoute(group);
    const centerLat = group.reduce((s, t) => s + t.lat, 0) / group.length;
    const centerLng = group.reduce((s, t) => s + t.lng, 0) / group.length;
    clusters.push({ targets: ordered, centerLat, centerLng });
  }

  // Biggest routes first; within that, most uncarded first.
  clusters.sort((a, b) => {
    const bySize = b.targets.length - a.targets.length;
    if (bySize) return bySize;
    const au = a.targets.filter((t) => !t.carded).length;
    const bu = b.targets.filter((t) => !t.carded).length;
    return bu - au;
  });
  return clusters;
}
