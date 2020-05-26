const s = 'ewogICJhcGlLZXkiOiAiQUl6YVN5Q19OSnFiU3VYR0RpRDZoY1FaZG10QlpuYVZaNDBnZ0lZIiwKICAiYXV0aERvbWFpbiI6ICJ0ZXh0LXJvbGVwbGF5LmZpcmViYXNlYXBwLmNvbSIsCiAgImRhdGFiYXNlVVJMIjogImh0dHBzOi8vdGV4dC1yb2xlcGxheS5maXJlYmFzZWlvLmNvbSIsCiAgInByb2plY3RJZCI6ICJ0ZXh0LXJvbGVwbGF5IiwKICAic3RvcmFnZUJ1Y2tldCI6ICJ0ZXh0LXJvbGVwbGF5LmFwcHNwb3QuY29tIiwKICAibWVzc2FnaW5nU2VuZGVySWQiOiAiMjI2Nzk3ODIyNDg4IiwKICAiYXBwSWQiOiAiMToyMjY3OTc4MjI0ODg6d2ViOmU3MTdiMTRkM2NjYzQyZTcwMDk5NmQiCn0K';
let e = {}, i, b = 0, c, x, l = 0, a, r = '', w = String.fromCharCode, L = s.length;
let A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (i = 0; i < 64; i++) {
  e[A.charAt(i)] = i;
}
for (x = 0; x < L; x++) {
  c = e[s.charAt(x)];
  b = (b << 6) + c;
  l += 6;
  while (l >= 8) {
    ((a = (b >>> (l -= 8)) & 0xff) || (x < (L - 2))) && (r += w(a));
  }
}
export default JSON.parse(r);
