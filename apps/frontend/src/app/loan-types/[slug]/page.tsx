import { notFound } from 'next/navigation';
import { LoanCategoryDetail } from '../../../components/loan-category-detail';
import { loanCategories } from '../loan-categories';

export function generateStaticParams() {
  return loanCategories.map((category) => ({ slug: category.slug }));
}

export default async function LoanCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = loanCategories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return <LoanCategoryDetail category={category} />;
}
