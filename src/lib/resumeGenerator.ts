// src/lib/resumeGenerator.ts

/**
 * Generate a PDF document from a Resume object.
 * Uses pdf-lib to create a simple, nicely formatted PDF.
 */

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Resume } from "@/lib/resume.functions"; // type re‑export

export async function generateResumePDF(resume: Resume): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]); // A4 size
  const { width, height } = page.getSize();

  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  const margin = 50;
  let y = height - margin;
  const lineHeight = 14;

  const drawText = (
    text: string,
    opts: { size?: number; bold?: boolean; color?: [number, number, number] } = {},
  ) => {
    const { size = 12, bold = false, color = [0, 0, 0] } = opts;
    const f = bold ? fontBold : font;
    page.drawText(text, {
      x: margin,
      y,
      size,
      font: f,
      color: rgb(...color),
    });
    y -= lineHeight;
  };

  // Header
  drawText(resume.name, { size: 20, bold: true });
  drawText(resume.headline, { size: 12, color: [0.4, 0.4, 0.4] });
  y -= lineHeight; // extra space

  // Contact line
  const contacts = [] as string[];
  if (resume.contact.email) contacts.push(resume.contact.email);
  if (resume.contact.location) contacts.push(resume.contact.location);
  if (resume.contact.website) contacts.push(resume.contact.website);
  if (resume.contact.github) contacts.push(`GitHub: ${resume.contact.github}`);
  if (resume.contact.linkedin) contacts.push(`LinkedIn: ${resume.contact.linkedin}`);
  drawText(contacts.join(" | "), { size: 10, color: [0.2, 0.2, 0.2] });
  y -= lineHeight;

  // Sections – simple bullet lists
  const section = (title: string, lines: string[]) => {
    drawText(title, { size: 14, bold: true, color: [0.2, 0.2, 0.7] });
    lines.forEach((ln) => drawText(`- ${ln}`, { size: 11 }));
    y -= lineHeight; // extra space after section
  };

  if (resume.summary) section("Summary", [resume.summary]);
  if (resume.skills.length) section("Skills", resume.skills);
  if (resume.experience.length)
    section(
      "Experience",
      resume.experience.map((e) => `${e.role} @ ${e.company} (${e.period})`),
    );
  if (resume.projects.length)
    section(
      "Projects",
      resume.projects.map((p) => `${p.name}: ${p.description}`),
    );
  if (resume.education.length)
    section(
      "Education",
      resume.education.map((e) => `${e.degree}, ${e.school} (${e.period})`),
    );

  const pdfBytes = await doc.save();
  return pdfBytes;
}
