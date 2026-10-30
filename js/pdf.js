/* =========================================================================
   Cosmica — js/pdf.js : wraps one JPEG picture in a one-page PDF (no libraries, works offline).
   Cosmica.pdf.fromJpeg(bytes, widthPx, heightPx, pageWpt, pageHpt) → Uint8Array
   ========================================================================= */
(function (root) {
  'use strict';
  var X = root.Cosmica = root.Cosmica || {};
  var enc = function (s) { var a = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) a[i] = s.charCodeAt(i) & 255; return a; };
  X.pdf = {
    fromJpeg: function (jpeg, wPx, hPx, pageW, pageH, title) {
      pageW = pageW || 842; pageH = pageH || 595;
      var parts = [], offsets = [], len = 0;
      var push = function (u8) { parts.push(u8); len += u8.length; };
      var obj = function (n, head, stream) {
        offsets[n] = len; push(enc(n + ' 0 obj\n' + head));
        if (stream) { push(enc('\nstream\n')); push(stream); push(enc('\nendstream')); }
        push(enc('\nendobj\n'));
      };
      var content = enc('q ' + pageW + ' 0 0 ' + pageH + ' 0 0 cm /Im0 Do Q');
      var safeTitle = String(title || 'Cosmica certificate').replace(/[^\x20-\x7e]/g, '').replace(/[()\\]/g, '');
      push(enc('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n'));
      obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
      obj(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
      obj(3, '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + pageW + ' ' + pageH + '] /Resources << /XObject << /Im0 5 0 R >> /ProcSet [/PDF /ImageC] >> /Contents 4 0 R >>');
      obj(4, '<< /Length ' + content.length + ' >>', content);
      obj(5, '<< /Type /XObject /Subtype /Image /Width ' + wPx + ' /Height ' + hPx + ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + jpeg.length + ' >>', jpeg);
      obj(6, '<< /Title (' + safeTitle + ') /Producer (Cosmica) >>');
      var xref = len, x = 'xref\n0 7\n0000000000 65535 f \n';
      for (var i = 1; i <= 6; i++) x += ('0000000000' + offsets[i]).slice(-10) + ' 00000 n \n';
      push(enc(x + 'trailer\n<< /Size 7 /Root 1 0 R /Info 6 0 R >>\nstartxref\n' + xref + '\n%%EOF\n'));
      var out = new Uint8Array(len), at = 0; parts.forEach(function (p) { out.set(p, at); at += p.length; });
      return out;
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
