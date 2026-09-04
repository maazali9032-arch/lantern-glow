# Lantern Glow Invite

BUILD — LANTERN / CHANDELIER GLOW WEDDING INVITATION

Create a premium cinematic single-page digital wedding invitation centered around a magical lantern/chandelier lighting experience.

Use:

React

TypeScript

Tailwind CSS

GSAP

GSAP ScrollTrigger

SVG/CSS for lanterns and decorative elements

Build a real interactive webpage, not a static mockup.

Do NOT build an admin dashboard, authentication, database, SaaS or payment system.

CORE CONCEPT

The invitation begins almost completely dark.

A single elegant hanging lantern slowly enters the scene and lights up.

Its warm light reveals the couple's names.

As the visitor scrolls through the invitation, additional lanterns illuminate one by one, creating the feeling of walking through a beautifully decorated wedding venue at night.

By the end, the entire scene is softly illuminated.

The experience should feel:

luxurious + atmospheric + cinematic + romantic + sophisticated.

1. OPENING — DARKNESS

Start with a nearly black full-screen background.

Use subtle:

deep charcoal/burgundy tones

atmospheric haze

floating dust particles

extremely subtle texture

faint shadows

Do not reveal the entire invitation immediately.

The screen should initially feel mysterious.

2. FIRST LANTERN

A single elegant hanging lantern/chandelier appears near the top/center.

The lantern should have:

detailed silhouette

metal/ornamental structure

glass/light chamber

subtle hanging chain

realistic shadows

Animate it gently swinging into position.

Then:

LIGHT ON

Create a warm radial glow originating from the lantern.

The glow should:

expand gradually

illuminate nearby space

softly reveal typography

have subtle falloff

create atmospheric depth

Do NOT simply change the lantern from black to yellow.

Use layered glow/radial lighting.

3. COUPLE REVEAL

As the lantern lights:

Reveal:

AHMED

&

AYESHA

14 DECEMBER 2026

The names should appear as though the lantern light is revealing them from darkness.

Use:

opacity

blur-to-focus

slight upward movement

subtle glow

staggered timing

Keep the typography luxurious and restrained.

4. INVOCATION

Place a configurable invocation above or near the couple names.

Example:

بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ

The component must later support:

Allah

Om

Jesus

Ram

Custom

None

Support Arabic, Urdu, Hindi, English and Unicode.

Support RTL correctly.

5. SCROLL = WALK THROUGH LIGHT

This is the central interaction.

As the user scrolls downward, the experience should feel like moving forward through a dark, beautifully decorated wedding venue.

Use GSAP ScrollTrigger.

Create several atmospheric zones.

For example:

ZONE 1

One lantern illuminated.

ZONE 2

Second lantern slowly lights.

ZONE 3

Third lantern appears further in the background.

ZONE 4

Multiple lanterns/chandeliers illuminate around the event information.

ZONE 5

Entire environment becomes warmly illuminated.

Each lighting transition should happen progressively rather than abruptly.

6. PARALLAX DEPTH

Create multiple visual layers:

BACKGROUND

Slowest movement.

MIDGROUND

Decorative architecture / distant lanterns.

FOREGROUND

Main lanterns, ornaments and typography.

Move each layer at a different scroll rate.

This should create genuine depth.

Avoid excessive movement.

The visitor should feel like the camera is gently travelling through the scene.

7. WEDDING MESSAGE

Once the first area is illuminated, reveal:

Together with their families

AHMED & AYESHA

invite you to celebrate their special day

Typography should appear naturally inside the illuminated area.

Use subtle decorative elements inspired by luxury wedding interiors.

8. COUNTDOWN

Create a sophisticated countdown:

DAYS · HOURS · MINUTES · SECONDS

Keep the timer integrated into the atmospheric design.

Do not use generic dashboard-style timer cards.

A nearby lantern can gently illuminate this section as it enters the viewport.

9. EVENTS

Reveal wedding events sequentially as the visitor scrolls.

Example:

NIKAH

14 DECEMBER 2026
11:00 AM

