from PIL import Image, ImageFilter
import numpy as np
from pathlib import Path

src = Path(r'c:\Users\Administrador\Documents\PB-COMUNICAO\hero-landing-fork\public\assets\logo.png')
backup = src.with_name('logo-before-outline.png')

im = Image.open(src).convert('RGBA')
if not backup.exists():
    im.save(backup)

arr = np.array(im)
h, w = arr.shape[:2]
y0, y1 = int(h * 0.58), int(h * 0.88)
x0, x1 = int(w * 0.08), int(w * 0.92)
region = arr[y0:y1, x0:x1].copy()

r, g, b, a = region[:, :, 0], region[:, :, 1], region[:, :, 2], region[:, :, 3]

text_mask = (
    (a > 180)
    & (b > 70) & (b < 170)
    & (b > r + 35) & (b > g + 20)
    & (r < 70) & (g < 100)
)

black_outline = (a > 180) & (r < 35) & (g < 35) & (b < 45)

text_u8 = (text_mask.astype(np.uint8) * 255)
grown = np.array(Image.fromarray(text_u8, mode='L').filter(ImageFilter.MaxFilter(5))) > 0
outline_candidates = black_outline & grown

glyph = text_mask | outline_candidates
glyph_img = Image.fromarray((glyph.astype(np.uint8) * 255), mode='L')
dilated = np.array(glyph_img.filter(ImageFilter.MaxFilter(7))) > 0
stroke = dilated & ~glyph

region_out = region.copy()
region_out[stroke, 0] = 255
region_out[stroke, 1] = 255
region_out[stroke, 2] = 255
region_out[stroke, 3] = 255

region_out[text_mask, 0] = 0
region_out[text_mask, 1] = 35
region_out[text_mask, 2] = 124
region_out[text_mask, 3] = 255

arr[y0:y1, x0:x1] = region_out
result = Image.fromarray(arr, 'RGBA')
result.save(src)
result.crop((x0, y0, x1, y1)).save(src.with_name('logo-subtitle-preview.png'))
print('text', int(text_mask.sum()), 'stroke', int(stroke.sum()))
print('saved', src)
