import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Atmosphere } from "@/components/invitation/Atmosphere";
import { Hero } from "@/components/invitation/Hero";
import { Message } from "@/components/invitation/Message";
import { Events } from "@/components/invitation/Events";
import { Venue } from "@/components/invitation/Venue";
import { Gallery } from "@/components/invitation/Gallery";
import { Contacts } from "@/components/invitation/Contacts";
import { Finale } from "@/components/invitation/Finale";
import { MusicControl } from "@/components/invitation/MusicControl";
import {
  FallbackScreen,
  LoadingScreen,
  NotFoundScreen,
  RequestErrorScreen,
} from "@/components/invitation/States";
import { fetchPublicInvitation, sanitizeSlug } from "@/lib/publicInvitation";

const title = "Wedding Invitation";
const description = "A lantern-lit digital wedding invitation.";

export const Route = createFileRoute("/$slug")({
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
  component: InvitationPage,
});

function InvitationPage() {
  const params = Route.useParams();
  const slug = sanitizeSlug(params.slug ?? "");

  const query = useQuery({
    queryKey: ["public-invitation", slug],
    queryFn: () => fetchPublicInvitation(slug as string),
    enabled: Boolean(slug),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (!slug) return <NotFoundScreen />;
  if (query.isPending) return <LoadingScreen />;
  if (query.isError) return <RequestErrorScreen onRetry={() => void query.refetch()} />;

  const result = query.data;
  if (result.state === "not_found") return <NotFoundScreen />;
  if (result.state === "fallback") return <FallbackScreen shop={result.shop} />;

  const { content } = result;
  const dateLine = [content.weddingDate, content.startTime].filter(Boolean).join(" · ");

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[color:var(--ink)] text-[color:var(--ivory)]">
      <Atmosphere />
      <Hero
        {...(content.invocation ? { invocation: content.invocation } : {})}
        {...(content.groom.name ? { groomName: content.groom.name } : {})}
        {...(content.bride.name ? { brideName: content.bride.name } : {})}
        {...(dateLine ? { dateLine } : {})}
      />
      <Message content={content} />
      <Events events={content.events} />
      <Gallery items={content.gallery} />
      <Venue venue={content.venue} />
      <Contacts contacts={content.contacts} />
      <Finale
        {...(content.groom.name ? { groomName: content.groom.name } : {})}
        {...(content.bride.name ? { brideName: content.bride.name } : {})}
      />
      <MusicControl
        enabled={content.musicEnabled}
        {...(content.musicUrl ? { src: content.musicUrl } : {})}
      />
    </main>
  );
}
