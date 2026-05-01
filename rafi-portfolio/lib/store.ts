export type Category = "Branding" | "Typography" | "Illustrations";

export interface Project {
  id: number;
  title: string;
  category: Category;
  imageUrl: string;
  description?: string;
}

export const initialProjects: Project[] = [
  { id: 1, title: "Lumina Coffee Roasters", category: "Branding", imageUrl: "", description: "Full brand identity system for an artisan roaster." },
  { id: 2, title: "Reza — Wordmark Suite", category: "Typography", imageUrl: "", description: "Custom lettering and wordmark exploration." },
  { id: 3, title: "Forest Spirits Series", category: "Illustrations", imageUrl: "", description: "A 6-part editorial illustration series." },
  { id: 4, title: "Kora Fashion Identity", category: "Branding", imageUrl: "", description: "Minimalist identity for a Dhaka-based fashion label." },
  { id: 5, title: "Mono Type Specimen", category: "Typography", imageUrl: "", description: "Typographic poster series for a monospace typeface." },
  { id: 6, title: "Celestial Map Vol.2", category: "Illustrations", imageUrl: "", description: "Hand-drawn astronomical illustrations." },
];
