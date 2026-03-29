import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-12 px-8 flex flex-col items-center text-center space-y-6">
      <div className="text-lg font-bold text-on-surface font-headline">SugarCare HealthTech</div>
      <div className="flex flex-wrap justify-center gap-8 font-label text-sm">
        <Link href="#" className="text-on-surface-variant hover:text-on-surface transition-colors">Privacy Policy</Link>
        <Link href="#" className="text-on-surface-variant hover:text-on-surface transition-colors">Terms of Service</Link>
        <Link href="#" className="text-on-surface-variant hover:text-on-surface transition-colors">Support</Link>
        <Link href="#" className="text-on-surface-variant hover:text-on-surface transition-colors">Medical Advisory Board</Link>
      </div>
      <div className="max-w-3xl text-on-surface-variant font-label text-sm leading-relaxed border-t border-outline-variant/20 pt-8">
        <p className="mb-4">&copy; 2024 SugarCare HealthTech. Medical Disclaimer: Consult a physician before making dietary changes.</p>
        <p className="opacity-60 text-xs">
          The information provided on SugarCare is for educational purposes and is not a substitute for professional medical advice,
          diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions
          you may have regarding a medical condition.
        </p>
      </div>
    </footer>
  );
}
