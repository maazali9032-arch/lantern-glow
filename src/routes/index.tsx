import { createFileRoute } from "@tanstack/react-router";
import { NotFoundScreen } from "@/components/invitation/States";

const title = "Invitation link required";
const description = "Open your personal invitation link to view the invitation.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <NotFoundScreen />;
}
