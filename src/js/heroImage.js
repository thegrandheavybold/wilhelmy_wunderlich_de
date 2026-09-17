import { getImageMetadata } from "./imageMetadata.js";

// Generate a hero image tag with Netlify image transforms
export default function heroImage(imageName, imageAlt) {
  const metadata = getImageMetadata(imageName);
  const dimensionAttributes = metadata
    ? ` width="${metadata.width}" height="${metadata.height}"`
    : "";

  return `<picture>
            <img
              srcset="/assets/img/400/${imageName} 400w, /assets/img/800/${imageName} 800w, /assets/img/1200/${imageName} 1200w, /assets/img/1600/${imageName} 1600w"
              sizes="100vw"
              src="/assets/img/1600/${imageName}"
              alt="${imageAlt}"
              loading="eager"
              decoding="async"
              fetchpriority="high"${dimensionAttributes}
            />
          </picture>`;
}
