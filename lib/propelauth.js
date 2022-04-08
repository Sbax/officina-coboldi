import { initAuth } from "@propelauth/express";

const authUrl = process.env.NEXT_PUBLIC_PROPEL_AUTH_URL;
const apiKey = process.env.PROPEL_API_KEY;
const verifierKey = process.env.PROPEL_VERIFIER_KEY;
const issuer = process.env.PROPEL_ISSUER;

const propelauth = initAuth({
  debugMode: true,
  authUrl,
  apiKey,
  manualTokenVerificationMetadata: {
    verifierKey,
    issuer,
  },
});

export default propelauth;
