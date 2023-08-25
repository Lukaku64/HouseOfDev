import jwtDecode from "jwt-decode";

export function getCookieValue(cookieName) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return;
}

export function getUserByToken() {
  const token = getCookieValue("token");
  if (!token) return token;
  return jwtDecode(token);
}
