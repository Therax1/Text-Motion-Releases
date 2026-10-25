const textMedia = `${import.meta.env.BASE_URL}assets/previews/text-animations/`

// These three real preview assets support the retained feature illustrations.
export const featureMedia = {
  popIn: textMedia + 'pop-in-sans-rebond.mp4',
  blurFadeUp: textMedia + 'blur-fade-up.mp4',
  blurBlink: textMedia + 'blur-fade-up-blink.mp4',
} as const

export const posterFor = (media: string) => media.replace(/\.mp4$/, '.webp')
