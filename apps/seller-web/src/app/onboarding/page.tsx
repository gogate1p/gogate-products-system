const STEPS = [
  'Personal details',
  'Business details',
  'Document upload (PAN, GST, Aadhaar, bank proof)',
  'Bank details',
  'Didit CKYC',
  'Pending admin verification',
];

export default function OnboardingPage() {
  return (
    <>
      <h1>Seller onboarding</h1>
      <ol className="onboarding-steps">
        {STEPS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
      <p>Admin can also create seller accounts and trigger CKYC from main admin.</p>
    </>
  );
}
