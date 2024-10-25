// middleware.js
import { NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { languages, fallbackLng } from "./app/i18n/settings";

function getLocale(request) {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && languages.includes(cookieLocale)) {
    return cookieLocale;
  }

  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const browserLanguages = new Negotiator({
    headers: negotiatorHeaders,
  }).languages();

  return matchLocale(browserLanguages, languages, fallbackLng);
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api") || pathname.startsWith("/fonts")) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = languages.every(
    (locale) => !pathname.startsWith(`/${locale}`),
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    const searchParams = request.nextUrl.search;
    const redirectUrl = new URL(
      `/${locale}${pathname}${searchParams}`,
      request.url,
    );

    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|jpg|png|css|js)$).*)",
  ],
};
