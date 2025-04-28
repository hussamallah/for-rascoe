export function checkRole(role: string, allowedRoles: string[]): boolean {
  return allowedRoles.includes(role);
}
