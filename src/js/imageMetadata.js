const imageMetadata = {
  "home_hero_01.jpg": { width: 3840, height: 2560 },
  "kontakt_hero_01.jpg": { width: 3840, height: 2560 },
  "leistungen_hero_01.jpg": { width: 3840, height: 2560 },
  "praxis_hero_01.jpg": { width: 3840, height: 2560 },
  "anamnesebogen_hero_01.jpg": { width: 3840, height: 2560 },
  "notfalltipps_hero_01.jpg": { width: 3840, height: 2560 },
  "faq_hero_01.jpg": { width: 3840, height: 2560 },
  "ausstattung_hero_01.jpg": { width: 3840, height: 2560 },
  "links_hero_01.jpg": { width: 3840, height: 2560 },
  "visual_home_01.jpg": { width: 3840, height: 2560 },
  "visual_home_02.jpg": { width: 1920, height: 2560 },
  "leistungen-teaser_01.jpg": { width: 2560, height: 2560 },
  "leistungen-teaser_02.jpg": { width: 2560, height: 2560 },
  "leistungen-teaser_03.jpg": { width: 2560, height: 2560 }
};

export function getImageMetadata(imageName) {
  return imageMetadata[imageName] ?? null;
}
