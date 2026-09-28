import { asset } from "../lib/assets.js";
import { icon } from "../components/icons.js";
import { brand } from "../components/brand.js";
import { footer } from "../components/footer.js";
import { card } from "../components/course-card.js";
import { courses, categories } from "../data/courses.js";
export function landing() {
  document.title = "ByteSpace — Discover Your Next Possibility";
  return `<main id="main" tabindex="-1"><section class="hero blue-grid">
    <header class="site-header container">${brand(true)}<nav class="desktop-nav" aria-label="Main navigation"><a class="active" href="/">Home</a><a href="#courses">Courses</a><a href="#creators">Creators</a></nav><div class="header-actions"><a href="/login">Sign In</a><a href="/signup">Join Us</a><button class="icon-button bag-button" aria-label="View saved courses">${icon("bag")}</button><button class="icon-button menu-button" aria-label="Open menu" aria-expanded="false">${icon("menu")}</button></div><nav class="mobile-nav" aria-label="Mobile navigation" hidden><a href="#courses">Courses</a><a href="#creators">Creators</a><a href="/login">Sign In</a><a href="/signup">Join Us</a></nav></header>
    <div class="hero-copy container"><h1>Get Access to Hundreds<br/>Courses Available</h1><p>Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.</p><form class="search-form" role="search"><label class="search-input">${icon("search")}<input type="search" name="search" aria-label="Search courses, topics, or creators" placeholder="Course, topic, creator" /></label><button class="button" type="submit">Search</button></form></div>
    <img class="hero-coil" src="${asset("hero-coil.webp")}" alt="" width="201" height="275"/><img class="hero-block" src="${asset("hero-block.webp")}" alt="" width="170" height="305"/>
    <img class="hero-triangle" src="${asset("hero-triangle.webp")}" width="160" height="150" alt=""/><img class="hero-small-coil" src="${asset("hero-small-coil.webp")}" width="130" height="145" alt=""/>
    <img class="hero-art" src="${asset("hero-art.webp")}" alt="A happy student learning with ByteSpace, surrounded by course and learning-progress cards" width="1440" height="474" fetchpriority="high"/>
  </section>
  <div class="partners" aria-label="Our learning partners"><img src="${asset("partners.webp")}" width="1150" height="67" alt="Five Logoipsum learning partners"/></div>
  <section class="catalog container section" id="courses" aria-labelledby="courses-title"><div class="section-intro"><h2 id="courses-title">Discover Your Passion,<br/>Build Your Skills</h2><p>At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different<br class="desktop-break"/> fields, from technology to the arts, and make a difference in your career and life.</p></div>
    <div class="category-filters" aria-label="Filter courses by category">${categories.map((c, i) => `<button class="filter ${i === 0 ? "is-active" : ""}" aria-pressed="${i === 0}" data-filter="${c}">${c}</button>`).join("")}<button class="more-filters" aria-expanded="false">+ More</button><span class="extra-filters" hidden><button class="filter" data-filter="Finance" aria-pressed="false">Finance</button><button class="filter" data-filter="Business" aria-pressed="false">Business</button></span></div>
    <div class="results-summary" role="status" aria-live="polite"></div><div class="course-grid">${courses.map(card).join("")}</div>
    <section class="learning-paths" id="categories" aria-labelledby="paths-title"><div class="section-intro"><h2 id="paths-title">Explore Diverse Learning Paths at Bytespace</h2><p>At Bytespace, we believe in empowering individuals through knowledge. Our diverse range of courses spans various<br class="desktop-break"/> fields, ensuring there's something for everyone. Unleash your potential and explore our carefully curated categories.</p></div><div class="path-grid">${[
      ["Design", "design"],
      ["Development", "code"],
      ["IT & Software", "laptop"],
      ["Business", "business"],
      ["Marketing", "marketing"],
      ["Photography", "photo"],
    ]
      .map(
        ([n, i]) =>
          `<button class="path-card" data-path="${n}"><span>${icon(i)}</span>${n}</button>`,
      )
      .join("")}</div></section>
  </section>
  <section class="features" id="about"><div class="container"><div class="feature-row"><div class="feature-copy"><h2>Your Path to Professional<br/>Growth Starts Here!</h2><p>Explore our curated selection of courses tailored to enhance your capabilities and accelerate your career journey.<br/>Whether you are looking to sharpen specific skills, gain industry expertise, or embark on a new career path entirely, we have the resources you need.</p><dl class="stats"><div><dt>12K</dt><dd>Students</dd></div><div><dt>70+</dt><dd>Courses</dd></div><div><dt>16</dt><dd>Creators</dd></div></dl></div><img class="feature-art growth-art" src="${asset("growth-art.webp")}" alt="Student with a laptop, a Figma course, and a 55 percent learning progress card" width="665" height="690" loading="lazy"/></div><div class="feature-row creator-feature" id="creators"><img class="feature-art creator-art" src="${asset("creator-art.webp")}" alt="Course creator with a tablet, earnings cards, and happy students" width="600" height="665" loading="lazy"/><div class="feature-copy"><h2>Create &amp; Manage<br/>Courses Easily.</h2><p><strong>ByteSpace</strong> supports individuals or entities in the creation, publication, and administration of educational courses.</p><ul class="benefits"><li>Share Your Expertise</li><li>Monetize Your Passion</li><li>Flexibility and Autonomy</li><li>Build a Community</li></ul></div></div></div></section>
  <section class="creator-cta blue-grid"><img class="cta-art cta-left" src="${asset("creator-left.webp")}" width="210" height="483" alt="" loading="lazy"/><div class="container"><h2>Unlock Your Potential as a<br/>Creator with ByteSpace</h2><p>Experience the collaboration of numerous creators and an expanding selection of courses. Register now and become a<br class="desktop-break"/> part of a community comprising over 10,000 local and international creators. Utilize our Course Editor, and showcase your<br class="desktop-break"/> expertise by publishing your finest course on the ByteSpace Course Library.</p><a class="button" href="/signup?role=creator">Join as Creator</a></div><img class="cta-art cta-right" src="${asset("creator-right.webp")}" width="210" height="483" alt="" loading="lazy"/></section>
  <section class="community"><div class="container"><div class="community-heading"><h2>Discover What Our<br/>Community Is Saying</h2><p>At ByteSpace, our vibrant community of learners and creators is at the heart of what we do. Hear directly from those who have experienced the transformative journey of learning and creating on our platform. Explore testimonials that reflect the diverse perspectives of enthusiastic learners and accomplished creators.</p></div><div class="testimonials">${[
    [
      "sarah",
      "Sarah M.",
      "Enthusiastic Learner",
      "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.",
    ],
    [
      "james",
      "James L.",
      "Lifelong Learner",
      "I've tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.",
    ],
    [
      "alex",
      "Alex B.",
      "Inspired Creator",
      "As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It's fulfilling to see my courses making a positive impact on learners globally.",
    ],
  ]
    .map(
      ([img, name, role, quote]) =>
        `<figure class="testimonial"><img src="${asset("avatar-" + img + ".webp")}" width="80" height="80" alt="${name}" loading="lazy"/><figcaption><h3>${name}</h3><p>${role}</p></figcaption><blockquote>“${quote}”</blockquote></figure>`,
    )
    .join("")}</div></div></section>
  </main>${footer()}`;
}
