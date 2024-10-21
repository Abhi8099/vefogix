// src/types/html2pdf.d.ts

declare module 'html2pdf.js' {
    export default function html2pdf(): {
        from(element: HTMLElement | string): {
            set(options: any): any;
            save(): any;
        };
    };
}
