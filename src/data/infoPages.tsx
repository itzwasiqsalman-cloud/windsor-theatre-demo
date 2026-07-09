import {
  BookOpen,
  Briefcase,
  Building2,
  Clock,
  Crown,
  GraduationCap,
  Gift,
  Landmark,
  Mail,
  MicVocal,
  Newspaper,
  PartyPopper,
  PenLine,
  Phone,
  Receipt,
  Sparkles,
  Ticket,
  Users,
  Wand2,
  Wrench,
} from "lucide-react";
import {
  DetailBlock,
  PriceList,
  PriceRow,
  type InfoPage,
} from "@/components/InfoModal";

/**
 * Content for the Information / Get Involved / About navigation pages,
 * sourced from the theatre's current website.
 */

const Timeline = ({
  items,
}: {
  items: { year: string; text: string }[];
}) => (
  <ol className="mt-2 space-y-4">
    {items.map((item) => (
      <li key={item.year} className="flex gap-4">
        <span className="w-14 shrink-0 font-display text-lg font-semibold text-crimson">
          {item.year}
        </span>
        <span className="pt-0.5 text-sm font-light leading-relaxed text-cocoa-muted">
          {item.text}
        </span>
      </li>
    ))}
  </ol>
);

export const infoPages: Record<string, InfoPage> = {
  /* ------------------------- INFORMATION ------------------------- */

  "digital-brochure": {
    eyebrow: "Information",
    title: "Digital Brochure",
    body: (
      <>
        <DetailBlock icon={BookOpen} title="The season at a glance">
          <p>
            Browse the full season brochure online, from world premiere drama
            to the legendary Windsor pantomime. Every production, every date
            and every price in one beautifully illustrated guide.
          </p>
          <p>
            Prefer paper? Pick up a printed copy at the box office on Thames
            Street, or ask the team to post one to you.
          </p>
        </DetailBlock>
        <DetailBlock icon={Mail} title="Never miss a season">
          <p>
            Join the mailing list at the bottom of this page and each new
            brochure will land in your inbox the moment it is published.
          </p>
        </DetailBlock>
      </>
    ),
  },

  pantomime: {
    eyebrow: "Information",
    title: "Pantomime",
    body: (
      <>
        <DetailBlock icon={Wand2} title="Jack and the Beanstalk">
          <p>
            Windsor's legendary pantomime returns with magic, mischief and
            massive fun. Expect dazzling sets, a dastardly giant, spectacular
            dance numbers and gags for every generation. Fee, fi, fo, fum!
          </p>
          <p>
            Playing Fri 20 Nov to Sun 10 Jan, with matinee and evening
            performances most days. Tickets from £19.50, with family, school
            and youth group rates available.
          </p>
        </DetailBlock>
        <DetailBlock icon={Sparkles} title="This year's stars">
          <p>
            Starring Kevin Cruise, Steven Blakeley as the Dame and Hilary
            O'Neil as the Fairy, with more casting to be announced.
          </p>
          <p>
            Please note the production contains haze and some flashing
            lights. Relaxed and accessible performance dates are announced
            each season.
          </p>
        </DetailBlock>
      </>
    ),
  },

  "gift-vouchers": {
    eyebrow: "Information",
    title: "Gift Vouchers",
    body: (
      <>
        <DetailBlock icon={Gift} title="The gift of theatre">
          <p>
            Gift vouchers are available in any amount you choose and are
            redeemable against every production at the theatre, from gripping
            drama to the Christmas pantomime.
          </p>
        </DetailBlock>
        <DetailBlock icon={Ticket} title="How it works">
          <p>
            Buy from the box office as a digital voucher delivered by email,
            or as a beautifully printed theatre ticket to give in person.
            Vouchers are valid for one year from purchase.
          </p>
        </DetailBlock>
      </>
    ),
  },

  "theatre-tours": {
    eyebrow: "Information",
    title: "Theatre Tours",
    body: (
      <>
        <DetailBlock icon={Landmark} title="Behind the scenes">
          <p>
            Step behind the curtain on a guided tour through more than 240
            years of theatrical history. Explore the auditorium from every
            vantage point, walk the backstage corridors and, when schedules
            allow, step onto the set of the current production.
          </p>
          <p>
            You'll hear about the theatre's life as a filming location,
            including the Ian McKellen Hamlet, along with tales of famous
            performers and our resident ghost.
          </p>
        </DetailBlock>
        <DetailBlock icon={Clock} title="Times and prices">
          <p>
            Tours run for around one hour, at midday on Thursdays and
            Saturdays, subject to rehearsals and performances. Tickets are
            £12.50 per person, bookable online or through the box office.
            Group discounts are available by email.
          </p>
          <p>
            Please note the tour takes in many levels of the building via
            stairs, and there is no lift.
          </p>
        </DetailBlock>
      </>
    ),
  },

  "community-shows": {
    eyebrow: "Get involved",
    title: "Community Shows",
    body: (
      <>
        <DetailBlock icon={Users} title="Our community on our stage">
          <p>
            Every year our learning team produces a full-scale musical that
            brings talented local children and adults together with
            professional West End directors, designers and choreographers.
          </p>
          <p>
            This summer it's We Will Rock You, built on the iconic music of
            Queen with a story by Ben Elton, playing Wed 19 to Sat 22 Aug.
            Last year's production was Grease the Musical.
          </p>
        </DetailBlock>
        <DetailBlock icon={PartyPopper} title="Join the next one">
          <p>
            Applications for this year's production have closed, but auditions
            for the next community show are announced through our newsletter
            and creative learning programme. Keep an eye out and take your
            own bow on the Windsor stage.
          </p>
        </DetailBlock>
      </>
    ),
  },

  "booking-information": {
    eyebrow: "Information",
    title: "Booking Information",
    body: (
      <>
        <DetailBlock icon={Receipt} title="Fees and delivery">
          <p>
            Ticket prices include a £1.50 restoration and development levy
            that goes directly towards caring for our Grade II listed home,
            plus a £2.75 administration fee.
          </p>
          <PriceList>
            <PriceRow item="Restoration and development levy, per ticket" price="£1.50" />
            <PriceRow item="Administration fee, per transaction" price="£2.75" />
            <PriceRow item="Postal delivery (free for premium members)" price="£1" />
          </PriceList>
        </DetailBlock>
        <DetailBlock icon={Ticket} title="Collection, refunds and groups">
          <p>
            Prepaid tickets are ready at the box office straight after
            booking. Just bring your payment card or confirmation email.
          </p>
          <p>
            We are unable to offer refunds or exchanges, though in
            extraordinary circumstances an account credit valid for one year
            may be offered. For group rates, call the box office on 01753 853
            888.
          </p>
        </DetailBlock>
        <DetailBlock icon={Clock} title="Curtain up">
          <p>
            Evening performances begin at 7:30pm, with 2:30pm matinees on
            Thursdays and Saturdays. Times can vary by production, so always
            check your tickets.
          </p>
        </DetailBlock>
      </>
    ),
  },

  /* ------------------------- GET INVOLVED ------------------------ */

  "creative-learning": {
    eyebrow: "Get involved",
    title: "Outreach & Creative Learning",
    body: (
      <>
        <DetailBlock icon={GraduationCap} title="Classes and courses">
          <p>
            LAMDA classes guide ages 8 to 18 towards qualifications from one
            of the UK's oldest and most respected awarding bodies, while our
            weekly home education drama sessions build performance and
            collaboration skills for ages 7 to 13.
          </p>
        </DetailBlock>
        <DetailBlock icon={MicVocal} title="On stage and in print">
          <p>
            The summer community production puts local performers in a
            full-scale musical alongside West End creatives. TRW Reviewers
            receive complimentary tickets in exchange for honest reviews,
            with companion tickets and one-to-one guidance for under 16s.
          </p>
          <p>
            Windsor Words hosts free read-throughs of scripts by local
            playwrights, and script submissions are always welcome.
          </p>
        </DetailBlock>
        <DetailBlock icon={Briefcase} title="Work experience">
          <p>
            Placements run across the whole building, from box office and
            marketing to technical and production. To register interest,
            email{" "}
            <a
              href="mailto:outreach@theatreroyalwindsor.co.uk"
              className="text-crimson underline-offset-4 hover:underline"
            >
              outreach@theatreroyalwindsor.co.uk
            </a>
            . The programme is proudly supported by Sir Ian McKellen's 2019
            fundraising season.
          </p>
        </DetailBlock>
      </>
    ),
  },

  /* ----------------------------- ABOUT --------------------------- */

  "about-us": {
    eyebrow: "About",
    title: "About Us",
    body: (
      <>
        <DetailBlock icon={Crown} title="A producing theatre like no other">
          <p>
            We are the only unsubsidised producing theatre in Britain to
            operate all year round. Every season we create original work on
            Thames Street, welcome visiting companies from across the UK and
            beyond, and launch tours that regularly transfer to London's West
            End.
          </p>
        </DetailBlock>
        <DetailBlock icon={Building2} title="Our mission">
          <p>
            To be a first-class regional theatre recognised nationally, and a
            cultural hub for Windsor that encourages participation, learning
            and engagement with the performing arts.
          </p>
          <p>
            The repertoire spans classic drama, bold new writing and more
            than 80 unbroken years of pantomime.
          </p>
        </DetailBlock>
      </>
    ),
  },

  history: {
    eyebrow: "About",
    title: "Our History",
    body: (
      <>
        <DetailBlock icon={Landmark} title="More than three centuries of theatre">
          <p>
            Theatre has been played in Windsor since 1706, and on this spot
            beside the castle for over two hundred years.
          </p>
        </DetailBlock>
        <Timeline
          items={[
            {
              year: "1706",
              text: "The actor Yates opens Windsor's first playhouse booth, and the town never looks back.",
            },
            {
              year: "1793",
              text: "A permanent theatre opens on High Street, playing seasons timed to the Eton College holidays.",
            },
            {
              year: "1815",
              text: "Townspeople raise £6,000 to build a new theatre on Thames Street. King George III attends with playbills printed on silk.",
            },
            {
              year: "1908",
              text: "Fire destroys the building on 18 February. Owner Sir William Shipley vows to rebuild.",
            },
            {
              year: "1910",
              text: "The present Edwardian theatre opens its doors on 17 December.",
            },
            {
              year: "1938",
              text: "John Counsell founds the repertory company. Within weeks, King George VI and Queen Elizabeth are in the audience and the theatre is headline news.",
            },
            {
              year: "1997",
              text: "Bill Kenwright takes the helm, producing West End transfers and securing the theatre's national reputation.",
            },
            {
              year: "Today",
              text: "The only unsubsidised producing theatre operating year-round in Britain, with over 80 unbroken years of pantomime.",
            },
          ]}
        />
      </>
    ),
  },

  "off-script": {
    eyebrow: "About",
    title: "Off Script",
    body: (
      <>
        <DetailBlock icon={Newspaper} title="Stories from behind the curtain">
          <p>
            Off Script is our blog: cast announcements, interviews with
            writers and performers, reviews and behind-the-scenes updates
            from every corner of the building.
          </p>
        </DetailBlock>
        <DetailBlock icon={PenLine} title="Recently on Off Script">
          <p>
            Highlights include interviews with our Writers in Residence,
            casting news for upcoming premieres and a look at how the
            pantomime comes together each Christmas. New posts land
            regularly, so check back often.
          </p>
        </DetailBlock>
      </>
    ),
  },

  "private-hire": {
    eyebrow: "About",
    title: "Private Hire",
    body: (
      <>
        <DetailBlock icon={PartyPopper} title="An Edwardian jewel for your event">
          <p>
            From conferences and product launches to award ceremonies and
            wedding receptions, our spaces welcome groups of 10 to 610 with
            bespoke catering and full in-house technical support.
          </p>
        </DetailBlock>
        <DetailBlock icon={Building2} title="Spaces and capacities">
          <PriceList>
            <PriceRow item="Auditorium and stage, theatre style" price="633" />
            <PriceRow item="Circle Bar with castle views, theatre style" price="50" />
            <PriceRow item="Stalls Bar and Coffee Shop, theatre style" price="50" />
            <PriceRow item="Private Members Club Room, theatre style" price="25" />
          </PriceList>
          <p className="mt-3">
            Every space has a licensed bar, and three breakout rooms support
            larger events. To talk through your plans, call 01753 863 444 or
            email{" "}
            <a
              href="mailto:info@theatreroyalwindsor.co.uk"
              className="text-crimson underline-offset-4 hover:underline"
            >
              info@theatreroyalwindsor.co.uk
            </a>
            .
          </p>
        </DetailBlock>
      </>
    ),
  },

  technical: {
    eyebrow: "About",
    title: "Technical Information",
    body: (
      <>
        <DetailBlock icon={Wrench} title="For visiting companies">
          <p>
            Our technical team supports everything from fringe theatre to
            large-scale touring musicals, alongside our own in-house
            productions.
          </p>
        </DetailBlock>
        <DetailBlock icon={BookOpen} title="Plans and specifications">
          <p>
            Scale plans and sections are available to download as PDF and CAD
            drawings, together with a full technical specification and a
            blank hanging plot for production planning.
          </p>
          <p>
            Talk to the team on 01753 863 444 or email{" "}
            <a
              href="mailto:technical@theatreroyalwindsor.co.uk"
              className="text-crimson underline-offset-4 hover:underline"
            >
              technical@theatreroyalwindsor.co.uk
            </a>
            .
          </p>
        </DetailBlock>
      </>
    ),
  },

  "work-with-us": {
    eyebrow: "About",
    title: "Work With Us",
    body: (
      <>
        <DetailBlock icon={Briefcase} title="Join the company">
          <p>
            As the only unsubsidised commercial producing theatre outside
            London, we are home to drama, musicals, live music, comedy and
            the annual pantomime. Vacancies across front of house, box
            office, technical and administration are posted throughout the
            year.
          </p>
        </DetailBlock>
        <DetailBlock icon={GraduationCap} title="Work experience placements">
          <p>
            Placements run across eight departments, from marketing and
            development to producing and technical (back of house and
            technical placements are for ages 16 and up). Apply early via{" "}
            <a
              href="mailto:outreach@theatreroyalwindsor.co.uk"
              className="text-crimson underline-offset-4 hover:underline"
            >
              outreach@theatreroyalwindsor.co.uk
            </a>
            .
          </p>
        </DetailBlock>
      </>
    ),
  },

  "contact-us": {
    eyebrow: "About",
    title: "Contact Us",
    body: (
      <>
        <DetailBlock icon={Phone} title="Talk to us">
          <PriceList>
            <PriceRow item="Box office and bookings" price="01753 853 888" />
            <PriceRow item="Administration and hires" price="01753 863 444" />
          </PriceList>
        </DetailBlock>
        <DetailBlock icon={Mail} title="Write to us">
          <p>32 Thames Street, Windsor, Berkshire SL4 1PS</p>
          <p>
            General enquiries: info@theatreroyalwindsor.co.uk
            <br />
            Technical: technical@theatreroyalwindsor.co.uk
            <br />
            Creative learning: outreach@theatreroyalwindsor.co.uk
            <br />
            Corporate support: development@theatreroyalwindsor.co.uk
          </p>
        </DetailBlock>
      </>
    ),
  },
};

export const getInfoPage = (id: string): InfoPage | null =>
  infoPages[id] ?? null;
