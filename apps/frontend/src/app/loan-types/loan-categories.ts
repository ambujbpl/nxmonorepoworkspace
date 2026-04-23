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
    description: 'Peer-to-Peer (P2P) lending platforms are RBI-regulated digital marketplaces in India that directly connect borrowers with individual lenders, offering faster credit access and higher returns compared to traditional banks. Popular platforms like LenDenClub, Lendbox, and Faircent provide diverse loan categories, flexible tenures, and technology-driven credit assessments.',
    summary:
      'Matches borrowers and investors directly with digital servicing, payment allocation, and reporting.',
    bestFor: 'Fintech marketplaces and online lending startups.',
    keyFeatures: [
      'Investor-borrower matching: AI-driven algorithms connect borrowers with suitable lenders based on risk profiles and preferences.',
      'Automated interest logic: Calculates interest rates dynamically based on borrower risk and market conditions.',
      'Repayment ledgers: Maintains detailed records of all transactions, repayments, and outstanding balances.',
    ],
    benefits: [
      'Disintermediation: Eliminates traditional banks, offering faster access to credit and higher returns for investors.',
      'Diverse Loan Options: Supports personal, business, education, and other loan categories with flexible tenures.',
      'Technology-Driven Credit Assessment: Uses alternative data and machine learning for credit scoring, expanding access to underserved borrowers.',
      'Higher Returns: Investors can earn 11–15% annually, higher than FDs or savings accounts.',
      'Faster Credit: Borrowers get loans quickly without heavy documentation.',
      'Diversification: Lenders spread risk across multiple borrowers.',
      'Transparency: RBI-regulated platforms ensure borrower credibility and data protection.',
    ],
    considerations: ['Marketplace trust', 'Regulatory transparency'],
    risks: [
      'Default Risk: Borrowers may fail to repay; platforms mitigate via credit scoring.',
      'Liquidity Constraints: Investments are locked until loan tenure ends.',
      'Tax Implications: Returns are taxable as income.',
      'Platform Fees: Ranges from 1–4% depending on provider.',
    ],
  },
  {
    isVisible: true,
    slug: 'ai-powered-end-to-end-platforms',
    title: 'AI-Powered End-to-End Platforms',
    description: 'AI-powered end-to-end lending platforms are transforming credit delivery by automating the entire loan lifecycle—from origination to servicing—using intelligent agents, advanced data orchestration, and compliance-ready workflows. In India and globally, platforms like GoCredit, LeadSquared, LenderAI, and MongoDB’s agentic AI stack are leading this shift.',
    summary:
      'Combines onboarding, scoring, fraud screening, servicing, and predictive insights in one digital stack.',
    bestFor: 'Modern banks, digital-first NBFCs, and fintech innovators.',
    keyFeatures: [
      'ML-based credit scoring: Leverages alternative data and machine learning models for more accurate risk assessment.',
      'Fraud detection: Identifies and mitigates fraudulent activities using advanced algorithms.',
      'Lifecycle automation: Automates the entire loan lifecycle from origination to servicing.',
    ],
    benefits: [
      'Speed: Loan approvals cut from days to minutes.',
      'Accuracy: AI reduces manual errors in underwriting and compliance.',
      'Scalability: Platforms handle multiple loan products seamlessly.',
      'Borrower Experience: Single consent-based applications, fewer drop-offs, and personalized journeys.',
      'Compliance: RBI, DPDP, and global standards integrated into workflows.',
    ],
    considerations: ['Model governance', 'Explainability and fairness'],
    risks: [
      'Over-reliance on AI: Human oversight is still critical to avoid bias or misjudgment.',
      'Data Privacy: Sensitive borrower data must be encrypted and governed.',
      'Integration Complexity: Legacy banks may struggle to adopt fully AI-native workflows.',
      'Regulatory Evolution: Compliance frameworks (like RBI’s digital lending guidelines) continue to evolve.',
      'Weak in decisions: Poor training data can introduce bias and weak decisions'
    ],
  },
  {
    isVisible: true,
    slug: 'modular-loan-systems',
    title: 'Modular Loan Systems',
    description: 'Modular Loan Systems are lightweight, component-based platforms that allow lenders to pick and integrate only the functions they need—ideal for startups, small NBFCs, or fintechs experimenting with niche lending models.',
    summary:
      'Lightweight building blocks for collections, disbursements, compliance, or servicing.',
    bestFor:
      'Startups and lenders that want flexibility without a full-suite rollout.',
    keyFeatures: [
      'Selective module adoption: Choose only the functionalities you need, such as loan origination, repayment tracking, or compliance management.',
      'API-friendly integrations: Easily connect with other software and services.',
      'Lower initial complexity: Simplified setup and maintenance compared to full-suite solutions.',
    ],
    benefits: [
      'Cost-Efficient: Pay only for the modules you use.',
      'Scalable: Add new modules as loan volumes or product lines expand.',
      'Faster Deployment: Quick setup compared to enterprise suites.',
      'Integration-Friendly: Works well with CRMs, accounting tools, and digital wallets.',
    ],
    considerations: ['Future expansion planning', 'Vendor interoperability'],
    risks: [
      'Fragmentation: Multiple vendors/modules can create integration headaches.',
      'Limited Depth: Modules may lack advanced features compared to enterprise systems.',
      'Scaling Challenges: As loan volumes grow, modular systems may need migration to enterprise-grade platforms.',
      'Compliance Gaps: Each module must align with RBI guidelines; piecemeal adoption can risk oversight.',
    ],
  },
  {
    isVisible: false,
    slug: 'cloud-based-loan-management-systems',
    title: 'Cloud-Based Loan Management Systems',
    description: 'Cloud-Based Loan Management Systems (CLMS) are SaaS-driven platforms that deliver loan lifecycle management over the internet, offering scalability, security, and real-time access without heavy on-premise infrastructure.',
    summary:
      'SaaS platforms that provide remote access, scalability, and easy connection to payments and CRMs.',
    bestFor: 'Growing NBFCs and cloud-first fintech teams.',
    keyFeatures: [
      'Rapid deployment: Cloud-based setup with minimal IT overhead.',
      'Elastic scaling: Automatically adjust resources based on demand.',
      'Third-party integrations: Connect seamlessly with other SaaS applications.',
    ],
    benefits: [
      'Scalability: Handle millions of loan records without hardware upgrades.',
      'Cost-Efficiency: Pay-as-you-go pricing reduces upfront IT investment.',
      'Accessibility: Anytime, anywhere access for staff and borrowers.',
      'Security: Cloud providers offer encryption, backups, and disaster recovery.',
      'Faster Deployment: Rollout in weeks instead of months.',
    ],
    considerations: ['Security posture', 'Data residency requirements'],
    risks: [
      'Data Sovereignty: Must comply with RBI rules on local data storage.',
      'Vendor Lock-In: Dependence on a single SaaS provider.',
      'Internet Reliance: Connectivity issues can disrupt operations.',
      'Customization Limits: SaaS platforms may restrict deep custom workflows.',
    ],
  },
  {
    isVisible: true,
    slug: 'enterprise-loan-management-suites',
    title: 'Enterprise Loan Management Suites',
    description: 'Enterprise Loan Management Suites (ELMS) are comprehensive, all-in-one platforms designed for large banks, multinational lenders, and financial institutions that need to manage the entire loan lifecycle at scale.',
    summary:
      'Large-scale platforms spanning origination, underwriting, servicing, and collections across business units.',
    bestFor: 'Large banks and multinational lending organizations.',
    keyFeatures: [
      'Deep customization: Tailor workflows, data models, and user interfaces to institutional needs.',
      'Cross-team workflows: Facilitate collaboration across departments and business units.',
      'Advanced reporting: Generate detailed insights and analytics for decision-making.',
    ],
    considerations: [
      'Long implementation timelines',
      'Change management effort',
    ],
    benefits: [
      'Comprehensive Coverage: Handles all loan types—retail, corporate, SME, syndicated.',
      'Scalability: Supports millions of accounts and complex workflows.',
      'Customization: Highly configurable to match institutional policies.',
      'Compliance-Ready: Built-in regulatory frameworks reduce risk of penalties.',
      'Operational Efficiency: Unified data reduces duplication and manual errors.',
    ],
    risks: [
      'High Cost: Licensing, implementation, and training are expensive.',
      'Complexity: Requires skilled IT teams for deployment and maintenance.',
      'Longer Deployment: Rollouts can take months or years.',
      'Vendor Dependence: Institutions often rely heavily on a single provider.',
    ],
  },
  {
    isVisible: true,
    slug: 'specialized-loan-systems',
    title: 'Specialized Loan Systems',
    description: 'Specialized Loan Systems are niche-focused platforms designed to serve unique lending categories or borrower segments that mainstream retail or enterprise suites don’t fully address.',
    summary:
      'Designed for niche products such as education, agriculture, or equipment finance.',
    bestFor: 'Sector-focused lenders with domain-specific processes.',
    keyFeatures: [
      'Domain-Specific Workflows: Tailored processes for education, agriculture, housing, equipment financing, microfinance, or P2P lending. Example - Education Loan Systems include moratorium handling and tuition disbursement; Agricultural Loan Systems support seasonal repayment cycles and subsidy integration.',
      'Borrower-Centric Functionality: Custom repayment schedules aligned with borrower profiles (students, farmers, SMEs).',
      'Integration Capabilities: APIs to connect with CRMs, ERPs, and core banking systems. Often lightweight connectors rather than full enterprise integration layers.',
      'Product-specific workflows: For example, agricultural loan systems may include features for crop-based lending, weather risk assessment, and government subsidy tracking.',
      'Tailored document rules: Specialized systems often have document management features aligned with their niche (e.g., educational loan systems may handle admission letters and fee structures, while equipment finance systems manage asset documentation).',
      'Specialized reporting: Provides insights specific to the niche, such as student loan performance metrics or agricultural loan portfolio health indicators.',
    ],
    benefits: [
      'Domain Expertise: Built-in workflows for niche lending categories.',
      'Compliance Alignment: Tailored to sector-specific regulations (e.g., education subsidies, farm credit schemes).',
      'Operational Efficiency: Reduces customization overhead compared to general-purpose suites.',
      'Customer-Centric: Addresses unique borrower needs (students, farmers, SMEs).',
    ],
    considerations: ['Industry regulations', 'Custom servicing needs'],
    risks: [
      'Limited Scope: May not scale to handle diverse loan products.',
      'Integration Challenges: Specialized systems often need connectors to CRMs, ERPs, or core banking.',
      'Vendor Dependence: Niche providers may lack long-term stability compared to enterprise vendors.',
      'Migration Costs: Expanding beyond niche use cases may require moving to modular or enterprise suites.',
    ],
  },
  {
    isVisible: true,
    slug: 'hybrid-systems',
    title: 'Hybrid Systems',
    description: 'Hybrid Loan Management Systems are blended architectures that combine the strengths of on-premise enterprise suites with cloud-native or modular extensions, offering both stability and agility.',
    summary:
      'Blends legacy core lending capabilities with new digital modules for gradual modernization.',
    bestFor: 'Banks moving from traditional operations toward digital lending.',
    keyFeatures: [
      'Dual Deployment: On-premise core + cloud extensions for origination, servicing, or analytics.',
      'Integration Layer: APIs and middleware connect legacy systems with modern SaaS modules.',
      'Scalability: Cloud handles peak loads, while core systems manage compliance-heavy processes.',
      'Customization: Enterprise-grade configurability with modular add-ons.',
      'Compliance: Hybrid setups ensure RBI/SEBI alignment while leveraging cloud agility.',
    ],
    benefits: [
      'Balanced Approach: Stability of enterprise suites + agility of cloud modules.',
      'Cost Optimization: Avoids full migration costs while modernizing critical workflows.',
      'Risk Mitigation: Sensitive data can remain on-premise; less sensitive processes move to cloud.',
      'Gradual Transformation: Institutions modernize incrementally without disrupting operations.',
    ],
    considerations: [
      'Legacy integration mapping',
      'Phased transformation planning',
    ],
    risks: [
      'Complex Integration: Middleware and APIs must be carefully managed.',
      'Operational Overhead: Maintaining dual environments can increase IT complexity.',
      'Vendor Dependence: Multiple providers may complicate support and upgrades.',
      'Latency Issues: Real-time synchronization between on-premise and cloud can be challenging.',
    ],
  },
];
