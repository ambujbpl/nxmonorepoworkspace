import { type LoanCategory } from '@my-monorepo/shared-utils';

export const loanCategories: LoanCategory[] = [
  {
    isVisible: true,
    slug: 'retail-loan-management-systems',
    title: 'Retail Loan Management Systems',
    description:
      'Retail Loan Management Systems (RLMS) are specialized platforms designed to manage personal loans, auto loans, mortgages, and consumer credit. They streamline loan origination, repayment tracking, EMI management, compliance, and customer servicing—making them essential for banks, NBFCs, and housing finance companies.',
    summary:
      'Built for personal lending journeys such as home loans, auto finance, and consumer credit.',
    bestFor: 'Banks, NBFCs, and housing finance providers.',
    keyFeatures: [
      'Loan Origination: Automates application intake, credit scoring, and approval workflows.',
      'Repayment & EMI Tracking / EMI scheduling: Real-time monitoring of repayment schedules, overdue accounts, and interest calculations.',
      'Customer Portals: Self-service dashboards for borrowers to view loan status, make payments, and download statements.',
      'Compliance Management: Ensures adherence to RBI guidelines and other regulatory frameworks.',
      'Risk Assessment: Integrated tools for fraud detection, creditworthiness evaluation, and portfolio monitoring.',
      'Digital Transactions & Security: Secure online disbursement and repayment options with audit trails.',
      'Alerts & Reminders: Automated notifications for upcoming payments, due dates, and important updates.',
    ],
    benefits: [
      'Efficiency Gains: Automated workflows reduce manual errors by up to 70%.',
      'Customer Satisfaction: Improves borrower experience with faster approvals and transparent servicing, boosting retention by 20–35%.',
      'Risk Management: Enhances compliance and reduces default risks by 40%.',
      'Scalability: Cloud-based RLMS can handle growing loan volumes without major infrastructure costs.',
    ],
    considerations: ['High borrower volume', 'Fast turnaround expectations'],
    risks: [
      'Compliance Gaps: Outdated systems may fail to meet RBI’s evolving regulations.',
      'Operational Costs: Enterprise-grade RLMS can be expensive to implement and maintain.',
      'Data Security: Cloud-based systems require strong encryption and adherence to data protection laws.',
      'Scalability Issues: Smaller modular systems may struggle with high loan volumes.',
    ],
  },
  {
    isVisible: true,
    slug: 'commercial-loan-management-systems',
    title: 'Commercial Loan Management Systems',
    description:
      'Commercial Loan Management Systems (CLMS) are enterprise-grade platforms designed to handle corporate, syndicated, and SME loans. They focus on complex deal structures, collateral management, compliance, and multi-lender collaboration—making them essential for large banks, corporate lenders, and financial institutions.',
    summary:
      'Supports complex business lending with underwriting, collateral tracking, and covenant monitoring.',
    bestFor: 'Corporate lenders and large financial institutions.',
    keyFeatures: [
      'Loan Syndication & Collaboration: Supports multi-bank participation in syndicated loans with real-time visibility across stakeholders.',
      'Collateral & Covenant Management: Tracks pledged assets, covenants, and compliance obligations for corporate borrowers.',
      'Workflow Automation: Digitizes origination, underwriting, and approval processes for large-scale commercial lending.',
      'Risk & Compliance Tools: Integrated modules for regulatory adherence, fraud detection, and portfolio monitoring.',
      'Deal Structuring: Handles complex loan agreements, interest rate variations, and repayment schedules tailored to corporate needs.',
      'Reporting & Analytics: Provides dashboards for exposure analysis, credit risk, and profitability tracking.',
    ],
    benefits: [
      'Faster Deal Closure: Automated workflows reduce turnaround time for syndicated and corporate loans.',
      'Reduced Operational Risk: Audit-ready compliance and centralized documentation minimize errors.',
      'Scalability: Supports high-value, multi-party transactions across geographies.',
      'Transparency: Real-time visibility improves trust among lenders and corporate clients.',
    ],
    considerations: [
      'Long approval cycles',
      'Large ticket sizes and documentation',
    ],
    risks: [
      'Complex Implementation: Enterprise CLMS requires significant customization and integration with existing banking systems.',
      'High Costs: Licensing and maintenance expenses are much higher than retail loan systems.',
      'Regulatory Burden: Must adapt quickly to evolving RBI and global compliance frameworks.',
      'Training Needs: Staff must be trained to handle complex workflows and analytics.',
      'Manual controls: Manual controls can create audit and exposure gaps',
    ],
  },
  {
    isVisible: true,
    slug: 'microfinance-loan-systems',
    title: 'Microfinance Loan Systems',
    description:
      'Microfinance Loan Management Systems (MLMS) are specialized platforms designed for small-ticket loans, group lending, and rural credit. They emphasize mobile-first access, offline support, and community-based repayment tracking—making them vital for microfinance institutions, cooperatives, and NGOs serving underserved populations.',
    summary:
      'Optimized for small-value loans, field officers, group lending, and rural borrower operations.',
    bestFor: 'Microfinance institutions, cooperatives, and rural lenders.',
    keyFeatures: [
      'Group Lending Support: Enables joint liability models, centers, and group-based repayment structures.',
      'Quick Disbursal: Streamlined loan origination for small-ticket loans, often with minimal documentation.',
      'Mobile-First Interfaces: Borrowers and field agents can access loan details, repayment schedules, and notifications via mobile apps.',
      'Offline Functionality: Critical for rural areas with poor connectivity; syncs data once online.',
      'Flexible Repayment Options: Supports partial, early, or irregular repayments.',
      'Automated Communication: SMS/email reminders for due dates, arrears, and loan status updates.',
      'Analytics & Reporting: Cash flow, profit/loss, and borrower performance dashboards for decision-making.',
    ],
    benefits: [
      'Financial Inclusion: Extends credit to unbanked populations, empowering small businesses and individuals.',
      'Operational Efficiency: Reduces administrative overhead with automated workflows.',
      'Risk Reduction: Group lending models lower default risk through peer accountability.',
      'Scalability: Cloud-based MLMS can expand across regions with minimal infrastructure.',
    ],
    considerations: ['Low-bandwidth environments', 'High field activity'],
    risks: [
      'Connectivity Challenges: Offline-first design is essential, but syncing errors can occur.',
      'Regulatory Compliance: MFIs must align with RBI and local cooperative laws.',
      'Fraud Risk: Small-ticket loans with minimal documentation can be prone to misuse.',
      'Training Needs: Field agents require digital literacy to use mobile-first systems effectively.',
      'Offline Resilience: Limited offline functionality can disrupt disbursement and repayment capture.',
    ],
  },
  {
    isVisible: true,
    slug: 'peer-to-peer-p2p-lending-platforms',
    title: 'Peer-to-Peer (P2P) Lending Platforms',
    summary:
      'Matches borrowers and investors directly with digital servicing, payment allocation, and reporting.',
    bestFor: 'Fintech marketplaces and online lending startups.',
    keyFeatures: [
      'Investor-borrower matching',
      'Automated interest logic',
      'Repayment ledgers',
    ],
    considerations: ['Marketplace trust', 'Regulatory transparency'],
    risks: ['Poor risk controls can impact investor confidence quickly'],
  },
  {
    isVisible: true,
    slug: 'ai-powered-end-to-end-platforms',
    title: 'AI-Powered End-to-End Platforms',
    summary:
      'Combines onboarding, scoring, fraud screening, servicing, and predictive insights in one digital stack.',
    bestFor: 'Modern banks, digital-first NBFCs, and fintech innovators.',
    keyFeatures: [
      'ML-based credit scoring',
      'Fraud detection',
      'Lifecycle automation',
    ],
    considerations: ['Model governance', 'Explainability and fairness'],
    risks: ['Poor training data can introduce bias and weak decisions'],
  },
  {
    isVisible: true,
    slug: 'modular-loan-systems',
    title: 'Modular Loan Systems',
    summary:
      'Lightweight building blocks for collections, disbursements, compliance, or servicing.',
    bestFor:
      'Startups and lenders that want flexibility without a full-suite rollout.',
    keyFeatures: [
      'Selective module adoption',
      'API-friendly integrations',
      'Lower initial complexity',
    ],
    considerations: ['Future expansion planning', 'Vendor interoperability'],
    risks: ['Fragmentation can appear as volumes and integrations grow'],
  },
  {
    isVisible: false,
    slug: 'cloud-based-loan-management-systems',
    title: 'Cloud-Based Loan Management Systems',
    summary:
      'SaaS platforms that provide remote access, scalability, and easy connection to payments and CRMs.',
    bestFor: 'Growing NBFCs and cloud-first fintech teams.',
    keyFeatures: [
      'Rapid deployment',
      'Elastic scaling',
      'Third-party integrations',
    ],
    considerations: ['Security posture', 'Data residency requirements'],
    risks: ['Weak encryption or governance can increase compliance exposure'],
  },
  {
    isVisible: true,
    slug: 'enterprise-loan-management-suites',
    title: 'Enterprise Loan Management Suites',
    summary:
      'Large-scale platforms spanning origination, underwriting, servicing, and collections across business units.',
    bestFor: 'Large banks and multinational lending organizations.',
    keyFeatures: [
      'Deep customization',
      'Cross-team workflows',
      'Advanced reporting',
    ],
    considerations: [
      'Long implementation timelines',
      'Change management effort',
    ],
    risks: ['High cost and complexity can slow time to value'],
  },
  {
    isVisible: true,
    slug: 'specialized-loan-systems',
    title: 'Specialized Loan Systems',
    summary:
      'Designed for niche products such as education, agriculture, or equipment finance.',
    bestFor: 'Sector-focused lenders with domain-specific processes.',
    keyFeatures: [
      'Product-specific workflows',
      'Tailored document rules',
      'Specialized reporting',
    ],
    considerations: ['Industry regulations', 'Custom servicing needs'],
    risks: ['Over-specialization can reduce reuse across other products'],
  },
  {
    isVisible: true,
    slug: 'hybrid-systems',
    title: 'Hybrid Systems',
    summary:
      'Blends legacy core lending capabilities with new digital modules for gradual modernization.',
    bestFor: 'Banks moving from traditional operations toward digital lending.',
    keyFeatures: [
      'Incremental rollout',
      'Core banking compatibility',
      'Digital channel upgrades',
    ],
    considerations: [
      'Legacy integration mapping',
      'Phased transformation planning',
    ],
    risks: ['Partial integration can create inconsistent customer journeys'],
  },
];
