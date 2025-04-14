import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { QuillModule } from 'ngx-quill';
import renderMathInElement from 'katex/contrib/auto-render';
import { jsPDF } from 'jspdf';

import * as katex from 'katex';
(window as any).katex = katex;

@Component({
  selector: 'app-editor',
  imports: [CommonModule, QuillModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent implements AfterViewInit {
  editorControl: FormControl;

  ngOnInit() {
    this.editorControl = new FormControl('This is a math expression: $x^2 + y^2 = z^2$');
  }

  ngAfterViewInit() {
    this.renderMath();
  }

  renderMath() {
    const elements = document.querySelectorAll('.ql-editor');
    elements.forEach((el) => {
      renderMathInElement(el as HTMLElement, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
        ],
        throwOnError: false,
      });
    });
  }

  onContentChanged() {
    this.renderMath();
  }

  save() {
    const content = this.editorControl.value;

    // Check if content is available
    if (!content || typeof content !== 'string') {
      console.error('Editor content is empty or invalid.');
      return;
    }

    // Create a new instance of jsPDF
    const doc = new jsPDF();

    // Add the editor content to the PDF
    doc.text(content, 10, 10);

    // Save the generated PDF
    doc.save('generated.pdf');
  }
}
