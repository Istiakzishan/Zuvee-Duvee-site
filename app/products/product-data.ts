export type ProductDetail = {
  slug: string;
  name: string;
  shortName: string;
  nameBn: string;
  shortNameBn: string;
  age: string;
  ageBn: string;
  price: string;
  priceValue: string;
  purchasable: boolean;
  tags: string[];
  tagsBn: string[];
  position: string;
  intro: string;
  introBn: string;
  description: string;
  descriptionBn: string;
  selectedReason: [string, string];
  selectedReasonBn: [string, string];
  benefits: { title: string; titleBn: string; copy: string; copyBn: string }[];
  specs: { label: string; labelBn: string; value: string; valueBn: string }[];
  details: { title: string; titleBn: string; copy: string; copyBn: string }[];
  seoTitle: string;
  seoTitleBn: string;
  seoCopy: string;
  seoCopyBn: string;
  gallery: { src: string; alt: string; altBn: string; position?: string }[];
};

const commonGallery = (position: string, name: string, nameBn: string): ProductDetail["gallery"] => [
  { src: "/age-zuvee-duvee.webp", alt: `${name} arranged for calm developmental play`, altBn: `${nameBn} শান্ত বিকাশভিত্তিক খেলার জন্য সাজানো`, position },
  { src: "/story-zuvee-duvee.webp", alt: "Small hands exploring activity components", altBn: "ছোট হাত অ্যাক্টিভিটি অংশ অন্বেষণ করছে" },
  { src: "/hero-zuvee-duvee.webp", alt: "Parent and child sharing a calm play moment", altBn: "অভিভাবক ও শিশু শান্ত খেলার মুহূর্ত ভাগ করছে", position: "50% center" },
];

