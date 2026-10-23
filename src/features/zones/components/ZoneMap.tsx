import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { divIcon, latLngBounds, type LatLngExpression, type Marker as LeafletMarker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useCopy } from '@shared/i18n/LocaleProvider';
import { prefersReducedMotion } from '@shared/hooks/prefersReducedMotion';
import { ZONES, zonesCopy, type Zone } from '../zones.data';
import styles from './ZoneMap.module.css';

type ZoneMapProps = { active: number; onSelect: (index: number) => void };

// Tiles: OpenStreetMap by default (fine for development and low traffic, see
// operations.osmfoundation.org/policies/tiles). For production set VITE_MAP_TILES_URL to a keyed
// provider (MapTiler, Stadia…) and VITE_MAP_TILES_ATTRIBUTION to its credit line.
const TILES_URL: string = import.meta.env.VITE_MAP_TILES_URL ?? 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION: string =
  import.meta.env.VITE_MAP_TILES_ATTRIBUTION ??
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const FOCUS_ZOOM = 13;
// Wide maps show every label, which sits right of its dot, so that edge needs room. Narrow maps
// (phones) only label the active zone (see the container query in the CSS), so they fit tight.
const NARROW = typeof window !== 'undefined' && window.innerWidth < 640;
const FIT_OPTIONS = NARROW
  ? { padding: [64, 48] as [number, number] }
  : { paddingTopLeft: [40, 48] as [number, number], paddingBottomRight: [150, 48] as [number, number] };
const ALL_ZONES = latLngBounds(ZONES.map((z) => [z.lat, z.lng] as [number, number]));

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

// One icon per zone, created once: swapping icons would replace the DOM node and drop keyboard focus.
const ICONS = new Map(ZONES.map((zone) => [zone.id, zoneIcon(zone)]));

function zoneIcon(zone: Zone) {
  return divIcon({
    className: styles.marker,
    html: `<span class="${styles.dot}"></span><span class="${styles.label}">${escapeHtml(zone.name)}</span>`,
    iconSize: undefined,
    iconAnchor: [9, 9],
  });
}

function markSelected(marker: LeafletMarker | null | undefined, selected: boolean) {
  const el = marker?.getElement();
  el?.classList.toggle(styles.markerActive!, selected);
  el?.setAttribute('aria-pressed', String(selected));
}

/** Flies to the selected zone after the first user choice; the first paint shows every zone. */
function FollowActive({ center }: { center: LatLngExpression }) {
  const map = useMap();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReducedMotion()) map.setView(center, FOCUS_ZOOM);
    else map.flyTo(center, FOCUS_ZOOM, { duration: 0.9 });
  }, [map, center]);
  return null;
}

export default function ZoneMap({ active, onSelect }: ZoneMapProps) {
  const t = useCopy(zonesCopy);
  const activeZone = ZONES[active] ?? ZONES[0]!;
  const center = useMemo<LatLngExpression>(() => [activeZone.lat, activeZone.lng], [activeZone]);
  const markers = useRef<Array<LeafletMarker | null>>([]);
  const activeRef = useRef(active);
  activeRef.current = active;

  // Selection is a class toggle on the existing marker element (see ICONS).
  useEffect(() => {
    markers.current.forEach((marker, i) => markSelected(marker, i === active));
  }, [active]);

  return (
    <div className={styles.map} role="region" aria-label={t.mapLabel}>
      <MapContainer
        className={styles.leaflet}
        bounds={ALL_ZONES}
        boundsOptions={FIT_OPTIONS}
        zoomSnap={0.25}
        scrollWheelZoom={false}
        // One-finger drag would trap page scroll on phones; pinch and the zone list still work.
        dragging={!('ontouchstart' in window)}
        attributionControl
      >
        <TileLayer url={TILES_URL} attribution={ATTRIBUTION} className={styles.base} />
        {ZONES.map((zone, i) => (
          <Marker
            key={zone.id}
            position={[zone.lat, zone.lng]}
            ref={(marker) => {
              markers.current[i] = marker;
            }}
            icon={ICONS.get(zone.id)!}
            title={t.pin(zone.name)}
            zIndexOffset={i === active ? 1000 : 0}
            eventHandlers={{
              click: () => onSelect(i),
              // Markers mount after the map is ready, so the first selection is applied here.
              add: (e) => markSelected(e.target as LeafletMarker, i === activeRef.current),
            }}
          />
        ))}
        <FollowActive center={center} />
      </MapContainer>
    </div>
  );
}
