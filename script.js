
const translations = {
  en: {
    upload: "Upload Your Palm Photograph",
    lines: "Explore Palm Lines",
    generate: "Generate Palm Reading ✨",
    missing: "Please select at least one palm line.",
    heart: "Heart Line",
    head: "Head Line",
    life: "Life Line",
    fate: "Fate Line",
    sun: "Sun Line",
    mercury: "Mercury Line",
    marriage: "Relationship Lines"
  },
  ur: {
    upload: "اپنی ہتھیلی کی تصویر اپ لوڈ کریں",
    lines: "ہتھیلی کی لکیریں منتخب کریں",
    generate: "ہتھیلی کی ریڈنگ بنائیں ✨",
    missing: "کم از کم ایک لکیر منتخب کریں۔",
    heart: "دل کی لکیر",
    head: "دماغ کی لکیر",
    life: "زندگی کی لکیر",
    fate: "قسمت کی لکیر",
    sun: "سورج کی لکیر",
    mercury: "عطارد کی لکیر",
    marriage: "رشتوں کی لکیریں"
  },
  hi: {
    upload: "अपनी हथेली की तस्वीर अपलोड करें",
    lines: "हथेली की रेखाएँ चुनें",
    generate: "हस्तरेखा रिपोर्ट बनाएँ ✨",
    missing: "कम से कम एक रेखा चुनें।",
    heart: "हृदय रेखा",
    head: "मस्तिष्क रेखा",
    life: "जीवन रेखा",
    fate: "भाग्य रेखा",
    sun: "सूर्य रेखा",
    mercury: "बुध रेखा",
    marriage: "संबंध रेखाएँ"
  }
};

const readings = {
  en: {
    heart: "In traditional palmistry, the heart line is associated with emotional expression, affection and relationships. Its shape is interpreted symbolically.",
    head: "The head line is traditionally associated with thinking, learning and decision-making styles.",
    life: "The life line is traditionally interpreted as a symbol of vitality, life approach and personal experiences. It does not measure lifespan.",
    fate: "The fate line is traditionally associated with career direction, responsibilities and life changes.",
    sun: "The sun line is traditionally associated with creativity, confidence and recognition.",
    mercury: "The Mercury line is traditionally associated with communication, expression and practical skills.",
    marriage: "Relationship lines are traditionally interpreted as symbols of affection and close partnerships. They cannot predict marriage dates or guarantee relationships."
  },
  ur: {
    heart: "روایتی پامسٹری میں دل کی لکیر کو جذبات، محبت اور تعلقات کی علامت سمجھا جاتا ہے۔",
    head: "دماغ کی لکیر کو سوچنے، سیکھنے اور فیصلے کرنے کے انداز سے منسلک کیا جاتا ہے۔",
    life: "زندگی کی لکیر کو روایتی طور پر توانائی اور زندگی کے تجربات کی علامت سمجھا جاتا ہے۔ یہ عمر نہیں بتاتی۔",
    fate: "قسمت کی لکیر کو کیریئر، ذمہ داریوں اور زندگی کی تبدیلیوں سے جوڑا جاتا ہے۔",
    sun: "سورج کی لکیر کو تخلیقی صلاحیت، اعتماد اور پہچان کی علامت سمجھا جاتا ہے۔",
    mercury: "عطارد کی لکیر کو گفتگو، اظہار اور عملی مہارتوں سے منسلک کیا جاتا ہے۔",
    marriage: "رشتوں کی لکیروں کو محبت اور قریبی تعلقات کی علامت سمجھا جاتا ہے۔ یہ شادی کی تاریخ نہیں بتاتیں۔"
  },
  hi: {
    heart: "परंपरागत हस्तरेखा शास्त्र में हृदय रेखा को भावनाओं, स्नेह और संबंधों से जोड़ा जाता है।",
    head: "मस्तिष्क रेखा को सोचने, सीखने और निर्णय लेने की शैली का प्रतीक माना जाता है।",
    life: "जीवन रेखा को ऊर्जा और जीवन के अनुभवों से जोड़ा जाता है। यह आयु नहीं बताती।",
    fate: "भाग्य रेखा को करियर, जिम्मेदारियों और जीवन में बदलावों से जोड़ा जाता है।",
    sun: "सूर्य रेखा को रचनात्मकता, आत्मविश्वास और पहचान का प्रतीक माना जाता है।",
    mercury: "बुध रेखा को संवाद, अभिव्यक्ति और व्यावहारिक कौशल से जोड़ा जाता है।",
    marriage: "संबंध रेखाओं को स्नेह और करीबी रिश्तों का प्रतीक माना जाता है। ये विवाह की तारीख नहीं बतातीं।"
  }
};