Venue Name
Hyderabad

VIEW LOCATION

WALIMA

16 DECEMBER 2026
7:30 PM

Venue Name
Hyderabad

VIEW LOCATION

Support:

event name

date

time

venue

address

description

Google Maps URL

Events should appear as elegant editorial invitation typography.

10. LANTERN ACTIVATION

Each event section should have its own atmospheric lighting.

As the section enters the viewport:

distant lantern becomes visible

lantern swings subtly

wick/light activates

glow expands

nearby content becomes brighter

text reveals

The lighting should be synchronized with the content reveal.

This synchronization is critical.

11. VENUE

Create a dramatic venue section.

Display:

VENUE NAME

Address
Hyderabad

GET DIRECTIONS

Use the configured Google Maps URL.

Place subtle architectural silhouettes or ornamental patterns behind the content.

Let warm lantern light illuminate the venue information.

12. PHOTOGRAPHY

Introduce photographs gradually through the illuminated environment.

Use:

large editorial photographs

subtle frames

depth layers

slow zoom

parallax

soft light overlays

Avoid a generic image grid.

Images can appear as though they are being revealed by passing pools of lantern light.

13. RSVP

Create an elegant RSVP section.

Fields:

Name

Attending / Not attending

Number of guests

Message

Keep the form visually consistent with the invitation.

14. CONTACT / SOCIAL

Support:

WhatsApp

Phone

Instagram

Facebook

YouTube

Only display configured links.

Make WhatsApp a subtle but clear CTA.

15. MUSIC

Support optional background music.

Do not force autoplay with sound.

Use the initial interaction to allow audio playback.

Provide a discreet fixed music control.

Do not use copyrighted music from the reference.

16. FINAL LIGHTING CLIMAX

The final section is the visual payoff.

As the visitor reaches the end:

additional lanterns illuminate

background becomes warmer

distant lights appear

atmospheric particles gently sparkle

the full decorative environment becomes visible

Then reveal:

WITH LOVE

AHMED & AYESHA

THANK YOU FOR CELEBRATING WITH US

Below:

RSVP / WhatsApp / Contact

The final state should feel like an entire wedding venue has gradually come alive with light.

Do NOT use a sudden bright flash.

The transition should be gradual and cinematic.

17. VISUAL STYLE

Use a sophisticated nighttime palette:

deep charcoal

black

burgundy

warm ivory

antique gold

amber/warm light

Lighting should be the primary source of visual drama.

Avoid:

neon

excessive gradients

generic cards

SaaS styling

cartoon lanterns

excessive glow

cheap particle effects

The lanterns should feel ornamental and premium.

18. MOBILE FIRST

Primary target:

360–430px portrait.

The lantern composition must scale correctly.

Make sure:

lanterns never clip

text remains readable

glow does not overwhelm content

parallax remains subtle

scrolling stays smooth

no horizontal overflow

Also support tablet and desktop.

19. PERFORMANCE

Use GSAP/ScrollTrigger efficiently.

Prefer transform/opacity-based animation.

Do not continuously animate expensive properties unnecessarily.

Respect:

prefers-reduced-motion

When enabled, simplify parallax and lighting transitions.

Optimize all images.

20. CONTENT DATA

Keep all wedding information centralized:

const invitation = {
  brideName: "Ayesha",
  groomName: "Ahmed",
  date: "14 December 2026",
  invocation: {},
  events: [],
  venue: {},
  gallery: [],
  contact: {},
  social: {}
};


Components must consume this data.

Do not hardcode wedding information throughout the UI.

FINAL QUALITY BAR

The visitor should feel as though they are walking through a dark luxury wedding venue while each lantern gradually illuminates the invitation.

The lighting choreography is the hero feature.

Prioritize:

Atmospheric lighting

Lantern realism

Scroll-driven choreography

Parallax depth

Typography

Cinematic transitions

Mobile performance

Build ONLY the complete single-page invitation.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/672b55a2-78cb-4e52-833c-8c4d93f297cd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
