import { hotelPhotoSprite, lampSprite, magnifierSprite, mugSprite, pencilSprite, safePhotoSprite, typewriterSprite, clipSprite } from '../art/props';
import { PixelSprite } from './PixelSprite';

/* Decorative desk accessories. They are aria-hidden: atmosphere only. */

export function Lamp() {
  return (
    <div className="prop prop--lamp" aria-hidden>
      <PixelSprite sprite={lampSprite} />
    </div>
  );
}

export function Mug() {
  return (
    <div className="prop prop--mug" aria-hidden>
      <span className="steam"><i /><i /><i /></span>
      <PixelSprite sprite={mugSprite} />
    </div>
  );
}

export function Magnifier() {
  return (
    <div className="prop prop--magnifier" aria-hidden>
      <PixelSprite sprite={magnifierSprite} />
    </div>
  );
}

export function Pencil() {
  return (
    <div className="prop prop--pencil" aria-hidden>
      <PixelSprite sprite={pencilSprite} />
    </div>
  );
}

export function Typewriter() {
  return (
    <div className="prop prop--typewriter" aria-hidden>
      <PixelSprite sprite={typewriterSprite} />
    </div>
  );
}

export function PaperClips() {
  return (
    <div className="prop prop--clips" aria-hidden>
      <PixelSprite sprite={clipSprite} />
      <PixelSprite sprite={clipSprite} />
      <PixelSprite sprite={clipSprite} />
    </div>
  );
}

export function EvidencePhotos() {
  return (
    <div className="prop prop--photos" aria-hidden>
      <figure className="photo photo--a">
        <PixelSprite sprite={hotelPhotoSprite} />
        <figcaption>HOTEL MARLOWE</figcaption>
      </figure>
      <figure className="photo photo--b">
        <PixelSprite sprite={safePhotoSprite} />
        <figcaption>VAULT RM. 11/14</figcaption>
      </figure>
    </div>
  );
}
