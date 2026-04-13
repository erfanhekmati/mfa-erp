export const THEME_STORAGE_KEY = "app-theme";

export const themeIds = [
  "default",
  "slate",
  "ocean",
  "emerald",
  "rose",
  "amber",
  "violet",
] as const;

export type ThemeId = (typeof themeIds)[number];

export type ThemeDefinition = {
  id: ThemeId;
  label: string;
  description: string;
  previewColors: [string, string, string, string];
};

export const themes: ThemeDefinition[] = [
  {
    id: "default",
    label: "پیش‌فرض",
    description:
      "پس‌زمینه سفید؛ نوار بالا و عنوان سایدبار قرمز با متن سفید؛ آیکن‌های منو آبی، سبز، زرد، قرمز و بنفش",
    previewColors: ["#c41e3a", "#2563eb", "#16a34a", "#eab308"],
  },
  {
    id: "slate",
    label: "خاکستری",
    description: "خنثی و مینیمال، مناسب تمرکز",
    previewColors: ["#171717", "#f5f5f5", "#f5f5f5", "#a3a3a3"],
  },
  {
    id: "ocean",
    label: "اقیانوسی",
    description: "آبی عمیق و آرام",
    previewColors: ["#0b6bcb", "#e0f2fe", "#eff6ff", "#94a3b8"],
  },
  {
    id: "emerald",
    label: "زمردی",
    description: "سبز طبیعی و تازه",
    previewColors: ["#15803d", "#dcfce7", "#ecfdf5", "#86efac"],
  },
  {
    id: "rose",
    label: "گلابی",
    description: "صورتی گرم و مدرن",
    previewColors: ["#e11d48", "#ffe4e6", "#fff1f2", "#fb7185"],
  },
  {
    id: "amber",
    label: "کهربایی",
    description: "نارنجی گرم و انرژی‌بخش",
    previewColors: ["#d97706", "#fef3c7", "#fffbeb", "#fcd34d"],
  },
  {
    id: "violet",
    label: "بنفش",
    description: "بنفش و اسطوخودوسی",
    previewColors: ["#7c3aed", "#ede9fe", "#f5f3ff", "#a78bfa"],
  },
];

export const defaultThemeId: ThemeId = "default";

export function isThemeId(value: string): value is ThemeId {
  return (themeIds as readonly string[]).includes(value);
}
