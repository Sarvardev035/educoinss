import RoleSelectionLayout from '../components/shared/RoleSelectionLayout';

export default function RoleSelection2() {
  return (
    <RoleSelectionLayout
      subtitle="A variant role selection screen for alternate onboarding flows."
      studentTo="/student/dashboard"
      parentTo="/parent/dashboard"
    />
  );
}
