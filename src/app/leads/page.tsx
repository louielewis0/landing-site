import { redirect } from "next/navigation";

/**
 * /leads predates the template redesign and duplicated the homepage
 * contact section. Old shared links keep working via redirect.
 */
export default function LeadsPage() {
  redirect("/#contact");
}
