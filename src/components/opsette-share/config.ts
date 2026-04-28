export type OpsetteShareConfig = {
  appName: string;
  tagline: string;
  url: string;
  logoSrc?: string;
};

export const opsetteShareConfig: OpsetteShareConfig = {
  appName: "Review Request",
  tagline: "Request reviews from your customers.",
  url: "https://tools.opsette.io/review-request/",
  logoSrc: "opsette-logo.png",
};
