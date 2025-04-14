import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import renderMathInElement from 'katex/contrib/auto-render';

import * as katex from 'katex';

(window as any).katex = katex;

@Component({
  selector: 'app-editor',
  imports: [CommonModule, QuillModule, ReactiveFormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent implements AfterViewInit {
  editorControl = new FormControl('This is a math expression: $x^2 + y^2 = z^2$');

  ngAfterViewInit(): void {
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
}
