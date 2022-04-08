import { initAuth } from "@propelauth/express";

const authUrl = process.env.NEXT_PUBLIC_PROPEL_AUTH_URL;
const apiKey = process.env.NEXT_PUBLIC_PROPEL_API_KEY;
const verifierKey = process.env.NEXT_PUBLIC_PROPEL_VERIFIER_KEY;
const issuer = process.env.NEXT_PUBLIC_PROPEL_ISSUER;

const propelauth = initAuth({
  authUrl,
  apiKey,
  manualTokenVerificationMetadata: {
    verifierKey,
    issuer,
  },
});

export default propelauth;
