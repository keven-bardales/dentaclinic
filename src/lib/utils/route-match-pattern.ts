export function routeMatchesPattern(routeHref: string, pathname: string) {
  const regexPattern = new RegExp("^" + routeHref.replace(/\[id\]/g, "\\d+").replace(/:\w+/g, "\\w+") + "$");
  return regexPattern.test(pathname);
}

export function routeMatchesPatternActiveLink(routeHref: string, pathname: string) {
  // Escapa caracteres especiales y reemplaza los parámetros con un patrón genérico
  const escapedHref = routeHref
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\[id\]/g, "\\d+")
    .replace(/:\w+/g, "[^/]+");

  // Construye la expresión regular
  const regexPattern = new RegExp("^" + escapedHref + "(/.*)?$");

  // Verifica si el pathname coincide con el patrón de la ruta
  return regexPattern.test(pathname);
}
