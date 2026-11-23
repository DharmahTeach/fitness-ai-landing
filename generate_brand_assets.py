import os
from PIL import Image, ImageDraw

def create_svg_logo(output_path):
    svg_content = '''<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="faBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F46E5"/>
      <stop offset="50%" stop-color="#6366F1"/>
      <stop offset="100%" stop-color="#7C3AED"/>
    </linearGradient>
    <linearGradient id="faGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#EEF2FF"/>
    </linearGradient>
    <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399"/>
      <stop offset="100%" stop-color="#10B981"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1" flood-color="#1E1B4B" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Squircle container with rich lighting -->
  <rect x="0.5" y="0.5" width="31" height="31" rx="8" fill="url(#faBg)"/>
  <rect x="0.5" y="0.5" width="31" height="31" rx="8" stroke="url(#faGlow)" stroke-width="1"/>

  <!-- Dynamic Athletic 'F' + Speed bars -->
  <g filter="url(#softShadow)">
    <!-- Vertical stem (slight forward speed slant) -->
    <path d="M9.5 7.5 C9.5 6.67 10.17 6 11 6 H13.5 C14.33 6 15 6.67 15 7.5 V24.5 C15 25.33 14.33 26 13.5 26 H11 C10.17 26 9.5 25.33 9.5 24.5 Z" fill="url(#barGrad)"/>
    
    <!-- Top power bar with dynamic cut -->
    <path d="M14 6 H22 C22.83 6 23.5 6.67 23.5 7.5 C23.5 8.33 22.83 9 22 9 H14 Z" fill="url(#barGrad)"/>
    
    <!-- Middle energy pulse bar -->
    <path d="M14 13.5 H19.5 C20.33 13.5 21 14.17 21 15 C21 15.83 20.33 16.5 19.5 16.5 H14 Z" fill="url(#barGrad)"/>
    
    <!-- Athletic diagonal accent notch connecting stem and top bar -->
    <path d="M12 6 L17 6 L12 11 Z" fill="white" opacity="0.4"/>
  </g>

  <!-- AI Intelligence Spark (4-point star in neon emerald) -->
  <g transform="translate(23.5, 7.5)">
    <!-- Subtle glow ring -->
    <circle cx="0" cy="0" r="4.5" fill="#10B981" opacity="0.25"/>
    <!-- 4-point diamond star -->
    <path d="M0 -3.2 C0.2 -1 1 -0.2 3.2 0 C1 0.2 0.2 1 0 3.2 C-0.2 1 -1 0.2 -3.2 0 C-1 -0.2 -0.2 -1 0 -3.2 Z" fill="url(#sparkGrad)"/>
    <circle cx="0" cy="0" r="0.8" fill="#FFFFFF"/>
  </g>
</svg>'''
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"Created SVG logo at {output_path}")

create_svg_logo(r"c:\p\BOTS\fitnes_bot\landing\assets\images\logo.svg")
create_svg_logo(r"c:\p\BOTS\fitnes_bot\landing\assets\images\favicon.svg")

def render_raster_icons():
    # Draw at 1024x1024 with antialiasing / supersampling
    size = 1024
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Rounded rectangle background with gradient
    # Create gradient background
    grad = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    grad_draw = ImageDraw.Draw(grad)
    for y in range(size):
        t = y / size
        # #4F46E5 (79, 70, 229) to #7C3AED (124, 58, 237)
        r = int(79 + (124 - 79) * t)
        g = int(70 + (58 - 70) * t)
        b = int(229 + (237 - 229) * t)
        grad_draw.line([(0, y), (size, y)], fill=(r, g, b, 255))

    # Mask for rounded rect
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    radius = int(size * 0.24)
    mask_draw.rounded_rectangle([(16, 16), (size - 16, size - 16)], radius=radius, fill=255)

    base = Image.composite(grad, img, mask)
    draw = ImageDraw.Draw(base)

    # Top highlight border
    draw.rounded_rectangle([(16, 16), (size - 16, size - 16)], radius=radius, outline=(255, 255, 255, 80), width=8)

    # Coordinates scaled by size / 32
    s = size / 32.0

    # Vertical stem: x from 9.5 to 15, y from 6 to 26
    stem_box = [int(9.5 * s), int(6 * s), int(15 * s), int(26 * s)]
    draw.rounded_rectangle(stem_box, radius=int(2.5 * s), fill=(255, 255, 255, 250))

    # Top power bar: x from 14 to 23.5, y from 6 to 9.2
    top_bar = [int(14 * s), int(6 * s), int(23.5 * s), int(9.2 * s)]
    draw.rounded_rectangle(top_bar, radius=int(1.6 * s), fill=(255, 255, 255, 250))

    # Middle bar: x from 14 to 20, y from 13.5 to 16.7
    mid_bar = [int(14 * s), int(13.5 * s), int(20 * s), int(16.7 * s)]
    draw.rounded_rectangle(mid_bar, radius=int(1.6 * s), fill=(255, 255, 255, 250))

    # AI Emerald Spark at (23.5 * s, 7.5 * s)
    cx, cy = int(24 * s), int(7.5 * s)
    # Glow
    glow_r = int(4.5 * s)
    draw.ellipse([cx - glow_r, cy - glow_r, cx + glow_r, cy + glow_r], fill=(16, 185, 129, 90))

    # 4-point diamond star
    star_r = int(3.5 * s)
    star_inner = int(0.9 * s)
    star_points = [
        (cx, cy - star_r),
        (cx + star_inner, cy - star_inner),
        (cx + star_r, cy),
        (cx + star_inner, cy + star_inner),
        (cx, cy + star_r),
        (cx - star_inner, cy + star_inner),
        (cx - star_r, cy),
        (cx - star_inner, cy - star_inner)
    ]
    draw.polygon(star_points, fill=(52, 211, 153, 255))
    draw.ellipse([cx - int(s*0.7), cy - int(s*0.7), cx + int(s*0.7), cy + int(s*0.7)], fill=(255, 255, 255, 255))

    out_dir = r"c:\p\BOTS\fitnes_bot\landing\assets\images"
    # Save PNGs
    base.resize((512, 512), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "icon-512.png"))
    base.resize((192, 192), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "icon-192.png"))
    base.resize((180, 180), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "apple-touch-icon.png"))
    base.resize((64, 64), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "favicon-64.png"))
    base.resize((32, 32), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "favicon-32.png"))
    base.resize((16, 16), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "favicon-16.png"))

    # Save multi-size favicon.ico
    ico_images = [
        base.resize((16, 16), Image.Resampling.LANCZOS),
        base.resize((32, 32), Image.Resampling.LANCZOS),
        base.resize((48, 48), Image.Resampling.LANCZOS),
        base.resize((64, 64), Image.Resampling.LANCZOS),
    ]
    ico_images[0].save(
        os.path.join(out_dir, "favicon.ico"),
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64)]
    )
    print("Successfully generated all raster icons and favicon.ico!")

render_raster_icons()
