export type ProductDetail = {
  slug: string;
  name: string;
  age: string;
  price: string;
  priceValue: string;
  tags: string[];
  position: string;
  intro: string;
  description: string;
  selectedReason: [string, string];
  benefits: { title: string; copy: string }[];
  details: { title: string; copy: string }[];
  seoTitle: string;
  seoCopy: string;
  gallery: { src: string; alt: string; position?: string }[];
};

export const products: ProductDetail[] = [
  {
    slug: "little-hands-activity-cube",
    name: "Little Hands Activity Cube",
    age: "12m+",
    price: "৳ 2,450",
    priceValue: "2450",
    tags: ["Fine motor play", "Problem solving", "Hand-eye coordination"],
    position: "13% center",
    intro: "A thoughtfully selected activity cube that brings several small hand movements into one calm play experience.",
    description: "A hands-on activity cube for children 12 months and older, thoughtfully selected for turning, grasping, placing and early problem-solving play.",
    selectedReason: ["Many little actions, one considered toy.", "Young children often return to simple actions: turning, grasping, moving and placing. This activity cube brings those actions together in a contained format that can invite repeated exploration."],
    benefits: [
      { title: "Controlled hand movements", copy: "Turning, pressing and grasping can give small hands opportunities to practise movement with intention." },
      { title: "Cause and effect", copy: "Children can notice how an action creates a visible or physical response." },
      { title: "Trying another way", copy: "Different activities encourage curiosity, repetition and early problem-solving habits." },
    ],
    details: [
      { title: "Age guidance", copy: "Considered for children from approximately 12 months. Every child develops at a different pace, so observe their current interests and abilities." },
      { title: "Play ideas", copy: "Begin with one action at a time. Let your child watch, try and repeat without rushing to show every feature." },
      { title: "Supervision", copy: "Use with attentive adult supervision and check the product before each play session." },
      { title: "Delivery in Bangladesh", copy: "Delivery is available across Bangladesh. Exact charges and estimated timing are confirmed during order processing." },
    ],
    seoTitle: "A calmer way to choose developmental play.",
    seoCopy: "For parents looking for an activity cube in Bangladesh, the most useful question is not how many features it has. The better question is whether those features suit what a child is beginning to explore.",
    gallery: [
      { src: "/hero-zuvee-duvee.webp", alt: "Little Hands Activity Cube used during calm parent-and-child play", position: "center" },
      { src: "/story-zuvee-duvee.webp", alt: "Close view of small hands turning and grasping activity components" },
      { src: "/age-zuvee-duvee.webp", alt: "Thoughtfully selected play objects arranged on warm cream surfaces", position: "13% center" },
    ],
  },
  {
    slug: "soft-discovery-set",
    name: "Soft Discovery Set",
    age: "4m+",
    price: "৳ 1,280",
    priceValue: "1280",
    tags: ["Sensory", "Grasping", "Tummy time"],
    position: "50% center",
    intro: "A soft first-play set for babies beginning to look, reach, grasp and notice gentle textures.",
    description: "A soft discovery set for babies from 4 months, selected for early sensory play, grasping practice and quiet parent-guided exploration.",
    selectedReason: ["Soft textures for early noticing.", "Early play is often simple and sensory. This set keeps the experience gentle, giving babies objects to look at, reach for and hold while adults stay close."],
    benefits: [
      { title: "Early grasping", copy: "Soft pieces invite babies to close their fingers, hold briefly and release." },
      { title: "Sensory discovery", copy: "Gentle textures and shapes create small moments of noticing without overstimulation." },
      { title: "Shared floor play", copy: "The set fits short parent-guided play moments during tummy time or calm awake periods." },
    ],
    details: [
      { title: "Age guidance", copy: "Considered for babies from approximately 4 months, when they are beginning to reach and grasp." },
      { title: "Play ideas", copy: "Place one piece within reach and let your baby notice it before offering another." },
      { title: "Care", copy: "Check care guidance on the product packaging and inspect pieces regularly." },
      { title: "Delivery in Bangladesh", copy: "Delivery is available across Bangladesh. Exact charges and estimated timing are confirmed during order processing." },
    ],
    seoTitle: "Simple sensory play for the earliest months.",
    seoCopy: "For babies, thoughtful play often starts with softness, contrast, texture and the comfort of a nearby adult. Zuvee Duvee selects baby toys with gentle exploration in mind.",
    gallery: [
      { src: "/age-zuvee-duvee.webp", alt: "Soft discovery objects arranged for baby sensory play", position: "50% center" },
      { src: "/hero-zuvee-duvee.webp", alt: "Parent and baby sharing a calm play moment", position: "45% center" },
      { src: "/story-zuvee-duvee.webp", alt: "Small hands exploring soft activity textures" },
    ],
  },
  {
    slug: "woodland-shape-puzzle",
    name: "Woodland Shape Puzzle",
    age: "3y+",
    price: "৳ 1,850",
    priceValue: "1850",
    tags: ["Logic", "Hand-eye", "Matching"],
    position: "86% center",
    intro: "A shape-matching puzzle for preschoolers beginning to compare, rotate, test and fit pieces with growing confidence.",
    description: "A woodland-themed shape puzzle for children 3 years and older, selected for matching, hand-eye coordination and early logical thinking.",
    selectedReason: ["A quiet challenge they can return to.", "Puzzles give children space to compare shapes, try an orientation, notice what fits and make small corrections independently."],
    benefits: [
      { title: "Shape recognition", copy: "Children can notice edges, corners and visual differences as they match each piece." },
      { title: "Hand-eye coordination", copy: "Lifting and placing pieces connects what children see with how their hands move." },
      { title: "Persistence", copy: "A familiar puzzle supports trying again without needing a noisy reward." },
    ],
    details: [
      { title: "Age guidance", copy: "Considered for children from approximately 3 years, with adult support when needed." },
      { title: "Play ideas", copy: "Start by removing two or three pieces, then add more as your child gains confidence." },
      { title: "Supervision", copy: "Use with attentive adult supervision and keep all pieces together after play." },
      { title: "Delivery in Bangladesh", copy: "Delivery is available across Bangladesh. Exact charges and estimated timing are confirmed during order processing." },
    ],
    seoTitle: "A thoughtful first puzzle for focused play.",
    seoCopy: "Shape puzzles can support calm, repeatable problem solving when they are matched to a child's current abilities. Zuvee Duvee chooses puzzles that feel clear, useful and easy to revisit.",
    gallery: [
      { src: "/age-zuvee-duvee.webp", alt: "Woodland shape puzzle arranged for preschool play", position: "86% center" },
      { src: "/story-zuvee-duvee.webp", alt: "Child's hands exploring puzzle pieces" },
      { src: "/hero-zuvee-duvee.webp", alt: "Calm family play setting with natural materials", position: "58% center" },
    ],
  },
  {
    slug: "press-and-turn-board",
    name: "Press & Turn Board",
    age: "18m+",
    price: "৳ 2,150",
    priceValue: "2150",
    tags: ["Focus", "Fine motor", "Cause and effect"],
    position: "38% center",
    intro: "A focused activity board for toddlers who enjoy pressing, turning and repeating actions with intent.",
    description: "A press and turn activity board for children 18 months and older, selected for fine motor practice, attention and cause-and-effect exploration.",
    selectedReason: ["Repeated actions with a reason.", "Toddlers often learn through repetition. This board gives them focused actions to revisit, with enough variation to keep curiosity active."],
    benefits: [
      { title: "Finger strength", copy: "Pressing and turning can support small muscle control through everyday play." },
      { title: "Focus and attention", copy: "Contained activities encourage a child to stay with one task a little longer." },
      { title: "Cause and effect", copy: "Simple responses help toddlers connect an action with what changes next." },
    ],
    details: [
      { title: "Age guidance", copy: "Considered for children from approximately 18 months who are interested in buttons, knobs and repeated actions." },
      { title: "Play ideas", copy: "Let your child explore freely first, then name the action they are trying: press, turn, slide or open." },
      { title: "Supervision", copy: "Use with attentive adult supervision and check moving parts before play." },
      { title: "Delivery in Bangladesh", copy: "Delivery is available across Bangladesh. Exact charges and estimated timing are confirmed during order processing." },
    ],
    seoTitle: "Focused toddler play with useful repetition.",
    seoCopy: "The best toddler activity boards invite real action without unnecessary noise. Zuvee Duvee looks for play that gives children something clear to do, repeat and understand.",
    gallery: [
      { src: "/age-zuvee-duvee.webp", alt: "Press and turn activity board shown in a warm play setting", position: "38% center" },
      { src: "/story-zuvee-duvee.webp", alt: "Small hands exploring knobs and activity pieces" },
      { src: "/hero-zuvee-duvee.webp", alt: "Parent and toddler playing together calmly", position: "50% center" },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
