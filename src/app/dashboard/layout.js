// import SideNav from "@/app/dashboard/sidenav";
import SideNav from "/src/app/dashboard/sidenav";

export default function Layout({ children }) {
  return (
    <div
      className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-[url('https://mir-s3-cdn-cf.behance.net/project_modules/fs/8aa150121118393.60bf79a0ac753.jpg')] bg-cover bg-center bg-fixed"
      style={{
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full flex-none md:w-64 bg-opacity-90 bg-white">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  );
}
