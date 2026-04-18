export type LoanCategory = {
  slug: string;
  title: string;
  summary: string;
  bestFor: string;
  keyFeatures: string[];
  considerations: string[];
  risks: string[];
};

export const loanCategories: LoanCategory[] = [
  {
    slug: 'retail-loan-management-systems',
    title: 'Retail Loan Management Systems',
    summary:
      'Built for personal lending journeys such as home loans, auto finance, and consumer credit.',
    bestFor: 'Banks, NBFCs, and housing finance providers.',
    keyFeatures: ['EMI scheduling', 'Borrower self-service portals', 'Collections and reminders'],
    considerations: ['High borrower volume', 'Fast turnaround expectations'],
    risks: ['Weak servicing flows can raise delinquency and support load'],
  },
  {
    slug: 'commercial-loan-management-systems',
    title: 'Commercial Loan Management Systems',
    summary:
      'Supports complex business lending with underwriting, collateral tracking, and covenant monitoring.',
    bestFor: 'Corporate lenders and large financial institutions.',
    keyFeatures: ['Collateral workflows', 'Risk reviews', 'Compliance-heavy servicing'],
    considerations: ['Long approval cycles', 'Large ticket sizes and documentation'],
    risks: ['Manual controls can create audit and exposure gaps'],
  },
  {
    slug: 'microfinance-loan-systems',
    title: 'Microfinance Loan Systems',
    summary:
      'Optimized for small-value loans, field officers, group lending, and rural borrower operations.',
    bestFor: 'Microfinance institutions, cooperatives, and rural lenders.',
    keyFeatures: ['Offline-first support', 'Group repayment tracking', 'Mobile collections'],
    considerations: ['Low-bandwidth environments', 'High field activity'],
    risks: ['Limited offline resilience can disrupt disbursement and repayment capture'],
  },
  {
    slug: 'peer-to-peer-p2p-lending-platforms',
    title: 'Peer-to-Peer (P2P) Lending Platforms',
    summary:
      'Matches borrowers and investors directly with digital servicing, payment allocation, and reporting.',
    bestFor: 'Fintech marketplaces and online lending startups.',
    keyFeatures: ['Investor-borrower matching', 'Automated interest logic', 'Repayment ledgers'],
    considerations: ['Marketplace trust', 'Regulatory transparency'],
    risks: ['Poor risk controls can impact investor confidence quickly'],
  },
  {
    slug: 'ai-powered-end-to-end-platforms',
    title: 'AI-Powered End-to-End Platforms',
    summary:
      'Combines onboarding, scoring, fraud screening, servicing, and predictive insights in one digital stack.',
    bestFor: 'Modern banks, digital-first NBFCs, and fintech innovators.',
    keyFeatures: ['ML-based credit scoring', 'Fraud detection', 'Lifecycle automation'],
    considerations: ['Model governance', 'Explainability and fairness'],
    risks: ['Poor training data can introduce bias and weak decisions'],
  },
  {
    slug: 'modular-loan-systems',
    title: 'Modular Loan Systems',
    summary:
      'Lightweight building blocks for collections, disbursements, compliance, or servicing.',
    bestFor: 'Startups and lenders that want flexibility without a full-suite rollout.',
    keyFeatures: ['Selective module adoption', 'API-friendly integrations', 'Lower initial complexity'],
    considerations: ['Future expansion planning', 'Vendor interoperability'],
    risks: ['Fragmentation can appear as volumes and integrations grow'],
  },
  {
    slug: 'cloud-based-loan-management-systems',
    title: 'Cloud-Based Loan Management Systems',
    summary:
      'SaaS platforms that provide remote access, scalability, and easy connection to payments and CRMs.',
    bestFor: 'Growing NBFCs and cloud-first fintech teams.',
    keyFeatures: ['Rapid deployment', 'Elastic scaling', 'Third-party integrations'],
    considerations: ['Security posture', 'Data residency requirements'],
    risks: ['Weak encryption or governance can increase compliance exposure'],
  },
  {
    slug: 'enterprise-loan-management-suites',
    title: 'Enterprise Loan Management Suites',
    summary:
      'Large-scale platforms spanning origination, underwriting, servicing, and collections across business units.',
    bestFor: 'Large banks and multinational lending organizations.',
    keyFeatures: ['Deep customization', 'Cross-team workflows', 'Advanced reporting'],
    considerations: ['Long implementation timelines', 'Change management effort'],
    risks: ['High cost and complexity can slow time to value'],
  },
  {
    slug: 'specialized-loan-systems',
    title: 'Specialized Loan Systems',
    summary:
      'Designed for niche products such as education, agriculture, or equipment finance.',
    bestFor: 'Sector-focused lenders with domain-specific processes.',
    keyFeatures: ['Product-specific workflows', 'Tailored document rules', 'Specialized reporting'],
    considerations: ['Industry regulations', 'Custom servicing needs'],
    risks: ['Over-specialization can reduce reuse across other products'],
  },
  {
    slug: 'hybrid-systems',
    title: 'Hybrid Systems',
    summary:
      'Blends legacy core lending capabilities with new digital modules for gradual modernization.',
    bestFor: 'Banks moving from traditional operations toward digital lending.',
    keyFeatures: ['Incremental rollout', 'Core banking compatibility', 'Digital channel upgrades'],
    considerations: ['Legacy integration mapping', 'Phased transformation planning'],
    risks: ['Partial integration can create inconsistent customer journeys'],
  },
];
