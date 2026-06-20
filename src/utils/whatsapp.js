export const WHATSAPP_NUMBER = '7368043323';

export function buildWhatsAppUrl(message) {
  return `https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildPackageInquiryMessage(packageName) {
  return `Hi BuiltByAmos Team,

I'm interested in getting started with the (${packageName}) The package looks great and matches what I'm looking for.

Please let me know the next steps to get started, including the information or materials you need from my side. Looking forward to working with you.`;
}

export function getPricingPackageDisplayName({ name, label }) {
  if (label === 'Starter') return 'Starter';
  return name;
}

export function buildPricingPackageMessage({ name, label }) {
  return buildPackageInquiryMessage(getPricingPackageDisplayName({ name, label }));
}

export function buildCategoryPackageMessage({ category, plan }) {
  return buildPackageInquiryMessage(`${category} - ${plan} Package`);
}
