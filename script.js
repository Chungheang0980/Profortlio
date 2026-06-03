const data = portfolioData;

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function externalize(link) {
  if (link.href && link.href.startsWith("http")) {
    link.target = "_blank";
    link.rel = "noreferrer";
  }
}

function renderTimeline(selector, items) {
  document.querySelector(selector).innerHTML = items
    .map(
      (item) => `
        <article class="timeline-item">
          <time>${item.period}</time>
          <div>
            <h3>${item.title}</h3>
            <strong class="timeline-place">${item.place}</strong>
            <p>${item.text}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderProjects() {
  document.querySelector("[data-projects]").innerHTML = data.projects
    .map(
      (project) => `
        <article class="project-card">
          <span class="project-category">${project.category}</span>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="tool-row">
            ${project.tools.map((tool) => `<span>${tool}</span>`).join("")}
          </div>
          <a class="project-link" href="${project.link}">
            ${project.link === "#" ? "Coming soon" : "View project"}
          </a>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".project-link").forEach((link) => {
    if (link.getAttribute("href") === "#") {
      link.addEventListener("click", (event) => event.preventDefault());
    }
    externalize(link);
  });
}

function renderAchievements() {
  document.querySelector("[data-achievements]").innerHTML = data.achievements
    .map(
      (achievement) => `
        <article class="achievement-card">
          <a href="${achievement.link}">
            <span>${achievement.date} / ${achievement.readTime}</span>
            <h3>${achievement.title}</h3>
            <p>${achievement.description}</p>
            <div class="tool-row">
              ${achievement.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
            <strong class="certificate-link">View certificate</strong>
          </a>
        </article>
      `
    )
    .join("");

  document.querySelectorAll(".achievement-card a").forEach((link) => {
    if (link.getAttribute("href") === "#") {
      link.addEventListener("click", (event) => event.preventDefault());
    }
    externalize(link);
  });
}

function initShaderBackground() {
  const canvas = document.querySelector("[data-shader-canvas]");
  if (!canvas) return;

  const gl = canvas.getContext("webgl", { antialias: false });
  if (!gl) return;

  const vertexShaderSource = `
    attribute vec3 position;
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShaderSource = `
    precision highp float;
    uniform vec2 resolution;
    uniform float time;

    float noise(vec2 p) {
      float n = sin(p.x * 3.6 + time) * cos(p.y * 3.2 - time * 0.75);
      n += sin((p.x + p.y) * 5.8 - time * 1.35) * 0.45;
      n += cos(length(p) * 8.0 - time * 1.8) * 0.25;
      return n;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution;
      vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
      float mesh = noise(p);
      float sweep = smoothstep(-0.85, 0.85, p.x + p.y * 0.72 + sin(time * 0.45) * 0.24);
      float centerGlow = pow(max(0.0, 1.0 - length(p * vec2(0.82, 1.08))), 2.2);
      float paper = 0.035 + mesh * 0.055 + sweep * 0.18 + centerGlow * 0.42;
      paper += smoothstep(0.42, 0.0, abs(p.y + sin(p.x * 2.1 + time) * 0.16)) * 0.16;
      vec3 color = mix(vec3(0.0), vec3(1.0), clamp(paper, 0.0, 0.9));
      color *= 1.0 - length(uv - 0.5) * 0.65;
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  function createShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
  if (!vertexShader || !fragmentShader) return;

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1, -1, 0,
      1, -1, 0,
      -1, 1, 0,
      1, -1, 0,
      -1, 1, 0,
      1, 1, 0
    ]),
    gl.STATIC_DRAW
  );

  const positionLocation = gl.getAttribLocation(program, "position");
  const resolutionLocation = gl.getUniformLocation(program, "resolution");
  const timeLocation = gl.getUniformLocation(program, "time");

  function resizeCanvas() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.floor(window.innerWidth * pixelRatio);
    const height = Math.floor(window.innerHeight * pixelRatio);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  }

  function renderFrame(time) {
    resizeCanvas();
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform1f(timeLocation, time * 0.00045);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(renderFrame);
  }

  requestAnimationFrame(renderFrame);
}

function renderPortfolio() {
  document.title = `${data.name} | Portfolio`;
  setText("[data-name]", data.name);
  setText("[data-role]", data.role);
  setText("[data-intro]", data.intro);
  setText("[data-about]", data.about);

  const photo = document.querySelector("[data-photo]");
  photo.src = data.photo;
  photo.alt = `Portrait of ${data.name}`;

  const email = document.querySelector("[data-email]");
  email.href = `mailto:${data.email}`;
  email.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm8 8.92L20 8V6.7l-8 4.92-8-4.92V8l8 4.92Z"/>
    </svg>
    <span>${data.email}</span>
  `;

  document.querySelector("[data-resume]").href = data.resume;
  document.querySelector(".contact-card").action = `mailto:${data.email}`;

  document.querySelector("[data-highlights]").innerHTML = data.highlights
    .map(
      (item) => `
        <div class="highlight">
          <strong>${item.value}</strong>
          <span>${item.label}</span>
        </div>
      `
    )
    .join("");

  document.querySelector("[data-skills]").innerHTML = data.skills
    .map((skill) => `<span class="skill">${skill}</span>`)
    .join("");

  renderTimeline("[data-education]", data.education);
  renderTimeline("[data-experience]", data.experience);
  renderProjects();
  renderAchievements();

  const socials = document.querySelector("[data-socials]");
  socials.innerHTML = "";
  const icons = {
    GitHub:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.68.5.1.68-.22.68-.5v-1.78c-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .85-.28 2.76 1.05A9.31 9.31 0 0 1 12 7.02c.85 0 1.7.12 2.5.35 1.9-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.92v2.84c0 .28.18.6.69.5A10.06 10.06 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/></svg>',
    Telegram:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.86 4.5 18.7 19.4c-.24 1.06-.86 1.32-1.74.82l-4.82-3.56-2.33 2.24c-.26.26-.47.47-.96.47l.34-4.9 8.92-8.06c.39-.34-.08-.53-.6-.19L6.48 13.17 1.73 11.7c-1.03-.32-1.05-1.03.21-1.52L20.52 3.02c.86-.32 1.62.2 1.34 1.48Z"/></svg>',
    LinkedIn:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.25 8h4.96v16H.25V8Zm7.9 0h4.75v2.18h.07c.66-1.25 2.28-2.57 4.7-2.57 5.02 0 5.95 3.3 5.95 7.6V24h-4.96v-7.77c0-1.85-.03-4.24-2.58-4.24-2.59 0-2.99 2.02-2.99 4.1V24H8.15V8Z"/></svg>'
  };
  data.socials.forEach((social) => {
    const link = document.createElement("a");
    link.href = social.url;
    link.innerHTML = `${icons[social.label] || ""}<span>${social.label}</span>`;
    link.setAttribute("aria-label", social.label);
    externalize(link);
    socials.appendChild(link);
  });
}

initShaderBackground();
renderPortfolio();

document.querySelectorAll(".contact-card input, .contact-card textarea").forEach((field) => {
  field.addEventListener("focus", () => field.parentElement.classList.add("is-focused"));
  field.addEventListener("blur", () => field.parentElement.classList.remove("is-focused"));
});

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("is-open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("is-open"));
});
