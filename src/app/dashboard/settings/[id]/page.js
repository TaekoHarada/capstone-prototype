import UserInfo from '../user-info';

export default function Page({ params }) {
  return <UserInfo id={params.id} />;
}