import CategoryComponent from "@/components/CategoryComponent";
import NewsletterComponent from "@/components/NewsletterComponent";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <CategoryComponent />
      <NewsletterComponent />
    </main>
  );
}