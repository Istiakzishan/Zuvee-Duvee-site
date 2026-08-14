export type Article = {
  slug: string;
  number: string;
  title: string;
  readTime: string;
  excerpt: string;
  image: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "fine-motor-play",
    number: "01",
    title: "How fine motor skills develop through everyday play",
    readTime: "6 min read",
    excerpt: "The small turns, grasps and releases children practise in ordinary play are meaningful building blocks for growing independence.",
    image: "/story-zuvee-duvee.webp",
    sections: [
      { heading: "Small actions, growing control", paragraphs: ["Fine motor development is the gradual process of learning to use the small muscles in the hands, fingers and wrists with more control. It is not a race or a checklist. It grows through repeated, enjoyable chances to reach, hold, turn, press and let go.", "A child might first explore a ring by squeezing it, then discover that it can slide along a post. That shift from simply holding to intentionally moving is the kind of everyday learning that play can invite."] },
      { heading: "What useful play looks like", paragraphs: ["Look for toys and activities that offer a clear action without requiring a single correct result. Posting pieces, turning knobs, threading large rings and moving chunky shapes all give little hands something manageable to try.", "Keep the activity open and give your child time. You can describe what they are doing, but let their hands lead the discovery."] },
      { heading: "A gentle invitation", paragraphs: ["Offer one or two activities within easy reach, then follow your child’s interest. When the play becomes frustrating, simplify the setup or take a break. The goal is not perfect performance; it is a positive opportunity to practise at their own pace."] },
    ],
  },
  {
    slug: "choosing-toys-by-stage",
    number: "02",
    title: "Choosing toys for your child's current stage",
    readTime: "5 min read",
    excerpt: "Age ranges are useful starting points, but the best choice also reflects what your child is curious about and ready to explore today.",
    image: "/product-fishing-shape-puzzle.webp",
    sections: [
      { heading: "Start with the child in front of you", paragraphs: ["A stage is more than a number on a box. Notice the actions your child is already attempting: reaching across the body, matching shapes, carrying objects, making patterns or repeating a favourite movement.", "Choose a toy that is just interesting enough to invite the next step. It should feel achievable with room for discovery, rather than demanding a skill your child has not had a chance to practise yet."] },
      { heading: "Match complexity to attention", paragraphs: ["For younger babies, simple cause-and-effect and easy-to-grasp forms are often enough. As children grow, they may enjoy more parts, open-ended combinations or challenges with several possible solutions.", "A toy can be right for a child when it holds their attention for a few minutes, even if they return to it later. Short, repeated play is still valuable."] },
      { heading: "Let interest be your guide", paragraphs: ["The most useful age guidance combines safety information with observation. Follow what your child reaches for, repeats and tries to solve, and choose materials that can support those interests without crowding the play space."] },
    ],
  },
  {
    slug: "fewer-better-toys",
    number: "03",
    title: "Why children don't need dozens of toys",
    readTime: "4 min read",
    excerpt: "A smaller, considered collection can make space for deeper play, easier choices and a calmer home rhythm.",
    image: "/product-shape-matching-board.jpg",
    sections: [
      { heading: "More choice can become noise", paragraphs: ["When every surface is full of toys, children can find it harder to decide where to begin. A smaller selection makes each object easier to notice and gives play a clearer beginning.", "This does not mean removing everything or keeping a perfect home. It means making a little breathing room around the activities your child returns to most."] },
      { heading: "Rotate with intention", paragraphs: ["Try keeping a few favourites available and storing the rest for a later rotation. Bringing a familiar toy back after a pause can make it feel new again and reveal a different way to use it.", "Rotations work best when they stay flexible. Follow your child’s cues rather than a strict schedule, and leave room for ordinary household objects and outdoor play too."] },
      { heading: "Choose for possibility", paragraphs: ["A well-chosen toy can support several kinds of play as a child grows: building, sorting, imagining, repeating and solving. The value is in the possibilities it opens, not in how many features it has."] },
    ],
  },
];

export function getArticle(slug: string) { return articles.find((article) => article.slug === slug); }
