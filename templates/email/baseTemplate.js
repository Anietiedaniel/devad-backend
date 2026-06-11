const baseTemplate = ({
  title,
  subtitle,
  content,
}) => {

  return `
<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8" />

<meta
name="viewport"
content="width=device-width, initial-scale=1.0"
/>

<title>${title}</title>

</head>

<body
style="
margin:0;
padding:0;
background:#0f172a;
font-family:
Inter,
Arial,
sans-serif;
"
>

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
padding:40px 20px;
"
>

<tr>

<td align="center">

<table
width="650"
cellpadding="0"
cellspacing="0"
style="
max-width:650px;
background:#ffffff;
border-radius:24px;
overflow:hidden;
box-shadow:
0 20px 60px rgba(0,0,0,.25);
"
>

<!-- HERO SECTION -->

<tr>

<td
style="
background:
linear-gradient(
135deg,
#0f172a 0%,
#1e293b 30%,
#2563eb 100%
);
padding:60px 40px;
text-align:center;
position:relative;
"
>

<div
style="
font-size:12px;
font-weight:700;
letter-spacing:2px;
color:#93c5fd;
text-transform:uppercase;
margin-bottom:20px;
"
>

DEVAD TECH ACADEMY

</div>

<img
src="${process.env.COMPANY_LOGO}"
alt="Devad Tech Academy"
width="120"
style="
display:block;
margin:auto;
background:white;
padding:14px;
border-radius:20px;
box-shadow:
0 8px 25px rgba(255,255,255,.15);
"
/>

<h1
style="
margin:30px 0 15px;
font-size:38px;
font-weight:800;
color:white;
line-height:1.2;
"
>
${title}
</h1>

<p
style="
margin:0 auto;
max-width:450px;
font-size:16px;
line-height:1.7;
color:#dbeafe;
"
>
${subtitle || ''}
</p>

</td>

</tr>

<!-- CONTENT -->

<tr>

<td
style="
padding:50px 40px;
font-size:16px;
line-height:1.9;
color:#334155;
"
>

${content}

</td>

</tr>

<!-- CTA SECTION -->

<tr>

<td
style="
padding:0 40px 40px;
"
>

<div
style="
background:
linear-gradient(
135deg,
#eff6ff,
#dbeafe
);
border:1px solid #bfdbfe;
padding:25px;
border-radius:18px;
text-align:center;
"
>

<h3
style="
margin:0 0 10px;
color:#1e40af;
font-size:20px;
"
>
🚀 Learn. Build. Launch.
</h3>

<p
style="
margin:0;
color:#475569;
font-size:14px;
line-height:1.8;
"
>
Master Web Development, Mobile Apps,
AI, Cybersecurity, Embedded Systems,
and Real-World Software Engineering.
</p>

</div>

</td>

</tr>

<!-- FOOTER -->

<tr>

<td
style="
background:#f8fafc;
padding:40px;
text-align:center;
border-top:1px solid #e2e8f0;
"
>

<p
style="
margin:0 0 10px;
font-size:18px;
font-weight:700;
color:#0f172a;
"
>
Devad Tech Academy
</p>

<p
style="
margin:0 0 20px;
font-size:14px;
color:#64748b;
"
>
Building Africa's Next Generation of Developers
</p>

<div
style="
margin-bottom:20px;
"
>

<a
href="#"
style="
color:#2563eb;
text-decoration:none;
margin:0 10px;
font-size:14px;
"
>
Website
</a>

<a
href="#"
style="
color:#2563eb;
text-decoration:none;
margin:0 10px;
font-size:14px;
"
>
Courses
</a>

<a
href="#"
style="
color:#2563eb;
text-decoration:none;
margin:0 10px;
font-size:14px;
"
>
Support
</a>

</div>

<p
style="
margin:0;
font-size:12px;
color:#94a3b8;
"
>
© ${new Date().getFullYear()}
Devad Tech Academy.
All rights reserved.
</p>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;
};


module.exports =
baseTemplate;
