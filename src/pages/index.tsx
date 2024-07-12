import Header from "@/app/components/Header";
import LoginSection from "@/app/pages/home/LoginSection";

export default function Home() {
  return (
    <div className=" min-h-screen flex_col">
      <Header />
      <main className="flex-1 flex_col">
        <LoginSection />
      </main>
    </div>
  );
}
