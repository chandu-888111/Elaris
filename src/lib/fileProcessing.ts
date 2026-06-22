// src/lib/fileProcessing.ts

/**
 * Utilities for extracting plain text from uploaded files.
 * Supports PDF (via pdfjs-dist), DOCX (via mammoth), and plain text files.
 */

// @ts-expect-error - legacy PDF.js import has no declarations
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
import mammoth from "mammoth";

/**
 * Extract text from a PDF file using pdfjs-dist.
 */
export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) });
  const pdf = await loadingTask.promise;
  let fullText = "";
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const strings = content.items
      .filter(
        (item: unknown): item is { str: string } =>
          typeof item === "object" && item !== null && "str" in item,
      )
      .map((item: { str: string }) => item.str);
    fullText += strings.join(" ") + "\n";
  }
  return fullText.trim();
}

/**
 * Extract raw text from a DOCX file using mammoth.
 */
export async function extractTextFromDOCX(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
}

/**
 * Extract text from a plain‑text file.
 */
export async function extractTextFromTXT(file: File): Promise<string> {
  return await file.text();
}

/**
 * Process an array of uploaded files and return their extracted text.
 * Returns an array of objects `{ file, text }` preserving order.
 */
export async function processUploadedFiles(
  files: File[],
): Promise<Array<{ file: File; text: string }>> {
  const results: Array<{ file: File; text: string }> = [];
  for (const f of files) {
    const ext = f.name.split(".").pop()?.toLowerCase();
    try {
      let text = "";
      if (ext === "pdf") {
        text = await extractTextFromPDF(f);
      } else if (ext === "docx") {
        text = await extractTextFromDOCX(f);
      } else if (ext === "txt") {
        text = await extractTextFromTXT(f);
      } else {
        console.warn(`Unsupported file type: ${f.name}`);
        text = "";
      }
      results.push({ file: f, text });
    } catch (e) {
      console.error(`Failed to extract text from ${f.name}:`, e);
      results.push({ file: f, text: "" });
    }
  }
  return results;
}