export const products: ProductDetail[] = [
  {
    slug: "montessori-busy-cube",
    name: "Zuvee Duvee 10-in-1 Montessori Busy Cube",
    shortName: "10-in-1 Busy Cube",
    nameBn: "Zuvee Duvee ১০-ইন-১ মন্টেসরি বিজি কিউব",
    shortNameBn: "১০-ইন-১ বিজি কিউব",
    age: "Age pending",
    ageBn: "বয়স যাচাই বাকি",
    price: "৳ 2,450",
    priceValue: "2450",
    purchasable: true,
    tags: ["Fine motor", "Sensory", "Hand-eye"],
    tagsBn: ["ফাইন মোটর", "সেন্সরি", "হাত-চোখ"],
    position: "13% center",
    intro: "A portable 10-activity busy cube for hands-on sensory play, supporting fine-motor practice and hand-eye coordination.",
    introBn: "১০টি মজার কার্যক্রমসহ বহনযোগ্য একটি বিজি কিউব, যা হাতে-কলমে খেলার মাধ্যমে সূক্ষ্ম নড়াচড়া ও হাত-চোখের সমন্বয়ের অনুশীলনে সহায়তা করে।",
    description: "Keep little hands engaged with switches, turning parts, spinning pieces, pulling, pushing and texture exploration. Its compact design and wrist strap make it useful at home or while travelling.",
    descriptionBn: "শিশুর ছোট হাতকে আনন্দের সঙ্গে ব্যস্ত রাখতে এতে সুইচ চাপা, ঘোরানো, স্পিন করা, টানা, ঠেলা ও বিভিন্ন স্পর্শ অন্বেষণের সুযোগ রয়েছে। আকারে ছোট এবং কবজির স্ট্র্যাপ থাকায় বাসায় বা ভ্রমণে সহজে ব্যবহার করা যায়।",
    selectedReason: ["Many little actions, one considered toy.", "Young children often return to simple actions: turning, grasping, moving and placing. This busy cube brings those actions together in a contained format that can invite repeated exploration."],
    selectedReasonBn: ["অনেক ছোট কাজ, এক বিবেচিত খেলনা।", "শিশুরা প্রায়ই ঘোরানো, ধরা, সরানো ও বসানোর মতো সহজ কাজে ফিরে আসে। এই বিজি কিউব সেসব কাজকে একসঙ্গে এনে বারবার অন্বেষণের সুযোগ দেয়।"],
    benefits: [
      { title: "Controlled hand movements", titleBn: "নিয়ন্ত্রিত হাতের নড়াচড়া", copy: "Pressing, turning and grasping invite small hands to practise movement with intention.", copyBn: "চাপ দেওয়া, ঘোরানো ও ধরা ছোট হাতকে মনোযোগ দিয়ে নড়াচড়ার অনুশীলনে সহায়তা করে।" },
      { title: "Sensory exploration", titleBn: "ইন্দ্রিয়ভিত্তিক অনুসন্ধান", copy: "Colors, shapes, textures and movement create small moments of noticing.", copyBn: "রং, আকার, স্পর্শ ও নড়াচড়া ছোট ছোট লক্ষ্য করার মুহূর্ত তৈরি করে।" },
      { title: "Cause and effect", titleBn: "কারণ ও ফল", copy: "Children can notice how an action creates a visible or physical response.", copyBn: "শিশু বুঝতে পারে একটি কাজ করলে কীভাবে দৃশ্যমান বা শারীরিক প্রতিক্রিয়া তৈরি হয়।" },
    ],
    specs: [
      { label: "Recommended age", labelBn: "প্রস্তাবিত বয়স", value: "Packaging verification required", valueBn: "প্যাকেজিং থেকে যাচাই প্রয়োজন" },
      { label: "Play focus", labelBn: "খেলার ফোকাস", value: "Fine motor skills, sensory exploration, hand-eye coordination", valueBn: "সূক্ষ্ম নড়াচড়া, ইন্দ্রিয়ভিত্তিক অনুসন্ধান, হাত-চোখের সমন্বয়" },
      { label: "Included", labelBn: "যা থাকে", value: "10 activity panels; exact component list requires packaging verification", valueBn: "১০টি অ্যাক্টিভিটি প্যানেল; সঠিক অংশের তালিকা প্যাকেজিং থেকে যাচাই প্রয়োজন" },
      { label: "Safety note", labelBn: "নিরাপত্তা নোট", value: "Confirm age grade, materials, warnings and component safety before use", valueBn: "ব্যবহারের আগে বয়স, উপাদান, সতর্কতা ও অংশের নিরাপত্তা নিশ্চিত করুন" },
    ],
    details: [
      { title: "Play ideas", titleBn: "খেলার ধারণা", copy: "Begin with one action at a time. Let your child watch, try and repeat without rushing to show every feature.", copyBn: "একবারে একটি কাজ দিয়ে শুরু করুন। সব ফিচার দ্রুত দেখানোর বদলে শিশুকে দেখতে, চেষ্টা করতে ও পুনরাবৃত্তি করতে দিন।" },
      { title: "Supervision", titleBn: "তত্ত্বাবধান", copy: "Use with attentive adult supervision and check the product before each play session.", copyBn: "প্রাপ্তবয়স্কের সতর্ক তত্ত্বাবধানে ব্যবহার করুন এবং প্রতিবার খেলার আগে পণ্যটি পরীক্ষা করুন।" },
    ],
    seoTitle: "A compact way to support curious hands.",
    seoTitleBn: "কৌতূহলী হাতের জন্য কমপ্যাক্ট সহায়ক খেলা।",
    seoCopy: "For parents comparing activity toys in Bangladesh, this busy cube keeps the focus on hands-on actions children can repeat and understand.",
    seoCopyBn: "বাংলাদেশে অ্যাক্টিভিটি টয় খুঁজছেন এমন অভিভাবকদের জন্য এই বিজি কিউব হাতে-কলমে করা যায় এমন পুনরাবৃত্তিমূলক কাজকে গুরুত্ব দেয়।",
    gallery: commonGallery("13% center", "10-in-1 Montessori Busy Cube", "১০-ইন-১ মন্টেসরি বিজি কিউব"),
  },
  {
    slug: "magnetic-fishing-shape-puzzle",
    name: "Zuvee Duvee 2-in-1 Magnetic Fishing & Wooden Shape Puzzle",
    shortName: "Magnetic Fishing & Shape Puzzle",
    nameBn: "Zuvee Duvee ২-ইন-১ ম্যাগনেটিক ফিশিং ও কাঠের শেপ পাজল",
    shortNameBn: "ম্যাগনেটিক ফিশিং ও শেপ পাজল",
    age: "2+ years",
    ageBn: "২+ বছর",
    price: "৳ 1,280",
    priceValue: "1280",
    purchasable: true,
    tags: ["Matching", "Problem solving", "Fine motor"],
    tagsBn: ["মেলানো", "সমস্যা সমাধান", "ফাইন মোটর"],
    position: "50% center",
    intro: "A 2-in-1 magnetic fishing and wooden shape puzzle with 16 colorful blocks for matching, stacking and fine-motor play.",
    introBn: "ম্যাগনেটিক ফিশিং ও ১৬টি রঙিন কাঠের ব্লকসহ ২-ইন-১ শেপ পাজল, যা মেলানো, সাজানো ও সূক্ষ্ম নড়াচড়ার খেলায় সহায়তা করে।",
    description: "Children can enjoy a magnetic fishing activity, then sort and stack colorful wooden shape blocks on the matching board. The two play modes support coordination, color and shape recognition, matching and creative play.",
    descriptionBn: "শিশু প্রথমে ম্যাগনেটিক ফিশিং খেলতে পারে, এরপর রঙিন কাঠের শেপ ব্লক সঠিক জায়গায় সাজাতে ও স্ট্যাক করতে পারে। দুই ধরনের খেলা সমন্বয়, রং ও আকার চেনা, মিল খোঁজা এবং সৃজনশীল খেলায় সহায়তা করে।",
    selectedReason: ["Two clear play modes in one set.", "Fishing, sorting and stacking create varied but understandable challenges that children can revisit as their confidence grows."],
    selectedReasonBn: ["এক সেটে দুই ধরনের স্পষ্ট খেলা।", "ফিশিং, সাজানো ও স্ট্যাকিং শিশুর আত্মবিশ্বাস বাড়ার সঙ্গে বারবার করা যায় এমন ভিন্ন কিন্তু সহজবোধ্য চ্যালেঞ্জ তৈরি করে।"],
    benefits: [
      { title: "Sorting and matching", titleBn: "সাজানো ও মেলানো", copy: "Children compare colors, shapes and board positions while looking for a match.", copyBn: "শিশু মিল খুঁজতে গিয়ে রং, আকার ও বোর্ডের অবস্থান তুলনা করে।" },
      { title: "Hand-eye coordination", titleBn: "হাত-চোখের সমন্বয়", copy: "Fishing and placing blocks connect what children see with how their hands move.", copyBn: "ফিশিং ও ব্লক বসানোর মাধ্যমে দেখা ও হাতের নড়াচড়ার সমন্বয় হয়।" },
      { title: "Problem solving", titleBn: "সমস্যা সমাধান", copy: "Each piece gives a small opportunity to try, adjust and try again.", copyBn: "প্রতিটি অংশ চেষ্টা করা, ঠিক করা ও আবার চেষ্টা করার ছোট সুযোগ দেয়।" },
    ],
    specs: [
      { label: "Recommended age", labelBn: "প্রস্তাবিত বয়স", value: "2+ years, source claim", valueBn: "২+ বছর, উৎসে উল্লেখিত" },
      { label: "Included", labelBn: "যা থাকে", value: "Base, 16 shape blocks and magnetic fishing components", valueBn: "বেস, ১৬টি শেপ ব্লক ও ম্যাগনেটিক ফিশিং অংশ" },
      { label: "Dimensions", labelBn: "সাইজ", value: "23 x 11.8 x 6.3 cm, source claim", valueBn: "২৩ x ১১.৮ x ৬.৩ সেমি, উৎসে উল্লেখিত" },
      { label: "Safety note", labelBn: "নিরাপত্তা নোট", value: "Confirm magnet attachment, component size, coating and age grade before use", valueBn: "ব্যবহারের আগে ম্যাগনেট, অংশের সাইজ, কোটিং ও বয়সের নির্দেশনা নিশ্চিত করুন" },
    ],
    details: [
      { title: "Play ideas", titleBn: "খেলার ধারণা", copy: "Start with matching a few blocks, then add the fishing activity once your child understands the board.", copyBn: "প্রথমে কয়েকটি ব্লক মেলানো দিয়ে শুরু করুন, এরপর বোর্ড বুঝে গেলে ফিশিং কার্যক্রম যোগ করুন।" },
      { title: "Small parts", titleBn: "ছোট অংশ", copy: "Measure removable pieces and follow packaging guidance before use by children under 3.", copyBn: "৩ বছরের কম বয়সী শিশুর ক্ষেত্রে খোলা যায় এমন অংশ মেপে প্যাকেজিংয়ের নির্দেশনা অনুসরণ করুন।" },
    ],
    seoTitle: "Shape matching with a playful fishing challenge.",
    seoTitleBn: "মজার ফিশিং চ্যালেঞ্জসহ শেপ মেলানোর খেলা।",
    seoCopy: "This 2-in-1 set gives toddlers and preschoolers a simple way to practise matching, sorting and hand-eye coordination through hands-on play.",
    seoCopyBn: "এই ২-ইন-১ সেট টডলার ও প্রিস্কুল শিশুদের হাতে-কলমে খেলার মাধ্যমে মেলানো, সাজানো ও হাত-চোখের সমন্বয় অনুশীলনের সহজ সুযোগ দেয়।",
    gallery: commonGallery("50% center", "Magnetic Fishing & Shape Puzzle", "ম্যাগনেটিক ফিশিং ও শেপ পাজল"),
  },
  {
    slug: "wooden-shape-matching-board",
    name: "Zuvee Duvee Wooden Shape Matching Board",
    shortName: "Wooden Shape Matching Board",
    nameBn: "Zuvee Duvee কাঠের শেপ ম্যাচিং বোর্ড",
    shortNameBn: "কাঠের শেপ ম্যাচিং বোর্ড",
    age: "2-5 years",
    ageBn: "২-৫ বছর",
    price: "৳ 1,850",
    priceValue: "1850",
    purchasable: true,
    tags: ["Shape recognition", "Sorting", "Hand-eye"],
    tagsBn: ["আকার চেনা", "সাজানো", "হাত-চোখ"],
    position: "86% center",
    intro: "A colorful five-column wooden matching board for sorting shapes, recognizing colors and practicing hand-eye coordination.",
    introBn: "রঙিন পাঁচ-কলামের কাঠের ম্যাচিং বোর্ড, যা আকার সাজানো, রং চেনা এবং হাত-চোখের সমন্বয়ের অনুশীলনে সহায়তা করে।",
    description: "Children choose a colorful wooden piece, identify its shape and holes, and place it over the matching pegs. Repeating the activity supports fine-motor practice, sorting and visual-spatial thinking.",
    descriptionBn: "শিশু একটি রঙিন কাঠের অংশ বেছে নিয়ে তার আকার ও ছিদ্র দেখে সঠিক পেগের সঙ্গে মিলিয়ে বসায়। বারবার এই কাজ করার মাধ্যমে সূক্ষ্ম নড়াচড়া, সাজানো ও স্থানিক ধারণার অনুশীলন হয়।",
    selectedReason: ["A quiet matching challenge.", "This board gives children a clear task: compare, rotate, place and check. That clarity makes it easy to revisit without noise or pressure."],
    selectedReasonBn: ["শান্তভাবে মেলানোর চ্যালেঞ্জ।", "এই বোর্ড শিশুকে একটি স্পষ্ট কাজ দেয়: তুলনা করা, ঘোরানো, বসানো ও মিল দেখা। তাই শব্দ বা চাপ ছাড়াই বারবার খেলা যায়।"],
    benefits: [
      { title: "Shape recognition", titleBn: "আকার চেনা", copy: "Children notice edges, holes and visual differences as they match each piece.", copyBn: "প্রতিটি অংশ মেলাতে গিয়ে শিশু প্রান্ত, ছিদ্র ও দৃশ্যমান পার্থক্য লক্ষ্য করে।" },
      { title: "Fine motor practice", titleBn: "সূক্ষ্ম নড়াচড়ার অনুশীলন", copy: "Picking up and placing pieces builds controlled hand movement.", copyBn: "অংশ তোলা ও বসানো নিয়ন্ত্রিত হাতের নড়াচড়ার অনুশীলন করায়।" },
      { title: "Visual-spatial thinking", titleBn: "স্থানিক চিন্তা", copy: "Peg positions help children think about where and how a piece fits.", copyBn: "পেগের অবস্থান শিশুকে কোন অংশ কোথায় ও কীভাবে বসে তা ভাবতে সহায়তা করে।" },
    ],
    specs: [
      { label: "Recommended age", labelBn: "প্রস্তাবিত বয়স", value: "2-5 years, source claim", valueBn: "২-৫ বছর, উৎসে উল্লেখিত" },
      { label: "Materials", labelBn: "উপাদান", value: "Wood, source claim; finish unverified", valueBn: "কাঠ, উৎসে উল্লেখিত; ফিনিশ যাচাই বাকি" },
      { label: "Dimensions", labelBn: "সাইজ", value: "30 x 6.8 x 5.5 cm, source image", valueBn: "৩০ x ৬.৮ x ৫.৫ সেমি, উৎসের ছবিতে উল্লেখিত" },
      { label: "Safety note", labelBn: "নিরাপত্তা নোট", value: "Measure removable blocks for small-part risk, especially under age 3", valueBn: "বিশেষ করে ৩ বছরের কম বয়সী শিশুর জন্য খোলা যায় এমন ব্লক ছোট অংশ কিনা মাপুন" },
    ],
    details: [
      { title: "Play ideas", titleBn: "খেলার ধারণা", copy: "Begin with two or three shapes, then add more as your child gains confidence.", copyBn: "প্রথমে দুই বা তিনটি আকার দিয়ে শুরু করুন, এরপর শিশুর আত্মবিশ্বাস বাড়লে আরও যোগ করুন।" },
      { title: "Care", titleBn: "যত্ন", copy: "Keep pieces together after play and inspect pegs, edges, paint and coating regularly.", copyBn: "খেলার পর অংশগুলো একসঙ্গে রাখুন এবং পেগ, প্রান্ত, রং ও কোটিং নিয়মিত পরীক্ষা করুন।" },
    ],
    seoTitle: "A simple board for focused shape learning.",
    seoTitleBn: "মনোযোগী শেপ শেখার জন্য সহজ বোর্ড।",
    seoCopy: "Shape matching supports calm, repeatable problem solving when children can see the task clearly and try again at their own pace.",
    seoCopyBn: "শিশু যখন কাজটি স্পষ্টভাবে দেখতে পায় এবং নিজের গতিতে আবার চেষ্টা করতে পারে, তখন শেপ মেলানো শান্ত ও পুনরাবৃত্তিমূলক সমস্যা সমাধানে সহায়তা করে।",
    gallery: commonGallery("86% center", "Wooden Shape Matching Board", "কাঠের শেপ ম্যাচিং বোর্ড"),
  },
  {
    slug: "magnetic-tangram-puzzle-book",
    name: "Zuvee Duvee Magnetic Tangram Puzzle Book",
    shortName: "Magnetic Tangram Puzzle Book",
    nameBn: "Zuvee Duvee ম্যাগনেটিক ট্যানগ্রাম পাজল বুক",
    shortNameBn: "ম্যাগনেটিক ট্যানগ্রাম পাজল বুক",
    age: "3+ years",
    ageBn: "৩+ বছর",
    price: "৳ 2,150",
    priceValue: "2150",
    purchasable: true,
    tags: ["Logic", "Creativity", "Spatial thinking"],
    tagsBn: ["যুক্তি", "সৃজনশীলতা", "স্থানিক চিন্তা"],
    position: "38% center",
    intro: "A portable magnetic tangram book for building pictures, letters, numbers and patterns while practicing logic and spatial thinking.",
    introBn: "ছবি, অক্ষর, সংখ্যা ও প্যাটার্ন তৈরির জন্য বহনযোগ্য ম্যাগনেটিক ট্যানগ্রাম বুক, যা যুক্তি ও স্থানিক চিন্তার অনুশীলনে সহায়তা করে।",
    description: "The portable book keeps magnetic pieces and the activity surface together. Children can follow included patterns or create original designs, supporting problem solving, concentration, creativity and early geometry.",
    descriptionBn: "বহনযোগ্য বইটির ভেতরেই ম্যাগনেটিক অংশ ও খেলার জায়গা থাকে। শিশু দেওয়া নকশা অনুসরণ করতে পারে অথবা নিজের মতো ডিজাইন বানাতে পারে, যা সমস্যা সমাধান, মনোযোগ, সৃজনশীলতা ও প্রাথমিক জ্যামিতির অনুশীলনে সহায়তা করে।",
    selectedReason: ["Portable pattern play with room to invent.", "Tangram pieces invite children to copy, rotate, compare and create, giving them both structure and open-ended play."],
    selectedReasonBn: ["বহনযোগ্য প্যাটার্ন খেলা, নতুন বানানোর সুযোগসহ।", "ট্যানগ্রাম অংশ শিশুদের কপি করা, ঘোরানো, তুলনা করা ও তৈরি করার সুযোগ দেয়, তাই এতে কাঠামো ও উন্মুক্ত খেলা দুটোই আছে।"],
    benefits: [
      { title: "Logical thinking", titleBn: "যৌক্তিক চিন্তা", copy: "Children test how pieces combine to form a target shape or picture.", copyBn: "শিশু পরীক্ষা করে কোন অংশ কীভাবে মিলে কাঙ্ক্ষিত আকার বা ছবি তৈরি করে।" },
      { title: "Creativity", titleBn: "সৃজনশীলতা", copy: "Open patterns leave space to invent pictures, letters and new arrangements.", copyBn: "উন্মুক্ত প্যাটার্ন ছবি, অক্ষর ও নতুন বিন্যাস তৈরির সুযোগ দেয়।" },
      { title: "Concentration", titleBn: "মনোযোগ", copy: "Quiet puzzle play encourages staying with one idea a little longer.", copyBn: "শান্ত পাজল খেলা একটি ধারণার সঙ্গে কিছুটা বেশি সময় থাকতে উৎসাহ দেয়।" },
    ],
    specs: [
      { label: "Recommended age", labelBn: "প্রস্তাবিত বয়স", value: "3+ years, source claim", valueBn: "৩+ বছর, উৎসে উল্লেখিত" },
      { label: "Play focus", labelBn: "খেলার ফোকাস", value: "Tangram, geometry, pattern building, creativity", valueBn: "ট্যানগ্রাম, জ্যামিতি, প্যাটার্ন তৈরি, সৃজনশীলতা" },
      { label: "Included", labelBn: "যা থাকে", value: "Magnetic tangram pieces and puzzle book; exact piece count requires verification", valueBn: "ম্যাগনেটিক ট্যানগ্রাম অংশ ও পাজল বুক; সঠিক অংশসংখ্যা যাচাই প্রয়োজন" },
      { label: "Safety note", labelBn: "নিরাপত্তা নোট", value: "Confirm magnet enclosure and small-part warnings before use", valueBn: "ব্যবহারের আগে ম্যাগনেট ও ছোট অংশের সতর্কতা নিশ্চিত করুন" },
    ],
    details: [
      { title: "Play ideas", titleBn: "খেলার ধারণা", copy: "Offer one pattern first, then invite your child to change one piece and notice what becomes different.", copyBn: "প্রথমে একটি প্যাটার্ন দিন, এরপর একটি অংশ বদলাতে বলুন এবং কী বদলায় তা লক্ষ্য করতে দিন।" },
      { title: "Travel use", titleBn: "ভ্রমণে ব্যবহার", copy: "The book format helps keep the play surface and pieces together during quiet travel moments.", copyBn: "বইয়ের ফরম্যাট শান্ত ভ্রমণের সময়ে খেলার জায়গা ও অংশগুলো একসঙ্গে রাখতে সহায়তা করে।" },
    ],
    seoTitle: "Portable tangram play for logic and imagination.",
    seoTitleBn: "যুক্তি ও কল্পনার জন্য বহনযোগ্য ট্যানগ্রাম খেলা।",
    seoCopy: "Magnetic tangram play gives preschoolers a practical way to explore geometry, patterns and creative problem solving at home or while travelling.",
    seoCopyBn: "ম্যাগনেটিক ট্যানগ্রাম খেলা প্রিস্কুল শিশুদের বাসায় বা ভ্রমণে জ্যামিতি, প্যাটার্ন ও সৃজনশীল সমস্যা সমাধান অন্বেষণের বাস্তব সুযোগ দেয়।",
    gallery: commonGallery("38% center", "Magnetic Tangram Puzzle Book", "ম্যাগনেটিক ট্যানগ্রাম পাজল বুক"),
  },
  {
    slug: "wooden-geoboard-set",
    name: "Zuvee Duvee Wooden Geoboard Set",
    shortName: "Wooden Geoboard Set",
    nameBn: "Zuvee Duvee কাঠের জিওবোর্ড সেট",
    shortNameBn: "কাঠের জিওবোর্ড সেট",
    age: "3+ years",
    ageBn: "৩+ বছর",
    price: "Price coming soon",
    priceValue: "0",
    purchasable: false,
    tags: ["Geometry", "Fine motor", "Creativity"],
    tagsBn: ["জ্যামিতি", "ফাইন মোটর", "সৃজনশীলতা"],
    position: "68% center",
    intro: "A wooden 64-peg geoboard with activity cards and colorful bands for creating shapes, letters, pictures and patterns.",
    introBn: "৬৪টি পেগ, অ্যাক্টিভিটি কার্ড ও রঙিন ব্যান্ডসহ কাঠের জিওবোর্ড, যা আকার, অক্ষর, ছবি ও প্যাটার্ন তৈরির খেলায় ব্যবহার করা যায়।",
    description: "Children stretch colorful bands around pegs to copy cards or invent their own patterns. This supports grip practice, fine-motor control, hand-eye coordination, shape recognition and early geometry.",
    descriptionBn: "শিশু রঙিন ব্যান্ড পেগের চারপাশে বসিয়ে কার্ডের নকশা কপি করতে পারে অথবা নিজের প্যাটার্ন বানাতে পারে। এতে গ্রিপ, সূক্ষ্ম নড়াচড়া, হাত-চোখের সমন্বয়, আকার চেনা ও প্রাথমিক জ্যামিতির অনুশীলন হয়।",
    selectedReason: ["Hands-on geometry they can build.", "A geoboard turns abstract shapes into something children can make with their own hands, adjust and remake."],
    selectedReasonBn: ["নিজে বানানো যায় এমন হাতে-কলমে জ্যামিতি।", "জিওবোর্ড বিমূর্ত আকারকে শিশুর নিজের হাতে বানানো, বদলানো ও আবার বানানোর মতো অভিজ্ঞতায় পরিণত করে।"],
    benefits: [
      { title: "Grip practice", titleBn: "গ্রিপ অনুশীলন", copy: "Stretching bands around pegs invites finger control and hand strength.", copyBn: "পেগের চারপাশে ব্যান্ড বসানো আঙুলের নিয়ন্ত্রণ ও হাতের শক্তির অনুশীলন করায়।" },
      { title: "Early geometry", titleBn: "প্রাথমিক জ্যামিতি", copy: "Children can build shapes, letters and simple pictures on the peg grid.", copyBn: "শিশু পেগ গ্রিডে আকার, অক্ষর ও সহজ ছবি তৈরি করতে পারে।" },
      { title: "Creative patterning", titleBn: "সৃজনশীল প্যাটার্ন", copy: "Activity cards give guidance while blank space leaves room for invention.", copyBn: "অ্যাক্টিভিটি কার্ড দিকনির্দেশনা দেয়, আর খালি জায়গা নতুন কিছু বানানোর সুযোগ রাখে।" },
    ],
    specs: [
      { label: "Recommended age", labelBn: "প্রস্তাবিত বয়স", value: "3+ years, source claim", valueBn: "৩+ বছর, উৎসে উল্লেখিত" },
      { label: "Included", labelBn: "যা থাকে", value: "64-peg board, 23 activity cards and two packs of colored bands, source claim", valueBn: "৬৪ পেগের বোর্ড, ২৩টি অ্যাক্টিভিটি কার্ড ও দুই প্যাক রঙিন ব্যান্ড, উৎসে উল্লেখিত" },
      { label: "Dimensions", labelBn: "সাইজ", value: "Conflicting source claims: 17 x 16 x 4 cm and 15 x 15 x 2 cm", valueBn: "উৎসে দুই ধরনের সাইজ আছে: ১৭ x ১৬ x ৪ সেমি এবং ১৫ x ১৫ x ২ সেমি" },
      { label: "Safety note", labelBn: "নিরাপত্তা নোট", value: "Confirm peg security, band safety, latex content and component size before use", valueBn: "ব্যবহারের আগে পেগ, ব্যান্ড, ল্যাটেক্স উপাদান ও অংশের সাইজ নিশ্চিত করুন" },
    ],
    details: [
      { title: "Play ideas", titleBn: "খেলার ধারণা", copy: "Copy one simple card first, then invite your child to change the color or stretch the shape wider.", copyBn: "প্রথমে একটি সহজ কার্ড কপি করুন, এরপর শিশুকে রং বদলাতে বা আকারটি বড় করে টানতে বলুন।" },
      { title: "Supervision", titleBn: "তত্ত্বাবধান", copy: "Adult supervision is recommended until peg, band and latex safety information is confirmed.", copyBn: "পেগ, ব্যান্ড ও ল্যাটেক্স সংক্রান্ত নিরাপত্তা নিশ্চিত না হওয়া পর্যন্ত প্রাপ্তবয়স্কের তত্ত্বাবধান প্রয়োজন।" },
    ],
    seoTitle: "Buildable geometry for focused creative play.",
    seoTitleBn: "মনোযোগী সৃজনশীল খেলার জন্য বানানো যায় এমন জ্যামিতি।",
    seoCopy: "A geoboard helps children turn shape ideas into visible patterns while practising finger control, coordination and early math thinking.",
    seoCopyBn: "জিওবোর্ড শিশুকে আকারের ধারণাকে দৃশ্যমান প্যাটার্নে রূপ দিতে সহায়তা করে, পাশাপাশি আঙুলের নিয়ন্ত্রণ, সমন্বয় ও প্রাথমিক গণিতচিন্তার অনুশীলন করায়।",
    gallery: commonGallery("68% center", "Wooden Geoboard Set", "কাঠের জিওবোর্ড সেট"),
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
