export type Point = { x: number; y: number; z: number };
export const SECTION_COLORS: readonly (readonly [number, number, number])[];
export function createSpherePoints(count: number): Point[];
export function createSphereEdges(points: Point[]): [number,number][];
export function scrollFraction(scrollTop: number, scrollHeight: number, viewport: number): number;
export function activeSectionIndex(sectionTops: number[], activationY: number, atBottom: boolean): number;
