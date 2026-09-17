import { getImageMetadata } from "./imageMetadata.js";

// Generate a picture tag with Netlify image transforms
export default function picture(imageName, imageAlt) {
  const metadata = getImageMetadata(imageName);
  const dimensionAttributes = metadata
    ? ` width="${metadata.width}" height="${metadata.height}"`
    : "";

  return `<picture>
            <img
              srcset="/assets/img/200/${imageName} 200w, /assets/img/400/${imageName} 400w, /assets/img/800/${imageName} 800w, /assets/img/1200/${imageName} 1200w"
              sizes="(max-width: 450px) 200px, (max-width: 850px) 400px, (max-width: 1000px) 800px, 1200px"
              src="/assets/img/1200/${imageName}"
              alt="${imageAlt}"
              loading="lazy"
              decoding="async"${dimensionAttributes}
            />
          </picture>`;
}
