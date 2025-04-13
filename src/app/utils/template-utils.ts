import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

export function replacePlaceholdersAndDownload(
  arrayBuffer: ArrayBuffer,
  data: Record<string, any>,
  filename = 'output.docx'
) {
  const zip = new PizZip(arrayBuffer);

  // Get raw document.xml
  const xml = zip.file('word/document.xml')!.asText();

  let counter = 1;
  const updatedXml = xml.replace(/{\s*\.\s*}/g, () => `${counter++}`);

  // Write back modified XML to zip
  zip.file('word/document.xml', updatedXml);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  try {
    doc.render(data);
  } catch (error) {
    console.error('Docxtemplater error:', error);
    throw error;
  }

  const out = doc.getZip().generate({
    type: 'blob',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });

  saveAs(out, filename);
}
