import Link from "next/link";
import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/recruitments");

  return (
    <div>
      <h1>Welcome to Our Service</h1>
      <nav>
        <Link href="/login">Login</Link>
        <br />
        <Link href="/signup">Sign Up</Link>4
        <br />
        <Link href="/recruitments">Recruitments</Link>
      </nav>
    </div>
  );
}
