export interface ArchitectureStage {
  label: string;
  summary: string;
  viewBox?: string;
}

export interface ArchitectureGroup {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  stage: number;
  tone?: 'default' | 'risk' | 'security';
}

export interface ArchitectureNode {
  id: string;
  title: string[];
  subtitle?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  stage: number;
  kind?: 'external' | 'service' | 'store' | 'queue' | 'isolate';
  rotation?: number;
  detail: string;
  decision: string;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  path: string;
  stage: number;
  label?: string;
  labelX?: number;
  labelY?: number;
  kind?: 'request' | 'data' | 'security';
}

export interface ArchitectureDiagramDefinition {
  id: string;
  title: string;
  description: string;
  viewBox: string;
  stages: ArchitectureStage[];
  groups: ArchitectureGroup[];
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export const secureSaasArchitecture: ArchitectureDiagramDefinition = {
  id: 'secure-saas-services',
  title: 'Secure workforce platform architecture',
  description: 'Build the shared HR, time-off, payroll, and document platform one path at a time.',
  viewBox: '0 0 960 760',
  stages: [
    {
      label: 'Identity',
      summary: 'The identity provider authenticates the user. The application verifies membership and creates a session bound to one active tenant.',
      viewBox: '0 0 560 300',
    },
    {
      label: 'Workforce request',
      summary: 'An employee-data request carries verified identity and tenant context through shared services, policy checks, and tenant-scoped data stores.',
      viewBox: '0 0 960 300',
    },
    {
      label: 'Products + files',
      summary: 'Enabled product modules share the workforce hub and policy path. File bytes take a separate quarantine and scanning path.',
      viewBox: '0 0 960 605',
    },
    {
      label: 'Complete view',
      summary: 'Audit, temporary support access, workload identity, and KMS complete the security control plane.',
      viewBox: '0 0 960 760',
    },
  ],
  groups: [
    { id: 'external-zone', label: 'External', x: 15, y: 20, width: 155, height: 570, stage: 1 },
    { id: 'edge-zone', label: 'App edge', x: 185, y: 125, width: 175, height: 160, stage: 1 },
    { id: 'workload-zone', label: 'Application workloads', x: 380, y: 20, width: 350, height: 575, stage: 1 },
    { id: 'data-zone', label: 'Tenant data', x: 745, y: 20, width: 200, height: 575, stage: 2 },
    { id: 'parser-zone', label: 'Untrusted parser zone', x: 550, y: 430, width: 175, height: 125, stage: 3, tone: 'risk' },
    { id: 'security-zone', label: 'Security plane', x: 380, y: 610, width: 565, height: 125, stage: 4, tone: 'security' },
  ],
  nodes: [
    {
      id: 'idp',
      title: ['Identity', 'provider'],
      subtitle: 'OIDC / SAML',
      x: 30,
      y: 55,
      width: 125,
      height: 72,
      stage: 1,
      kind: 'external',
      rotation: -0.4,
      detail: 'Authenticates the person with passkeys, MFA, customer SSO, or another configured method.',
      decision: 'A successful login proves identity. It does not create tenant membership or workforce-data access.',
    },
    {
      id: 'browser',
      title: ['User', 'browser'],
      subtitle: 'opaque cookie',
      x: 30,
      y: 170,
      width: 125,
      height: 72,
      stage: 1,
      kind: 'external',
      rotation: 0.3,
      detail: 'Starts login and sends application requests after the session is created.',
      decision: 'Keep OAuth access and refresh tokens on the server rather than in browser storage.',
    },
    {
      id: 'support',
      title: ['Support', 'operator'],
      subtitle: 'approved access',
      x: 30,
      y: 500,
      width: 125,
      height: 72,
      stage: 4,
      kind: 'external',
      rotation: -0.3,
      detail: 'Requests temporary access to a specific tenant, worker, or payroll resource through a separate support workflow.',
      decision: 'Require approval, strong authentication, a reason, narrow scope, expiration, and full auditing.',
    },
    {
      id: 'bff',
      title: ['BFF +', 'session'],
      subtitle: 'one active tenant',
      x: 205,
      y: 165,
      width: 135,
      height: 82,
      stage: 1,
      kind: 'service',
      rotation: -0.2,
      detail: 'Completes the OIDC code flow and gives the browser an opaque application session.',
      decision: 'Bind the verified principal and one active tenant to the session. Reissue it when the tenant changes.',
    },
    {
      id: 'membership',
      title: ['Membership', 'store'],
      subtitle: 'status + tenant',
      x: 405,
      y: 55,
      width: 140,
      height: 75,
      stage: 1,
      kind: 'store',
      rotation: 0.2,
      detail: 'Stores current tenant membership, role, status, identity connection, and authorization version.',
      decision: 'Treat this current server record as authoritative instead of an email domain or stale tenant list in a token.',
    },
    {
      id: 'gateway',
      title: ['API', 'gateway'],
      subtitle: 'verified context',
      x: 405,
      y: 175,
      width: 135,
      height: 75,
      stage: 2,
      kind: 'service',
      rotation: -0.25,
      detail: 'Routes requests after credential, issuer, audience, expiration, and active tenant checks.',
      decision: 'Pass downstream only the identity and tenant context derived from verified credentials and current membership.',
    },
    {
      id: 'policy',
      title: ['Policy', 'service'],
      subtitle: 'role + relation',
      x: 575,
      y: 55,
      width: 130,
      height: 75,
      stage: 2,
      kind: 'service',
      rotation: 0.35,
      detail: 'Evaluates the principal, tenant, action, stored resource, relationships, sensitivity, and temporary grants.',
      decision: 'Deny by default and use current resource relationships rather than relying only on broad roles.',
    },
    {
      id: 'workforce-hub',
      title: ['Workforce', 'hub'],
      subtitle: 'people + org graph',
      x: 575,
      y: 175,
      width: 130,
      height: 75,
      stage: 2,
      kind: 'service',
      rotation: -0.15,
      detail: 'Loads tenant-owned worker profiles, reporting lines, departments, legal entities, and module entitlements.',
      decision: 'Authorize the stored worker and requested fields. Do not trust an object ID or tenant header by itself.',
    },
    {
      id: 'module-services',
      title: ['Product', 'services'],
      subtitle: 'HR · leave · payroll',
      x: 405,
      y: 315,
      width: 140,
      height: 75,
      stage: 3,
      kind: 'service',
      rotation: 0.2,
      detail: 'Runs the HR, time-off, and payroll workflows selected by the tenant while sharing the workforce hub and policy system.',
      decision: 'Check module entitlement, then separately check the user, action, organizational scope, fields, and required approval.',
    },
    {
      id: 'document-api',
      title: ['Document', 'API'],
      subtitle: 'upload broker',
      x: 575,
      y: 315,
      width: 130,
      height: 75,
      stage: 3,
      kind: 'service',
      rotation: 0.25,
      detail: 'Authorizes the worker document operation and creates a brief upload ticket for one server-generated object key.',
      decision: 'Bind tenant, worker, document category, actor, size, type, checksum, key, and expiration before issuing the presigned URL.',
    },
    {
      id: 'scanner',
      title: ['Scanner', 'sandbox'],
      subtitle: 'no app secrets',
      x: 570,
      y: 455,
      width: 140,
      height: 82,
      stage: 3,
      kind: 'isolate',
      rotation: -0.35,
      detail: 'Validates file type and limits, scans for malware, and parses hostile bytes in a disposable environment.',
      decision: 'Give the worker one object version, no application secrets, and no outbound network access.',
    },
    {
      id: 'cache',
      title: ['Cache +', 'search'],
      subtitle: 'tenant-scoped',
      x: 770,
      y: 55,
      width: 150,
      height: 75,
      stage: 2,
      kind: 'store',
      rotation: -0.2,
      detail: 'Accelerates reads and search while keeping the tenant in every key, filter, index, and invalidation event.',
      decision: 'Never perform a global lookup and filter afterward. Tenant scope belongs in the lookup itself.',
    },
    {
      id: 'postgres',
      title: ['PostgreSQL'],
      subtitle: 'tenant ID + RLS',
      x: 770,
      y: 155,
      width: 150,
      height: 90,
      stage: 2,
      kind: 'store',
      rotation: 0.2,
      detail: 'Stores tenant-owned worker, time-off, payroll, and document records with composite constraints and row-level security.',
      decision: 'Set tenant context inside each transaction and use an application role that cannot bypass row security.',
    },
    {
      id: 'quarantine',
      title: ['S3 quarantine'],
      subtitle: 'untrusted versions',
      x: 770,
      y: 300,
      width: 150,
      height: 78,
      stage: 3,
      kind: 'store',
      rotation: -0.3,
      detail: 'Receives direct uploads into a private location that the download path cannot serve.',
      decision: 'Treat the presigned URL as transfer permission only. It does not mean the object is safe or approved.',
    },
    {
      id: 'queue',
      title: ['Scan queue'],
      subtitle: 'version-keyed',
      x: 790,
      y: 410,
      width: 110,
      height: 72,
      stage: 3,
      kind: 'queue',
      rotation: 0.25,
      detail: 'Carries a durable job for the exact object version and tolerates duplicate or out-of-order notifications.',
      decision: 'Make each state transition idempotent and never scan or promote a newer object version by accident.',
    },
    {
      id: 'approved',
      title: ['Approved S3'],
      subtitle: 'scanned version',
      x: 770,
      y: 510,
      width: 150,
      height: 75,
      stage: 3,
      kind: 'store',
      rotation: 0.15,
      detail: 'Stores the immutable version that passed the scanner and can be considered for download.',
      decision: 'Authorize every download again and issue a brief URL for the exact approved version.',
    },
    {
      id: 'audit',
      title: ['Audit', 'collector'],
      subtitle: 'allow + deny',
      x: 400,
      y: 645,
      width: 120,
      height: 65,
      stage: 4,
      kind: 'service',
      rotation: -0.25,
      detail: 'Collects security events with actor, effective subject, tenant, action, resource, result, policy version, and trace ID.',
      decision: 'Keep tokens and document contents out of logs, and give the application no permission to rewrite history.',
    },
    {
      id: 'workload-identity',
      title: ['Workload', 'identity'],
      subtitle: 'brief credentials',
      x: 540,
      y: 645,
      width: 120,
      height: 65,
      stage: 4,
      kind: 'service',
      rotation: 0.2,
      detail: 'Issues a distinct service identity and brief cloud credentials to each workload.',
      decision: 'Separate service identity from the user who initiated the request and avoid shared static credentials.',
    },
    {
      id: 'kms',
      title: ['KMS'],
      subtitle: 'envelope keys',
      x: 680,
      y: 645,
      width: 105,
      height: 65,
      stage: 4,
      kind: 'service',
      rotation: -0.15,
      detail: 'Protects key encryption keys and authorizes cryptographic operations through workload identity.',
      decision: 'Use data encryption keys for data. Store only their encrypted form beside the ciphertext.',
    },
    {
      id: 'audit-log',
      title: ['Immutable', 'audit log'],
      subtitle: 'separate access',
      x: 805,
      y: 645,
      width: 120,
      height: 65,
      stage: 4,
      kind: 'store',
      rotation: 0.3,
      detail: 'Retains append-only security evidence under credentials and lifecycle rules separate from the application.',
      decision: 'Prevent an application compromise from both changing customer data and deleting the evidence.',
    },
  ],
  edges: [
    { from: 'idp', to: 'bff', path: 'M 155 91 C 205 91, 225 128, 252 165', stage: 1, label: 'OIDC code', labelX: 205, labelY: 100 },
    { from: 'browser', to: 'bff', path: 'M 155 206 L 205 206', stage: 1 },
    { from: 'bff', to: 'membership', path: 'M 340 180 C 370 160, 375 95, 405 92', stage: 1 },
    { from: 'bff', to: 'gateway', path: 'M 340 210 L 405 210', stage: 2 },
    { from: 'gateway', to: 'workforce-hub', path: 'M 540 212 L 575 212', stage: 2 },
    { from: 'workforce-hub', to: 'policy', path: 'M 640 175 L 640 130', stage: 2, label: 'authorize', labelX: 650, labelY: 154 },
    { from: 'policy', to: 'membership', path: 'M 575 92 L 545 92', stage: 2 },
    { from: 'workforce-hub', to: 'postgres', path: 'M 705 215 L 770 215', stage: 2 },
    { from: 'workforce-hub', to: 'cache', path: 'M 690 175 C 730 150, 735 95, 770 92', stage: 2 },
    { from: 'gateway', to: 'module-services', path: 'M 438 250 C 430 275, 442 295, 462 315', stage: 3 },
    { from: 'module-services', to: 'policy', path: 'M 500 315 C 540 275, 565 190, 600 130', stage: 3, label: 'authorize', labelX: 535, labelY: 252 },
    { from: 'module-services', to: 'workforce-hub', path: 'M 545 340 C 560 310, 585 275, 605 250', stage: 3 },
    { from: 'module-services', to: 'postgres', path: 'M 545 352 C 650 360, 720 300, 785 245', stage: 3 },
    { from: 'gateway', to: 'document-api', path: 'M 472 250 C 485 310, 520 352, 575 352', stage: 3, label: 'upload request', labelX: 500, labelY: 319 },
    { from: 'document-api', to: 'quarantine', path: 'M 705 352 L 770 340', stage: 3 },
    { from: 'browser', to: 'quarantine', path: 'M 92 242 C 92 402, 315 410, 470 410 C 635 410, 690 360, 770 350', stage: 3, label: 'file bytes by presigned URL', labelX: 300, labelY: 400, kind: 'data' },
    { from: 'document-api', to: 'postgres', path: 'M 640 315 C 655 270, 720 250, 785 235', stage: 3 },
    { from: 'quarantine', to: 'queue', path: 'M 845 378 L 845 410', stage: 3 },
    { from: 'queue', to: 'scanner', path: 'M 790 447 L 710 490', stage: 3 },
    { from: 'scanner', to: 'approved', path: 'M 710 510 C 735 532, 748 548, 770 548', stage: 3 },
    { from: 'support', to: 'policy', path: 'M 155 536 C 260 585, 430 590, 555 590 L 555 92 L 575 92', stage: 4, label: 'temporary grant', labelX: 330, labelY: 580, kind: 'security' },
    { from: 'gateway', to: 'audit', path: 'M 438 250 C 420 395, 430 560, 460 645', stage: 4, kind: 'security' },
    { from: 'workload-identity', to: 'workforce-hub', path: 'M 600 645 C 555 560, 552 330, 585 240', stage: 4, kind: 'security' },
    { from: 'kms', to: 'approved', path: 'M 732 645 C 770 615, 810 602, 835 585', stage: 4, kind: 'security' },
    { from: 'audit', to: 'audit-log', path: 'M 460 710 L 460 724 C 600 735, 725 735, 865 724 L 865 710', stage: 4, kind: 'security' },
  ],
};
