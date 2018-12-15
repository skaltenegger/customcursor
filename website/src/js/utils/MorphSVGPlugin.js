/*!
 * VERSION: 0.8.4
 * DATE: 2016-02-16
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * MorphSVGPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
  "use strict";
  var a = Math.PI / 180,
    b = 180 / Math.PI,
    c = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
    d = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
    e = /[achlmqstvz]/gi,
    f = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
    g = _gsScope._gsDefine.globals.TweenLite,
    h = function(a) {
      window.console && console.log(a);
    },
    i = function(b, c) {
      var d,
        e,
        f,
        g,
        h,
        i,
        j = Math.ceil(Math.abs(c) / 90),
        k = 0,
        l = [];
      for (
        b *= a,
          c *= a,
          d = c / j,
          e = ((4 / 3) * Math.sin(d / 2)) / (1 + Math.cos(d / 2)),
          i = 0;
        j > i;
        i++
      )
        (f = b + i * d),
          (g = Math.cos(f)),
          (h = Math.sin(f)),
          (l[k++] = g - e * h),
          (l[k++] = h + e * g),
          (f += d),
          (g = Math.cos(f)),
          (h = Math.sin(f)),
          (l[k++] = g + e * h),
          (l[k++] = h - e * g),
          (l[k++] = g),
          (l[k++] = h);
      return l;
    },
    j = function(c, d, e, f, g, h, j, k, l) {
      if (c !== k || d !== l) {
        (e = Math.abs(e)), (f = Math.abs(f));
        var m = (g % 360) * a,
          n = Math.cos(m),
          o = Math.sin(m),
          p = (c - k) / 2,
          q = (d - l) / 2,
          r = n * p + o * q,
          s = -o * p + n * q,
          t = e * e,
          u = f * f,
          v = r * r,
          w = s * s,
          x = v / t + w / u;
        x > 1 &&
          ((e = Math.sqrt(x) * e),
          (f = Math.sqrt(x) * f),
          (t = e * e),
          (u = f * f));
        var y = h === j ? -1 : 1,
          z = (t * u - t * w - u * v) / (t * w + u * v);
        0 > z && (z = 0);
        var A = y * Math.sqrt(z),
          B = A * ((e * s) / f),
          C = A * -((f * r) / e),
          D = (c + k) / 2,
          E = (d + l) / 2,
          F = D + (n * B - o * C),
          G = E + (o * B + n * C),
          H = (r - B) / e,
          I = (s - C) / f,
          J = (-r - B) / e,
          K = (-s - C) / f,
          L = Math.sqrt(H * H + I * I),
          M = H;
        y = 0 > I ? -1 : 1;
        var N = y * Math.acos(M / L) * b;
        (L = Math.sqrt((H * H + I * I) * (J * J + K * K))),
          (M = H * J + I * K),
          (y = 0 > H * K - I * J ? -1 : 1);
        var O = y * Math.acos(M / L) * b;
        !j && O > 0 ? (O -= 360) : j && 0 > O && (O += 360),
          (O %= 360),
          (N %= 360);
        var P,
          Q,
          R,
          S = i(N, O),
          T = n * e,
          U = o * e,
          V = o * -f,
          W = n * f,
          X = S.length - 2;
        for (P = 0; X > P; P += 2)
          (Q = S[P]),
            (R = S[P + 1]),
            (S[P] = Q * T + R * V + F),
            (S[P + 1] = Q * U + R * W + G);
        return (S[S.length - 2] = k), (S[S.length - 1] = l), S;
      }
    },
    k = function(a) {
      var b,
        d,
        e,
        g,
        i,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s =
          (a + "")
            .replace(f, function(a) {
              var b = +a;
              return 1e-4 > b && b > -1e-4 ? 0 : b;
            })
            .match(c) || [],
        t = [],
        u = 0,
        v = 0,
        w = s.length,
        x = 2,
        y = 0;
      if (!a || !isNaN(s[0]) || isNaN(s[1]))
        return h("ERROR: malformed path data: " + a), t;
      for (b = 0; w > b; b++)
        if (
          ((r = i),
          isNaN(s[b]) ? ((i = s[b].toUpperCase()), (k = i !== s[b])) : b--,
          (e = +s[b + 1]),
          (g = +s[b + 2]),
          k && ((e += u), (g += v)),
          0 === b && ((m = e), (n = g)),
          "M" === i)
        )
          l && l.length < 8 && ((t.length -= 1), (x = 0)),
            (u = m = e),
            (v = n = g),
            (l = [e, g]),
            (y += x),
            (x = 2),
            t.push(l),
            (b += 2),
            (i = "L");
        else if ("C" === i)
          l || (l = [0, 0]),
            (l[x++] = e),
            (l[x++] = g),
            k || (u = v = 0),
            (l[x++] = u + 1 * s[b + 3]),
            (l[x++] = v + 1 * s[b + 4]),
            (l[x++] = u += 1 * s[b + 5]),
            (l[x++] = v += 1 * s[b + 6]),
            (b += 6);
        else if ("S" === i)
          "C" === r || "S" === r
            ? ((o = u - l[x - 4]),
              (p = v - l[x - 3]),
              (l[x++] = u + o),
              (l[x++] = v + p))
            : ((l[x++] = u), (l[x++] = v)),
            (l[x++] = e),
            (l[x++] = g),
            k || (u = v = 0),
            (l[x++] = u += 1 * s[b + 3]),
            (l[x++] = v += 1 * s[b + 4]),
            (b += 4);
        else if ("Q" === i)
          (o = e - u),
            (p = g - v),
            (l[x++] = u + (2 * o) / 3),
            (l[x++] = v + (2 * p) / 3),
            k || (u = v = 0),
            (u += 1 * s[b + 3]),
            (v += 1 * s[b + 4]),
            (o = e - u),
            (p = g - v),
            (l[x++] = u + (2 * o) / 3),
            (l[x++] = v + (2 * p) / 3),
            (l[x++] = u),
            (l[x++] = v),
            (b += 4);
        else if ("T" === i)
          (o = u - l[x - 4]),
            (p = v - l[x - 3]),
            (l[x++] = u + o),
            (l[x++] = v + p),
            (o = u + 1.5 * o - e),
            (p = v + 1.5 * p - g),
            (l[x++] = e + (2 * o) / 3),
            (l[x++] = g + (2 * p) / 3),
            (l[x++] = u = e),
            (l[x++] = v = g),
            (b += 2);
        else if ("H" === i)
          (g = v),
            (l[x++] = u + (e - u) / 3),
            (l[x++] = v + (g - v) / 3),
            (l[x++] = u + (2 * (e - u)) / 3),
            (l[x++] = v + (2 * (g - v)) / 3),
            (l[x++] = u = e),
            (l[x++] = g),
            (b += 1);
        else if ("V" === i)
          (g = e),
            (e = u),
            k && (g += v - u),
            (l[x++] = e),
            (l[x++] = v + (g - v) / 3),
            (l[x++] = e),
            (l[x++] = v + (2 * (g - v)) / 3),
            (l[x++] = e),
            (l[x++] = v = g),
            (b += 1);
        else if ("L" === i || "Z" === i)
          "Z" === i && ((e = m), (g = n), (l.closed = !0)),
            ("L" === i || Math.abs(u - e) > 0.5 || Math.abs(v - g) > 0.5) &&
              ((l[x++] = u + (e - u) / 3),
              (l[x++] = v + (g - v) / 3),
              (l[x++] = u + (2 * (e - u)) / 3),
              (l[x++] = v + (2 * (g - v)) / 3),
              (l[x++] = e),
              (l[x++] = g),
              "L" === i && (b += 2)),
            (u = e),
            (v = g);
        else if ("A" === i) {
          for (
            q = j(
              u,
              v,
              1 * s[b + 1],
              1 * s[b + 2],
              1 * s[b + 3],
              1 * s[b + 4],
              1 * s[b + 5],
              (k ? u : 0) + 1 * s[b + 6],
              (k ? v : 0) + 1 * s[b + 7]
            ),
              d = 0;
            d < q.length;
            d++
          )
            l[x++] = q[d];
          (u = l[x - 2]), (v = l[x - 1]), (b += 7);
        } else h("Error: malformed path data: " + a);
      return (t.totalPoints = y + x), t;
    },
    l = function(a, b) {
      var c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q = 0,
        r = 0.999999,
        s = a.length,
        t = b / ((s - 2) / 6);
      for (o = 2; s > o; o += 6)
        for (q += t; q > r; )
          (c = a[o - 2]),
            (d = a[o - 1]),
            (e = a[o]),
            (f = a[o + 1]),
            (g = a[o + 2]),
            (h = a[o + 3]),
            (i = a[o + 4]),
            (j = a[o + 5]),
            (p = 1 / (Math.floor(q) + 1)),
            (k = c + (e - c) * p),
            (m = e + (g - e) * p),
            (k += (m - k) * p),
            (m += (g + (i - g) * p - m) * p),
            (l = d + (f - d) * p),
            (n = f + (h - f) * p),
            (l += (n - l) * p),
            (n += (h + (j - h) * p - n) * p),
            a.splice(
              o,
              4,
              c + (e - c) * p,
              d + (f - d) * p,
              k,
              l,
              k + (m - k) * p,
              l + (n - l) * p,
              m,
              n,
              g + (i - g) * p,
              h + (j - h) * p
            ),
            (o += 6),
            (s += 6),
            q--;
      return a;
    },
    m = function(a) {
      var b,
        c,
        d,
        e,
        f = "",
        g = a.length,
        h = 100;
      for (c = 0; g > c; c++) {
        for (
          e = a[c], f += "M" + e[0] + "," + e[1] + " C", b = e.length, d = 2;
          b > d;
          d++
        )
          f +=
            ((e[d++] * h) | 0) / h +
            "," +
            ((e[d++] * h) | 0) / h +
            " " +
            ((e[d++] * h) | 0) / h +
            "," +
            ((e[d++] * h) | 0) / h +
            " " +
            ((e[d++] * h) | 0) / h +
            "," +
            ((e[d] * h) | 0) / h +
            " ";
        e.closed && (f += "z");
      }
      return f;
    },
    n = function(a) {
      for (var b = [], c = a.length - 1, d = 0; --c > -1; )
        (b[d++] = a[c]), (b[d++] = a[c + 1]), c--;
      for (c = 0; d > c; c++) a[c] = b[c];
      a.reversed = a.reversed ? !1 : !0;
    },
    o = function(a) {
      var b,
        c = a.length,
        d = 0,
        e = 0;
      for (b = 0; c > b; b++) (d += a[b++]), (e += a[b]);
      return [d / (c / 2), e / (c / 2)];
    },
    p = function(a) {
      var b,
        c,
        d,
        e = a.length,
        f = a[0],
        g = f,
        h = a[1],
        i = h;
      for (d = 6; e > d; d += 6)
        (b = a[d]),
          (c = a[d + 1]),
          b > f ? (f = b) : g > b && (g = b),
          c > h ? (h = c) : i > c && (i = c);
      return (
        (a.centerX = (f + g) / 2),
        (a.centerY = (h + i) / 2),
        (a.size = (f - g) * (h - i))
      );
    },
    q = function(a) {
      for (
        var b, c, d, e, f, g = a.length, h = a[0][0], i = h, j = a[0][1], k = j;
        --g > -1;

      )
        for (f = a[g], b = f.length, e = 6; b > e; e += 6)
          (c = f[e]),
            (d = f[e + 1]),
            c > h ? (h = c) : i > c && (i = c),
            d > j ? (j = d) : k > d && (k = d);
      return (
        (a.centerX = (h + i) / 2),
        (a.centerY = (j + k) / 2),
        (a.size = (h - i) * (j - k))
      );
    },
    r = function(a, b) {
      return b.length - a.length;
    },
    s = function(a, b) {
      var c = a.size || p(a),
        d = b.size || p(b);
      return Math.abs(d - c) < (c + d) / 20
        ? b.centerX - a.centerX || b.centerY - a.centerY
        : d - c;
    },
    t = function(a, b) {
      var c,
        d,
        e = a.slice(0),
        f = a.length,
        g = f - 2;
      for (b = 0 | b, c = 0; f > c; c++)
        (d = (c + b) % g), (a[c++] = e[d]), (a[c] = e[d + 1]);
    },
    u = function(a, b, c, d, e) {
      var f,
        g,
        h,
        i,
        j = a.length,
        k = 0,
        l = j - 2;
      for (c *= 6, g = 0; j > g; g += 6)
        (f = (g + c) % l),
          (i = a[f] - (b[g] - d)),
          (h = a[f + 1] - (b[g + 1] - e)),
          (k += Math.sqrt(h * h + i * i));
      return k;
    },
    v = function(a, b, c) {
      var d,
        e,
        f,
        g = a.length,
        h = o(a),
        i = o(b),
        j = i[0] - h[0],
        k = i[1] - h[1],
        l = u(a, b, 0, j, k),
        m = 0;
      for (f = 6; g > f; f += 6)
        (e = u(a, b, f / 6, j, k)), l > e && ((l = e), (m = f));
      if (c)
        for (d = a.slice(0), n(d), f = 6; g > f; f += 6)
          (e = u(d, b, f / 6, j, k)), l > e && ((l = e), (m = -f));
      return m / 6;
    },
    w = function(a, b, c) {
      for (
        var d, e, f, g, h, i, j = a.length, k = 99999999999, l = 0, m = 0;
        --j > -1;

      )
        for (d = a[j], i = d.length, h = 0; i > h; h += 6)
          (e = d[h] - b),
            (f = d[h + 1] - c),
            (g = Math.sqrt(e * e + f * f)),
            k > g && ((k = g), (l = d[h]), (m = d[h + 1]));
      return [l, m];
    },
    x = function(a, b, c, d, e, f) {
      var g,
        h,
        i,
        j,
        k,
        l = b.length,
        m = 0,
        n = Math.min(a.size || p(a), b[c].size || p(b[c])) * d,
        o = 999999999999,
        q = a.centerX + e,
        r = a.centerY + f;
      for (h = c; l > h && ((g = b[h].size || p(b[h])), !(n > g)); h++)
        (i = b[h].centerX - q),
          (j = b[h].centerY - r),
          (k = Math.sqrt(i * i + j * j)),
          o > k && ((m = h), (o = k));
      return (k = b[m]), b.splice(m, 1), k;
    },
    y = function(a, b, c, d) {
      var e,
        f,
        g,
        i,
        j,
        k,
        m,
        o = b.length - a.length,
        u = o > 0 ? b : a,
        y = o > 0 ? a : b,
        z = 0,
        A = "complexity" === d ? r : s,
        B = "position" === d ? 0 : "number" == typeof d ? d : 0.8,
        C = y.length,
        D = "object" == typeof c && c.push ? c.slice(0) : [c],
        E = "reverse" === D[0] || D[0] < 0,
        F = "log" === c;
      if (y[0]) {
        if (
          u.length > 1 &&
          (a.sort(A),
          b.sort(A),
          (k = u.size || q(u)),
          (k = y.size || q(y)),
          (k = u.centerX - y.centerX),
          (m = u.centerY - y.centerY),
          A === s)
        )
          for (C = 0; C < y.length; C++) u.splice(C, 0, x(y[C], u, C, B, k, m));
        if (o)
          for (
            0 > o && (o = -o),
              u[0].length > y[0].length &&
                l(y[0], ((u[0].length - y[0].length) / 6) | 0),
              C = y.length;
            o > z;

          )
            (i = u[C].size || p(u[C])),
              (g = w(y, u[C].centerX, u[C].centerY)),
              (i = g[0]),
              (j = g[1]),
              (y[C++] = [i, j, i, j, i, j, i, j]),
              (y.totalPoints += 8),
              z++;
        for (C = 0; C < a.length; C++)
          (e = b[C]),
            (f = a[C]),
            (o = e.length - f.length),
            0 > o ? l(e, (-o / 6) | 0) : o > 0 && l(f, (o / 6) | 0),
            E && !f.reversed && n(f),
            (c = D[C] || 0 === D[C] ? D[C] : "auto"),
            c &&
              (f.closed ||
              (Math.abs(f[0] - f[f.length - 2]) < 0.5 &&
                Math.abs(f[1] - f[f.length - 1]) < 0.5)
                ? "auto" === c || "log" === c
                  ? ((D[C] = c = v(f, e, 0 === C)),
                    0 > c && ((E = !0), n(f), (c = -c)),
                    t(f, 6 * c))
                  : "reverse" !== c &&
                    (C && 0 > c && n(f), t(f, 6 * (0 > c ? -c : c)))
                : !E &&
                  (("auto" === c &&
                    Math.abs(e[0] - f[0]) +
                      Math.abs(e[1] - f[1]) +
                      Math.abs(e[e.length - 2] - f[f.length - 2]) +
                      Math.abs(e[e.length - 1] - f[f.length - 1]) >
                      Math.abs(e[0] - f[f.length - 2]) +
                        Math.abs(e[1] - f[f.length - 1]) +
                        Math.abs(e[e.length - 2] - f[0]) +
                        Math.abs(e[e.length - 1] - f[1])) ||
                    c % 2)
                ? (n(f), (D[C] = -1), (E = !0))
                : "auto" === c
                ? (D[C] = 0)
                : "reverse" === c && (D[C] = -1),
              f.closed !== e.closed && (f.closed = e.closed = !1));
        return F && h("shapeIndex:[" + D.join(",") + "]"), D;
      }
    },
    z = function(a, b, c, d) {
      var e = k(a[0]),
        f = k(a[1]);
      y(e, f, b || 0 === b ? b : "auto", c) &&
        ((a[0] = m(e)),
        (a[1] = m(f)),
        ("log" === d || d === !0) &&
          h('precompile:["' + a[0] + '","' + a[1] + '"]'));
    },
    A = function(a, b, c) {
      return b || c || a || 0 === a
        ? function(d) {
            z(d, a, b, c);
          }
        : z;
    },
    B = function(a, b) {
      if (!b) return a;
      var c,
        e,
        f,
        g = a.match(d) || [],
        h = g.length,
        i = "";
      for (
        "reverse" === b
          ? ((e = h - 1), (c = -2))
          : ((e = (2 * (parseInt(b, 10) || 0) + 1 + 100 * h) % h), (c = 2)),
          f = 0;
        h > f;
        f += 2
      )
        (i += g[e - 1] + "," + g[e] + " "), (e = (e + c) % h);
      return i;
    },
    C = function(a, b) {
      var c,
        d,
        e,
        f,
        g,
        h,
        i,
        j = 0,
        k = parseFloat(a[0]),
        l = parseFloat(a[1]),
        m = k + "," + l + " ",
        n = 0.999999;
      for (
        e = a.length, c = (0.5 * b) / (0.5 * e - 1), d = 0;
        e - 2 > d;
        d += 2
      ) {
        if (
          ((j += c),
          (h = parseFloat(a[d + 2])),
          (i = parseFloat(a[d + 3])),
          j > n)
        )
          for (g = 1 / (Math.floor(j) + 1), f = 1; j > n; )
            (m +=
              (k + (h - k) * g * f).toFixed(2) +
              "," +
              (l + (i - l) * g * f).toFixed(2) +
              " "),
              j--,
              f++;
        (m += h + "," + i + " "), (k = h), (l = i);
      }
      return m;
    },
    D = function(a) {
      var b = a[0].match(d) || [],
        c = a[1].match(d) || [],
        e = c.length - b.length;
      e > 0 ? (a[0] = C(b, e)) : (a[1] = C(c, -e));
    },
    E = function(a) {
      return isNaN(a)
        ? D
        : function(b) {
            D(b), (b[1] = B(b[1], parseInt(a, 10)));
          };
    },
    F = function(a, b) {
      var c = document.createElementNS("http://www.w3.org/2000/svg", "path"),
        d = Array.prototype.slice.call(a.attributes),
        e = d.length;
      for (b = "," + b + ","; --e > -1; )
        -1 === b.indexOf("," + d[e].nodeName + ",") &&
          c.setAttributeNS(null, d[e].nodeName, d[e].nodeValue);
      return c;
    },
    G = function(a, b) {
      var c,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u,
        v,
        w,
        x,
        y = a.tagName.toLowerCase(),
        z = 0.552284749831;
      return "path" !== y && a.getBBox
        ? ((i = F(a, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points")),
          "rect" === y
            ? ((g = +a.getAttribute("rx") || 0),
              (h = +a.getAttribute("ry") || 0),
              (e = +a.getAttribute("x") || 0),
              (f = +a.getAttribute("y") || 0),
              (m = (+a.getAttribute("width") || 0) - 2 * g),
              (n = (+a.getAttribute("height") || 0) - 2 * h),
              g || h
                ? ((o = e + g * (1 - z)),
                  (p = e + g),
                  (q = p + m),
                  (r = q + g * z),
                  (s = q + g),
                  (t = f + h * (1 - z)),
                  (u = f + h),
                  (v = u + n),
                  (w = v + h * z),
                  (x = v + h),
                  (c =
                    "M" +
                    s +
                    "," +
                    u +
                    " V" +
                    v +
                    " C" +
                    [
                      s,
                      w,
                      r,
                      x,
                      q,
                      x,
                      q - (q - p) / 3,
                      x,
                      p + (q - p) / 3,
                      x,
                      p,
                      x,
                      o,
                      x,
                      e,
                      w,
                      e,
                      v,
                      e,
                      v - (v - u) / 3,
                      e,
                      u + (v - u) / 3,
                      e,
                      u,
                      e,
                      t,
                      o,
                      f,
                      p,
                      f,
                      p + (q - p) / 3,
                      f,
                      q - (q - p) / 3,
                      f,
                      q,
                      f,
                      r,
                      f,
                      s,
                      t,
                      s,
                      u
                    ].join(",") +
                    "z"))
                : (c =
                    "M" +
                    (e + m) +
                    "," +
                    f +
                    " v" +
                    n +
                    " h" +
                    -m +
                    " v" +
                    -n +
                    " h" +
                    m +
                    "z"))
            : "circle" === y || "ellipse" === y
            ? ("circle" === y
                ? ((g = h = +a.getAttribute("r") || 0), (k = g * z))
                : ((g = +a.getAttribute("rx") || 0),
                  (h = +a.getAttribute("ry") || 0),
                  (k = h * z)),
              (e = +a.getAttribute("cx") || 0),
              (f = +a.getAttribute("cy") || 0),
              (j = g * z),
              (c =
                "M" +
                (e + g) +
                "," +
                f +
                " C" +
                [
                  e + g,
                  f + k,
                  e + j,
                  f + h,
                  e,
                  f + h,
                  e - j,
                  f + h,
                  e - g,
                  f + k,
                  e - g,
                  f,
                  e - g,
                  f - k,
                  e - j,
                  f - h,
                  e,
                  f - h,
                  e + j,
                  f - h,
                  e + g,
                  f - k,
                  e + g,
                  f
                ].join(",") +
                "z"))
            : "line" === y
            ? (c =
                "M" +
                a.getAttribute("x1") +
                "," +
                a.getAttribute("y1") +
                " L" +
                a.getAttribute("x2") +
                "," +
                a.getAttribute("y2"))
            : ("polyline" === y || "polygon" === y) &&
              ((l = (a.getAttribute("points") + "").match(d) || []),
              (e = l.shift()),
              (f = l.shift()),
              (c = "M" + e + "," + f + " L" + l.join(",")),
              "polygon" === y && (c += "," + e + "," + f + "z")),
          i.setAttribute("d", c),
          b &&
            a.parentNode &&
            (a.parentNode.insertBefore(i, a), a.parentNode.removeChild(a)),
          i)
        : a;
    },
    H = function(a, b, c) {
      var e,
        f,
        i = "string" == typeof a;
      return (
        (!i || (a.match(d) || []).length < 3) &&
          ((e = i ? g.selector(a) : a && a[0] ? a : [a]),
          e && e[0]
            ? ((e = e[0]),
              (f = e.nodeName.toUpperCase()),
              b && "PATH" !== f && ((e = G(e, !1)), (f = "PATH")),
              (a = e.getAttribute("PATH" === f ? "d" : "points") || ""),
              e === c && (a = e.getAttributeNS(null, "data-original") || a))
            : (h("WARNING: invalid morph to: " + a), (a = !1))),
        a
      );
    },
    I =
      "Use MorphSVGPlugin.convertToPath(elementOrSelectorText) to convert to a path before morphing.",
    J = _gsScope._gsDefine.plugin({
      propName: "morphSVG",
      API: 2,
      global: !0,
      version: "0.8.4",
      init: function(a, b, c) {
        var d, f, g, i, j;
        return "function" != typeof a.setAttribute
          ? !1
          : ((d = a.nodeName.toUpperCase()),
            (j = "POLYLINE" === d || "POLYGON" === d),
            "PATH" === d || j
              ? ((f = "PATH" === d ? "d" : "points"),
                ("string" == typeof b || b.getBBox || b[0]) &&
                  (b = { shape: b }),
                (i = H(b.shape || b.d || b.points || "", "d" === f, a)),
                j && e.test(i)
                  ? (h("WARNING: a <" + d + "> cannot accept path data. " + I),
                    !1)
                  : (i &&
                      ((this._target = a),
                      a.getAttributeNS(null, "data-original") ||
                        a.setAttributeNS(
                          null,
                          "data-original",
                          a.getAttribute(f)
                        ),
                      (g = this._addTween(
                        a,
                        "setAttribute",
                        a.getAttribute(f) + "",
                        i + "",
                        "morphSVG",
                        !1,
                        f,
                        "object" == typeof b.precompile
                          ? function(a) {
                              (a[0] = b.precompile[0]),
                                (a[1] = b.precompile[1]);
                            }
                          : "d" === f
                          ? A(b.shapeIndex, b.map || J.defaultMap, b.precompile)
                          : E(b.shapeIndex)
                      )),
                      g &&
                        (this._overwriteProps.push("morphSVG"),
                        (g.end = i),
                        (g.endProp = f))),
                    !0))
              : (h("WARNING: cannot morph a <" + d + "> SVG element. " + I),
                !1));
      },
      set: function(a) {
        var b;
        if ((this._super.setRatio.call(this, a), 1 === a))
          for (b = this._firstPT; b; )
            b.end && this._target.setAttribute(b.endProp, b.end), (b = b._next);
      }
    });
  (J.pathFilter = z),
    (J.pointsFilter = D),
    (J.subdivideRawBezier = l),
    (J.defaultMap = "size"),
    (J.pathDataToRawBezier = function(a) {
      return k(H(a, !0));
    }),
    (J.equalizeSegmentQuantity = y),
    (J.convertToPath = function(a, b) {
      "string" == typeof a && (a = g.selector(a));
      for (
        var c =
            a && 0 !== a.length
              ? a.length && a[0] && a[0].nodeType
                ? Array.prototype.slice.call(a, 0)
                : [a]
              : [],
          d = c.length;
        --d > -1;

      )
        c[d] = G(c[d], b !== !1);
      return c;
    }),
    (J.pathDataToBezier = function(a, b) {
      var c,
        d,
        e,
        f,
        h,
        i,
        j,
        l,
        m = k(H(a, !0))[0] || [],
        n = 0;
      if (
        ((b = b || {}),
        (l = b.align || b.relative),
        (f = b.matrix || [1, 0, 0, 1, 0, 0]),
        (h = b.offsetX || 0),
        (i = b.offsetY || 0),
        "relative" === l || l === !0
          ? ((h -= m[0] * f[0] + m[1] * f[2]),
            (i -= m[0] * f[1] + m[1] * f[3]),
            (n = "+="))
          : ((h += f[4]),
            (i += f[5]),
            l &&
              ((l = "string" == typeof l ? g.selector(l) : l && l[0] ? l : [l]),
              l &&
                l[0] &&
                ((j = l[0].getBBox() || { x: 0, y: 0 }),
                (h -= j.x),
                (i -= j.y)))),
        (c = []),
        (e = m.length),
        f)
      )
        for (d = 0; e > d; d += 2)
          c.push({
            x: n + (m[d] * f[0] + m[d + 1] * f[2] + h),
            y: n + (m[d] * f[1] + m[d + 1] * f[3] + i)
          });
      else
        for (d = 0; e > d; d += 2)
          c.push({ x: n + (m[d] + h), y: n + (m[d + 1] + i) });
      return c;
    });
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()();

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function(name) {
  "use strict";
  var getGlobal = function() {
    return (_gsScope.GreenSockGlobals || _gsScope)[name];
  };
  if (typeof module !== "undefined" && module.exports) {
    //node
    require("gsap/TweenMax");
    module.exports = getGlobal();
  } else if (typeof define === "function" && define.amd) {
    //AMD
    define(["gsap/TweenMax"], getGlobal);
  }
})("MorphSVGPlugin");