const labels = {
  heart: "❤️ Heart Line",
  head: "🧠 Head Line",
  life: "🌿 Life Line",
  fate: "⭐ Fate Line",
  sun: "☀️ Sun Line",
  mercury: "💬 Mercury Line",
  marriage: "💞 Relationship Lines"
};

const imageInput = document.getElementById("palmImage");
const preview = document.getElementById("preview");
const clearButton = document.getElementById("clearImage");
const report = document.getElementById("report");
const error = document.getElementById("error");

let imageUrl = null;
let lastReport = "";

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  if (!file) return;

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    error.textContent = "Please select a JPG, PNG or WEBP image.";
    imageInput.value = "";
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    error.textContent = "Please select an image smaller than 10 MB.";
    imageInput.value = "";
    return;
  }

  if (imageUrl) URL.revokeObjectURL(imageUrl);

  imageUrl = URL.createObjectURL(file);
  preview.src = imageUrl;
  preview.hidden = false;
  clearButton.hidden = false;
  error.textContent = "";
});

clearButton.addEventListener("click", () => {
  imageInput.value = "";
  preview.removeAttribute("src");
  preview.hidden = true;
  clearButton.hidden = true;

  if (imageUrl) URL.revokeObjectURL(imageUrl);
  imageUrl = null;
});

document.getElementById("language").addEventListener("change", event => {
  const lang = event.target.value;
  const t = translations[lang];

  document.getElementById("uploadTitle").textContent = t.upload;
  document.getElementById("linesTitle").textContent = t.lines;
  document.getElementById("generate").textContent = t.generate;

  document.querySelectorAll(".line-card").forEach(card => {
    const key = card.querySelector("input").value;
    card.querySelector("strong").textContent = t[key];
  });

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
});

document.getElementById("generate").addEventListener("click", () => {
  const lang = document.getElementById("language").value;
  const t = translations[lang];

  const selected = [...document.querySelectorAll(
    '.line-card input:checked'
  )].map(input => input.value);

  if (!selected.length) {
    error.textContent = t.missing;
    return;
  }

  error.textContent = "";

  const hand = document.querySelector(
    'input[name="hand"]:checked'
  ).value;

  const content = document.getElementById("reportContent");
  content.replaceChildren();

  selected.forEach(key => {
    const article = document.createElement("article");
    article.className = "report-item";

    const heading = document.createElement("h3");
    heading.textContent = labels[key];

    const paragraph = document.createElement("p");
    paragraph.textContent = readings[lang][key];

    article.append(heading, paragraph);
    content.appendChild(article);
  });

  const disclaimer = lang === "ur"
    ? "یہ رپورٹ صرف روایتی معلومات اور تفریح کے لیے ہے۔"
    : lang === "hi"
    ? "यह रिपोर्ट केवल पारंपरिक जानकारी और मनोरंजन के लिए है।"
    : "This report is for traditional interpretation and entertainment only.";

  const note = document.createElement("p");
  note.textContent = disclaimer;
  content.appendChild(note);

  document.getElementById("reportHand").textContent =
    "Selected hand: " + hand;

  lastReport = "Palmistry Master AI\n" +
    "Hand: " + hand + "\n\n" +
    selected.map(key =>
      labels[key] + "\n" + readings[lang][key]
    ).join("\n\n") +
    "\n\n" + disclaimer +
    "\nCreated by Shahab Millizai";

  report.hidden = false;
  report.scrollIntoView({ behavior: "smooth" });
});

document.getElementById("copyReport").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(lastReport);
    alert("Report copied successfully.");
  } catch {
    alert("Copy is unavailable in this browser. Please use Print instead.");
  }
});

document.getElementById("printReport").addEventListener("click", () => {
  window.print();
});

document.getElementById("year").textContent = new Date().getFullYear();
