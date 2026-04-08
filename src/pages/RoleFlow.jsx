import RoleSelectionLayout from '../components/shared/RoleSelectionLayout';

export default function RoleFlow() {
  return (
    <RoleSelectionLayout
      subtitle="Choose the portal that matches your role in the EduCoin ecosystem."
      studentTo="/student/dashboard"
      parentTo="/parent/dashboard"
    />
  );
}
