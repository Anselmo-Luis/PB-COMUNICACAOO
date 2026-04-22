# Hero video assets

Coloque aqui os arquivos do vídeo do Hero:

- `hero.webm` — recomendado: VP9 ou AV1, taxa de bits 2-4 Mbps
- `hero.mp4`  — fallback H.264/AAC, taxa de bits 3-5 Mbps
- Duração: 8-15 segundos (loop)
- Resolução: 1920x1080 ou 1280x720
- **Sem áudio** (o `<video>` roda `muted` por especificação — áudio só aumenta o peso)
- Meta de peso total: < 3 MB (webm) e < 5 MB (mp4)

## Comandos de referência com ffmpeg

```bash
ffmpeg -i entrada.mov -an -c:v libvpx-vp9 -b:v 2.5M -crf 33 -vf "scale=1280:-2" hero.webm
ffmpeg -i entrada.mov -an -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart -vf "scale=1280:-2" hero.mp4
```

Enquanto esses arquivos não existirem, o Hero exibe automaticamente o
poster estático em `/frames/ezgif-frame-001.jpg` (sem quebrar o layout).
