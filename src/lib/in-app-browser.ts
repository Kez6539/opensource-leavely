/**
 * Detect in-app / embedded webviews where OAuth popups tend to fail
 * (cookies drop, window.open is blocked, or the redirect back to the origin
 * opens in a new tab the webview can't return to). We deliberately do NOT
 * redirect these users away — that breaks ad attribution and annoys them.
 * We just hide OAuth buttons and steer them to email signup.
 *
 * Signatures: Facebook (FBAN/FBAV), Instagram, LinkedIn, TikTok (BytedanceWebview),
 * Twitter/X webview (Twitter for), Snapchat, WeChat (MicroMessenger),
 * Line, Pinterest, and generic WKWebView on iOS.
 */
export function isInAppBrowser(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false
  return /FBAN|FBAV|Instagram|LinkedInApp|BytedanceWebview|Twitter for|Snapchat|MicroMessenger|Line\/|Pinterest|; wv\)/i.test(
    userAgent,
  )
}
