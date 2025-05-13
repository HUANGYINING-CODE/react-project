function createStarsBackground() {
  // 建立 canvas 元素
  const canvas = document.createElement("canvas");
  canvas.id = "bg";
  canvas.style.position = "absolute";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = -2; // 在 gradient-bg 的下面

  // 設定解析度
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext("2d");

  // 產生星星資料
  const stars = [];
  const numStars = 200;

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      delta: Math.random() * 0.02 + 0.005 // 閃爍速度
    });
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let star of stars) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.fill();

      // 閃爍效果
      star.alpha += star.delta;
      if (star.alpha <= 0 || star.alpha >= 1) {
        star.delta = -star.delta;
      }
    }

    requestAnimationFrame(drawStars);
  }

  drawStars();

  // 當視窗縮放時，重新調整畫布大小
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  return canvas;
}

// 將星星背景加入 #bg-container
document.getElementById("bg-container").appendChild(createStarsBackground());
