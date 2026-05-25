/** 12-digit numeric order ID for customer display */
export function generateOrderNumber(): string {
  const ts = Date.now().toString().slice(-8);
  const rand = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `${ts}${rand}`.slice(0, 12).padStart(12, '0');
}

export function generateHubId(seq: number): string {
  return `GP-HUB-${String(seq).padStart(5, '0')}`;
}

export function generateSellerId(seq: number): string {
  return `GP-SELLER-${String(seq).padStart(5, '0')}`;
}

export function generateAgentId(seq: number): string {
  return `GP-AGENT-${String(seq).padStart(5, '0')}`;
}
